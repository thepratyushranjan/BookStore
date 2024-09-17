// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import "../styles.css";

const Login = ({ setToken }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      const { access } = response.data;
      setToken(access);
      localStorage.setItem("token", access);
      navigate("/profile");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            value={credentials.username}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            value={credentials.password}
            required
          />
        </div>
        <button type="submit" className="sign-in-button">Sign In</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={handleSignUp} className="sign-up-button">Sign Up</button>
    </div>
  );
};

export default Login;
