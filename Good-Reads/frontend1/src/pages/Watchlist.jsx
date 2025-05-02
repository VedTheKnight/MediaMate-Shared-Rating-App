import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

const API_BASE = "http://10.129.6.179:4000"; // 🔁 your backend IP/port

function Watchlist() {
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

  const watchlistTypes = [
    { title: "Books Watchlist", path: "/watchlist/books" },
    { title: "Movies Watchlist", path: "/watchlist/movies" },
    { title: "TV Shows Watchlist", path: "/watchlist/tvshows" }
  ];

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>
        Your Watchlist
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

export default Watchlist; 