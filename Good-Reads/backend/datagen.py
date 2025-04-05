import psycopg2
from faker import Faker
import random

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    dbname="rating_app",
    user="postgres",
    password="12345678",
    host="localhost",
)
cursor = conn.cursor()

# Initialize Faker for generating fake data
faker = Faker()

# Generate Genres
genres = ['Fiction', 'Non-Fiction', 'Drama', 'Comedy', 'Action', 'Romance', 'Sci-Fi']
for genre in genres:
    cursor.execute("INSERT INTO Genre (name) VALUES (%s)", (genre,))

# Fetch valid genre IDs from the database
cursor.execute("SELECT genre_id FROM Genre;")
genre_ids = [row[0] for row in cursor.fetchall()]

# Generate Users
for _ in range(50):
    cursor.execute(
        """
        INSERT INTO "users" (username, email, password_hash, profile_picture_url, is_profile_private, is_rating_private)
        VALUES (%s, %s, %s, %s, %s, %s)
        """,
        (
            faker.user_name(),
            faker.email(),
            faker.sha256(),
            faker.image_url(),
            random.choice([True, False]),
            random.choice([True, False]),
        ),
    )

# Generate Content Items
content_types = ['Book', 'TV Show', 'Movie']
for _ in range(100):
    cursor.execute(
        """
        INSERT INTO ContentItem (title, description, content_type, release_date, genre_id, image_url)
        VALUES (%s, %s, %s, %s, %s, %s)
        """,
        (
            faker.sentence(nb_words=3),
            faker.paragraph(nb_sentences=3),
            random.choice(content_types),
            faker.date_this_century(),
            random.choice(genre_ids),
            faker.image_url(),
        ),
    )

cursor.execute("SELECT user_id FROM users;")
user_ids = [row[0] for row in cursor.fetchall()]

cursor.execute("SELECT item_id FROM ContentItem;")
item_ids = [row[0] for row in cursor.fetchall()]

# Generate Ratings
for _ in range(200):
    cursor.execute(
        """
        INSERT INTO Rating (user_id, item_id, rating_value, is_private)
        VALUES (%s, %s, %s, %s)
        """,
        (
            random.choice(user_ids),  
            random.choice(item_ids),  # Assuming 100 content items
            random.randint(1, 10),  # Rating value between 1 and 10
            random.choice([True, False]),
        ),
    )

# Generate Reviews
for _ in range(150):
    cursor.execute(
        """
        INSERT INTO Review (user_id, item_id, text)
        VALUES (%s, %s, %s)
        """,
        (
            random.choice(user_ids),  # Assuming 50 users
            random.choice(item_ids),  # Content Item ID
            faker.paragraph(nb_sentences=5),
        ),
    )

# Generate Watchlist Entries
statuses = ['Planned', 'Watching', 'Completed']
for _ in range(150):
    cursor.execute(
        """
        INSERT INTO Watchlist (user_id, item_id, status)
        VALUES (%s, %s, %s)
        """,
        (
            random.choice(user_ids),  
            random.choice(item_ids),  # Content Item ID
            random.choice(statuses),
        ),
    )

# Commit changes and close connection
conn.commit()
cursor.close()
conn.close()
