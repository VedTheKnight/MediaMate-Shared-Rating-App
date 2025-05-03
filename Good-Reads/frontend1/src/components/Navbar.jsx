import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Routes where navbar should be hidden
  const hideNavbarRoutes = ["/login", "/signup", "/", "/404"];

  // Routes where navbar should be shown
  const showNavbarRoutes = [
    "/dashboard",
    "/items/books",
    "/items/movies", 
    "/items/tvshows",
    "/watchlist",
    "/watchlist/books",
    "/watchlist/movies",
    "/watchlist/tvshows",
    "/groups",
    "/friends",
    "/settings",
    "/chatbot",
    "/content/book",
    "/content/movie",
    "/content/tv",
    "/activity"
  ];

  const shouldShowNavbar = showNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  ) && !hideNavbarRoutes.includes(location.pathname);

  if (!shouldShowNavbar) return null;

  const handleLogout = async () => {  
    try {
      const response = await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <img src="/logo2.png" alt="Logo" style={styles.logo} />
        <div style={styles.navLinks}>
          <Link to="/dashboard" style={styles.link}>
            <span style={styles.icon}>🏠</span>
            <span style={styles.linkText}>Home</span>
          </Link>
          <Link to="/watchlist" style={styles.link}>
            <span style={styles.icon}>📚</span>
            <span style={styles.linkText}>Watchlist</span>
          </Link>
          <Link to="/items/books" style={styles.link}>
            <span style={styles.icon}>📖</span>
            <span style={styles.linkText}>Books</span>
          </Link>
          <Link to="/items/movies" style={styles.link}>
            <span style={styles.icon}>🎬</span>
            <span style={styles.linkText}>Movies</span>
          </Link>
          <Link to="/items/tvshows" style={styles.link}>
            <span style={styles.icon}>📺</span>
            <span style={styles.linkText}>TV Shows</span>
          </Link>
          <Link to="/groups" style={styles.link}>
            <span style={styles.icon}>👥</span>
            <span style={styles.linkText}>Groups</span>
          </Link>
          <Link to="/friends" style={styles.link}>
            <span style={styles.icon}>👫</span>
            <span style={styles.linkText}>Friends</span>
          </Link>
          <Link to="/activity" style={styles.link}>
            <span style={styles.icon}>📈</span>
            <span style={styles.linkText}>Activity</span>
          </Link>
          <Link to="/chatbot" style={styles.link}>
            <span style={styles.icon}>💬</span>
            <span style={styles.linkText}>Chatbot</span>
          </Link>
          <Link to="/settings" style={styles.link}>
            <span style={styles.icon}>⚙️</span>
            <span style={styles.linkText}>Settings</span>
          </Link>
        </div>
        <button onClick={handleLogout} style={styles.button}>
          <span style={styles.icon}>🚪</span>
          <span style={styles.buttonText}>Logout</span>
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    width: "100%",
    backgroundColor: "#2c3e50",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: "15px 0",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
    margin: "0 auto",
    padding: "0 20px",
    flexWrap: "wrap",
  },
  logo: {
    height: "50px",
    marginRight: "20px",
    cursor: "pointer",
  },
  navLinks: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    flexGrow: 1,
  },
  link: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 10px",
    borderRadius: "6px",
  },
  linkText: {
    letterSpacing: "0.3px"
  },
  icon: {
    fontSize: "18px"
  },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "6px",
    transition: "all 0.3s ease",
    marginLeft: "20px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  buttonText: {
    letterSpacing: "0.3px"
  }
};

export default Navbar;
