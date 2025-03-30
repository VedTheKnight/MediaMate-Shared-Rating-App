import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

function Books() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:4000/isLoggedIn", { credentials: "include" });
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

  // Placeholder for API call logic
  const books = []; // This will be populated with data from an API

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>   
        Books
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card style={styles.card}>
              <CardMedia component="img" height="140" image={book.image} alt={book.title} />
              <CardContent>
                <Typography variant="h5" style={styles.cardTitle}>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={styles.cardDescription}>
                  {book.description}
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
    marginTop: "80px", // To account for fixed navbar
    padding: "20px",
  },
  title: {
    color: "#333",
    fontWeight: "bold",
  },
  card: {
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s",
  },
  cardTitle: {
    color: "#222",
    fontWeight: "bold",
  },
  cardDescription: {
    color: "#555",
  },
};

export default Books; 