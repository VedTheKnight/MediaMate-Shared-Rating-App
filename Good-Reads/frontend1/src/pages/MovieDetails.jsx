import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container, Typography, Card, CardContent, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

// NEEDED FOR RUNNING THE APP ON SERVER ---------- GEET 
const API_BASE = "http://10.129.6.179:4000"; // 🔁 your backend IP/port
// ----------------------------------------------

const getSentimentEmoji = (score) => {
  if (score >= 0.8) return '😊'; // Very positive
  if (score >= 0.6) return '🙂'; // Positive
  if (score >= 0.4) return '😐'; // Neutral
  if (score >= 0.2) return '🙁'; // Negative
  return '😢'; // Very negative
};

const getSentimentColor = (score) => {
  if (score >= 0.8) return '#4CAF50'; // Very positive - green
  if (score >= 0.6) return '#8BC34A'; // Positive - light green
  if (score >= 0.4) return '#FFC107'; // Neutral - yellow
  if (score >= 0.2) return '#FF9800'; // Negative - orange
  return '#F44336'; // Very negative - red
};

const getSentimentText = (score) => {
  if (score >= 0.8) return 'Very Positive';
  if (score >= 0.6) return 'Positive';
  if (score >= 0.4) return 'Neutral';
  if (score >= 0.2) return 'Negative';
  return 'Very Negative';
};

function MovieDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({ reviews: [] });
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sentimentFilter, setSentimentFilter] = useState('all');

  // Authentication check
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

  // Memoize fetchBookDetails with useCallback
  const fetchBookDetails = useCallback(async (bookId) => {
    try {
      // const response = await fetch(`http://localhost:4000/books/${bookId}`, { credentials: "include" });
      const response = await fetch(`${API_BASE}/content/movie/${bookId}`, { credentials: "include" });
      const data = await response.json();
      setBook(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching book details:", error);
      setLoading(false);
    }
  }, []);

  // Fetch book details
  useEffect(() => {
    if (id) {
      fetchBookDetails(id);
    }
  }, [id, fetchBookDetails]);

  // Add to watchlist
  const addToWatchlist = async () => {
    try {
      // await fetch("http://localhost:4000/watchlist", {
      //   method: "POST",
      //   credentials: "include",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ bookId: id }),
      // });
      await fetch(`${API_BASE}/watchlist`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: id }),
      });

      alert("Book added to watchlist!");
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  // Submit review
  const submitReview = async () => {
    if (!reviewText.trim()) return alert("Review cannot be empty!");

    try {

      // await fetch(`http://localhost:4000/books/${id}/review`, {
      //   method: "POST",
      //   credentials: "include",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ text: reviewText }),
      // });

      await fetch(`${API_BASE}/content/movie/${id}/review`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: reviewText }),
      });
      alert("Review submitted successfully!");
      setReviewText(""); // Clear the input field
      // Refresh book details to show the new review
      fetchBookDetails(id);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // Memoize fetchFilteredReviews with useCallback
  const fetchFilteredReviews = useCallback(async (filter) => {
    try {
      const response = await fetch(`${API_BASE}/content/movie/${id}/reviews?sentiment=${filter}`, { 
        credentials: "include" 
      });

      // const response = await fetch(`http://localhost:4000/books/${id}/reviews?sentiment=${filter}`, { 
      //   credentials: "include" 
      // });
      const data = await response.json();
      setBook(prev => ({ ...prev, reviews: data }));
    } catch (error) {
      console.error("Error fetching filtered reviews:", error);
    }
  }, [id]);

  // Add this useEffect to handle sentiment filter changes
  useEffect(() => {
    if (sentimentFilter !== 'all') {
      fetchFilteredReviews(sentimentFilter);
    } else {
      // Reset to all reviews
      fetchBookDetails(id);
    }
  }, [sentimentFilter, fetchBookDetails, fetchFilteredReviews, id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!book || !book.reviews) return <Typography>Error loading book details.</Typography>;

  return (
    <>
    <Navbar />
    <Container style={styles.container}>
      {/* Book Details */}
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h4" style={styles.title}>
            {book.title}
          </Typography>
          <img src={book.image_url} alt={book.title} style={styles.image} />
          <Typography variant="body1" style={styles.description}>
            {book.description}
          </Typography>
          <Typography variant="subtitle1" style={styles.genre}>
            Genre: {book.genre}
          </Typography>
          <Typography variant="subtitle1" style={styles.releaseDate}>
            Release Date: {new Date(book.release_date).toDateString()}
          </Typography>

          {/* Rating and Sentiment */}
          <div style={styles.ratingContainer}>
            <Typography variant="h6">Average Rating:</Typography>
            <Rating style={{ maxWidth: "150px" }} value={book.rating} readOnly />
          </div>
          {book.average_sentiment > 0 && (
            <div style={styles.sentimentContainer}>
              <Typography variant="h6">Overall Sentiment:</Typography>
              <div style={styles.sentimentBar}>
                <div 
                  style={{
                    ...styles.sentimentFill,
                    width: `${book.average_sentiment * 100}%`,
                    backgroundColor: getSentimentColor(book.average_sentiment)
                  }}
                />
              </div>
              <Typography style={styles.sentimentText}>
                {getSentimentText(book.average_sentiment)} ({Math.round(book.average_sentiment * 100)}%)
              </Typography>
            </div>
          )}

          {/* Add to Watchlist */}
          <Button variant="contained" color="primary" onClick={addToWatchlist} style={{ marginTop: "20px" }}>
            Add to Watchlist
          </Button>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <div style={styles.reviewsSection}>
        <Typography variant="h5" gutterBottom>
          Reviews:
        </Typography>
        
        {/* Sentiment Filter */}
        <div style={{ marginBottom: '20px' }}>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel>Filter by Sentiment</InputLabel>
            <Select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
              label="Filter by Sentiment"
            >
              <MenuItem value="all">All Reviews</MenuItem>
              <MenuItem value="positive">Positive</MenuItem>
              <MenuItem value="neutral">Neutral</MenuItem>
              <MenuItem value="negative">Negative</MenuItem>
            </Select>
          </FormControl>
        </div>

        {book.reviews.length === 0 ? (
          <Typography>No reviews yet. Be the first to review!</Typography>
        ) : (
          book.reviews.map((review) => (
            <Card key={review.review_id} style={styles.reviewCard}>
              <CardContent>
                <Typography variant="subtitle1" style={styles.reviewUser}>
                  {review.username} {getSentimentEmoji(review.sentiment_score)}
                </Typography>
                <Typography>{review.text}</Typography>
                <div style={styles.sentimentBar}>
                  <div 
                    style={{
                      ...styles.sentimentFill,
                      width: `${review.sentiment_score * 100}%`,
                      backgroundColor: getSentimentColor(review.sentiment_score)
                    }}
                  />
                </div>
                <Typography style={styles.sentimentText}>
                  {getSentimentText(review.sentiment_score)} ({Math.round(review.sentiment_score * 100)}%)
                </Typography>
              </CardContent>
            </Card>
          ))
        )}

        {/* Add Review */}
        <div style={styles.addReviewSection}>
          <TextField
            label="Write your review"
            multiline
            rows={4}
            fullWidth
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            variant="outlined"
            style={{ marginBottom: "20px" }}
          />
          <Button variant="contained" color="secondary" onClick={submitReview}>
            Submit Review
          </Button>
        </div>
      </div>
    </Container>
    </>
  );
}

const styles = {
  container: {
    marginTop: "80px",
    paddingBottom: "40px",
    paddingTop: "100px" 
  },
  card: {
    marginBottom: "30px",
    padding: "20px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "20px",
  },
  image: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    marginBottom: "20px",
  },
  sentimentBar: {
    height: '8px',
    borderRadius: '4px',
    marginTop: '8px',
    marginBottom: '8px',
    backgroundColor: '#e0e0e0',
    overflow: 'hidden'
  },
  sentimentFill: {
    height: '100%',
    transition: 'width 0.3s ease-in-out'
  },
  sentimentText: {
    fontSize: '0.8rem',
    color: '#666',
    marginTop: '4px'
  },
  sentimentContainer: {
    marginTop: '20px',
    marginBottom: '20px'
  }
};

export default MovieDetails;
