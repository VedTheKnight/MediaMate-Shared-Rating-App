DROP TABLE IF EXISTS Users CASCADE;

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE Friendships (
    friendship_id SERIAL PRIMARY KEY,          -- Auto-incrementing primary key
    user1_id INT NOT NULL,                     -- ID of one user in the friendship
    user2_id INT NOT NULL,                     -- ID of the other user in the friendship
    status VARCHAR(10) DEFAULT 'pending',      -- Friendship status (e.g., pending, accepted, blocked)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the friendship was created
    FOREIGN KEY (user1_id) REFERENCES Users(user_id) ON DELETE CASCADE, -- Foreign key to Users table
    FOREIGN KEY (user2_id) REFERENCES Users(user_id) ON DELETE CASCADE  -- Foreign key to Users table
);

-- Create a unique index to enforce uniqueness on user1_id and user2_id combinations
CREATE UNIQUE INDEX unique_friendship_idx 
ON Friendships (LEAST(user1_id, user2_id), GREATEST(user1_id, user2_id));


