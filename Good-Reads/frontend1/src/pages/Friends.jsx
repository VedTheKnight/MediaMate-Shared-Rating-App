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
} from "@mui/material";

const API_BASE = "http://localhost:4000"; // 🔁 your backend IP/port

function Friends() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendshipStatuses, setFriendshipStatuses] = useState({});
  const [activeFriendId, setActiveFriendId] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // const res = await fetch("http://localhost:4000/isLoggedIn", {
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
        // const res = await fetch("http://localhost:4000/friends", {
        const res = await fetch(`${API_BASE}/friends`, {
        credentials: "include",
        });
        const data = await res.json();
        setFriends(data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    const fetchFriendRequests = async () => {
      try {
        // const res = await fetch("http://localhost:4000/friend-requests", {
        const res = await fetch(`${API_BASE}/friend-requests`, {
        credentials: "include",
        });
        const data = await res.json();
        setFriendRequests(data);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    checkAuth();
    fetchFriends();
    fetchFriendRequests();
  }, [navigate]);

  const handleSearch = async () => {
    try {
      // const res = await fetch(
      //   `http://localhost:4000/search-users?query=${searchQuery}`,
      //   { credentials: "include" }
      // );
      const res = await fetch(
        `${API_BASE}/search-users?query=${searchQuery}`,
        { credentials: "include" }
      );

      const data = await res.json();
      setSearchResults(data);

      const statuses = {};
      for (const user of data) {
        // const statusRes = await fetch(
        //   `http://localhost:4000/friendship-status/${user.user_id}`,
        //   { credentials: "include" }
        // );
        const statusRes = await fetch(
          `${API_BASE}/friendship-status/${user.user_id}`,
          { credentials: "include" }
        );
        const statusData = await statusRes.json();
        statuses[user.user_id] = statusData.status || "none";
      }
      setFriendshipStatuses(statuses);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleSendRequest = async (userId) => {
    try {
      // const res = await fetch("http://localhost:4000/friend-request", {
      const res = await fetch(`${API_BASE}/friend-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friendId: userId }),
      });
      const data = await res.json();
      if (res.ok) {
        setFriendshipStatuses({
          ...friendshipStatuses,
          [userId]: "pending",
        });
        alert(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleAcceptRequest = async (userId) => {
    try {
      // const res = await fetch("http://localhost:4000/accept-friend-request", {
      const res = await fetch(`${API_BASE}/accept-friend-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friendId: userId }),
      });
      const data = await res.json();
      if (res.ok) {
        setFriendRequests(friendRequests.filter((r) => r.user_id !== userId));
        // const updated = await fetch("http://localhost:4000/friends", {
        const updated = await fetch(`${API_BASE}/friends`, {
          credentials: "include",
        });
        setFriends(await updated.json());
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleRejectRequest = async (userId) => {
    try {
      // const res = await fetch("http://localhost:4000/reject-friend-request", {
      const res = await fetch(`${API_BASE}/reject-friend-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friendId: userId }),
      });
      const data = await res.json();
      if (res.ok) {
        setFriendRequests(friendRequests.filter((r) => r.user_id !== userId));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  const getFriendshipButton = (user) => {
    const status = friendshipStatuses[user.user_id];
    switch (status) {
      case "accepted":
        return <Button disabled>Already Friends</Button>;
      case "pending":
        return <Button disabled>Request Pending</Button>;
      default:
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSendRequest(user.user_id)}
          >
            Send Friend Request
          </Button>
        );
    }
  };

  const Section = ({ title, children }) => (
    <Box sx={{ marginTop: 5 }}>
      <Typography variant="h5" sx={styles.sectionTitle}>
        {title}
      </Typography>
      <Grid container spacing={3}>{children}</Grid>
    </Box>
  );

  const renderUserCard = (user, actions = null, isFriend = false) => (
    <Grid item xs={12} sm={6} md={4} key={user.user_id}>
      <Card
        sx={styles.card}
        onClick={() =>
          setActiveFriendId((prev) => (prev === user.user_id ? null : user.user_id))
        }
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {user.username}
          </Typography>
          <Stack spacing={1} direction="row" flexWrap="wrap">
            {actions}
          </Stack>

          {activeFriendId === user.user_id && (
            <Box mt={2} display="flex" gap={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/dashboard/${user.user_id}`, {
                    state: { from: "friends" },
                  });
                }}
              >
                View Profile
              </Button>
              {isFriend && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/watchlist2/${user.user_id}`);
                  }}
                >
                  View Watchlist
                </Button>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Container sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        Friends
      </Typography>

      <Stack spacing={2} direction="row" sx={{ mb: 3 }}>
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ whiteSpace: "nowrap" }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Stack>

      <Section title="Search Results">
        {searchResults.map((user) =>
          renderUserCard(user, getFriendshipButton(user))
        )}
      </Section>

      <Section title="Friend Requests">
        {friendRequests.map((request) =>
          renderUserCard(request, [
            <Button
              variant="contained"
              color="success"
              onClick={() => handleAcceptRequest(request.user_id)}
            >
              Accept
            </Button>,
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRejectRequest(request.user_id)}
            >
              Reject
            </Button>,
          ])
        )}
      </Section>

      <Section title="Your Friends">
        {friends.map((friend) => renderUserCard(friend, null, true))}
      </Section>
    </Container>
  );
}

const styles = {
  container: {
    mt: 10,
    mb: 6,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    mb: 4,
    color: "#2c3e50",
  },
  sectionTitle: {
    mb: 2,
    fontWeight: "bold",
    color: "#34495e",
  },
  card: {
    transition: "transform 0.2s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 3,
    },
  },
};

export default Friends;
