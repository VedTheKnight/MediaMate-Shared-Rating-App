import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

function UserWatchlist() {
  const { userId } = useParams(); // Grab user ID from URL
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log(userId);
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:4000/isLoggedIn", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.message !== "Logged in") {
          navigate("/login");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/login");
      }
    };

    const fetchUsername = async () => {
      try {
        const res = await fetch(`http://localhost:4000/user2/${userId}`, {
          credentials: "include",
        });
        const data = await res.json();
        console.log(data)
        setUsername(data.username || `User ${userId}`);
      } catch (err) {
        console.error("Failed to fetch username:", err);
      }
    };

    checkAuth();
    fetchUsername();

  }, [navigate, userId]);

  const watchlistTypes = [
    { title: "Books Watchlist", path: `/watchlist2/${userId}/books` },
    { title: "Movies Watchlist", path: `/watchlist2/${userId}/movies` },
    { title: "TV Shows Watchlist", path: `/watchlist2/${userId}/tvshows` },
  ];

  // Show loading state while username is being fetched
  if (!username) {
    return (
      <Container style={styles.container}>
        <Typography variant="h5" align="center">
          Loading watchlist...
        </Typography>
      </Container>
    );
  }

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>
        {username}'s Watchlist
      </Typography>
      <Typography variant="h4" gutterBottom style={styles.title}>
        {username}'s Watchlist
      </Typography>
      <Grid container spacing={3}>
        {watchlistTypes.map((watchlist) => (
          <Grid item xs={12} sm={6} md={4} key={watchlist.title}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  <Link to={watchlist.path} style={styles.link}>
                    {watchlist.title}
                  </Link>
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
  },
  title: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "30px",
  },
  link: {
    textDecoration: "none",
    color: "#1976d2",
  },
};

export default UserWatchlist;
