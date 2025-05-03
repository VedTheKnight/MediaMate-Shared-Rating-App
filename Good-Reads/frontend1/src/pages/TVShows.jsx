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
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const API_BASE = "http://localhost:4000";

const getSentimentColor = (score) => {
  if (score >= 0.8) return '#4CAF50';
  if (score >= 0.6) return '#8BC34A';
  if (score >= 0.4) return '#FFC107';
  if (score >= 0.2) return '#FF9800';
  return '#F44336';
};

const getSentimentText = (score) => {
  if (score >= 0.8) return 'Very Positive';
  if (score >= 0.6) return 'Positive';
  if (score >= 0.4) return 'Neutral';
  if (score >= 0.2) return 'Negative';
  return 'Very Negative';
};

function TVShows() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const [statusMap, setStatusMap] = useState({});
  const [filterByFriends, setFilterByFriends] = useState(false);

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

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [filterByFriends]);

  const fetchBooks = async () => {
    try {
      const endpoint = filterByFriends
        ? `${API_BASE}/content/tv/friends`
        : `${API_BASE}/content/tv`;
      const response = await fetch(endpoint, { credentials: "include" });
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(`${API_BASE}/genres`, { credentials: "include" });
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const handleWatchlistStatus = async (bookId, status) => {
    setStatusMap((prev) => ({ ...prev, [bookId]: status }));
    try {
      await fetch(`${API_BASE}/watchlist`, {
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
      const response = await fetch(`${API_BASE}/content/tv/${bookId}/rating`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: ratingValue }),
      });

      if (response.ok) {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.item_id === bookId
              ? { ...book, rating: ratingValue, user_rating: ratingValue }
              : book
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
      book.rating >= minRating &&
      (sentimentFilter === "all" ||
        (sentimentFilter === "positive" && (book.average_sentiment || 0.5) >= 0.6) ||
        (sentimentFilter === "neutral" && (book.average_sentiment || 0.5) >= 0.4 && (book.average_sentiment || 0.5) < 0.6) ||
        (sentimentFilter === "negative" && (book.average_sentiment || 0.5) < 0.4))
  );

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>
        TV Shows
      </Typography>

      {/* Filters */}
      <div style={styles.filters}>
        <FormControl variant="outlined" style={styles.filterControl}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            label="Genre"
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.genre_id} value={genre.name}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={styles.filterControl}>
          <InputLabel>Min Rating</InputLabel>
          <Select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            label="Min Rating"
          >
            <MenuItem value={0}>All Ratings</MenuItem>
            <MenuItem value={1}>1 Star & Up</MenuItem>
            <MenuItem value={2}>2 Stars & Up</MenuItem>
            <MenuItem value={3}>3 Stars & Up</MenuItem>
            <MenuItem value={4}>4 Stars & Up</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={styles.filterControl}>
          <InputLabel>Sentiment</InputLabel>
          <Select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            label="Sentiment"
          >
            <MenuItem value="all">All Sentiments</MenuItem>
            <MenuItem value="positive">Positive (60%+)</MenuItem>
            <MenuItem value="neutral">Neutral (40%-60%)</MenuItem>
            <MenuItem value="negative">Negative (under 40%)</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={filterByFriends}
              onChange={(e) => setFilterByFriends(e.target.checked)}
              color="primary"
            />
          }
          label="Friends Only"
        />
      </div>

      {/* Movie Cards */}
      <Grid container spacing={3} justifyContent="center">
        {filteredBooks.map((book) => (
          <Grid item key={book.item_id}>
            <Card style={styles.card}>
              <CardMedia
                component="img"
                image={book.image_url}
                alt={book.title}
                style={styles.cardMedia}
              />
              <CardContent style={styles.cardContent}>
                <Typography variant="h5" style={styles.cardTitle}>
                  {book.title}
                </Typography>
                <Typography variant="body2" style={styles.description}>
                  {book.description}
                </Typography>

                <div style={styles.ratingDetailsContainer}>
                  <Rating
                    style={{ maxWidth: "120px" }}
                    value={book.user_rating || 0}
                    onChange={(value) => handleRating(book.item_id, value)}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ marginLeft: "10px" }}
                    onClick={() => navigate(`/content/tv/${book.item_id}`)}
                  >
                    View Details
                  </Button>
                </div>

                {/* Sentiment Indicator */}
                <div style={styles.sentimentContainer}>
                  <Typography variant="subtitle2" style={styles.sentimentLabel}>
                    User Sentiment
                  </Typography>
                  <div style={styles.sentimentBar}>
                    <div
                      style={{
                        ...styles.sentimentFill,
                        width: `${(book.average_sentiment || 0.5) * 100}%`,
                        backgroundColor: getSentimentColor(book.average_sentiment || 0.5),
                      }}
                    />
                  </div>
                  <Typography style={styles.sentimentText}>
                    {book.average_sentiment
                      ? `${getSentimentText(book.average_sentiment)} (${Math.round(book.average_sentiment * 100)}%)`
                      : "No reviews yet"}
                  </Typography>
                </div>

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
    flexWrap: "wrap",
  },
  filterControl: {
    minWidth: "200px",
  },
  card: {
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    width: "350px",
    height: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "10px",
    overflow: "hidden",
  },
  cardMedia: {
    height: "200px",
    objectFit: "cover",
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "16px",
  },
  cardTitle: {
    color: "#222",
    fontWeight: "bold",
    fontSize: "20px",
    marginBottom: "10px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  description: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    marginBottom: "10px",
  },
  ratingDetailsContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  sentimentContainer: {
    marginTop: "10px",
    marginBottom: "10px",
    minHeight: "60px",
  },
  sentimentLabel: {
    fontSize: "0.8rem",
    color: "#666",
    marginBottom: "4px",
  },
  sentimentBar: {
    height: "6px",
    borderRadius: "3px",
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
    marginBottom: "4px",
  },
  sentimentFill: {
    height: "100%",
    transition: "width 0.3s ease-in-out",
  },
  sentimentText: {
    fontSize: "0.75rem",
    color: "#666",
  },
};

export default TVShows;
