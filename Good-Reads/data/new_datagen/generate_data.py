import requests
import logging
import time
from datetime import datetime
from bs4 import BeautifulSoup
import re
import csv


def parse_flexible_date(date_str):
    for fmt in ("%d %b %Y", "%Y-%m-%d", "%Y-%m", "%Y"):
        try:
            return datetime.strptime(date_str, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return None

OMDB_API_KEY = 'fac0d505'
OMDB_API_URL = 'http://www.omdbapi.com/'
GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes?q=bestseller&maxResults=40&startIndex={}'
HEADERS = {'User-Agent': 'Mozilla/5.0'}
NUMITEMS = 250

logger = logging.getLogger()
logger.setLevel(logging.INFO)

formatter = logging.Formatter('%(asctime)s - %(message)s')
file_handler = logging.FileHandler('generation.log', mode='w')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

genre_map = {}
genre_counter = 1
content_counter = 1
genre_sql_lines = []
content_sql_lines = []

def get_omdb_data(title, content_type):
    params = {
        't': title,
        'apikey': OMDB_API_KEY,
        'type': 'movie' if content_type == 'Movie' else 'series'
    }
    try:
        logging.info(f"Querying OMDB for {content_type}: '{title}'")
        res = requests.get(OMDB_API_URL, params=params)
        data = res.json()
        if data.get('Response') == 'True':
            logging.info(f"✅ Found: {data['Title']} ({data.get('Year')})")
            return {
                'title': data['Title'],
                'description': data.get('Plot', '').replace("'", "''"),
                'release_date': data.get('Released', 'N/A'),
                'genre': data.get('Genre', '').split(',')[0].strip() if data.get('Genre') else 'Unknown',
                'image_url': data.get('Poster') if data.get('Poster') != 'N/A' else None
            }
        else:
            logging.warning(f"❌ OMDB No Result for '{title}' — Error: {data.get('Error')}")
    except Exception as e:
        logging.warning(f"OMDB failed for '{title}': {e}")
    return None

def add_genre(genre_name):
    global genre_counter
    if genre_name not in genre_map:
        genre_map[genre_name] = genre_counter
        genre_sql_lines.append(f"INSERT INTO Genre (genre_id, name) VALUES ({genre_counter}, '{genre_name}');")
        genre_counter += 1
    return genre_map[genre_name]

def add_content_item(info, content_type):
    global content_counter
    genre_id = add_genre(info['genre'])
    date_val = parse_flexible_date(info['release_date'])
    date_sql = f"'{date_val}'" if date_val else 'NULL'
    sql = f"""INSERT INTO ContentItem (item_id, title, description, content_type, release_date, genre_id, image_url)
VALUES ({content_counter}, '{info['title'].replace("'", "''")}', '{info['description']}', '{content_type}', {date_sql}, {genre_id}, '{info['image_url']}');"""
    content_sql_lines.append(sql)
    content_counter += 1

def get_titles_from_imdb_chart(url):
    logging.info(f"🌐 Scraping IMDb chart: {url}")
    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        if response.status_code != 200:
            logging.warning(f"❌ Failed to fetch IMDb chart page. Status code: {response.status_code}")
            return []

        soup = BeautifulSoup(response.text, 'html.parser')
        titles = []

        # First try classic /chart/top format
        for a in soup.select('td.titleColumn a'):
            titles.append(a.text.strip())
            if len(titles) >= NUMITEMS:
                break

        # If that fails, try new card view layout
        if not titles:
            for item in soup.select('li.ipc-metadata-list-summary-item'):
                title_tag = item.select_one('h3.ipc-title__text')
                if title_tag:
                    title_text = title_tag.get_text(strip=True)
                    title = re.sub(r'^\d+\.\s*', '', title_text)
                    titles.append(title)
                if len(titles) >= NUMITEMS:
                    break

        logging.info(f"🎯 Scraped {len(titles)} titles from {url}")
        return titles
    except Exception as e:
        logging.error(f"💥 Error scraping IMDb chart: {e}")
        return []


def fetch_top_250_movies():
    logging.info(f"🎥 Fetching top {NUMITEMS} movies from imdb_top_250.csv...")
    try:
        with open('imdb_top_250.csv', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            # logging.info(f"Reading imdb_mov... with {len(list(reader))} entries")
            for i, row in enumerate(reader, 1):
                if i > NUMITEMS:
                    break
                title = row['Title'].strip()
                logging.info(f"{i:03d}/{NUMITEMS} 🎬 IMDb Title: {title}")
                data = get_omdb_data(title, 'Movie')
                if data:
                    add_content_item(data, 'Movie')
                time.sleep(0.3)
    except Exception as e:
        logging.error(f"💥 Failed to process imdb_top_250.csv: {e}")

def fetch_top_250_tv_shows():
    logging.info(f"📺 Fetching top {NUMITEMS} TV shows from top250list.csv...")
    try:
        with open('top250list.csv', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            # logging.info(f"Reading top250list.csv... with {len(list(reader))} entries")
            for i, row in enumerate(reader, 1):
                if i > NUMITEMS:
                    break
                title = row['Title'].strip()
                logging.info(f"{i:03d}/{NUMITEMS} 📼 IMDb Title: {title}")
                data = get_omdb_data(title, 'TV Show')
                if data:
                    add_content_item(data, 'TV Show')
                time.sleep(0.3)
    except Exception as e:
        logging.error(f"💥 Failed to process top250list.csv: {e}")

def fetch_top_250_books():
    total = 0
    index = 0
    while total < NUMITEMS:
        res = requests.get(GOOGLE_BOOKS_API.format(index), headers=HEADERS)
        books = res.json().get('items', [])
        for book in books:
            try:
                vol = book['volumeInfo']
                title = vol.get('title', '').replace("'", "''")
                desc = vol.get('description', '').replace("'", "''") if 'description' in vol else ''
                genre = vol.get('categories', ['Unknown'])[0]
                pub_date = vol.get('publishedDate', 'N/A')
                img = vol.get('imageLinks', {}).get('thumbnail', None)
                info = {
                    'title': title,
                    'description': desc,
                    'release_date': pub_date,
                    'genre': genre,
                    'image_url': img
                }
                add_content_item(info, 'Book')
                total += 1
                if total >= NUMITEMS:
                    break
            except Exception as e:
                logging.warning(f"Book error: {e}")
        index += 40
        time.sleep(0.5)

def write_sql_file():
    with open('data.sql', 'w', encoding='utf-8') as f:
        f.write('-- Auto-generated SQL Insert Statements\n')
        f.write('-- =====================================\n\n')

        f.write('-- Insert statements for Genre table\n')
        f.write('-- ----------------------------------\n')
        for line in genre_sql_lines:
            f.write(line + '\n')

        f.write('\n-- Insert statements for ContentItem table\n')
        f.write('-- ----------------------------------------\n')
        for line in content_sql_lines:
            f.write(line + '\n')

    logging.info("📄 SQL file written successfully.")

if __name__ == "__main__":
    logging.info("🚀 Starting generation...")
    try:
        fetch_top_250_movies()
        fetch_top_250_tv_shows()
        fetch_top_250_books()
        write_sql_file()
        logging.info("✅ Generation complete.")
    except Exception as e:
        logging.error(f"💥 Script failed: {e}")
