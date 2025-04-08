import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Grid, Card, CardContent, CardMedia,
  Button, Select, MenuItem
} from "@mui/material";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [statusMap, setStatusMap] = useState({}); // { [item_id]: "To Read" }

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

  useEffect(() => {
    fetchBooks();
    fetchGenres();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:4000/books", { credentials: "include" });
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch("http://localhost:4000/genres", { credentials: "include" });
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Submit watchlist status
  const handleWatchlistStatus = async (bookId, status) => {
    setStatusMap((prev) => ({ ...prev, [bookId]: status }));
    try {
      await fetch("http://localhost:4000/watchlist", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, status }),
      });
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  };

  // Submit rating
  const handleRating = async (bookId, ratingValue) => {
    try {
      await fetch(`http://localhost:4000/books/${bookId}/rating`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: ratingValue }),
      });
      alert("Rating submitted!");
      fetchBooks(); // refresh
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      (!selectedGenre || book.genre === selectedGenre) &&
      book.rating >= minRating
  );

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>
        Books
      </Typography>

      {/* Filters */}
      <div style={styles.filters}>
        <Select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} displayEmpty>
          <MenuItem value="">All Genres</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.genre_id} value={genre.name}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>

        <Select value={minRating} onChange={(e) => setMinRating(e.target.value)} displayEmpty>
          <MenuItem value={0}>All Ratings</MenuItem>
          <MenuItem value={1}>1 Star & Up</MenuItem>
          <MenuItem value={2}>2 Stars & Up</MenuItem>
          <MenuItem value={3}>3 Stars & Up</MenuItem>
          <MenuItem value={4}>4 Stars & Up</MenuItem>
        </Select>
      </div>

      {/* Book Cards */}
      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.item_id}>
            <Card style={styles.card}>
              <CardMedia component="img" height="140" image={book.image_url} alt={book.title} />
              <CardContent>
                <Typography variant="h5" style={styles.cardTitle}>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={styles.cardDescription}>
                  {book.description.slice(0, 100)}...
                </Typography>

                {/* Rating */}
                <Rating
                  style={{ maxWidth: "100px", marginTop: "10px" }}
                  value={book.rating}
                  onChange={(value) => handleRating(book.item_id, value)}
                />

                {/* Watchlist Dropdown */}
                <Select
                  fullWidth
                  value={statusMap[book.item_id] || ""}
                  onChange={(e) => handleWatchlistStatus(book.item_id, e.target.value)}
                  displayEmpty
                  style={{ marginTop: "10px" }}
                >
                  <MenuItem value="">Add to Watchlist</MenuItem>
                  <MenuItem value="To Read">To Read</MenuItem>
                  <MenuItem value="Reading">Reading</MenuItem>
                  <MenuItem value="Finished">Finished</MenuItem>
                </Select>

                {/* View Details Button */}
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ marginTop: "10px" }}
                  onClick={() => navigate(`/items/books/${book.item_id}`)}
                >
                  View Details
                </Button>
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
  },
  title: {
    color: "#333",
    fontWeight: "bold",
  },
  filters: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s",
    paddingBottom: "15px",
  },
  cardTitle: {
    color: "#222",
    fontWeight: "bold",
  },
};

export default Books;