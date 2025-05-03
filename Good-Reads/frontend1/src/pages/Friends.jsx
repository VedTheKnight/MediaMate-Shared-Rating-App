import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";

const API_BASE = "http://localhost:4000";

function Friends() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendshipStatuses, setFriendshipStatuses] = useState({});
  const [activeFriendId, setActiveFriendId] = useState(null);
  const [similarUsers, setSimilarUsers] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_BASE}/isLoggedIn`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.message !== "Logged in") navigate("/login");
      } catch {
        navigate("/login");
      }
    };

    const fetchFriends = async () => {
      try {
        const res = await fetch(`${API_BASE}/friends`, {
          credentials: "include",
        });
        setFriends(await res.json());
      } catch (e) {
        console.error(e);
      }
    };
    const fetchFriendRequests = async () => {
      try {
        const res = await fetch(`${API_BASE}/friend-requests`, {
          credentials: "include",
        });
        setFriendRequests(await res.json());
      } catch (e) {
        console.error(e);
      }
    };
    const fetchSimilarUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/users/similar`, {
          credentials: "include",
        });
        setSimilarUsers(await res.json());
      } catch (e) {
        console.error(e);
      }
    };

    checkAuth();
    fetchFriends();
    fetchFriendRequests();
    fetchSimilarUsers();
  }, [navigate]);

  const handleSearch = async () => {
    try {
      const res = await fetch(`${API_BASE}/search-users?query=${searchQuery}`, {
        credentials: "include",
      });
      const data = await res.json();
      setSearchResults(data);

      const statuses = {};
      for (const u of data) {
        const statusRes = await fetch(
          `${API_BASE}/friendship-status/${u.user_id}`,
          { credentials: "include" }
        );
        statuses[u.user_id] = (await statusRes.json()).status || "none";
      }
      setFriendshipStatuses(statuses);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendRequest = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/friend-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friendId: id }),
      });
      const data = await res.json();
      if (res.ok) {
        setFriendshipStatuses(s => ({ ...s, [id]: "pending" }));
        alert(data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAccept = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/accept-friend-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friendId: id }),
      });
      if (res.ok) {
        setFriendRequests(r => r.filter(x => x.user_id !== id));
        const updated = await fetch(`${API_BASE}/friends`, { credentials: "include" });
        setFriends(await updated.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/reject-friend-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friendId: id }),
      });
      if (res.ok) {
        setFriendRequests(r => r.filter(x => x.user_id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getFriendButton = user => {
    const st = friendshipStatuses[user.user_id];
    if (st === "accepted") return <Button disabled>Friends</Button>;
    if (st === "pending") return <Button disabled>Pending</Button>;
    return (
      <Button variant="contained" color="primary" sx={styles.btn} onClick={() => handleSendRequest(user.user_id)}>
        Add Friend
      </Button>
    );
  };

  const Section = ({ title, children }) => (
    <Box sx={{ mt: 6, width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Divider sx={{ flexGrow: 1, borderColor: "#ddd" }} />
        <Paper
          elevation={1}
          sx={{
            mx: 2,
            px: 2,
            py: 0.5,
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <CollectionsIcon sx={{ mr: 1, color: "#1976d2" }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2", mb: 0 }}>
            {title}
          </Typography>
        </Paper>
        <Divider sx={{ flexGrow: 1, borderColor: "#ddd" }} />
      </Box>
      <Grid container spacing={3}>{children}</Grid>
    </Box>
  );

  const renderCard = (user, actions = null, isFriend = false) => (
    <Grid item xs={12} sm={6} md={4} key={user.user_id}>
      <Card
        sx={styles.card}
        onClick={() => setActiveFriendId(id => (id === user.user_id ? null : user.user_id))}
      >
        <CardContent>
          <Typography variant="h6" sx={styles.userName}>{user.username}</Typography>
          <Stack spacing={1} direction="row" flexWrap="wrap">{actions}</Stack>
          {activeFriendId === user.user_id && (
            <Box mt={2} display="flex" gap={2}>
              <Button
                variant="outlined"
                color="primary"
                sx={styles.innerBtn}
                onClick={e => {
                  e.stopPropagation();
                  navigate(`/dashboard/${user.user_id}`, { state: { from: "friends" } });
                }}
              >
                Profile
              </Button>
              {isFriend && (
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={styles.innerBtn}
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/watchlist2/${user.user_id}`);
                  }}
                >
                  Watchlist
                </Button>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Container sx={{ mt: 12, mb: 6 }}>
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 4, color: "#2c3e50" }}>
        Friends
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 3 }}>
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: "50px", whiteSpace: "nowrap" }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Stack>

      <Section title="Search Results">
        {searchResults.map(u => renderCard(u, getFriendButton(u)))}
      </Section>

      <Section title="Friend Requests">
        {friendRequests.map(r =>
          renderCard(r, [
            <Button key="a" variant="contained" color="success" sx={styles.btn} onClick={() => handleAccept(r.user_id)}>Accept</Button>,
            <Button key="r" variant="outlined" color="error" sx={styles.btn} onClick={() => handleReject(r.user_id)}>Reject</Button>
          ])
        )}
      </Section>

      <Section title="Your Friends">
        {friends.map(f => renderCard(f, null, true))}
      </Section>

      <Section title="Users Similar to You">
        {similarUsers.map(u => renderCard(u, getFriendButton(u)))}
      </Section>
    </Container>
  );
}

const styles = {
  card: {
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
    },
  },
  userName: {
    fontWeight: "bold",
    color: "#34495e",
    mb: 1,
  },
  btn: {
    borderRadius: "20px",
    textTransform: "none",
  },
  innerBtn: {
    borderRadius: "20px",
    textTransform: "none",
    px: 2,
  },
};

export default Friends;
