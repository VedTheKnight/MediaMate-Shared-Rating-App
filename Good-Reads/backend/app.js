const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { Pool } = require("pg");
const Sentiment = require('sentiment');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("./config");
const app = express();
const port = 4000;

// Initialize sentiment analyzer
const sentiment = new Sentiment();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// PostgreSQL connection
// NOTE: use YOUR postgres username and password here
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'rating_app',
  password: '12345678',
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// CORS: Give permission to localhost:3000 (ie our React app)
// to use this backend API
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

// /// Geet -------------------------------- HAD TO CONFIGURE FOR USING THE IP ADDRESS 
// app.use(
//   cors({
//     origin: "http://10.129.6.179:3000", // ✅ add this IP
//     credentials: true,
//   })
// );
// // -------------------------------


// Get a user's username by ID
app.get("/user2/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      "SELECT username,is_watchlist_private FROM Users WHERE user_id = $1",
      [userId]
    );
    // console.log(userId,result.rows[0].username);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ username: result.rows[0].username });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Session information
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

/////////////////////////////////////////////////////////////
// Authentication APIs
// Signup, Login, IsLoggedIn and Logout

// TODO: Implement authentication middleware
// Redirect unauthenticated users to the login page with respective status code
function isAuthenticated(req, res, next) {
  if (!req.session.userId) {
    return res.status(400).json({ message: "Unauthorized" });
  }
  next();
}

// TODO: Implement user signup logic
// return JSON object with the following fields: {username, email, password}
// use correct status codes and messages mentioned in the lab document
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email is already registered
    const emailResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (emailResult.rows.length > 0) {
      return res.status(400).json({ message: "Error: Email is already registered." });
    }

    // Check if the username is already taken
    const usernameResult = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (usernameResult.rows.length > 0) {
      return res.status(400).json({ message: "Error: Username is already taken." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await pool.query(
     `INSERT INTO users 
      (username, email, password_hash, profile_picture_url, is_profile_private, is_rating_private,is_review_private) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        username,
        email,
        hashedPassword,
        null, // Default to null if not provided
        false, // Default value for is_profile_private
        0, // Default value for is_rating_private
        0  
      ]
    );

    res.status(200).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signing up" });
  }
});



// TODO: Implement user signup logic
// return JSON object with the following fields: {email, password}
// use correct status codes and messages mentioned in the lab document
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Checking if the user is registered
    const user = await pool.query("select * from users where email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Checking if the password entered is correct
    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Creating a session and storing the user ID
    req.session.userId = user.rows[0].user_id;

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
});


// TODO: Implement API used to check if the client is currently logged in or not.
// use correct status codes and messages mentioned in the lab document
app.get("/isLoggedIn", async (req, res) => {
  if (!req.session.userId) {
    return res.status(400).json({ message: "Not logged in" });
  }

  try {
    // Fetching the username from the database using the stored user ID in session
    const user = await pool.query("select username from users where user_id = $1", [req.session.userId]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Not logged in" });
    }

    res.status(200).json({ message: "Logged in", username: user.rows[0].username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error checking login status" });
  }
});

// TODO: Implement API used to logout the user
// use correct status codes and messages mentioned in the lab document
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// Search for users
app.get("/search-users", isAuthenticated, async (req, res) => {
  const { query } = req.query;
  const { userId } = req.session;

  try {
    const users = await pool.query(
      "SELECT user_id, username FROM Users WHERE username ILIKE $1 AND user_id != $2 AND is_profile_private = false",
      [`%${query}%`, userId]
    );
    res.status(200).json(users.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching users" });
  }
});

// ________________________________________________________________FRIEND STUFF __________________________________________________________
// Get pending friend requests
app.get("/friend-requests", isAuthenticated, async (req, res) => {
  const { userId } = req.session;

  try {
    const requests = await pool.query(
      `SELECT u.user_id, u.username 
       FROM Users u 
       JOIN Friendship f ON u.user_id = f.user1_id 
       WHERE f.user2_id = $1 AND f.status = 'pending'`,
      [userId]
    );
    res.status(200).json(requests.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching friend requests" });
  }
});

// Send a friend request
app.post("/friend-request", isAuthenticated, async (req, res) => {
  const { userId } = req.session;
  const { friendId } = req.body;

  try {
    // Check if a friendship already exists
    const existingFriendship = await pool.query(
      "SELECT * FROM Friendship WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)",
      [userId, friendId]
    );

    if (existingFriendship.rows.length > 0) {
      return res.status(400).json({ message: "Friend request already exists or you are already friends" });
    }

    // Insert a new friend request
    await pool.query(
      "INSERT INTO Friendship (user1_id, user2_id, status) VALUES ($1, $2, 'pending')",
      [userId, friendId]
    );

    res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending friend request" });
  }
});

// Accept a friend request
app.post("/accept-friend-request", isAuthenticated, async (req, res) => {
  const { userId } = req.session;
  const { friendId } = req.body;

  try {
    // Update the friendship status to accepted
    const result = await pool.query(
      "UPDATE Friendship SET status = 'accepted' WHERE user1_id = $1 AND user2_id = $2 AND status = 'pending'",
      [friendId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ message: "No pending friend request found" });
    }

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error accepting friend request" });
  }
});

// Reject a friend request
app.post("/reject-friend-request", isAuthenticated, async (req, res) => {
  const { userId } = req.session;
  const { friendId } = req.body;

  try {
    // Delete the pending friend request
    const result = await pool.query(
      "DELETE FROM Friendship WHERE user1_id = $1 AND user2_id = $2 AND status = 'pending'",
      [friendId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ message: "No pending friend request found" });
    }

    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error rejecting friend request" });
  }
});

// View friends list
app.get("/friends", isAuthenticated, async (req, res) => {
  const { userId } = req.session;

  try {
    // Retrieve all accepted Friendship
    const friends = await pool.query(
      "SELECT u.user_id, u.username FROM Users u JOIN Friendship f ON (u.user_id = f.user1_id OR u.user_id = f.user2_id) WHERE (f.user1_id = $1 OR f.user2_id = $1) AND f.status = 'accepted' AND u.user_id != $1",
      [userId]
    );

    res.status(200).json(friends.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving friends list" });
  }
});

// Check friendship status
app.get("/friendship-status/:friendId", isAuthenticated, async (req, res) => {
  const { userId } = req.session;
  const { friendId } = req.params;

  try {
    // Check the status of the friendship
    const friendship = await pool.query(
      "SELECT status FROM Friendship WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)",
      [userId, friendId]
    );

    if (friendship.rows.length === 0) {
      return res.status(404).json({ message: "No friendship found" });
    }

    res.status(200).json({ status: friendship.rows[0].status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error checking friendship status" });
  }
});

// Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});


//______________________________________________________________ Content APIs ____________________________________________________________

// app.get("/books", async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT ci.item_id, ci.title, ci.description, ci.content_type, ci.release_date, ci.image_url, g.name AS genre, 
//              COALESCE(AVG(r.rating_value), 0) AS rating,
//              COALESCE(AVG(rev.sentiment_score), 0) AS average_sentiment
//       FROM ContentItem ci
//       LEFT JOIN Genre g ON ci.genre_id = g.genre_id
//       LEFT JOIN Rating r ON ci.item_id = r.item_id
//       LEFT JOIN Review rev ON ci.item_id = rev.item_id
//       WHERE ci.content_type = 'Book'
//       GROUP BY ci.item_id, g.name
//     `);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/genres", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Genre");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getwatchlist2/:userId", isAuthenticated, async (req, res) => {
  const { userId } = req.params; // Extract userId from the URL
  const result = await pool.query(
    "SELECT w.item_id, b.title, w.status FROM Watchlist w JOIN ContentItem b ON w.item_id = b.item_id WHERE w.user_id = $1",
    [userId]
  );
  res.json(result.rows);
});


