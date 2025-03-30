import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent, TextField, Button } from "@mui/material";

function Friends() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendshipStatuses, setFriendshipStatuses] = useState({});

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

    const fetchFriends = async () => {
      try {
        const res = await fetch("http://localhost:4000/friends", { credentials: "include" });
        const data = await res.json();
        setFriends(data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    const fetchFriendRequests = async () => {
      try {
        const res = await fetch("http://localhost:4000/friend-requests", { credentials: "include" });
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
      const res = await fetch(`http://localhost:4000/search-users?query=${searchQuery}`, { credentials: "include" });
      const data = await res.json();
      setSearchResults(data);

      // Check friendship status for each search result
      const statuses = {};
      for (const user of data) {
        const statusRes = await fetch(`http://localhost:4000/friendship-status/${user.user_id}`, { credentials: "include" });
        const statusData = await statusRes.json();
        statuses[user.user_id] = statusData.status || 'none';
      }
      setFriendshipStatuses(statuses);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleSendRequest = async (userId) => {
    try {
      const res = await fetch("http://localhost:4000/friend-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friendId: userId }),
      });
      const data = await res.json();
      if (res.ok) {
        setFriendshipStatuses({
          ...friendshipStatuses,
          [userId]: 'pending'
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
      const res = await fetch("http://localhost:4000/accept-friend-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friendId: userId }),
      });
      const data = await res.json();
      if (res.ok) {
        // Refresh friend requests and friends lists
        setFriendRequests(friendRequests.filter(request => request.user_id !== userId));
        const updatedFriends = await fetch("http://localhost:4000/friends", { credentials: "include" });
        const friendsData = await updatedFriends.json();
        setFriends(friendsData);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleRejectRequest = async (userId) => {
    try {
      const res = await fetch("http://localhost:4000/reject-friend-request", {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ friendId: userId }),
      });
      const data = await res.json();
      if (res.ok) {
        // Remove the rejected request from the list
        setFriendRequests(friendRequests.filter(request => request.user_id !== userId));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  const getFriendshipButton = (user) => {
    const status = friendshipStatuses[user.user_id];
    
    switch(status) {
      case 'accepted':
        return <Button variant="contained" disabled>Already Friends</Button>;
      case 'pending':
        return <Button variant="contained" disabled>Request Pending</Button>;
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

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>
        Your Friends
      </Typography>

      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
        Search Results
      </Typography>
      <Grid container spacing={3}>
        {searchResults.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.user_id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{user.username}</Typography>
                {getFriendshipButton(user)}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
        Friend Requests
      </Typography>
      <Grid container spacing={3}>
        {friendRequests.map((request) => (
          <Grid item xs={12} sm={6} md={4} key={request.user_id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{request.username}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleAcceptRequest(request.user_id)}>
                  Accept
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleRejectRequest(request.user_id)}>
                  Reject
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
        Friends List
      </Typography>
      <Grid container spacing={3}>
        {friends.map((friend) => (
          <Grid item xs={12} sm={6} md={4} key={friend.user_id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{friend.username}</Typography>
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
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "30px",
  },
  sectionTitle: {
    color: "#2c3e50",
    fontWeight: "bold",
    marginBottom: "20px",
  },
};

export default Friends;