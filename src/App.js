import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Map from "./Components/Map";
import { useAuth } from "./contexts/AuthContext";
import SharedLocations from "./SharedLocation/SharedLocations";


function App() {
  const { token } = useAuth();
  const isLoggedIn = !!token;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />   {/* ✅ সবসময় login page দেখাবে */}
        <Route path="/map" element={isLoggedIn ? <Map /> : <Navigate to="/login" />} />
        
        <Route path="/shared" element={isLoggedIn ? <SharedLocations /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
