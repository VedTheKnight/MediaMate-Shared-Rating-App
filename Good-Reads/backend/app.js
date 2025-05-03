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

const mapPrivacyLevel = (level) => {
  if (level === 2) return "private";
  if (level === 1) return "friends";
  return "public";
};

// Initialize sentiment analyzer
const sentiment = new Sentiment();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//recommendations
const natural = require('natural');
const _ = require('lodash');

// PostgreSQL connection
// NOTE: use YOUR postgres username and password here
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'rating_app',
  password: 'Harijanvi1!',
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
// -------------------------------


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

    res.status(200).json({ username: result.rows[0].username , is_watchlist_private: result.rows[0].is_watchlist_private });
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
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        username,
        email,
        hashedPassword,
        null, // Default to null if not provided
        false,  // Default value for is_profile_private
        0, // Default value for is_rating_private
        0  // Default value for is_review_private
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
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server running at http://0.0.0.0:${port}`);
// });


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
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        w.item_id,
        w.timestamp AS added_date,
        ci.title,
        ci.image_url,
        ci.content_type,
        w.status,
        ur.rating_value AS self_rating,
        COALESCE(avg_r.avg_rating, 0) AS avg_rating,
        r.text AS review_text
      FROM Watchlist w
      JOIN ContentItem ci ON w.item_id = ci.item_id
      LEFT JOIN Rating ur ON ur.user_id = w.user_id AND ur.item_id = w.item_id
      LEFT JOIN Review r ON r.user_id = w.user_id AND r.item_id = w.item_id
      LEFT JOIN (
        SELECT item_id, AVG(rating_value) AS avg_rating
        FROM Rating
        GROUP BY item_id
      ) avg_r ON avg_r.item_id = w.item_id
      WHERE w.user_id = $1
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});


