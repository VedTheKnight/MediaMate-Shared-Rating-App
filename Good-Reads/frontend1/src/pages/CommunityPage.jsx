import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
} from "@mui/material";

const API_BASE = "http://localhost:4000"; // 🔁 your backend IP/port

function CommunityPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

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

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        // const res = await fetch(`http://localhost:4000/groups/${id}`, {
        const res = await fetch(`${API_BASE}/groups/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        setCommunity(data.community);
        setComments(buildCommentTree(data.comments));
      } catch (error) {
        console.error("Failed to load community data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, [id]);

  const buildCommentTree = (comments) => {
    const map = {};
    const roots = [];

    comments.forEach((c) => {
      c.replies = [];
      map[c.comment_id] = c;
    });

    comments.forEach((c) => {
      if (c.parent_comment_id) {
        map[c.parent_comment_id]?.replies.push(c);
      } else {
        roots.push(c);
      }
    });

    return roots;
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      // const res = await fetch(`http://localhost:4000/groups/${id}/add-comment`, {
      const res = await fetch(`${API_BASE}/groups/${id}/add-comment`, {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ content: newComment }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments((prev) => buildCommentTree([data.comment, ...flattenComments(prev)]));
        setNewComment("");
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleReply = async (parentId) => {
    console.log("Trying to reply to", parentId, "with", replyText); // ← debug
    if (!replyText.trim()) return;

    try {
      // const res = await fetch(`http://localhost:4000/comments/${parentId}/reply`, {
      const res = await fetch(`${API_BASE}/comments/${parentId}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ content: replyText, parent_comment_id: parentId }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments((prev) => buildCommentTree([data.comment, ...flattenComments(prev)]));
        setReplyText("");
        setReplyingTo(null);
      } else {
        console.error("Failed to post reply");
      }
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  const flattenComments = (nested) => {
    const flat = [];
    const dfs = (list) => {
      for (const c of list) {
        const { replies, ...rest } = c;
        flat.push(rest);
        if (replies?.length) dfs(replies);
      }
    };
    dfs(nested);
    return flat;
  };

  const handleVote = async (commentId, type) => {
    try {
      // const res = await fetch(`http://localhost:4000/comments/${commentId}/vote`, {
      const res = await fetch(`${API_BASE}/comments/${commentId}/vote`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ type }),
      });

      if (res.ok) {
        const updated = await res.json();
        setComments((prev) =>
          buildCommentTree(
            flattenComments(prev).map((c) =>
              c.comment_id === updated.comment_id ? updated : c
            )
          )
        );
      } else {
        console.error("Failed to vote on comment");
      }
    } catch (error) {
      console.error("Error voting on comment:", error);
    }
  };

  const handleReplyToggle = (commentId) => {
    setReplyingTo((prev) => (prev === commentId ? null : commentId));
    setReplyText("");
  };

  const renderComments = (commentList, level = 0) =>
    commentList.map((comment) => (
      <Box key={comment.comment_id} ml={level * 4} mt={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography>{comment.content}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <Typography variant="caption" color="textSecondary">
                By {comment.username}
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <button
                  onClick={() => handleVote(comment.comment_id, "upvote")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                  }}
                >
                  👍
                </button>
                <Typography variant="caption">
                  {comment.upvotes - comment.downvotes}
                </Typography>
                <button
                  onClick={() => handleVote(comment.comment_id, "downvote")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                  }}
                >
                  👎
                </button>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => handleReplyToggle(comment.comment_id)}
                >
                  Reply
                </Button>
              </Box>
            </Box>

            {replyingTo === comment.comment_id && (
              <Box mt={2} display="flex" gap={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Your reply"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={() => handleReply(comment.comment_id)}
                >
                  Post
                </Button>
              </Box>
            )}

            {comment.replies.length > 0 && renderComments(comment.replies, level + 1)}
          </CardContent>
        </Card>
      </Box>
    ));

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
    <Navbar />
    <Container sx={{ paddingTop: "100px" }}>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {community.community_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {community.community_description}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Add a Comment</Typography>
          <Box display="flex" gap={2} mt={1}>
            <TextField
              fullWidth
              label="Your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              variant="outlined"
            />
            <Button variant="contained" onClick={handleAddComment}>
              Post
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h6" mt={4}>Comments</Typography>
      {comments.length === 0 ? (
        <Typography>No comments yet.</Typography>
      ) : (
        renderComments(comments)
      )}
    </Container>
    </>
  );
}

export default CommunityPage;
