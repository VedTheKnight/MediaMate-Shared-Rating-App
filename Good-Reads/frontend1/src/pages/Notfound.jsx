import React from "react";

function Notfound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.text}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  title: {
    color: "#333",
    fontSize: "36px",
    marginBottom: "20px",
  },
  text: {
    color: "#777",
    fontSize: "18px",
  },
};

export default Notfound;