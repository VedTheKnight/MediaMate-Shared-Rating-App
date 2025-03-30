const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const port = 4000;

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
    origin: "http://localhost:3000",
    credentials: true,
  })
);

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
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)", 
      [username, email, hashedPassword]
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
      "SELECT user_id, username FROM Users WHERE username ILIKE $1 AND user_id != $2",
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
       JOIN Friendships f ON u.user_id = f.user1_id 
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
      "SELECT * FROM Friendships WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)",
      [userId, friendId]
    );

    if (existingFriendship.rows.length > 0) {
      return res.status(400).json({ message: "Friend request already exists or you are already friends" });
    }

    // Insert a new friend request
    await pool.query(
      "INSERT INTO Friendships (user1_id, user2_id, status) VALUES ($1, $2, 'pending')",
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
      "UPDATE Friendships SET status = 'accepted' WHERE user1_id = $1 AND user2_id = $2 AND status = 'pending'",
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
      "DELETE FROM Friendships WHERE user1_id = $1 AND user2_id = $2 AND status = 'pending'",
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
    // Retrieve all accepted friendships
    const friends = await pool.query(
      "SELECT u.user_id, u.username FROM Users u JOIN Friendships f ON (u.user_id = f.user1_id OR u.user_id = f.user2_id) WHERE (f.user1_id = $1 OR f.user2_id = $1) AND f.status = 'accepted' AND u.user_id != $1",
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
      "SELECT status FROM Friendships WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)",
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