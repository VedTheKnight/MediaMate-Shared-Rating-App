-- User Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture_url TEXT,
    is_profile_private BOOLEAN DEFAULT FALSE,
    is_rating_private BOOLEAN DEFAULT FALSE
);

-- Friendship Table
CREATE TABLE Friendship (
    friendship_id SERIAL PRIMARY KEY,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    status VARCHAR(10) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT now(),
    FOREIGN KEY (user1_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (user2_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    CONSTRAINT check_user_ids_not_equal CHECK (user1_id <> user2_id)
);

-- Unique Index for Friendship Table
CREATE UNIQUE INDEX unique_friendship_idx 
ON Friendship (user1_id, user2_id);

-- Genre Table
CREATE TABLE Genre (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- ContentItem Table
CREATE TABLE ContentItem (
    item_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    content_type VARCHAR(50) CHECK (content_type IN ('Book', 'TV Show', 'Movie')),
    release_date DATE,
    genre_id REFERENCES Genre(genre_id),
    image_url TEXT
);

-- Rating Table
CREATE TABLE Rating (
    rating_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    item_id INT REFERENCES ContentItem(item_id),
    rating_value INT CHECK (rating_value BETWEEN 1 AND 10),
    is_private BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP DEFAULT now()
);

-- Review Table
CREATE TABLE Review (
    review_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    item_id INT REFERENCES ContentItem(item_id),
    text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT now()
);

-- Watchlist Table
CREATE TABLE Watchlist (
    watchlist_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    item_id INT REFERENCES ContentItem(item_id),
    status VARCHAR(20) CHECK (status IN ('Planned', 'Watching', 'Completed')),
    timestamp TIMESTAMP DEFAULT now()
);

CREATE TABLE ContentItemGenre (
    item_id INT NOT NULL REFERENCES ContentItem(item_id) ON DELETE CASCADE,
    genre_id INT NOT NULL REFERENCES Genre(genre_id) ON DELETE CASCADE,
    PRIMARY KEY (item_id, genre_id)
);

-- Indexes for Foreign Keys
CREATE INDEX idx_rating_user ON Rating(user_id);
CREATE INDEX idx_rating_item ON Rating(item_id);
CREATE INDEX idx_review_user ON Review(user_id);
CREATE INDEX idx_review_item ON Review(item_id);
CREATE INDEX idx_watchlist_user ON Watchlist(user_id);
CREATE INDEX idx_watchlist_item ON Watchlist(item_id);
