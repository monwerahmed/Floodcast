import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";  // ✅ context ব্যবহার

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // clear old message
    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      if (res.data.status === "success") {
        login(res.data.token);       // ✅ context + localStorage এ save
        navigate("/map");            // ✅ success হলে map এ যাবে
      } else {
        setMessage(res.data.message || "Invalid username or password");
      }
    } catch (err) {
      setMessage("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}
