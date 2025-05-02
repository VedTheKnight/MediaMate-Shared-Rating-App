import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [watchlistData, setWatchlistData] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:4000/isLoggedIn", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.message !== "Logged in") {
          navigate("/login");
        } else {
          // Only fetch watchlist data if user is authenticated
          fetchWatchlistData();
        }
      } catch {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const fetchWatchlistData = async () => {
    try {
      const response = await fetch("http://localhost:4000/getwatchlist", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("Fetched watchlist data:", data);
        setWatchlistData(data);
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    // Add user message to chat
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);

    try {
      const response = await fetch("http://localhost:4000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          message: userMessage,
          watchlistData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
      } else {
        throw new Error("Failed to get response from chatbot");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, there was an error processing your request. Please try again.",
          isUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Recommendation Assistant
      </Typography>
      <Paper
        elevation={3}
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 2,
            bgcolor: "#f5f5f5",
          }}
        >
          <List>
            {messages.map((message, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    justifyContent: message.isUser ? "flex-end" : "flex-start",
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      maxWidth: "70%",
                      bgcolor: message.isUser ? "#e3f2fd" : "white",
                    }}
                  >
                    <ListItemText
                      primary={message.text}
                      sx={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    />
                  </Paper>
                </ListItem>
                {index < messages.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            {loading && (
              <ListItem sx={{ justifyContent: "center" }}>
                <CircularProgress size={24} />
              </ListItem>
            )}
            <div ref={messagesEndRef} />
          </List>
        </Box>
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ask for recommendations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={4}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              sx={{ minWidth: "100px" }}
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chatbot; 