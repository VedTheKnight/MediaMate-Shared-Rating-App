import csv
import requests
from datetime import datetime
from collections import defaultdict
import os
import logging

# ========== CONFIG ==========
OMDB_API_KEY = '888888'  # Replace with your real OMDb key
INPUT_TSV = 'title.basics.nonadult.2020.filtered.tsv'
OUTPUT_SQL = 'data.sql'
PROGRESS_FILE = 'processed_ids.txt'
MAX_NEW_ROWS = 100  # How many new titles to process per run
# ============================

# Setup logging
logging.basicConfig(level=logging.INFO, format='[%(asctime)s] %(levelname)s - %(message)s')

genre_map = {}
genre_counter = 1
processed_ids = set()
genre_inserts = []
content_inserts = []

# Load already processed IMDb IDs
if os.path.exists(PROGRESS_FILE):
    with open(PROGRESS_FILE, 'r') as f:
        processed_ids = set(line.strip() for line in f if line.strip())
    logging.info(f"Loaded {len(processed_ids)} already processed IDs.")

# Load existing genre mappings
if os.path.exists(OUTPUT_SQL):
    with open(OUTPUT_SQL, 'r') as f:
        for line in f:
            if line.startswith('INSERT INTO Genre'):
                parts = line.split("VALUES (")[1].split(");")[0]
                gid, name = parts.split(',', 1)
                genre_map[name.strip().strip("'")] = int(gid.strip())
                genre_counter = max(genre_counter, int(gid.strip()) + 1)
    logging.info(f"Loaded existing genre mappings. Starting at genre_id {genre_counter}.")

def get_omdb_data(imdb_id):
    url = f"http://www.omdbapi.com/?i={imdb_id}&apikey={OMDB_API_KEY}"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            if data.get('Response') == 'True':
                return {
                    'title': data.get('Title', '').replace("'", "''"),
                    'description': data.get('Plot', '').replace("'", "''"),
                    'image_url': data.get('Poster', ''),
                    'release_date': parse_release_date(data.get('Released')),
                    'genres': data.get('Genre', '').split(',') if data.get('Genre') else ['Unknown']
                }
            else:
                logging.warning(f"OMDb returned no data for {imdb_id}")
        else:
            logging.error(f"Failed to fetch OMDb data for {imdb_id}: {response.status_code}")
    except Exception as e:
        logging.error(f"Error fetching OMDb data for {imdb_id}: {e}")
    return None

def parse_release_date(released_str):
    try:
        return datetime.strptime(released_str, '%d %b %Y').date().isoformat()
    except Exception:
        return None

next_item_id = 1

# Get max item_id from existing file
if os.path.exists(OUTPUT_SQL):
    with open(OUTPUT_SQL, 'r') as f:
        for line in f:
            if "INSERT INTO ContentItem" in line:
                next_item_id += 1
    logging.info(f"Starting from item_id {next_item_id}.")

new_rows = 0

with open(INPUT_TSV, 'r', encoding='utf-8') as tsv_file:
    reader = csv.DictReader(tsv_file, delimiter='\t')
    for row in reader:
        imdb_id = row['tconst']
        if imdb_id in processed_ids:
            continue
        if new_rows >= MAX_NEW_ROWS:
            break

        logging.info(f"Processing {imdb_id}...")

        content_type = 'Movie' if row['titleType'] == 'movie' else 'TV Show'
        release_date = f"{row['startYear']}-01-01" if row['startYear'].isdigit() else None

        omdb_data = get_omdb_data(imdb_id)
        if not omdb_data:
            continue

        if omdb_data['release_date']:
            release_date = omdb_data['release_date']

        title = omdb_data['title']
        description = omdb_data['description']
        image_url = omdb_data['image_url']
        genres = omdb_data['genres']

        for genre_name in genres:
            genre_name = genre_name.strip()
            escaped_genre_name = genre_name.replace("'", "''")
            if genre_name not in genre_map:
                genre_map[genre_name] = genre_counter
                genre_inserts.append(
                    f"INSERT INTO Genre (genre_id, name) VALUES ({genre_counter}, '{escaped_genre_name}');"
                )
                logging.info(f"Added new genre: {escaped_genre_name} (id={genre_counter})")
                genre_id = genre_counter
                genre_counter += 1
            else:
                genre_id = genre_map[genre_name]

            content_inserts.append(
                f"INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url) "
                f"VALUES ('{title}', '{description}', '{content_type}', '{release_date}', {genre_id}, '{image_url}');"
                f" -- item_id = {next_item_id}"
            )
            next_item_id += 1
            new_rows += 1

        processed_ids.add(imdb_id)

logging.info(f"Writing {new_rows} new entries to {OUTPUT_SQL}")

# Write to SQL file
with open(OUTPUT_SQL, 'a', encoding='utf-8') as out:
    if genre_inserts:
        out.write('\n-- Genre Inserts\n')
        out.write('\n'.join(genre_inserts))
    if content_inserts:
        out.write('\n\n-- ContentItem Inserts\n')
        out.write('\n'.join(content_inserts))

# Update progress file
with open(PROGRESS_FILE, 'w') as f:
    for imdb_id in processed_ids:
        f.write(imdb_id + '\n')

logging.info(f"✅ Done! Added {new_rows} new content items to {OUTPUT_SQL}")
