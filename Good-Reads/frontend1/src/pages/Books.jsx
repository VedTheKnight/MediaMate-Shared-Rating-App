import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [statusMap, setStatusMap] = useState({});

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

  const handleRating = async (bookId, ratingValue) => {
    try {
      const response = await fetch(`http://localhost:4000/books/${bookId}/rating`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: ratingValue }),
      });

      if (response.ok) {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.item_id === bookId ? { ...book, rating: ratingValue } : book
          )
        );
        alert("Rating submitted!");
      } else {
        console.error("Failed to update rating");
      }
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
      <Grid container spacing={3} justifyContent="center">
        {filteredBooks.map((book) => (
          <Grid item key={book.item_id}>
            <Card style={styles.card}>
              <CardMedia
                component="img"
                image={book.image_url}
                alt={book.title}
                style={{
                  objectFit: "cover",
                  height: "300px",
                  width: "100%",
                }}
              />
              <CardContent style={{ padding: "20px" }}>
                <Typography variant="h5" style={styles.cardTitle}>
                  {book.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginBottom: "15px",
                  }}
                >
                  {book.description}
                </Typography>

                {/* Rating and View Details side by side */}
                <div style={styles.ratingDetailsContainer}>
                  <Rating
                    style={{ maxWidth: "120px" }}
                    value={book.rating}
                    onChange={(value) => handleRating(book.item_id, value)}
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    style={{ marginLeft: "10px", height: "fit-content" }}
                    onClick={() => navigate(`/items/books/${book.item_id}`)}
                  >
                    View Details
                  </Button>
                </div>

                {/* Watchlist Dropdown */}
                <Select
                  fullWidth
                  value={statusMap[book.item_id] || ""}
                  onChange={(e) => handleWatchlistStatus(book.item_id, e.target.value)}
                  displayEmpty
                  style={{ marginTop: "10px" }}
                >
                  <MenuItem value="">Add to Watchlist</MenuItem>
                  <MenuItem value="Planned">Planned</MenuItem>
                  <MenuItem value="Watching">Watching</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
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
    textAlign: "center",
  },
  filters: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    justifyContent: "center",
  },
  card: {
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease-in-out",
    width: "350px",
    height: "550px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "10px",
    overflow: "hidden",
  },
  cardTitle: {
    color: "#222",
    fontWeight: "bold",
    fontSize: "20px",
    marginBottom: "10px",
  },
  ratingDetailsContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
};

export default Books;
