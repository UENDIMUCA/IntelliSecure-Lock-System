import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import Swal from "sweetalert2"; // For popups
import "../styles/App.css";

const LoginPage = () => {
  const [username, setUsername] = useState(""); // Username state
  const [password, setPassword] = useState(""); // Password state
  const navigate = useNavigate(); // For routing

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }), // Send username instead of email
      });

      const data = await response.json();
      const statusCode = response.status;
      console.log(data); // Log the response for debugging

      if (statusCode === 200) {
        if (data.user.isAdmin) {
          console.log("User is an admin. Redirecting to admin dashboard...");
          navigate("/admin"); // Redirect to the admin page
        } else {
          Swal.fire({
            title: "Welcome!",
            html: "<h3>You are on home!</h3>",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
          });
          // navigate("/userPage"); TODO: redirect to user page
        }
      } else {
        Swal.fire({
          title: "Access Denied!",
          html: "<h4>Invalid username or password.</h4>",
          icon: "error",
          confirmButtonText: "Retry",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Swal.fire({
        title: "Server Error!",
        html: "<h4>An error occurred. Please try again later.</h4>",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"  // Changed from email to text input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Use username instead of email
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
