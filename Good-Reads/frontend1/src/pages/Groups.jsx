import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"; // if not already imported
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

function Groups() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [joinableCommunities, setJoinableCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Auth check
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
          setAuthChecked(true);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  // Fetch communities
  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      try {
        if (tabIndex === 0) {
          const res = await fetch("http://localhost:4000/get-joinable-communities", {
            credentials: "include",
          });
          const data = await res.json();
          setJoinableCommunities(data.communities || []);
        } else {
          const res = await fetch("http://localhost:4000/get-joined-communities", {
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

    if (authChecked) fetchCommunities();
  }, [tabIndex, authChecked]);

  const handleTabChange = (_, newIndex) => setTabIndex(newIndex);



  const handleJoinCommunity = async (community_id) => {
    try {
      const res = await fetch("http://localhost:4000/join-community", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ community_id }),
      });
  
      if (res.ok) {
        setJoinableCommunities(prev =>
          prev.filter(c => c.community_id !== community_id)
        );
      } else {
        console.error("Failed to join community");
      }
    } catch (err) {
      console.error("Error joining community:", err);
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
      </Tabs>

      <Box mt={3}>
      {tabIndex === 0
        ? renderJoinableCommunities()
        : renderJoinedCommunities()}
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
  },
};

export default Groups;
