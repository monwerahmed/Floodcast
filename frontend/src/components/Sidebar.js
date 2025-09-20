import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-blue-700">
        Flood Admin
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li><Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
          <li><Link to="/shelters" className="hover:text-gray-300">Shelters</Link></li>
          <li><Link to="/resource" className="hover:text-gray-300">Resources</Link></li>
          <li><Link to="/alert" className="hover:text-gray-300">Alerts</Link></li>
          <li><Link to="/requests" className="hover:text-gray-300">Requests</Link></li>
          <li><Link to="/reports" className="hover:text-gray-300">Reports</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
