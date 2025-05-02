import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

const API_BASE = "http://10.129.6.179:4000";

const getColorFromSentiment = (score) => {
  if (score >= 0.8) return "#4CAF50";
  if (score >= 0.6) return "#8BC34A";
  if (score >= 0.4) return "#FFC107";
  if (score >= 0.2) return "#FF9800";
  return "#F44336";
};

function FriendsActivity() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/friends-activity`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setActivity(data))
      .catch(console.error);
  }, []);

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>
        Friends' Activity (Last 7 Days)
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {activity.map((item, idx) => (
          <Grid item key={idx}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="subtitle1" style={styles.primaryText}>
                  <strong>{item.username}</strong> {item.type === "rating" ? "rated" : "reviewed"} <strong>{item.title}</strong> ({item.content_type})
                </Typography>

                {item.type === "rating" && (
                  <Typography style={styles.rating}>⭐ {item.value}</Typography>
                )}

                {item.type === "review" && (
                  <>
                    <Typography style={styles.reviewText}>"{item.text}"</Typography>
                    <Typography
                      style={{
                        ...styles.sentimentScore,
                        color: getColorFromSentiment(item.sentiment_score),
                      }}
                    >
                      Sentiment Score: {item.sentiment_score.toFixed(2)}
                    </Typography>
                  </>
                )}

                <Typography variant="caption" style={styles.timestamp}>
                  {new Date(item.timestamp).toLocaleString()}
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
    marginTop: "80px",
    padding: "20px",
  },
  title: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    width: "400px",
    minHeight: "150px",
    padding: "10px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
    borderRadius: "10px",
  },
  primaryText: {
    marginBottom: "8px",
  },
  rating: {
    fontSize: "1.2rem",
    fontWeight: "500",
    color: "#333",
  },
  reviewText: {
    marginTop: "4px",
    marginBottom: "4px",
    fontStyle: "italic",
  },
  sentimentScore: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
  timestamp: {
    fontSize: "0.75rem",
    color: "#888",
  },
};

export default FriendsActivity;
