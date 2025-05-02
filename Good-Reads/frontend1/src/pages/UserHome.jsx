import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent, Box } from "@mui/material";

const API_BASE = "http://10.129.6.179:4000"; // 🔁 your backend IP/port


function UserHome() {
  const { userId } = useParams();  // undefined for /dashboard
  const navigate = useNavigate();
  const location = useLocation();  // to check where we came from

  const [userData, setUserData] = useState({
    username: "Loading...",
    email: "Loading...",
    friendCount: 0
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // const res = await fetch("http://localhost:4000/isLoggedIn", { credentials: "include" });
        const res = await fetch(`${API_BASE}/isLoggedIn`, { credentials: "include" });
        const data = await res.json();
        if (data.message !== "Logged in") {
          navigate("/login");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/login");
      }
    };

    const fetchUserData = async () => {
      try {
        // If viewing a friend's dashboard, make sure we came from /friends
        if (userId && (!location.state || location.state.from !== "friends")) {
          console.warn("Unauthorized profile access attempt");
          navigate("/dashboard");
          return;
        }

        // const endpoint = userId
        //   ? `http://localhost:4000/user2/${userId}`  // friend view
        //   : "http://localhost:4000/user/profile";           // self view
        const endpoint = userId
          ? `${API_BASE}/user2/${userId}`  // friend view
          : `${API_BASE}/user/profile`;           // self view
        console.log(endpoint)

        const res = await fetch(endpoint, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    checkAuth();
    fetchUserData();
  }, [navigate, userId, location.state]);


  const recommendations = {
    books: [
      { id: 1, title: "The Great Gatsby", rating: "★★★★★" },
      { id: 2, title: "1984", rating: "★★★★☆" },
    ],
    movies: [
      { id: 3, title: "The Shawshank Redemption", rating: "★★★★★" },
      { id: 4, title: "Inception", rating: "★★★★☆" },
    ]
  };

  const recentActivities = [
    { id: 1, activity: "Friend A rated The Matrix: ★★★★★" },
    { id: 2, activity: "Friend B reviewed Game of Thrones" },
  ];

  return (
    <Container style={styles.container}>
      <Card style={styles.profileCard}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" style={styles.username}>{userData.username}</Typography>
              <Typography variant="body1" style={styles.userInfo}>{userData.email}</Typography>
              <Typography variant="body1" style={styles.userInfo}>Friends: {userData.friendCount}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box style={styles.watchlistLinks}>
                <Typography variant="h6" gutterBottom>Your Watchlists</Typography>
                <Link to={`/watchlist/books/`} style={styles.link}>📚 Books Watchlist</Link>
                <Link to={`/watchlist/movies/`} style={styles.link}>🎬 Movies Watchlist</Link>
                <Link to={`/watchlist/tvshows/`} style={styles.link}>📺 TV Shows Watchlist</Link>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={4} style={styles.recommendationsSection}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
            Book Recommendations
          </Typography>
          {recommendations.books.map((book) => (
            <Card key={book.id} style={styles.compactCard}>
              <CardContent>
                <Typography variant="body1">{book.title} • {book.rating}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
            Movie Recommendations
          </Typography>
          {recommendations.movies.map((movie) => (
            <Card key={movie.id} style={styles.compactCard}>
              <CardContent>
                <Typography variant="body1">{movie.title} • {movie.rating}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom style={{ ...styles.sectionTitle, marginTop: "40px" }}>
        Recent Friend Activity
      </Typography>
      <Grid container spacing={2}>
        {recentActivities.map((activity) => (
          <Grid item xs={12} key={activity.id}>
            <Card style={styles.activityCard}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {activity.activity}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const styles = {
  container: {
    marginTop: "80px",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    paddingTop: "100px"
  },
  profileCard: {
    marginBottom: "30px",
    background: "#f8f9fa",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  username: {
    color: "#2c3e50",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  userInfo: {
    color: "#34495e",
    marginBottom: "8px",
  },
  watchlistLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    color: "#3498db",
    textDecoration: "none",
    padding: "8px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
    '&:hover': {
      backgroundColor: "#f0f0f0",
    },
  },
  sectionTitle: {
    color: "#2c3e50",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  recommendationsSection: {
    marginTop: "30px",
  },
  compactCard: {
    marginBottom: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  activityCard: {
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
};

export default UserHome;
