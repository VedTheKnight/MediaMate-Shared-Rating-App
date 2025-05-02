import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const API_BASE = "http://10.129.6.179:4000"; // 🔁 your backend IP/port

function Settings() {
  const navigate = useNavigate();

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

    checkAuth();
  }, [navigate]);

  return (
    <Container style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.title}>
        Settings
      </Typography>
      {/* Add content for the settings here */}
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