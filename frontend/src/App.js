import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SheltersPage from "./components/SheltersPage";
import Resource from "./components/Resource";
import Alert from "./components/Alert";
import Resourceopen from "./components/Resourceopen";
import Alertopen from "./components/Alertopen";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shelters" element={<SheltersPage/>}/>
        <Route path="/resource" element={<Resource/>}/>
        <Route path="/alert" element={<Alert/>}/>
        <Route path="/resourceopen"element={<Resourceopen />} />
        <Route path="/alertopen"element={<Alertopen/>}/>
      </Routes>
    </Router>
  );
}

export default App;
