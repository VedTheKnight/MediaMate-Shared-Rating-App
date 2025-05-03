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

function TVShowsWatchlist() {
  const navigate = useNavigate();
  const [tvShows, setTVShows] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("Planned");

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
          fetchWatchlist(); // fetch TV shows after auth passes
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/login");
      }
    };

    const fetchWatchlist = async () => {
      try {
        const res = await fetch(`${API_BASE}/getwatchlist`, {
          credentials: "include",
        });
        const data = await res.json();
        // Filter for TV shows only
        const tvShowsData = data.filter(item => item.content_type === 'TV Show');
        setTVShows(tvShowsData);
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
      }
    };

    checkAuth();
  }, [navigate]);

  const filteredTVShows = tvShows.filter((show) => 
    show.status === filteredStatus
  );

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>
        TV Shows Watchlist
      </Typography>

      {/* Filter Buttons */}
      <ButtonGroup
        variant="contained"
        color="primary"
        style={styles.buttonGroup}
      >
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

      {/* TV Show Cards */}
      <Grid container spacing={4}>
        {filteredTVShows.map((show) => (
          <Grid item xs={12} sm={6} md={4} key={show.item_id}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h5" style={styles.cardTitle}>
                  {show.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={styles.cardDescription}
                >
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

export default TVShowsWatchlist; 