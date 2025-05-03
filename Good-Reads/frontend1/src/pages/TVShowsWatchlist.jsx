import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import {
  Container,
  Typography,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const API_BASE = "http://localhost:4000";

function TVShowsWatchlist() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("Planned");
  const [reviews, setReviews] = useState({});
  const fetchWatchlist = async () => {
    try {
      const res = await fetch(`${API_BASE}/getwatchlist`, { credentials: "include" });
      const data = await res.json();
      const booksData = data.filter((item) => item.content_type === "TV Show");
      setBooks(booksData);

      const prefilledReviews = {};
      booksData.forEach((book) => {
        if (book.review_text) prefilledReviews[book.item_id] = book.review_text;
      });
      setReviews(prefilledReviews);
    } catch (error) {
      console.error("Failed to fetch watchlist:", error);
    }
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE}/isLoggedIn`, { credentials: "include" });
        const data = await res.json();
        if (data.message !== "Logged in") {
          navigate("/login");
        } else {
          fetchWatchlist();
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  const filteredBooks = books.filter((book) => book.status === filteredStatus);

  const handleReviewChange = (bookId, text) => {
    setReviews({ ...reviews, [bookId]: text });
  };

  const handleReviewSubmit = async (book) => {
    try {
      await fetch(`${API_BASE}/postreview`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_id: book.item_id,
          content_type: "TV Show",
          text: reviews[book.item_id],
        }),
      });
      alert("Review submitted!");
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await fetch(`${API_BASE}/deletewatchlist/${itemId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setBooks((prev) => prev.filter((book) => book.item_id !== itemId));
    } catch (err) {
      console.error("Failed to delete from watchlist:", err);
    }
  };

  const handleRating = async (bookId, value) => {
    try {
      await fetch(`${API_BASE}/content/tv/${bookId}/rating`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // item_id: bookId,
          rating: value,
          // content_type: "Book",
        }),
      });
      // Optionally, update the state with the new rating if you want the UI to reflect it immediately
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.item_id === bookId ? { ...book, user_rating: value } : book
        )
      );
    } catch (err) {
      console.error("Failed to update rating:", err);
    }
    fetchWatchlist(); // Refresh the watchlist to get the updated ratings
  };

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>TV Shows Watchlist</Typography>

      <Tabs
  value={filteredStatus}
  onChange={(e, newValue) => setFilteredStatus(newValue)}
  centered
  textColor="primary"
  indicatorColor="primary"
  style={styles.tabs}
>
  <Tab value="Planned" label="📌 Planned" />
  <Tab value="Watching" label="🎥 Watching" />
  <Tab value="Completed" label="✅ Completed" />
</Tabs>


      <TableContainer component={Paper} style={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Cover</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Avg Rating</strong></TableCell>
              <TableCell><strong>Your Rating</strong></TableCell>
              <TableCell><strong>Review</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.item_id}>
                <TableCell><img src={book.image_url} alt={book.title} style={styles.cover} /></TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>
                  <Rating value={book.avg_rating || 0} readOnly style={{ maxWidth: "100px" }} />
                </TableCell>
                <TableCell>
                  <Rating
                    value={book.self_rating || 0}
                    onChange={(value) => handleRating(book.item_id, value)}
                    style={{ maxWidth: "100px" }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={reviews[book.item_id] || ""}
                    onChange={(e) => handleReviewChange(book.item_id, e.target.value)}
                    multiline
                    variant="outlined"
                    rows={3}
                    style={styles.textField}
                  />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginTop: "30px", marginLeft: "15px", textTransform: "none", fontWeight: 500 }}
                  onClick={() => handleReviewSubmit(book)}
                >
                  Submit
                </Button>

                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(book.item_id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

const styles = {
  tabs: {
    marginBottom: "30px",
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },
  
  container: {
    marginTop: "80px",
    padding: "20px",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonGroup: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
  },
  tableContainer: {
    marginTop: "20px",
  },
  cover: {
    width: "50px",
    height: "75px",
    objectFit: "cover",
  },
  textField: {
    width: "200px",
    marginBottom: "10px",
  },
};

export default TVShowsWatchlist;
