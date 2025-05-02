-- User Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture_url TEXT,
    is_profile_private BOOLEAN DEFAULT FALSE,
    is_rating_private INTEGER DEFAULT 0, -- 0: Public, 1: Friends Only, 2: Private
    is_review_private INTEGER DEFAULT 0 -- 0: Public, 1: Friends Only, 2: Private
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
    genre_id INT NOT NULL REFERENCES Genre(genre_id),
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
    sentiment_score FLOAT CHECK (sentiment_score BETWEEN 0 AND 1),
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

/*

For Groups
1] Group Membership relation is a tuple (group_id, user_id), will make it indexable by user id
2] Comment Section relation is (group_id, comment_id) -> Merge with group only ig?
3] Comment relation -> (comment_id, upvotes (int), downvotes(int), content(varchar?))

*/
-- Community Table: Represents a community (subreddit)
CREATE TABLE Community (
    community_id SERIAL PRIMARY KEY,
    genre_id INT NOT NULL REFERENCES Genre(genre_id),
    community_name VARCHAR(100) NOT NULL,
    community_description TEXT,
    timestamp TIMESTAMP DEFAULT now(),
    UNIQUE (community_name) -- Ensuring unique community names
);

-- Group Membership Table: Maps users to communities
CREATE TABLE CommunityMembership (
    community_id INT NOT NULL REFERENCES Community(community_id),
    user_id INT NOT NULL REFERENCES Users(user_id),
    PRIMARY KEY (community_id, user_id)  -- Ensures a user can only be a member of a community once
);

-- Comment Table: Represents individual comments
CREATE TABLE Comment (
    comment_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id),
    content VARCHAR(500),
    timestamp TIMESTAMP DEFAULT now(),
    parent_comment_id INT NULL REFERENCES Comment(comment_id), -- For thread structure
    upvotes INT DEFAULT 0,
    downvotes INT DEFAULT 0
);

-- Comment Section Table: Maps comments to communities (connects comments to a specific community)
CREATE TABLE CommentSection (
    community_id INT NOT NULL REFERENCES Community(community_id),
    comment_id INT NOT NULL REFERENCES Comment(comment_id),
    PRIMARY KEY (community_id, comment_id)  -- A comment belongs to only one community
);

-- Voting Table: Represents individual user votes on comments
CREATE TABLE CommentVotes (
    vote_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id),
    comment_id INT NOT NULL REFERENCES Comment(comment_id),
    vote_type BOOLEAN NOT NULL, -- TRUE for upvote, FALSE for downvote
    UNIQUE (user_id, comment_id)  -- Ensures a user can only vote once per comment
);

-- Add indexes for performance optimization
CREATE INDEX idx_user_id ON CommunityMembership(user_id);
CREATE INDEX idx_community_id ON CommunityMembership(community_id);
CREATE INDEX idx_comment_id ON CommentSection(comment_id);
CREATE INDEX idx_community_comment ON CommentSection(community_id, comment_id);
-- Indexes for Foreign Keys
CREATE INDEX idx_rating_user ON Rating(user_id);
CREATE INDEX idx_rating_item ON Rating(item_id);
CREATE INDEX idx_review_user ON Review(user_id);
CREATE INDEX idx_review_item ON Review(item_id);
CREATE INDEX idx_watchlist_user ON Watchlist(user_id);
CREATE INDEX idx_watchlist_item ON Watchlist(item_id);
