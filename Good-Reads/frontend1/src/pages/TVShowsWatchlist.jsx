import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

const API_BASE = "http://10.129.6.179:4000"; // 🔁 your backend IP/port

function TVShowsWatchlist() {
  const navigate = useNavigate();

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

    checkAuth();
  }, [navigate]);

  // Sample data for demonstration
  const tvShows = [
    { id: 1, title: "TV Show One", status: "To Watch" },
    { id: 2, title: "TV Show Two", status: "Watching" },
  ];

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>
        TV Shows Watchlist
      </Typography>
      <Grid container spacing={4}>
        {tvShows.map((show) => (
          <Grid item xs={12} sm={6} md={4} key={show.id}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h5" style={styles.cardTitle}>
                  {show.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={styles.cardDescription}>
                  Status: {show.status}
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
  card: {
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    '&:hover': {
      transform: "scale(1.05)",
      boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.15)",
    },
  },
  cardTitle: {
    color: "#222",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardDescription: {
    color: "#555",
  },
};

export default TVShowsWatchlist; 