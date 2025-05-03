import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Avatar,
  Divider,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const API_BASE = "http://localhost:4000";

const getColorFromSentiment = (score) => {
  if (score >= 0.8) return "#4CAF50";
  if (score >= 0.6) return "#8BC34A";
  if (score >= 0.4) return "#FFC107";
  if (score >= 0.2) return "#FF9800";
  return "#F44336";
};

function ActivityCard({ item }) {
  const isRating = item.type === "rating";
  return (
    <Card sx={styles.card}>
      <CardContent sx={{ display: "flex", gap: 2 }}>
        <Avatar sx={styles.avatar}>
          {isRating ? <StarIcon /> : <ChatBubbleIcon />}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" sx={styles.primaryText}>
            <strong>{item.username}</strong>{" "}
            {isRating ? "rated" : "reviewed"}{" "}
            <strong>{item.title}</strong>{" "}
            <Typography
              component="span"
              sx={styles.typeLabel}
            >
              ({item.content_type})
            </Typography>
          </Typography>

          {isRating ? (
            <Box sx={styles.ratingRow}>
              <StarIcon fontSize="small" sx={{ color: "#FFD700", mr: 0.5 }} />
              <Typography variant="body1">{item.value}</Typography>
            </Box>
          ) : (
            <Box>
              <Typography variant="body2" sx={styles.reviewText}>
                “{item.text}”
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  ...styles.sentimentScore,
                  color: getColorFromSentiment(item.sentiment_score),
                }}
              >
                Sentiment: {item.sentiment_score ? item.sentiment_score.toFixed(2) : "0"}
              </Typography>
            </Box>
          )}

          <Typography variant="caption" sx={styles.timestamp}>
            {new Date(item.timestamp).toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function FriendsActivity() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    (async () => {
      // auth check omitted for brevity
      const [ratingsRes, reviewsRes] = await Promise.all([
        fetch(`${API_BASE}/friends-ratings`, { credentials: "include" }),
        fetch(`${API_BASE}/friends-reviews`, { credentials: "include" }),
      ]);
      const [ratings, reviews] = await Promise.all([
        ratingsRes.json(),
        reviewsRes.json(),
      ]);

      const formatted = [
        ...ratings.map(r => ({
          type: "rating",
          ...r,
          value: r.rating,
        })),
        ...reviews.map(r => ({
          type: "review",
          ...r,
          text: r.review,
        })),
      ];

      formatted.sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
      );
      setActivity(formatted);
    })();
  }, []);

  return (
    <Container sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        Recent Friends’ Activity
      </Typography>

      <List disablePadding>
        {activity.map((item, i) => (
          <React.Fragment key={i}>
            <ListItem sx={{ px: 0 }}>
              <ActivityCard item={item} />
            </ListItem>
            {i < activity.length - 1 && <Divider sx={{ my: 1 }} />}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
}

const styles = {
  container: {
    mt: 12,
    mb: 6,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    mb: 4,
    color: "#2c3e50",
  },
  card: {
    width: "100%",
    borderRadius: 3,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  avatar: {
    bgcolor: "#1976d2",
  },
  primaryText: {
    mb: 1,
    lineHeight: 1.4,
  },
  typeLabel: {
    fontSize: "0.875rem",
    color: "#666",
    fontWeight: "normal",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    mb: 0.5,
  },
  reviewText: {
    fontStyle: "italic",
    mb: 0.5,
  },
  sentimentScore: {
    fontWeight: "bold",
    display: "block",
    mb: 0.5,
  },
  timestamp: {
    fontSize: "0.75rem",
    color: "#999",
  },
};
