import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import Swal from "sweetalert2"; // For popups
import "../styles/App.css";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const navigate = useNavigate(); // For routing

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Response from backend:", data); // Log the response for debugging

      if (data.success) {
        if (data.isAdmin) {
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
        }
      } else {
        Swal.fire({
          title: "Access Denied!",
          html: "<h4>Invalid email or password.</h4>",
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
