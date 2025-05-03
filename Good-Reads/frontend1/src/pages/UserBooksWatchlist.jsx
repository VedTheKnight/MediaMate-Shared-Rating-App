import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const API_BASE = "http://localhost:4000";

function UserBooksWatchlist() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [username, setUsername] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("Planned");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE}/isLoggedIn`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.message !== "Logged in") {
          navigate("/login");
        } else {
          fetchWatchlist();
          fetchUsername();
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/login");
      }
    };

    const fetchWatchlist = async () => {
      try {
        const res = await fetch(`${API_BASE}/getwatchlist2/${userId}`, {
          credentials: "include",
        });
        const data = await res.json();
        const booksOnly = data.filter((item) => item.content_type === "Book");
        setBooks(booksOnly);
        console.log(booksOnly,data);
      } catch (error) {
        console.error("Failed to fetch user watchlist:", error);
      }
    };

    const fetchUsername = async () => {
      try {
        const res = await fetch(`${API_BASE}/user2/${userId}`, {
          credentials: "include",
        });
        const data = await res.json();
        setUsername(data.username);
      } catch (error) {
        console.error("Failed to fetch username:", error);
      }
    }

    checkAuth();
  }, [navigate, userId]);

  const filteredBooks = books.filter((book) => book.status === filteredStatus);

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>
        {username}'s Book Watchlist
      </Typography>

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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.item_id}>
                <TableCell>
                  <img src={book.image_url} alt={book.title} style={styles.cover} />
                </TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>
                  <Rating value={book.avg_rating || 0} readOnly style={{ maxWidth: "100px" }} />
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
  container: {
    marginTop: "80px",
    padding: "20px",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  tabs: {
    marginBottom: "30px",
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },
  tableContainer: {
    marginTop: "20px",
  },
  cover: {
    width: "50px",
    height: "75px",
    objectFit: "cover",
  },
};

export default UserBooksWatchlist;
