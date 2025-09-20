import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; 

export default function Home() {
  return (
    <div className="home">
      <h2>Welcome! Please Login or Register</h2>
      <div className="home-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