app.get("/getwatchlist", async (req, res) => {
  const userId = req.session.userId;

  try {
    const result = await pool.query(
      `
      SELECT 
        w.item_id,
        w.timestamp AS added_date, -- include the watchlist timestamp
        ci.title,
        ci.image_url,
        ci.content_type,
        w.status,
        ur.rating_value AS self_rating,
        COALESCE(avg_r.avg_rating, 0) AS avg_rating,
        r.text AS review_text
      FROM Watchlist w
      JOIN ContentItem ci ON w.item_id = ci.item_id
      LEFT JOIN Rating ur ON ur.user_id = w.user_id AND ur.item_id = w.item_id
      LEFT JOIN Review r ON r.user_id = w.user_id AND r.item_id = w.item_id
      LEFT JOIN (
        SELECT item_id, AVG(rating_value) AS avg_rating
        FROM Rating
        GROUP BY item_id
      ) avg_r ON avg_r.item_id = w.item_id
      WHERE w.user_id = $1 
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});


app.post("/postReview", async (req, res) => {
  const userId = req.session.userId;
  const { item_id, text } = req.body;
  // console.log("item_id", item_id,"text",text);
  if (!userId || !item_id || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if a review by this user already exists
    const existing = await pool.query(
      "SELECT * FROM Review WHERE user_id = $1 AND item_id = $2",
      [userId, item_id]
    );

    if (existing.rows.length > 0) {
      // Update existing review
      await pool.query(
        "UPDATE Review SET text = $1, timestamp = now() WHERE user_id = $2 AND item_id = $3",
        [text, userId, item_id]
      );
    } else {
      // Insert new review
      await pool.query(
        "INSERT INTO Review (user_id, item_id, text, sentiment_score) VALUES ($1, $2, $3, NULL)",
        [userId, item_id, text]
      );
    }

    res.json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ error: "Failed to submit review" });
  }
});

app.delete("/deletewatchlist/:itemId", async (req, res) => {
  const userId = req.session.userId;
  const itemId = parseInt(req.params.itemId, 10);

  if (!userId || isNaN(itemId)) {
    return res.status(400).json({ error: "Invalid item ID or user not logged in" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM Watchlist WHERE user_id = $1 AND item_id = $2",
      [userId, itemId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Watchlist item not found" });
    }

    res.json({ message: "Item removed from watchlist" });
  } catch (error) {
    console.error("Error deleting watchlist item:", error);
    res.status(500).json({ error: "Failed to delete watchlist item" });
  }
});



app.post("/watchlist", async (req, res) => {
  const { bookId, status } = req.body;
  const userId = req.session.userId;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const result = await pool.query(
      "SELECT * FROM Watchlist WHERE user_id = $1 AND item_id = $2",
      [userId, bookId]
    );

    if (result.rows.length > 0) {
      // Update if exists
      await pool.query(
        "UPDATE Watchlist SET status = $1 WHERE user_id = $2 AND item_id = $3",
        [status, userId, bookId]
      );
    } else {
      // Insert if not
      await pool.query(
        "INSERT INTO Watchlist (user_id, item_id, status) VALUES ($1, $2, $3)",
        [userId, bookId, status]
      );
    }

    res.json({ message: "Watchlist updated" });
  } catch (error) {
    console.error("Error updating watchlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.put("/watchlist/:id", async (req, res) => {
  const itemId = req.params.id;
  const { status } = req.body;
  const userId = req.session.userId;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const result = await pool.query(
      "UPDATE Watchlist SET status = $1 WHERE user_id = $2 AND item_id = $3",
      [status, userId, itemId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Item not found in watchlist" });
    }

    res.json({ message: "Watchlist item updated" });
  } catch (error) {
    console.error("Error updating watchlist:", error);
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
    // console.log("Generated prompt:", prompt);

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
    // console.log("No watchlist data provided");
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
        // console.log(`Unknown status: ${status} for item: ${item.title}`);
        categorized[mappedCategory]['planned'].push(item.title); // Default to planned
      } else {
        categorized[mappedCategory][status].push(item.title);
      }
    } else {
      // console.log(`Unknown category: ${category} for item: ${item.title}`);
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
  
  // console.log("Generated watchlist prompt:", prompt);
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
  const userId = req.session.userId; // Assuming user ID is stored in session
  const canonicalType = typeMap[type?.toLowerCase()];
  if (!canonicalType) return res.status(400).json({ error: "Invalid content type" });  
  if (!allowed.includes(canonicalType)){ 
    return res.status(400).json({ error: "Invalid content type" });
  }
  try {
    const result = await pool.query(`
      SELECT
        ci.item_id,
        ci.title,
        ci.description,
        ci.content_type,
        ci.release_date,
        ci.image_url,
        g.name AS genre,
        COALESCE(AVG(r.rating_value), 0) AS rating,
        COALESCE(AVG(rev.sentiment_score), 0) AS average_sentiment,
        ur.rating_value AS user_rating
      FROM ContentItem ci
      LEFT JOIN Genre g ON ci.genre_id = g.genre_id
      LEFT JOIN Rating r ON ci.item_id = r.item_id
      LEFT JOIN Review rev ON ci.item_id = rev.item_id
      LEFT JOIN (
          SELECT item_id, rating_value
          FROM Rating
          WHERE user_id = $2
      ) ur ON ci.item_id = ur.item_id
      WHERE ci.content_type = $1
      GROUP BY ci.item_id, g.name, ur.rating_value;

    `, [canonicalType,userId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/content/:type/friends", isAuthenticated, async (req, res) => {
  const { type } = req.params;
  const { userId } = req.session;

  const canonicalType = typeMap[type?.toLowerCase()];
  const allowed = ['Book', 'Movie', 'TV Show'];

  if (!canonicalType || !allowed.includes(canonicalType)) {
    return res.status(400).json({ error: "Invalid content type" });
  }

  try {
    const result = await pool.query(`
      SELECT DISTINCT ci.item_id, ci.title, ci.description, ci.content_type, ci.release_date, ci.image_url,
                      g.name AS genre,
                      COALESCE(AVG(r.rating_value), 0) AS rating,
                      COALESCE(AVG(rev.sentiment_score), 0) AS average_sentiment
      FROM ContentItem ci
      LEFT JOIN Genre g ON ci.genre_id = g.genre_id
      LEFT JOIN Rating r ON ci.item_id = r.item_id
      LEFT JOIN Review rev ON ci.item_id = rev.item_id
      WHERE ci.content_type = $1
        AND ci.item_id IN (
          SELECT DISTINCT item_id FROM (
            SELECT r.item_id
            FROM Rating r
            JOIN Friendship f ON f.user2_id = r.user_id AND f.user1_id = $2 AND f.status = 'accepted'
            JOIN Users u ON u.user_id = r.user_id
            WHERE r.is_private = false AND u.is_rating_private != true

            UNION

            SELECT rv.item_id
            FROM Review rv
            JOIN Friendship f ON f.user2_id = rv.user_id AND f.user1_id = $2 AND f.status = 'accepted'
            JOIN Users u ON u.user_id = rv.user_id
            WHERE u.is_review_private != true
          ) AS friend_items
        )
      GROUP BY ci.item_id, g.name
    `, [canonicalType, userId]);

    // ✅ match shape with other endpoint
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching friends' content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/content/:type/:id/rating", async (req, res) => {
  const { type, id } = req.params;
  const { rating } = req.body;
  const userId = req.session.userId; // Assumes authentication middleware sets req.user

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
    // console.log("Existing rating:", existing.rows,userId,id); // Debugging line
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
  const userId = req.session.userId;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const allowed = ['Book', 'Movie', 'TV Show'];
  const canonicalType = typeMap[type?.toLowerCase()];
  if (!canonicalType || !allowed.includes(canonicalType)) {
    return res.status(400).json({ error: "Invalid content type" });
  }

  try {
    // Check if content exists and matches the requested type
    const itemCheck = await pool.query(
      "SELECT content_type FROM ContentItem WHERE item_id = $1",
      [id]
    );
    if (itemCheck.rows.length === 0 || itemCheck.rows[0].content_type !== canonicalType) {
      return res.status(404).json({ error: "Content item not found or type mismatch" });
    }

    const sentimentScore = calculateSentimentScore(text); // assume this is defined

    // Check if the user already submitted a review
    const existing = await pool.query(
      "SELECT review_id FROM Review WHERE user_id = $1 AND item_id = $2",
      [userId, id]
    );

    if (existing.rows.length > 0) {
      // Update the existing review
      await pool.query(
        "UPDATE Review SET text = $1, sentiment_score = $2, timestamp = now() WHERE user_id = $3 AND item_id = $4",
        [text, sentimentScore, userId, id]
      );
    } else {
      // Insert new review
      await pool.query(
        "INSERT INTO Review (user_id, item_id, text, sentiment_score) VALUES ($1, $2, $3, $4)",
        [userId, id, text, sentimentScore]
      );
    }

    res.json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/content/:type/:id", async (req, res) => {

  const { type, id } = req.params;
  const allowed = ['Book', 'Movie', 'TV Show'];
  // console.log("REQ:", type, id); // 👈 Log type and id

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
        AND r.is_private = 0
        AND u.is_rating_private = 0;
    `, [userId, id]);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching friend ratings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------RECOMMENDATIONS------------------------

// app.get("/content/:type", async (req, res) => {

//   const { type } = req.params;
//   const canonicalType = typeMap[type?.toLowerCase()];
//   if (!canonicalType) {
//     return res.status(400).json({ error: "Invalid content type" });
//   }

//   // If user is logged in, return content‑based recommendations
//   if (req.session.userId) {
//     const userId = user.session.userId;
//     const client = await pool.connect();

//     const { rows: userRatings } = await client.query(`
//       SELECT r.item_id, r.rating_value
//       FROM Rating r
//       JOIN ContentItem ci ON ci.item_id = r.item_id
//       WHERE r.user_id = $1
//         AND ci.content_type = $2
//     `, [userId, canonicalType]);
    
//     console.log(`Fetched ${userRatings.length} ratings for user ${userId} and type ${canonicalType}`);
//     console.log("Generating recommendations for user:", req.session.userId);

//     try {
//       // 1) Load all items of this type (including genre_id)
//       const { rows: items } = await client.query(`
//         SELECT
//           ci.item_id,
//           ci.title,
//           ci.description,
//           ci.genre_id,
//           ci.image_url,
//           g.name AS genre_name
//         FROM ContentItem ci
//         JOIN Genre g ON g.genre_id = ci.genre_id
//         WHERE ci.content_type = $1
//       `, [canonicalType]);

//       // 2) Build TF‑IDF model over descriptions
//       const tfidf = new natural.TfIdf();
//       items.forEach(it =>
//         tfidf.addDocument(it.description || '', String(it.item_id))
//       );

//       // 2a) Extract full vocabulary of terms
//       const vocab = [];
//       tfidf.documents.forEach(doc =>
//         Object.keys(doc).forEach(term => {
//           if (!vocab.includes(term)) vocab.push(term);
//         })
//       );

//       // 3) Prepare one‑hot index for genres
//       const genreIds   = _.uniq(items.map(it => it.genre_id));
//       const genreIndex = Object.fromEntries(
//         genreIds.map((g, i) => [g, i])
//       );

//       // 4) Assemble each item’s combined feature vector
//       const itemVectors = items.map((it, idx) => {
//         // TF‑IDF portion: one weight per vocab term
//         const descVec = vocab.map(term => tfidf.tfidf(term, idx));

//         // One‑hot genre portion
//         const genreVec = Array(genreIds.length).fill(0);
//         genreVec[genreIndex[it.genre_id]] = 1;

//         return {
//           item_id:    it.item_id,
//           title:      it.title,
//           description:it.description,
//           genre:      it.genre_name,
//           image_url:  it.image_url,
//           vector:     descVec.concat(genreVec),
//         };
//       });

//       // 5) Fetch this user's ratings for this type
//       const { rows: userRatings } = await client.query(`
//         SELECT r.item_id, r.rating_value
//         FROM Rating r
//         JOIN ContentItem ci ON ci.item_id = r.item_id
//         WHERE r.user_id = $1
//           AND ci.content_type = $2
//       `, [userId, canonicalType]);

//       // 5a) If no ratings, fall back to full list
//       if (!userRatings.length) {
//         console.log("No ratings found for user, falling back to all items.");
//         const fallback = await client.query(`
//           SELECT
//             ci.item_id,
//             ci.title,
//             ci.description,
//             ci.content_type,
//             ci.release_date,
//             ci.image_url,
//             g.name AS genre,
//             COALESCE(AVG(r.rating_value), 0)      AS rating,
//             COALESCE(AVG(rev.sentiment_score), 0) AS average_sentiment
//           FROM ContentItem ci
//           LEFT JOIN Genre g    ON ci.genre_id = g.genre_id
//           LEFT JOIN Rating r   ON r.item_id = ci.item_id
//           LEFT JOIN Review rev ON rev.item_id = ci.item_id
//           WHERE ci.content_type = $1
//           GROUP BY ci.item_id, g.name
//         `, [canonicalType]);
//         return res.json(fallback.rows);
//       }
//       console.log("User ratings:", userRatings);
//       // 6) Build the user profile vector (weighted by high ratings ≥8)
//       const liked = userRatings.filter(r => r.rating_value >= 8);
//       const weighted = liked.map(r => {
//         const iv = itemVectors.find(iv => iv.item_id === r.item_id);
//         return iv.vector.map(x => x * r.rating_value);
//       });
//       const userProfile = weighted[0].map((_, idx) =>
//         _.meanBy(weighted, vec => vec[idx])
//       );

//       // 7) Compute cosine similarity for each unseen item & take top 10
//       const seen = new Set(userRatings.map(r => r.item_id));
//       const recommendations = itemVectors
//         .filter(iv => !seen.has(iv.item_id))
//         .map(iv => {
//           const dot  = iv.vector.reduce((sum, v, i) => sum + v * userProfile[i], 0);
//           const magA = Math.sqrt(iv.vector.reduce((s, v) => s + v * v, 0));
//           const magB = Math.sqrt(userProfile.reduce((s, v) => s + v * v, 0));
//           const score = (magA && magB) ? dot / (magA * magB) : 0;
//           return { ...iv, score };
//         })
//         .sort((a, b) => b.score - a.score)
//         .slice(0, 10);
//       console.log("Recommendations:", recommendations);
//       return res.json(recommendations);

//     } catch (err) {
//       console.error("Rec error:", err);
//       return res.status(500).json({ error: "Failed to generate recommendations" });
//     } finally {
//       client.release();
//     }
//   }

//   // Not logged in → original "all items" query
//   try {
//     const result = await pool.query(`
//       SELECT
//         ci.item_id,
//         ci.title,
//         ci.description,
//         ci.content_type,
//         ci.release_date,
//         ci.image_url,
//         g.name AS genre,
//         COALESCE(AVG(r.rating_value), 0)      AS rating,
//         COALESCE(AVG(rev.sentiment_score), 0) AS average_sentiment
//       FROM ContentItem ci
//       LEFT JOIN Genre g    ON ci.genre_id = g.genre_id
//       LEFT JOIN Rating r   ON ci.item_id = r.item_id
//       LEFT JOIN Review rev ON ci.item_id = rev.item_id
//       WHERE ci.content_type = $1
//       GROUP BY ci.item_id, g.name
//     `, [canonicalType]);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching content:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/recommendation/:type", async (req, res) => {
  const { type } = req.params;
  const canonicalType = typeMap[type?.toLowerCase()];
  if (!canonicalType) {
    return res.status(400).json({ error: "Invalid content type" });
  }

  const userId = req.session.userId; // undefined if not logged in

  // — Recommendation branch for logged‑in users —
  if (userId) {
    const client = await pool.connect();
    try {
      // 1) Pull the user's ratings for this content_type
      const { rows: userRatings } = await client.query(`
        SELECT r.item_id, r.rating_value
        FROM Rating r
        JOIN ContentItem ci ON ci.item_id = r.item_id
        WHERE r.user_id = $1
          AND ci.content_type = $2
      `, [userId, canonicalType]);
      // console.log(`Fetched ${userRatings.length} ratings for user ${userId} and type ${canonicalType}`);

      // 2) Pull all items of this type
      const { rows: items } = await client.query(`
        SELECT
          ci.item_id,
          ci.title,
          ci.description,
          ci.content_type,
          ci.release_date,
          ci.image_url,
          g.name                AS genre_name,
          COALESCE(AVG(r.rating_value), 0)      AS rating,
          COALESCE(AVG(rev.sentiment_score), 0) AS average_sentiment
        FROM ContentItem ci
        JOIN Genre g ON g.genre_id = ci.genre_id
        LEFT JOIN Rating r   ON r.item_id    = ci.item_id
        LEFT JOIN Review rev ON rev.item_id  = ci.item_id
        WHERE ci.content_type = $1
        GROUP BY
          ci.item_id, ci.title, ci.description,
          ci.content_type, ci.release_date,
          ci.image_url, g.name
      `, [canonicalType]);
      // console.log(`Fetched ${items.length} items of type ${canonicalType}`);

      // 3) Build TF‑IDF model over descriptions
      const tfidf = new natural.TfIdf();
      items.forEach(it =>
        tfidf.addDocument(it.description || '', String(it.item_id))
      );

      // 4) Build a global vocabulary from tfidf.listTerms()
      const termSet = new Set();
      items.forEach((_, idx) => {
        tfidf.listTerms(idx).forEach(({ term }) => {
          termSet.add(term);
        });
      });
      const vocab = Array.from(termSet);

      // 5) One‑hot encode genres
      const genreIds   = _.uniq(items.map(it => it.genre_id));
      const genreIndex = Object.fromEntries(genreIds.map((g, i) => [g, i]));

      const normalize = vec => {
        const magnitude = Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
        return magnitude ? vec.map(val => val / magnitude) : vec;
      };

      // 6) Vectorize each item: [TF‑IDF … , one‑hot genre …]
      const itemVectors = items.map((it, idx) => {
        // TF‑IDF vector
        const descVec = normalize(vocab.map(term => tfidf.tfidf(term, idx)));

        // Genre one‑hot
        genreVec = Array(genreIds.length).fill(0);
        genreVec[genreIndex[it.genre_id]] = 1;

        // Scale the genre vector by the weight
        const genreWeight = 2.0; // Adjust this weight as needed
        genreVec = genreVec.map(value => value * genreWeight);

        return {
          item_id:    it.item_id,
          title:      it.title,
          description:it.description,
          genre:      it.genre_name,
          image_url:  it.image_url,
          vector:     [...descVec, ...genreVec],
        };
      });
      // console.log(`Vectorized ${itemVectors.length} items`);

      // 7) If no ratings, fall back to original full listing
      if (!userRatings.length) {
        console.log("No ratings found for user, falling back to all items.");
        const fallback = await client.query(`
          SELECT
          ci.item_id,
          ci.title,
          ci.description,
          ci.content_type,
          ci.release_date,
          ci.image_url,
          g.name                AS genre_name,
          COALESCE(AVG(r.rating_value), 0)      AS rating,
          COALESCE(AVG(rev.sentiment_score), 0) AS average_sentiment
        FROM ContentItem ci
        JOIN Genre g ON g.genre_id = ci.genre_id
        LEFT JOIN Rating r   ON r.item_id    = ci.item_id
        LEFT JOIN Review rev ON rev.item_id  = ci.item_id
        WHERE ci.content_type = $1
        GROUP BY
          ci.item_id, ci.title, ci.description,
          ci.content_type, ci.release_date,
          ci.image_url, g.name
        `, [canonicalType]);
        // console.log(fallback.rows);
        return res.json(fallback.rows);
      }

      // 1) Choose which ratings to use (either high ratings ≥3, or fallback to all)
      const liked  = userRatings.filter(r => r.rating_value >= 3);
      const toUse  = liked.length > 0 ? liked : userRatings;

      // 2) Build weighted vectors
      const weighted = toUse.map(r => {
        const iv = itemVectors.find(iv => iv.item_id === r.item_id);
        return iv.vector.map(value => value * r.rating_value);
      });

      // 3) Compute userProfile by averaging each dimension
      //    Notice we rename the callback args so `_` remains Lodash
      const userProfile = weighted[0].map((__element, idx) =>
        // here `_` is Lodash, not the element
        _.meanBy(weighted, vec => vec[idx])
      );
      // console.log("User profile vector:", userProfile);

      // 9) Score unseen items by cosine similarity & return top 10
      const seen = new Set(userRatings.map(r => r.item_id));
      const recommendations = itemVectors
        .filter(iv => !seen.has(iv.item_id))
        .map(iv => {
          const dot  = iv.vector.reduce((sum, v, i) => sum + v * userProfile[i], 0);
          const magA = Math.sqrt(iv.vector.reduce((s, v) => s + v*v, 0));
          const magB = Math.sqrt(userProfile.reduce((s, v) => s + v*v, 0));
          const score = magA && magB ? dot/(magA*magB) : 0;
          const item = items.find(item => item.item_id === iv.item_id);
          // console.log(item.item_id, item.title, iv.vector, score);
          return {
            item_id: item.item_id,
            title: item.title,
            description: item.description,
            content_type: item.content_type,
            release_date: item.release_date,
            image_url: item.image_url,
            genre_name: item.genre_name,
            rating: item.rating, // Average rating
            average_sentiment: item.average_sentiment, // Average sentiment
            score, // Recommendation score
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
      // console.log("Recommendations:", recommendations);
        console.log("Recommendations:", recommendations.map(r => r.title));
      return res.json(recommendations);
    } catch (err) {
      console.error("Rec error:", err);
      return res.status(500).json({ error: "Failed to generate recommendations" });
    } finally {
      client.release();
    }
  }

  // — Fallback for anonymous users: original catalog listing —
  try {
    const result = await pool.query(`
      SELECT
          ci.item_id,
          ci.title,
          ci.description,
          ci.content_type,
          ci.release_date,
          ci.image_url,
          g.name                AS genre_name,
          COALESCE(AVG(r.rating_value), 0)      AS rating,
          COALESCE(AVG(rev.sentiment_score), 0) AS average_sentiment
        FROM ContentItem ci
        JOIN Genre g ON g.genre_id = ci.genre_id
        LEFT JOIN Rating r   ON r.item_id    = ci.item_id
        LEFT JOIN Review rev ON rev.item_id  = ci.item_id
        WHERE ci.content_type = $1
        GROUP BY
          ci.item_id, ci.title, ci.description,
          ci.content_type, ci.release_date,
          ci.image_url, g.name
    `, [canonicalType]);
    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching content:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/users/similar", isAuthenticated, async (req, res) => {
  const { userId } = req.session;
  console.log("Finding similar users for:", userId);
  let client;

  try {
    client = await pool.connect();

    // 1) Load all items
    const { rows: items } = await client.query(`
      SELECT item_id, description, genre_id
      FROM ContentItem
    `);

    // 2) Global TF‑IDF
    const tfidf = new natural.TfIdf();
    items.forEach(it => tfidf.addDocument(it.description || '', String(it.item_id)));

    // 3) Vocabulary
    const termSet = new Set();
    items.forEach((_, idx) =>
      tfidf.listTerms(idx).forEach(({ term }) => termSet.add(term))
    );
    const vocab = Array.from(termSet);

    // 4) Genre one‑hot index
    const allGenreIds = _.uniq(items.map(it => it.genre_id));
    const genreIndex  = Object.fromEntries(allGenreIds.map((g, i) => [g, i]));

    // 5) Build itemVectorsMap with NaN→0 guard
    const itemVectorsMap = {};
    items.forEach((it, idx) => {
      const descVec = vocab.map(term => {
        const w = tfidf.tfidf(term, idx);
        return Number.isFinite(w) ? w : 0;
      });
      const genreVec = Array(allGenreIds.length).fill(0);
      genreVec[genreIndex[it.genre_id]] = 1;
      itemVectorsMap[it.item_id] = [...descVec, ...genreVec];
    });
    console.log(`Built vectors for ${items.length} items.`);

    // 6) Fetch all ratings
    const { rows: allRatings } = await client.query(`
      SELECT user_id, item_id, rating_value
      FROM Rating
    `);

    // 7) Group by user
    const ratingsByUser = _.groupBy(allRatings, 'user_id');

    // 8) Build userProfiles with NaN→0 guard on averaging
    const userProfiles = Object.entries(ratingsByUser)
      .map(([uid, ratings]) => {
        const weighted = ratings
          .map(r => {
            const vec = itemVectorsMap[r.item_id];
            if (!vec) return null;
            return vec.map(v => v * r.rating_value);
          })
          .filter(Boolean);
        if (!weighted.length) return null;

        const profile = weighted[0].map((_, i) => {
          const sum = weighted.reduce((acc, vec) => acc + (Number.isFinite(vec[i]) ? vec[i] : 0), 0);
          const avg = sum / weighted.length;
          return Number.isFinite(avg) ? avg : 0;
        });

        return { userId: Number(uid), vector: profile };
      })
      .filter(Boolean);

    // 9) Find our profile
    const me = userProfiles.find(u => u.userId === userId);
    if (!me) {
      console.log(`No profile for user ${userId}, returning [].`);
      return res.json([]);
    }

    // 10) Compute cosine similarities, force NaN→0
    const similar = userProfiles
      .filter(u => u.userId !== userId)
      .map(u => {
        const dot  = u.vector.reduce((s, v, i) => s + (Number.isFinite(v) ? v : 0) * (Number.isFinite(me.vector[i]) ? me.vector[i] : 0), 0);
        const magA = Math.sqrt(u.vector.reduce((s, v) => s + (Number.isFinite(v) ? v*v : 0), 0));
        const magB = Math.sqrt(me.vector.reduce((s, v) => s + (Number.isFinite(v) ? v*v : 0), 0));
        let similarity = (magA && magB) ? dot/(magA*magB) : 0;
        if (!Number.isFinite(similarity)) similarity = 0;
        return { userId: u.userId, similarity };
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10);
    console.log("Top similar users:", similar);

    // 11) Fetch usernames
    const ids = similar.map(u => u.userId).filter(id => Number.isInteger(id));
    if (!ids.length) return res.json([]);
    const { rows: users } = await client.query(
      `
      SELECT user_id, username 
      FROM Users 
      WHERE user_id = ANY($1)
        AND NOT EXISTS (
          SELECT 1 
          FROM Friendship f
          WHERE (
            (f.user1_id = $2 AND f.user2_id = Users.user_id) OR 
            (f.user2_id = $2 AND f.user1_id = Users.user_id)
          )
          AND f.status = 'accepted'
        )
      `,
      [ids, userId]
    );
    
    // 12) Return array
    const validUserIds = new Set(users.map(u => u.user_id));
    const results = similar
      .filter(u => validUserIds.has(u.userId))
      .map(u => ({
        user_id:   u.userId,
        username:  users.find(x => x.user_id === u.userId).username,
        similarity: u.similarity,
      }));
    
    console.log("Final similar users:", results);
    return res.json(results);

  } catch (err) {
    console.error("Error fetching similar users:", err);
    return res.json([]);
  } finally {
    if (client) client.release();
  }
});

app.get("/friends-ratings", async (req, res) => {
  const user_id = req.session.userId;
  // console.log(req.session,user_id); // Debugging line
  if (!user_id) {
    console.log("User not logged in"); // Debugging line
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const result = await pool.query(`
      WITH friends AS (
        SELECT user2_id AS friend_id FROM Friendship 
        WHERE user1_id = $1 AND status = 'accepted'
        UNION
        SELECT user1_id AS friend_id FROM Friendship 
        WHERE user2_id = $1 AND status = 'accepted'
      )
      SELECT 
        r.rating_value AS rating,
        r.timestamp,
        u.username,
        u.user_id,
        c.item_id AS content_id,
        c.title,
        c.content_type
      FROM Rating r
      JOIN friends f ON r.user_id = f.friend_id
      JOIN Users u ON u.user_id = r.user_id
      JOIN ContentItem c ON c.item_id = r.item_id
      WHERE r.timestamp >= now() - INTERVAL '7 days'
        AND r.is_private = FALSE
        AND u.is_rating_private = FALSE
      ORDER BY r.timestamp DESC
    `, [user_id]);
      // console.log("Result:", result.rows); // Debugging line
    res.json(result.rows);
  } catch (err) {
    console.error("Error in /friends-ratings:", err);
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/friends-reviews", async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: "Not logged in" });

  try {
    const result = await pool.query(`
      WITH friends AS (
        SELECT user2_id AS friend_id FROM Friendship 
        WHERE user1_id = $1 AND status = 'accepted'
        UNION
        SELECT user1_id AS friend_id FROM Friendship 
        WHERE user2_id = $1 AND status = 'accepted'
      )
      SELECT 
        rv.text AS review,
        rv.timestamp,
        u.username,
        u.user_id,
        c.item_id AS content_id,
        c.title,
        c.content_type,
        rv.sentiment_score
      FROM Review rv
      JOIN friends f ON rv.user_id = f.friend_id
      JOIN Users u ON u.user_id = rv.user_id
      JOIN ContentItem c ON c.item_id = rv.item_id
      WHERE rv.timestamp >= now() - INTERVAL '7 days'
        AND u.is_review_private = FALSE
      ORDER BY rv.timestamp DESC
    `, [userId]);

    res.json(result.rows);
  } catch (err) {
    console.error("Error in /friends-reviews:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/////////////////////////////////////////////////////////////////////