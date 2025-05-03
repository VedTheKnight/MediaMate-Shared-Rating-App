import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  ButtonGroup,
} from "@mui/material";

const API_BASE = "http://localhost:4000"; // 🔁 your backend IP/port

function MoviesWatchlist() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("Planned");

  // Fetch watchlist from backend
  const fetchWatchlist = async () => {
    try {
      const res = await fetch(`${API_BASE}/getwatchlist`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log("Full watchlist data:", data); // 🔍 Debug log
      const moviesData = data.filter(item => item.content_type === "Movie");
      setMovies(moviesData); // ✅ Reset state cleanly
    } catch (error) {
      console.error("Failed to fetch watchlist:", error);
    }
  };

  // Check authentication and then fetch watchlist
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE}/isLoggedIn`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.message !== "Logged in") {
          navigate("/login");
        } else {
          fetchWatchlist();
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  const filteredMovies = movies.filter((movie) => movie.status === filteredStatus);

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>
        Movies Watchlist
      </Typography>

      {/* Filter Buttons */}
      <ButtonGroup variant="contained" color="primary" style={styles.buttonGroup}>
        <Button
          onClick={() => setFilteredStatus("Planned")}
          variant={filteredStatus === "Planned" ? "contained" : "outlined"}
        >
          Planned
        </Button>
        <Button
          onClick={() => setFilteredStatus("Watching")}
          variant={filteredStatus === "Watching" ? "contained" : "outlined"}
        >
          Watching
        </Button>
        <Button
          onClick={() => setFilteredStatus("Completed")}
          variant={filteredStatus === "Completed" ? "contained" : "outlined"}
        >
          Completed
        </Button>
      </ButtonGroup>

      {/* Movie Cards */}
      <Grid container spacing={4}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.item_id}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h5" style={styles.cardTitle}>
                  {movie.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={styles.cardDescription}
                >
                  Status: {movie.status}
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
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
  },
  card: {
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
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

export default MoviesWatchlist;
