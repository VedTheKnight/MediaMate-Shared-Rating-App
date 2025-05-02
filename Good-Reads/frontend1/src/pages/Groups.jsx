import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";

const API_BASE = "http://localhost:4000"; // 🔁 your backend IP/port


function Groups() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [joinableCommunities, setJoinableCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    community_name: "",
    community_description: "",
    genre_id: "",
    selected_friends: []  // Initialize as an empty array
  });  
  const [genres, setGenres] = useState([]);
  const [friends, setFriends] = useState([]); // New state for storing user's friends

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // const res = await fetch("http://localhost:4000/isLoggedIn", {
        const res = await fetch(`${API_BASE}/isLoggedIn`, {
        credentials: "include",
        });
        const data = await res.json();
        if (data.message !== "Logged in") {
          navigate("/login");
        } else {
          setAuthChecked(true);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // const res = await fetch("http://localhost:4000/get-genres", {
        const res = await fetch(`${API_BASE}/get-genres`, {
          credentials: "include",
        });
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };

    fetchGenres();
  }, []);

  // Fetch user's friends from the backend
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // const res = await fetch("http://localhost:4000/get-friends", {
        const res = await fetch(`${API_BASE}/get-friends`, {
          credentials: "include",
        });
        const data = await res.json();
        setFriends(data.friends || []);
      } catch (err) {
        console.error("Failed to fetch friends:", err);
      }
    };

    if (authChecked) fetchFriends();
  }, [authChecked]);

  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      try {
        if (tabIndex === 0) {
          // const res = await fetch("http://localhost:4000/get-joinable-communities", {
          const res = await fetch(`${API_BASE}/get-joinable-communities`, {
            credentials: "include",
          });
          const data = await res.json();
          setJoinableCommunities(data.communities || []);
        } else if (tabIndex === 1) {
          // const res = await fetch("http://localhost:4000/get-joined-communities", {
          const res = await fetch(`${API_BASE}/get-joined-communities`, {
            credentials: "include",
          });
          const data = await res.json();
          setJoinedCommunities(data.communities || []);
        }
      } catch (error) {
        console.error("Failed to fetch communities:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authChecked && tabIndex !== 2) fetchCommunities();
  }, [tabIndex, authChecked]);

  const handleTabChange = (_, newIndex) => setTabIndex(newIndex);

  const handleJoinCommunity = async (community_id) => {
    try {
      // const res = await fetch("http://localhost:4000/join-community", {
      const res = await fetch(`${API_BASE}/join-community`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ community_id }),
      });

      if (res.ok) {
        setJoinableCommunities((prev) =>
          prev.filter((c) => c.community_id !== community_id)
        );
      } else {
        console.error("Failed to join community");
      }
    } catch (err) {
      console.error("Error joining community:", err);
    }
  };
  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Create the community
      // const res = await fetch("http://localhost:4000/create-community", {
      const res = await fetch(`${API_BASE}/create-community`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
  
      if (res.ok) {
        alert("Community created!");
  
        // Step 2: After community creation, add selected friends to the community
        const communityData = await res.json();
        const community_id = communityData.community_id; // Assuming the backend returns the new community ID
  
        // Add selected friends to the community
        // const addFriendsRes = await fetch("http://localhost:4000/add-friends-to-community", {
        const addFriendsRes = await fetch(`${API_BASE}/add-friends-to-community`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            community_id,
            friends: form.selected_friends,  // Send the selected friend IDs
          }),
        });
  
        if (addFriendsRes.ok) {
          alert("Friends added to the community!");
        } else {
          const err = await addFriendsRes.json();
          alert(err.message || "Error adding friends to the community");
        }
  
        // Step 3: Clear the form and switch to the joined tab
        setForm({
          community_name: "",
          community_description: "",
          genre_id: "",
          selected_friends: [],
        });
        setTabIndex(1); // Switch to the "Joined Communities" tab
      } else {
        const err = await res.json();
        alert(err.message || "Error creating community");
      }
    } catch (err) {
      console.error("Failed to create community:", err);
    }
  };
  
  const renderJoinableCommunities = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      );
    }

    if (joinableCommunities.length === 0) {
      return (
        <Typography align="center" color="textSecondary" mt={4}>
          No communities to show.
        </Typography>
      );
    }

    return joinableCommunities.map((comm, index) => (
      <Card key={index} style={styles.card}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">{comm.community_name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {comm.community_description}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleJoinCommunity(comm.community_id)}
            >
              Join Community
            </Button>
          </Box>
        </CardContent>
      </Card>
    ));
  };

  const renderJoinedCommunities = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      );
    }

    if (joinedCommunities.length === 0) {
      return (
        <Typography align="center" color="textSecondary" mt={4}>
          No communities to show.
        </Typography>
      );
    }

    return joinedCommunities.map((comm, index) => (
      <Card
        key={index}
        style={styles.card}
        onClick={() => navigate(`/groups/${comm.community_id}`)}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">{comm.community_name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {comm.community_description}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    ));
  };

  const renderCreateCommunityForm = () => (
    <Box component="form" onSubmit={handleCreateCommunity} mt={3}>
      <TextField
        fullWidth
        label="Community Name"
        value={form.community_name}
        onChange={(e) => setForm({ ...form, community_name: e.target.value })}
        required
        style={{ marginBottom: 16 }}
      />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Community Description"
        value={form.community_description}
        onChange={(e) => setForm({ ...form, community_description: e.target.value })}
        required
        style={{ marginBottom: 16 }}
      />
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={form.genre_id}
          onChange={(e) => setForm({ ...form, genre_id: e.target.value })}
          label="Genre"
          required
        >
          {genres.map((genre) => (
            <MenuItem key={genre.genre_id} value={genre.genre_id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Friends Selection - Dropdown with checkboxes */}
      <FormControl fullWidth style={{ marginBottom: 16 }}>
  <InputLabel>Friends</InputLabel>
  <Select
    multiple
    value={form.selected_friends}
    onChange={(e) => {
      const value = e.target.value;

      // If N/A (represented as 'na') is selected, only keep that in selection
      if (value.includes("na")) {
        setForm({ ...form, selected_friends: ["na"] });
      } else {
        setForm({ ...form, selected_friends: value.filter(v => v !== "na") });
      }
    }}
    renderValue={(selected) => {
      if (selected.length === 0) return "";
      if (selected.includes("na")) return "N/A";
      const selectedNames = selected.map((userId) => {
        const friend = friends.find((f) => f.user_id === userId);
        return friend?.username || "";
      });
      return selectedNames.join(", ");
    }}
    label="Friends"
    required
  >
    <MenuItem value="na">
      <Checkbox checked={form.selected_friends.includes("na")} />
      <ListItemText primary="N/A (Don’t add any friends)" />
    </MenuItem>

    {friends.map((friend) => (
      <MenuItem
        key={friend.user_id}
        value={friend.user_id}
        disabled={form.selected_friends.includes("na")}
      >
        <Checkbox checked={form.selected_friends.includes(friend.user_id)} />
        <Typography variant="body2">{friend.username}</Typography>
        <ListItemText primary={friend.name || ""} />
      </MenuItem>
    ))}
  </Select>
</FormControl>





      <Button variant="contained" color="primary" type="submit" fullWidth>
        Create Community
      </Button>
    </Box>
  );

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>
        Communities
      </Typography>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Joinable Communities" />
        <Tab label="Joined Communities" />
        <Tab
          label="🌟 Create Community"
          style={{ color: "#FFD700", fontWeight: "bold" }}
        />
      </Tabs>

      <Box mt={3}>
        {tabIndex === 0
          ? renderJoinableCommunities()
          : tabIndex === 1
          ? renderJoinedCommunities()
          : renderCreateCommunityForm()}
      </Box>
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
  card: {
    marginBottom: "16px",
    cursor: "pointer",
  },
};

export default Groups;
