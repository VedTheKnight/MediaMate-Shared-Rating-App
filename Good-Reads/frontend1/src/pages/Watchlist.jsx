import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Box,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";

const API_BASE = "http://localhost:4000";

function Watchlist() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
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

  const watchlistTypes = [
    {
      title: "Books Watchlist",
      path: "/watchlist/books",
      icon: <MenuBookIcon style={styles.icon} />,
      bg: "#E3F2FD",
    },
    {
      title: "Movies Watchlist",
      path: "/watchlist/movies",
      icon: <MovieIcon style={styles.icon} />,
      bg: "#FFF3E0",
    },
    {
      title: "TV Shows Watchlist",
      path: "/watchlist/tvshows",
      icon: <TvIcon style={styles.icon} />,
      bg: "#EDE7F6",
    },
  ];

  return (
    <Container style={styles.container}>
      <Typography variant="h4" style={styles.title}>
        Your Watchlist
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {watchlistTypes.map((watchlist) => (
          <Grid item xs={12} sm={6} md={4} key={watchlist.title}>
            <Card
              style={{
                ...styles.card,
                backgroundColor: watchlist.bg,
              }}
              elevation={4}
            >
              <CardActionArea component={Link} to={watchlist.path} style={styles.linkArea}>
                <CardContent style={styles.cardContent}>
                  <Box>{watchlist.icon}</Box>
                  <Typography variant="h6" style={styles.linkText}>
                    {watchlist.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
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
    maxWidth: "1000px",
    margin: "0 auto",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "40px",
    color: "#333",
  },
  card: {
    borderRadius: "16px",
    transition: "transform 0.2s ease-in-out",
  },
  cardContent: {
    textAlign: "center",
    padding: "30px 20px",
  },
  icon: {
    fontSize: 60,
    marginBottom: "16px",
    color: "#555",
  },
  linkText: {
    fontWeight: 600,
    color: "#333",
  },
  linkArea: {
    textDecoration: "none",
  },
};

export default Watchlist;
