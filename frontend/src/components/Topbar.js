import React from "react";
import { useNavigate } from "react-router-dom";
const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");  // JWT/Session token
    localStorage.removeItem("user");   // Optional: user info remove
    navigate("/login");                 // Redirect to login page
  };
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Flood Disaster Management</h2>
      <button
        onClick={handleLogout}  // ✅ button এ ফাংশন assign করা হয়েছে
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;