import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import LockIcon from "@mui/icons-material/Lock";

const API_BASE = "http://localhost:4000";

function UserWatchlist() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [viewable, setViewable] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE}/isLoggedIn`, {
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
        const res = await fetch(`${API_BASE}/user2/${userId}`, {
          credentials: "include",
        });
        const data = await res.json();
        setUsername(data.username || `User ${userId}`);
        setViewable(!data.is_watchlist_private);
      } catch (err) {
        console.error("Failed to fetch username:", err);
      }
    };

    checkAuth();
    fetchUsername();
  }, [navigate, userId]);

  const watchlistTypes = [
    {
      title: "Books Watchlist",
      path: `/watchlist2/${userId}/books`,
      icon: <MenuBookIcon style={styles.icon} />,
      bg: "#E3F2FD",
    },
    {
      title: "Movies Watchlist",
      path: `/watchlist2/${userId}/movies`,
      icon: <MovieIcon style={styles.icon} />,
      bg: "#FFF3E0",
    },
    {
      title: "TV Shows Watchlist",
      path: `/watchlist2/${userId}/tvshows`,
      icon: <TvIcon style={styles.icon} />,
      bg: "#EDE7F6",
    },
  ];

  if (!username) {
    return (
      <Container style={styles.container}>
        <Typography variant="h5" align="center">
          Loading watchlist...
        </Typography>
      </Container>
    );
  }

  if (!viewable) {
    return (
      <Container style={styles.container}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
          <LockIcon style={{ fontSize: 80, color: "#999", marginBottom: 16 }} />
          <Typography variant="h4" align="center" gutterBottom>
            {username}'s Watchlist is Private
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary">
            Only visible to them.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container style={styles.container}>
      <Typography variant="h4" style={styles.title}>
        hi
      </Typography>
      <Typography variant="h4" style={styles.title}>
        {username}'s Watchlist
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {watchlistTypes.map((watchlist) => (
          <Grid item xs={12} sm={6} md={4} key={watchlist.title}>
            <Card style={{ ...styles.card, backgroundColor: watchlist.bg }} elevation={4}>
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

export default UserWatchlist;
