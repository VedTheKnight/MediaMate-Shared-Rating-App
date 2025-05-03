import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent, CardActionArea, Box } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import SettingsIcon from "@mui/icons-material/Settings";
import { Groups as GroupIcon, PeopleAlt as PeopleIcon } from "@mui/icons-material"
import { Timeline as ActivityIcon } from "@mui/icons-material";  // Import a better Activity Icon

const API_BASE = "http://localhost:4000";

function UserHome() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState({
    username: "Loading...",
    email: "Loading...",
    friendCount: 0
  });

  const [recommendations, setRecommendations] = useState({
    books: [],
    movies: [],
    tvshows: []
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
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

    const fetchUserData = async () => {
      try {
        if (userId && (!location.state || location.state.from !== "friends")) {
          console.warn("Unauthorized profile access attempt");
          navigate("/dashboard");
          return;
        }

        const endpoint = userId
          ? `${API_BASE}/user2/${userId}`
          : `${API_BASE}/user/profile`;

        const res = await fetch(endpoint, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const [bookRes, movieRes, tvRes] = await Promise.all([
          fetch(`${API_BASE}/recommendation/Book`, { credentials: "include" }),
          fetch(`${API_BASE}/recommendation/Movie`, { credentials: "include" }),
          fetch(`${API_BASE}/recommendation/tv`, { credentials: "include" }),
        ]);
        const [bookData, movieData, tvData] = await Promise.all([
          bookRes.json(),
          movieRes.json(),
          tvRes.json(),
        ]);
        setRecommendations({
          books: bookData.slice(0, 3),
          movies: movieData.slice(0, 3),
          tvshows: tvData.slice(0, 3),
        });
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
      }
    };

    checkAuth();
    fetchUserData();
    fetchRecommendations();
  }, [navigate, userId, location.state]);

  const watchlistTypes = [
    {
      title: "Books",
      path: "/watchlist/books",
      icon: <MenuBookIcon style={styles.icon} />,
      bg: "#E3F2FD",
    },
    {
      title: "Movies",
      path: "/watchlist/movies",
      icon: <MovieIcon style={styles.icon} />,
      bg: "#FFF3E0",
    },
    {
      title: "TV Shows",
      path: "/watchlist/tvshows",
      icon: <TvIcon style={styles.icon} />,
      bg: "#EDE7F6",
    },
  ];

  const renderRecommendationCard = (item) => (
    <Card key={item.item_id} style={styles.compactCard}>
      <CardContent style={styles.cardContent}>
        <img
          src={item.image_url || "/placeholder.jpg"}
          alt={item.title}
          style={styles.image}
        />
        <Box>
          <Typography variant="body1" style={styles.itemTitle}>{item.title}</Typography>
          <Typography variant="body2">⭐ {item.avg_rating?.toFixed(1) ?? "N/A"}</Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container style={styles.container}>
      {/* Profile Section */}
      <Card style={styles.profileCard}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h4" style={styles.username}>
                Username: {userData.username}
              </Typography>
              <Typography variant="body1" style={styles.userInfo}>
                Email: {userData.email}
              </Typography>
              <Typography variant="body1" style={styles.userInfo}>
                Friends: {userData.friendCount}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Link to="/settings" style={styles.iconLink}>
                <SettingsIcon style={styles.icon} />
              </Link>
              <Link to="/groups" style={styles.iconLink}>
                <GroupIcon style={styles.icon} />
              </Link>
              <Link to="/friends" style={styles.iconLink}>
                <PeopleIcon style={styles.icon} />
              </Link>
              <Link to="/activity" style={styles.iconLink}>  {/* Add the link for the activity icon */}
                <ActivityIcon style={styles.icon} />
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Watchlist Section */}
      <Box style={styles.watchlistSection}>
        <Typography variant="h5" style={styles.sectionTitle}>Your Watchlists</Typography>
        <Grid container spacing={0} justifyContent="space-between" alignItems="stretch">
          {watchlistTypes.map((watchlist, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                display: "flex",
                justifyContent:
                  index === 0 ? "flex-start" : index === 1 ? "center" : "flex-end",
              }}
              key={watchlist.title}
            >
              <Card
                style={{
                  ...styles.card,
                  backgroundColor: watchlist.bg,
                  width: "95%", // make it wider
                  margin: "5px", // minimal spacing
                  height: "180px", // taller cards
                }}
                elevation={6}
              >
                <CardActionArea component={Link} to={watchlist.path} style={styles.linkArea}>
                  <CardContent style={styles.cardContentWatchlist2}>
                    {React.cloneElement(watchlist.icon, { style: styles.largeIcon })}
                    <Typography variant="h6" style={styles.linkText}>
                      {watchlist.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recommendations Section */}
      <Box style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '40px' }}>
        <Box flex="1" maxWidth="32%">
          <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
            Book Recommendations
          </Typography>
          {recommendations.books.map(renderRecommendationCard)}
        </Box>

        <Box flex="1" maxWidth="32%" textAlign="center">
          <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
            Movie Recommendations
          </Typography>
          {recommendations.movies.map(renderRecommendationCard)}
        </Box>

        <Box flex="1" maxWidth="32%" textAlign="right">
          <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
            TV Show Recommendations
          </Typography>
          {recommendations.tvshows.map(renderRecommendationCard)}
        </Box>
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
    paddingTop: "100px"
  },
  profileCard: {
    marginBottom: "30px",
    background: "#f8f9fa",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  username: {
    color: "#2c3e50",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  userInfo: {
    color: "#34495e",
    marginBottom: "8px",
  },
  sectionTitle: {
    color: "#2c3e50",
    fontWeight: "bold",
    marginBottom: "20px",
    alignItems: "center",
    textAlign: "center",
  },
  recommendationsSection: {
    marginTop: "30px",
  },
  compactCard: {
    marginBottom: "15px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  image: {
    width: "60px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  itemTitle: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  card: {
    borderRadius: "12px",
    transition: "transform 0.2s ease-in-out",
  },
  icon: {
    fontSize: 28,
    marginRight: "15px",
    color: "#555",
    width: "60px",
    height: "60px",
    padding: "40px",
  },
  linkText: {
    fontWeight: 600,
    color: "#333",
  },
  linkArea: {
    textDecoration: "none",
  },
  watchlistSection: {
    marginTop: "40px",
    marginBottom: "30px",
  },
  cardContentWatchlist: {
    textAlign: "center",
    padding: "50px 50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  cardContentWatchlist2: {
    textAlign: "center",
    padding: "30px 135px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  largeIcon: {
    fontSize: 100,
    marginBottom: "12px",
    color: "#333",
  },
  iconLink: {
    textDecoration: "none",
    color: "#333",
  },
};

export default UserHome;
