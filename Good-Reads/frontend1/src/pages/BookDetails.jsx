import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container, Typography, Card, CardContent, Button, TextField } from "@mui/material";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

function BookDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState({ reviews: [] }); // Initialize reviews as an empty array
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);

  // Authentication check
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

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/books/${id}`, { credentials: "include" });
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Add to watchlist
  const addToWatchlist = async () => {
    try {
      await fetch("http://localhost:4000/watchlist", {
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
      await fetch(`http://localhost:4000/books/${id}/review`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: reviewText }),
      });
      alert("Review submitted successfully!");
      setReviewText(""); // Clear the input field
      // Refresh book details to show the new review
      const response = await fetch(`http://localhost:4000/books/${id}`, { credentials: "include" });
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

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

          {/* Rating */}
          <div style={styles.ratingContainer}>
            <Typography variant="h6">Average Rating:</Typography>
            <Rating style={{ maxWidth: "150px" }} value={book.rating} readOnly />
          </div>

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
        {book.reviews.length === 0 ? (
          <Typography>No reviews yet. Be the first to review!</Typography>
        ) : (
          book.reviews.map((review) => (
            <Card key={review.review_id} style={styles.reviewCard}>
              <CardContent>
                <Typography variant="subtitle1" style={styles.reviewUser}>
                  {review.username}
                </Typography>
                <Typography>{review.text}</Typography>
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
};

export default BookDetails;
