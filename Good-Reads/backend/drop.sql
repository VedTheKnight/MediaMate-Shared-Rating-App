-- Drop indices (if any)
DROP INDEX IF EXISTS unique_friendship_idx;
DROP INDEX IF EXISTS idx_user_id;
DROP INDEX IF EXISTS idx_community_id;
DROP INDEX IF EXISTS idx_comment_id;
DROP INDEX IF EXISTS idx_community_comment;
DROP INDEX IF EXISTS idx_rating_user;
DROP INDEX IF EXISTS idx_rating_item;
DROP INDEX IF EXISTS idx_review_user;
DROP INDEX IF EXISTS idx_review_item;
DROP INDEX IF EXISTS idx_watchlist_user;
DROP INDEX IF EXISTS idx_watchlist_item;

-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS CommentVotes;
DROP TABLE IF EXISTS CommentSection;
DROP TABLE IF EXISTS Comment;
DROP TABLE IF EXISTS CommunityMembership;
DROP TABLE IF EXISTS Community;
DROP TABLE IF EXISTS Watchlist;
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Rating;
DROP TABLE IF EXISTS ContentItem;
DROP TABLE IF EXISTS Genre;
DROP TABLE IF EXISTS Friendship;
DROP TABLE IF EXISTS Users;

-- Recreate tables