app.get("/getwatchlist", async (req, res) => {
  const userId = req.session.userId;
  const result = await pool.query(
    "SELECT w.item_id, b.title, w.status, b.content_type FROM Watchlist w JOIN ContentItem b ON w.item_id = b.item_id WHERE w.user_id = $1",
    [userId]
  );
  res.json(result.rows);
});

app.post("/watchlist", async (req, res) => {
  const { bookId, status } = req.body;
  const userId = req.session.userId; // Assuming user ID is stored in session

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    await pool.query(
      "INSERT INTO Watchlist (user_id, item_id, status) VALUES ($1, $2, $3)",
      [userId, bookId, status ]
    );
    res.json({ message: "Book added to watchlist" });
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.post("/books/:bookId/rating", async (req, res) => {
//   const { bookId } = req.params;
//   const { rating } = req.body;
//   const userId = req.user; // Assuming you're using authentication

//   try {
//     // Check if a rating already exists for this user and book
//     const existingRating = await pool.query(
//       "SELECT * FROM rating WHERE user_id = $1 AND item_id = $2",
//       [userId, bookId]
//     );

//     if (existingRating.rows.length > 0) {
//       // Update existing rating
//       await pool.query(
//         "UPDATE rating SET rating_value = $1 WHERE user_id = $2 AND item_id = $3",
//         [rating, userId, bookId]
//       );
//     } else {
//       // Insert new rating
//       await pool.query(
//         "INSERT INTO rating (user_id, item_id, rating_value) VALUES ($1, $2, $3)",
//         [userId, bookId, rating]
//       );
//     }

//     res.status(200).json({ message: "Rating updated successfully" });
//   } catch (error) {
//     console.error("Error updating/inserting rating:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// Helper function to calculate sentiment score
function calculateSentimentScore(text) {
  const result = sentiment.analyze(text);
  // Normalize score to 0-1 range
  // sentiment score ranges from -5 to 5, so we add 5 and divide by 10
  const normalizedScore = (result.score + 5) / 10;
  return Math.max(0, Math.min(1, normalizedScore));
}

// app.post("/books/:id/review", async (req, res) => {
//   const { id } = req.params;
//   const { text } = req.body;
//   const userId = req.session.userId;

//   if (!userId) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     const sentimentScore = calculateSentimentScore(text);
    
//     await pool.query(
//       "INSERT INTO Review (user_id, item_id, text, sentiment_score) VALUES ($1, $2, $3, $4)",
//       [userId, id, text, sentimentScore]
//     );
//     res.json({ message: "Review submitted successfully" });
//   } catch (error) {
//     console.error("Error submitting review:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/books/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const bookResult = await pool.query(`
//       SELECT ci.item_id, ci.title, ci.description, ci.content_type, ci.release_date, ci.image_url,
//              g.name AS genre,
//              COALESCE(AVG(r.rating_value), 0) AS rating,
//              COALESCE(AVG(rev.sentiment_score), 0) AS average_sentiment
//       FROM ContentItem ci
//       LEFT JOIN Genre g ON ci.genre_id = g.genre_id
//       LEFT JOIN Rating r ON ci.item_id = r.item_id
//       LEFT JOIN Review rev ON ci.item_id = rev.item_id
//       WHERE ci.item_id = $1
//       GROUP BY ci.item_id, g.name
//     `, [id]);

//     const reviewsResult = await pool.query(`
//       SELECT r.review_id, r.text, r.sentiment_score, u.username 
//       FROM Review r 
//       JOIN Users u ON r.user_id = u.user_id 
//       WHERE r.item_id = $1
//       ORDER BY r.sentiment_score DESC
//     `, [id]);

//     if (bookResult.rows.length === 0) {
//       return res.status(404).json({ error: "Book not found" });
//     }

//     const bookDetails = bookResult.rows[0];
//     // Add sentiment analysis for the book description
//     if (bookDetails.description) {
//       bookDetails.description_sentiment = calculateSentimentScore(bookDetails.description);
//     }
//     bookDetails.reviews = reviewsResult.rows;

//     res.json(bookDetails);
//   } catch (error) {
//     console.error("Error fetching book details:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Add a new endpoint to filter reviews by sentiment
// app.get("/books/:id/reviews", async (req, res) => {
//   const { id } = req.params;
//   const { sentiment } = req.query; // 'positive', 'negative', or 'neutral'

//   try {
//     let sentimentQuery = '';
//     if (sentiment === 'positive') {
//       sentimentQuery = 'AND r.sentiment_score >= 0.6';
//     } else if (sentiment === 'negative') {
//       sentimentQuery = 'AND r.sentiment_score < 0.4';
//     } else if (sentiment === 'neutral') {
//       sentimentQuery = 'AND r.sentiment_score >= 0.4 AND r.sentiment_score < 0.6';
//     }

//     const reviewsResult = await pool.query(`
//       SELECT r.review_id, r.text, r.sentiment_score, u.username 
//       FROM Review r 
//       JOIN Users u ON r.user_id = u.user_id 
//       WHERE r.item_id = $1 ${sentimentQuery}
//       ORDER BY r.sentiment_score DESC
//     `, [id]);

//     res.json(reviewsResult.rows);
//   } catch (error) {
//     console.error("Error fetching filtered reviews:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/user_watchlist", async (req, res) => {
  const userId = req.session.userId;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const result = await pool.query(`
      SELECT w.watchlist_id, w.status,
             ci.title AS book_title,
             ci.image_url AS book_image,
             g.name AS genre_name
      FROM Watchlist w
      JOIN ContentItem ci ON w.item_id = ci.item_id
      JOIN Genre g ON ci.genre_id = g.genre_id
      WHERE w.user_id = $1
    `, [userId]);
    
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get("/books/:id/friendRatings", async (req, res) => {
//   const { id } = req.params;
//   const userId = req.session.userId;

//   if (!userId) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     const result = await pool.query(`
//     SELECT r.rating_value,
//           u.username AS friend_name
//     FROM Rating r
//     JOIN Friendship f ON f.user2_id = r.user_id AND f.user1_id = $1 AND f.status = 'accepted'
//     JOIN "User" u ON u.user_id = r.user_id
//     WHERE r.item_id = $2 
//       AND r.is_private = false
//       AND u.is_rating_private = false;

//     `, [userId, id]);

//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching friend ratings:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/get-joinable-communities", isAuthenticated, async (req, res) => {
  const { userId } = req.session;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const result = await pool.query(`
      SELECT c.community_id, c.community_name, c.community_description
      FROM Community c
      WHERE c.community_id NOT IN (
        SELECT cm.community_id
        FROM CommunityMembership cm
        WHERE cm.user_id = $1
      )
    `, [userId]);
    
    res.status(200).json({ communities: result.rows });
  } catch (error) {
    console.error("Error fetching joinable communities:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/get-joined-communities', async (req, res) => {
  const user = req.session;

  if (!user) {
      return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
      const result = await pool.query(`
          SELECT c.community_id, c.community_name, c.community_description, c.timestamp
          FROM Community c
          JOIN CommunityMembership cm ON c.community_id = cm.community_id
          WHERE cm.user_id = $1
      `, [user.userId]);

      res.json({ communities: result.rows });
  } catch (err) {
      console.error('Error fetching joined communities:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});


app.post("/join-community", isAuthenticated, async (req, res) => {
  const { userId } = req.session;
  const { community_id } = req.body;

  if (!userId || !community_id) {
    return res.status(400).json({ message: "Missing user or community ID" });
  }

  try {
    await pool.query(
      `INSERT INTO CommunityMembership (community_id, user_id) VALUES ($1, $2)
       ON CONFLICT DO NOTHING`, // prevent duplicates
      [community_id, userId]
    );
    res.status(200).json({ message: "Joined community successfully" });
  } catch (error) {
    console.error("Error joining community:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/groups/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const communityRes = await pool.query(
      "SELECT community_name, community_description FROM Community WHERE community_id = $1",
      [id]
    );

    const commentRes = await pool.query(
      `SELECT c.comment_id, c.content, c.user_id, c.upvotes, c.downvotes,
              c.parent_comment_id, u.username
       FROM CommentSection cs
       JOIN Comment c ON cs.comment_id = c.comment_id
       JOIN Users u ON u.user_id = c.user_id
       WHERE cs.community_id = $1`,
      [id]
    );

    res.json({
      community: communityRes.rows[0],
      comments: commentRes.rows,
    });
  } catch (err) {
    console.error("Error fetching community page:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.post("/groups/:id/add-comment", isAuthenticated, async (req, res) => {
  const { userId } = req.session;
  const { id: communityId } = req.params;
  const { content } = req.body;

  if (!userId || !content || !content.trim()) {
    return res.status(400).json({ error: "Invalid comment" });
  }

  try {
    const insertComment = await pool.query(
      `INSERT INTO Comment (user_id, content) VALUES ($1, $2) RETURNING *`,
      [userId, content]
    );

    const commentId = insertComment.rows[0].comment_id;

    await pool.query(
      `INSERT INTO CommentSection (community_id, comment_id) VALUES ($1, $2)`,
      [communityId, commentId]
    );

    res.status(200).json({ comment: insertComment.rows[0] });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post("/comments/:commentId/vote", isAuthenticated, async (req, res) => {
  const { commentId } = req.params;
  const { type } = req.body; // 'upvote' or 'downvote'
  const userId = req.session.userId;

  if (!["upvote", "downvote"].includes(type)) {
    return res.status(400).send("Invalid vote type");
  }

  const voteType = type === "upvote";

  try {
    // 1. Upsert into CommentVotes
    await pool.query(
      `
      INSERT INTO CommentVotes (user_id, comment_id, vote_type)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, comment_id)
      DO UPDATE SET vote_type = EXCLUDED.vote_type
      `,
      [userId, commentId, voteType]
    );

    // 2. Recalculate upvotes/downvotes on Comment
    await pool.query(
      `
      UPDATE Comment c SET
        upvotes = COALESCE(v.up_count, 0),
        downvotes = COALESCE(v.down_count, 0)
      FROM (
        SELECT
          comment_id,
          COUNT(*) FILTER (WHERE vote_type IS TRUE) AS up_count,
          COUNT(*) FILTER (WHERE vote_type IS FALSE) AS down_count
        FROM CommentVotes
        WHERE comment_id = $1
        GROUP BY comment_id
      ) v
      WHERE c.comment_id = v.comment_id
      `,
      [commentId]
    );

    // 3. Return updated comment
    const result = await pool.query(
      `
      SELECT c.comment_id, c.content, c.user_id, c.upvotes, c.downvotes, u.username
      FROM Comment c
      JOIN Users u ON u.user_id = c.user_id
      WHERE c.comment_id = $1
      `,
      [commentId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error handling vote:", err);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/comments/:parentId/reply", isAuthenticated, async (req, res) => {
  const { userId } = req.session;
  const { parentId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Missing content" });
  }

  try {
    // Find the community this comment belongs to
    const section = await pool.query(
      `SELECT community_id FROM CommentSection WHERE comment_id = $1`,
      [parentId]
    );

    if (section.rows.length === 0) {
      return res.status(404).json({ message: "Parent comment not found" });
    }

    const communityId = section.rows[0].community_id;

    // Insert the reply
    const commentResult = await pool.query(
      `INSERT INTO Comment (user_id, content, parent_comment_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [userId, content, parentId]
    );

    const commentId = commentResult.rows[0].comment_id;

    await pool.query(
      `INSERT INTO CommentSection (community_id, comment_id)
       VALUES ($1, $2)`,
      [communityId, commentId]
    );

    const user = await pool.query("SELECT username FROM Users WHERE user_id = $1", [userId]);
    const fullComment = { ...commentResult.rows[0], username: user.rows[0].username };

    res.status(200).json({ comment: fullComment });
  } catch (error) {
    console.error("Error posting reply:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/create-community", isAuthenticated, async (req, res) => {
  const { community_name, community_description, genre_id } = req.body;
  const userId = req.session.userId;

  if (!community_name || !genre_id || !userId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO Community (community_name, community_description, genre_id)
       VALUES ($1, $2, $3)
       RETURNING community_id`,
      [community_name, community_description, genre_id]
    );

    const communityId = result.rows[0].community_id;

    await pool.query(
      `INSERT INTO CommunityMembership (community_id, user_id)
       VALUES ($1, $2)`,
      [communityId, userId]
    );

    res.status(201).json({ message: "Community created", community_id: communityId });
  } catch (error) {
    console.error("Error creating community:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.get("/get-genres", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Genre ORDER BY name ASC");
    res.json({ genres: result.rows });  // Return the result rows as genres
  } catch (err) {
    console.error("Failed to fetch genres:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get-friends", async (req, res) => {
  // Assuming the user is authenticated and their user_id is available
  const user_id = req.session.userId; // You may need to adjust this based on your authentication method (session, JWT, etc.)

  try {
    // Query to get the friends of the logged-in user
    const result = await pool.query(`
      SELECT u.user_id, u.username
      FROM Users u
      JOIN Friendship f ON (f.user1_id = u.user_id OR f.user2_id = u.user_id)
      WHERE (f.user1_id = $1 OR f.user2_id = $1)
        AND f.status = 'accepted'
        AND u.user_id != $1 
    `, [user_id]);

    // Send the list of friends as a response
    res.json({ friends: result.rows });
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.post("/add-friends-to-community", async (req, res) => {
  const { community_id, friends } = req.body;

  if (!community_id || !friends) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  if (friends.includes("na") || friends.length === 0) {
    // If N/A is selected or no friends selected, skip inserting
    return res.status(200).json({ message: "No friends added to community" });
  }

  try {
    const values = friends.map((friend_id) => `(${community_id}, ${friend_id})`).join(", ");
    const query = `
      INSERT INTO CommunityMembership (community_id, user_id)
      VALUES ${values}
    `;
    await pool.query(query);
    res.status(200).json({ message: "Friends added to community" });
  } catch (error) {
    console.error("Error adding friends to community:", error);
    res.status(500).json({ message: "Failed to add friends to community" });
  }
});


// app.get("/getwatchlist", async (req, res) => {
//   const userId = req.session.userId;
//   const result = await pool.query(
//     "SELECT w.item_id, b.title, w.status, b.content_type FROM Watchlist w JOIN ContentItem b ON w.item_id = b.item_id WHERE w.user_id = $1",
//     [userId]
//   );
//   res.json(result.rows);
// });

// app.post("/watchlist", async (req, res) => {
//   const { bookId, stat } = req.body;
//   const userId = req.session.userId; // Assuming user ID is stored in session

//   if (!userId) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     await pool.query(
//       "INSERT INTO Watchlist (user_id, item_id, status) VALUES ($1, $2, $3)",
//       [userId, bookId, stat ]
//     );
//     res.json({ message: "Book added to watchlist" });
//   } catch (error) {
//     console.error("Error adding to watchlist:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// Get user profile
app.get("/user/profile", isAuthenticated, async (req, res) => {
  const { userId } = req.session;

  try {
    const result = await pool.query(
      "SELECT username, email FROM Users WHERE user_id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // You can add logic to count friends if your schema supports it
    const friendCountResult = await pool.query(
      `SELECT COUNT(*) AS friendCount FROM Friendship
       WHERE (user1_id = $1 OR user2_id = $1) AND status = 'accepted'`,
      [userId]
    );

    const friendCount = parseInt(friendCountResult.rows[0].friendcount, 10);

    res.status(200).json({
      username: user.username,
      email: user.email,
      friendCount: friendCount
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error retrieving profile" });
  }
});

// Chatbot endpoint
app.post("/chatbot", isAuthenticated, async (req, res) => {
  const { message, watchlistData } = req.body;
  const userId = req.session.userId;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    // console.log("Received watchlist data:", watchlistData);
    
    // Format watchlist data for the prompt
    const watchlistContext = formatWatchlistForPrompt(watchlistData);
    // console.log("Formatted watchlist context:", watchlistContext);
    
    // Create the prompt with context
    const prompt = createPromptWithContext(message, watchlistContext);
    console.log("Generated prompt:", prompt);

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(config.geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Updated model name

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ response: text });
  } catch (error) {
    console.error("Error in chatbot endpoint:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Helper function to format watchlist data for the prompt
function formatWatchlistForPrompt(watchlistData) {
  if (!watchlistData || !Array.isArray(watchlistData)){
    console.log("No watchlist data provided");
    return "";
  } 

  const categorized = {
    book: { planned: [], watching: [], completed: [] },
    tvshow: { planned: [], watching: [], completed: [] },
    movie: { planned: [], watching: [], completed: [] }
  };

  watchlistData.forEach(item => {
    // Handle null or undefined content_type
    const category = (item.content_type).toLowerCase();
    // Handle null or undefined status
    const status = (item.status || 'planned').toLowerCase();
    
    // Map category names to match our structure
    const mappedCategory = category === 'tv show' ? 'tvshow' : category;
    
    if (categorized[mappedCategory]) {
      if (!categorized[mappedCategory][status]) {
        console.log(`Unknown status: ${status} for item: ${item.title}`);
        categorized[mappedCategory]['planned'].push(item.title); // Default to planned
      } else {
        categorized[mappedCategory][status].push(item.title);
      }
    } else {
      console.log(`Unknown category: ${category} for item: ${item.title}`);
      categorized.books[status].push(item.title); // Default to books
    }
  });

  let prompt = "Here is the user's watchlist:\n\n";
  
  Object.entries(categorized).forEach(([category, items]) => {
    // Only show categories that have items
    const hasItems = Object.values(items).some(arr => arr.length > 0);
    if (hasItems) {
      prompt += `${category.charAt(0).toUpperCase() + category.slice(1)}:\n`;
      Object.entries(items).forEach(([status, titles]) => {
        if (titles.length > 0) {
          prompt += `- ${status.charAt(0).toUpperCase() + status.slice(1)}: ${titles.join(", ")}\n`;
        }
      });
      prompt += "\n";
    }
  });
  
  console.log("Generated watchlist prompt:", prompt);
  return prompt;
}

// Helper function to create the prompt with context
function createPromptWithContext(message, watchlistContext) {
  return `You are a recommendation assistant for books, TV shows, and movies. 
Here is the user's watchlist and preferences:

${watchlistContext}

User's question: ${message}

Please provide a helpful response based on their watchlist and preferences.`;
}

/////////////////////// Task 1 ////////////////////////

// Get visibility settings for the logged-in user
app.get("/get-settings", isAuthenticated, async (req, res) => {
  const { userId } = req.session;

  try {
    const result = await pool.query(
      "SELECT is_profile_private, is_rating_private, is_profile_pic_private, is_watchlist_private FROM Users WHERE user_id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Settings not found" });
    }

    const settings = result.rows[0];
    res.status(200).json({
      profileVisibility: settings.is_profile_private ? "private" : "public",
      ratingsVisibility: settings.is_rating_private ? "private" : "public",
      profilePicVisibility: settings.is_profile_pic_private ? "private" : "public",
      watchlistVisibility: settings.is_watchlist_private ? "private" : "public",
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Profile visibility (public/private)
app.post("/settings/profile-visibility", isAuthenticated, async (req, res) => {
  const { value } = req.body;
  const { userId } = req.session;

  try {
    await pool.query(
      "UPDATE Users SET is_profile_private = $1 WHERE user_id = $2",
      [value === "private", userId]
    );
    res.status(200).json({ message: "Profile visibility updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update profile visibility" });
  }
});

// Ratings visibility
app.post("/settings/ratings-visibility", isAuthenticated, async (req, res) => {
  const { value } = req.body;
  const { userId } = req.session;

  try {
    await pool.query(
      "UPDATE Users SET is_rating_private = $1 WHERE user_id = $2",
      [value === "private", userId]
    );
    res.status(200).json({ message: "Ratings visibility updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update ratings visibility" });
  }
});

// Ratings visibility
app.post("/settings/profile-pic-visibility", isAuthenticated, async (req, res) => {
  const { value } = req.body;
  const { userId } = req.session;

  try {
    await pool.query(
      "UPDATE Users SET is_profile_pic_private = $1 WHERE user_id = $2",
      [value === "private", userId]
    );
    res.status(200).json({ message: "Ratings visibility updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update ratings visibility" });
  }
});


// Reviews visibility
app.post("/settings/reviews-visibility", isAuthenticated, async (req, res) => {
  const { value } = req.body;
  const { userId } = req.session;

  try {
    await pool.query(
      "UPDATE Users SET is_review_private = $1 WHERE user_id = $2",
      [value === "private", userId]
    );
    res.status(200).json({ message: "Reviews visibility updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update reviews visibility" });
  }
});

// Watchlist visibility
app.post("/settings/watchlist-visibility", isAuthenticated, async (req, res) => {
  const { value } = req.body;
  const { userId } = req.session;

  try {
    await pool.query(
      "UPDATE Users SET is_watchlist_private = $1 WHERE user_id = $2",
      [value === "private", userId]
    );
    res.status(200).json({ message: "Watchlist visibility updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update watchlist visibility" });
  }
});


///////////////////////////////////////////////////////

const typeMap = {
  book: 'Book',
  movie: 'Movie',
  tv: 'TV Show'
};


app.get("/content/:type", async (req, res) => {
  const { type } = req.params;
  const allowed = ['Book', 'Movie', 'TV Show'];
  const canonicalType = typeMap[type?.toLowerCase()];
  if (!canonicalType) return res.status(400).json({ error: "Invalid content type" });  
  if (!allowed.includes(canonicalType)){ 
    return res.status(400).json({ error: "Invalid content type" });
  }
  try {
    const result = await pool.query(`
      SELECT ci.item_id, ci.title, ci.description, ci.content_type, ci.release_date, ci.image_url, g.name AS genre, 
             COALESCE(AVG(r.rating_value), 0) AS rating,
             COALESCE(AVG(rev.sentiment_score), 0) AS average_sentiment
      FROM ContentItem ci
      LEFT JOIN Genre g ON ci.genre_id = g.genre_id
      LEFT JOIN Rating r ON ci.item_id = r.item_id
      LEFT JOIN Review rev ON ci.item_id = rev.item_id
      WHERE ci.content_type = $1
      GROUP BY ci.item_id, g.name
    `, [canonicalType]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/content/:type/:id/rating", async (req, res) => {
  const { type, id } = req.params;
  const { rating } = req.body;
  const userId = req.user; // Assumes authentication middleware sets req.user

  const allowed = ['Book', 'Movie', 'TV Show'];
  const canonicalType = typeMap[type?.toLowerCase()];
  if (!canonicalType) return res.status(400).json({ error: "Invalid content type" });  
  if (!allowed.includes(canonicalType)){ 
    return res.status(400).json({ error: "Invalid content type" });
  }

  try {
    // Optional: Verify content_type matches the item
    const itemCheck = await pool.query(
      "SELECT content_type FROM ContentItem WHERE item_id = $1",
      [id]
    );
    if (itemCheck.rows.length === 0 || itemCheck.rows[0].content_type !== canonicalType) {
      return res.status(404).json({ error: "Content item not found or type mismatch" });
    }

    // Check for existing rating
    const existing = await pool.query(
      "SELECT * FROM Rating WHERE user_id = $1 AND item_id = $2",
      [userId, id]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        "UPDATE Rating SET rating_value = $1 WHERE user_id = $2 AND item_id = $3",
        [rating, userId, id]
      );
    } else {
      await pool.query(
        "INSERT INTO Rating (user_id, item_id, rating_value) VALUES ($1, $2, $3)",
        [userId, id, rating]
      );
    }

    res.status(200).json({ message: "Rating saved successfully" });
  } catch (error) {
    console.error("Error saving rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/content/:type/:id/review", async (req, res) => {
  const { type, id } = req.params;
  const { text } = req.body;
  const userId = req.session.userId; // Assumes session-based auth

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const allowed = ['Book', 'Movie', 'TV Show'];
  const canonicalType = typeMap[type?.toLowerCase()];
  if (!canonicalType) return res.status(400).json({ error: "Invalid content type" });  
  if (!allowed.includes(canonicalType)){ 
    return res.status(400).json({ error: "Invalid content type" });
  }

  try {
    // Verify item exists and matches the type
    const itemCheck = await pool.query(
      "SELECT content_type FROM ContentItem WHERE item_id = $1",
      [id]
    );
    if (itemCheck.rows.length === 0 || itemCheck.rows[0].content_type !== canonicalType) {
      return res.status(404).json({ error: "Content item not found or type mismatch" });
    }

    const sentimentScore = calculateSentimentScore(text); // assume this is defined elsewhere

    await pool.query(
      "INSERT INTO Review (user_id, item_id, text, sentiment_score) VALUES ($1, $2, $3, $4)",
      [userId, id, text, sentimentScore]
    );

    res.json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/content/:type/:id", async (req, res) => {
  const { type, id } = req.params;
  const allowed = ['Book', 'Movie', 'TV Show'];

  const canonicalType = typeMap[type?.toLowerCase()];
  if (!canonicalType) return res.status(400).json({ error: "Invalid content type" });  
  if (!allowed.includes(canonicalType)){ 
    return res.status(400).json({ error: "Invalid content type" });
  }

  try {
    // Fetch content item details along with aggregated ratings/sentiment
    const contentResult = await pool.query(`
      SELECT ci.item_id, ci.title, ci.description, ci.content_type, ci.release_date, ci.image_url,
             g.name AS genre,
             COALESCE(AVG(r.rating_value), 0) AS rating,
             COALESCE(AVG(rev.sentiment_score), 0) AS average_sentiment
      FROM ContentItem ci
      LEFT JOIN Genre g ON ci.genre_id = g.genre_id
      LEFT JOIN Rating r ON ci.item_id = r.item_id
      LEFT JOIN Review rev ON ci.item_id = rev.item_id
      WHERE ci.item_id = $1
      GROUP BY ci.item_id, g.name
    `, [id]);

    if (contentResult.rows.length === 0 || contentResult.rows[0].content_type !== canonicalType) {
      return res.status(404).json({ error: `${type} not found` });
    }

    // Fetch reviews
    const reviewsResult = await pool.query(`
      SELECT r.review_id, r.text, r.sentiment_score, u.username 
      FROM Review r 
      JOIN Users u ON r.user_id = u.user_id 
      WHERE r.item_id = $1
      ORDER BY r.sentiment_score DESC
    `, [id]);

    const item = contentResult.rows[0];
    if (item.description) {
      item.description_sentiment = calculateSentimentScore(item.description);
    }
    item.reviews = reviewsResult.rows;

    res.json(item);
  } catch (error) {
    console.error("Error fetching content item details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/content/:type/:id/reviews", async (req, res) => {
  const { type, id } = req.params;
  const { sentiment } = req.query;
  const allowed = ['Book', 'Movie', 'TV Show'];

  const canonicalType = typeMap[type?.toLowerCase()];
  if (!canonicalType) return res.status(400).json({ error: "Invalid content type" });  
  if (!allowed.includes(canonicalType)){ 
    return res.status(400).json({ error: "Invalid content type" });
  }

  try {
    // Ensure the item exists and type matches
    const itemCheck = await pool.query(
      "SELECT content_type FROM ContentItem WHERE item_id = $1",
      [id]
    );
    if (itemCheck.rows.length === 0 || itemCheck.rows[0].content_type !== canonicalType) {
      return res.status(404).json({ error: `${type} not found` });
    }

    // Build sentiment filter clause
    let sentimentClause = '';
    if (sentiment === 'positive') {
      sentimentClause = 'AND r.sentiment_score >= 0.6';
    } else if (sentiment === 'negative') {
      sentimentClause = 'AND r.sentiment_score < 0.4';
    } else if (sentiment === 'neutral') {
      sentimentClause = 'AND r.sentiment_score >= 0.4 AND r.sentiment_score < 0.6';
    }

    const reviewsResult = await pool.query(`
      SELECT r.review_id, r.text, r.sentiment_score, u.username 
      FROM Review r 
      JOIN Users u ON r.user_id = u.user_id 
      WHERE r.item_id = $1 ${sentimentClause}
      ORDER BY r.sentiment_score DESC
    `, [id]);

    res.json(reviewsResult.rows);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/content/:type/:id/friendRatings", async (req, res) => {
  const { type, id } = req.params;
  const userId = req.session.userId;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const allowed = ['Book', 'Movie', 'TV Show'];
  const canonicalType = typeMap[type?.toLowerCase()];
  if (!canonicalType) return res.status(400).json({ error: "Invalid content type" });  
  if (!allowed.includes(canonicalType)){ 
    return res.status(400).json({ error: "Invalid content type" });
  }

  try {
    // Validate item and its content type
    const itemCheck = await pool.query(
      "SELECT content_type FROM ContentItem WHERE item_id = $1",
      [id]
    );
    if (itemCheck.rows.length === 0 || itemCheck.rows[0].content_type !== canonicalType) {
      return res.status(404).json({ error: `${type} not found` });
    }

    const result = await pool.query(`
      SELECT r.rating_value,
             u.username AS friend_name
      FROM Rating r
      JOIN Friendship f ON f.user2_id = r.user_id AND f.user1_id = $1 AND f.status = 'accepted'
      JOIN "User" u ON u.user_id = r.user_id
      WHERE r.item_id = $2 
        AND r.is_private = false
        AND u.is_rating_private = false;
    `, [userId, id]);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching friend ratings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
