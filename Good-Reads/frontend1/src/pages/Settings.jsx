import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  FormControlLabel,
  Switch,
  Box,
} from "@mui/material";

const API_BASE = "http://localhost:4000"; // 🔁 your backend IP/port

function Settings() {
  const navigate = useNavigate();

  const [profilePublic, setProfilePublic] = useState(true);
  const [picPublic, setPicPublic] = useState(true);
  const [ratingsPublic, setRatingsPublic] = useState(true);
  const [watchlistPublic, setWatchlistPublic] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // const res = await fetch("http://localhost:4000/isLoggedIn", { credentials: "include" });
        const res = await fetch(`${API_BASE}/isLoggedIn`, { credentials: "include"});
        const data = await res.json();
        if (data.message !== "Logged in") {
          navigate("/login");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/login");
      }
    };

    const fetchSettings = async () => {
      try {
        const res = await fetch("http://localhost:4000/get-settings", {
          credentials: "include",
        });
        const data = await res.json();
        setProfilePublic(data.profileVisibility === "public");
        setPicPublic(data.profilePicVisibility === "public");
        setRatingsPublic(data.ratingsVisibility === "public");
        setWatchlistPublic(data.watchlistVisibility === "public");
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };

    checkAuth();
    fetchSettings();
  }, [navigate]);

  const updateSetting = async (endpoint, isPublic) => {
    try {
      await fetch(`http://localhost:4000/settings/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ value: isPublic ? "public" : "private" }),
      });
    } catch (err) {
      console.error(`Failed to update ${endpoint}:`, err);
    }
  };

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>
        Settings
      </Typography>

      <Box sx={{ mt: 4 }}>
        <FormControlLabel
          control={
            <Switch
              checked={profilePublic}
              onChange={(e) => {
                const newValue = e.target.checked;
                setProfilePublic(newValue);
                updateSetting("profile-visibility", newValue);
              }}
            />
          }
          label="Public Profile"
        />
      </Box>

      {profilePublic && (
        <>
          <Box sx={{ mt: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={picPublic}
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    setPicPublic(newValue);
                    updateSetting("profile-pic-visibility", newValue);
                  }}
                />
              }
              label="Public Profile Picture"
            />
          </Box>

          <Box sx={{ mt: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={ratingsPublic}
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    setRatingsPublic(newValue);
                    updateSetting("ratings-visibility", newValue);
                  }}
                />
              }
              label="Public Ratings"
            />
          </Box>

          <Box sx={{ mt: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={watchlistPublic}
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    setWatchlistPublic(newValue);
                    updateSetting("watchlist-visibility", newValue);
                  }}
                />
              }
              label="Public Watchlist"
            />
          </Box>
        </>
      )}
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
};

export default Settings;
