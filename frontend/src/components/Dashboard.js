import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // API call - later you will connect with Spring Boot
    axios.get("http://localhost:8081/api/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:8081/api/dashboard/alerts")
      .then(res => setAlerts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatsCard title="Total Shelters" value={stats.totalShelters || 0} />
            <StatsCard title="Active Alerts" value={stats.activeAlerts || 0} />
            <StatsCard title="Pending Requests" value={stats.pendingRequests || 0} />
          </div>

          {/* Alerts List */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
            <ul className="space-y-2">
              {alerts.length > 0 ? (
                alerts.map((a) => (
                  <li key={a.id} className="border-b pb-2">
                    <span className="font-bold">{a.area}</span> -{" "}
                    <span className="text-red-600">{a.level}</span>
                  </li>
                ))
              ) : (
                <p>No active alerts</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
