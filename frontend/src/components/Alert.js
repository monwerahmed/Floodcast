import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, level: "low" });

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = () => {
    setLoading(true);
    axios.get("http://localhost:8081/api/dashboard/alerts")
      .then(res => {
        setAlerts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update
      axios.put(`http://localhost:8081/api/dashboard/alerts/${formData.id}`, formData)
        .then(() => {
          fetchAlerts();
          setShowForm(false);
          setFormData({ id: null, level: "low" });
        });
    } else {
      // Add new
      axios.post("http://localhost:8081/api/dashboard/alerts", formData)
        .then(() => {
          fetchAlerts();
          setShowForm(false);
          setFormData({ id: null, level: "low" });
        });
    }
  };

  const handleEdit = (alert) => {
    setFormData(alert);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this alert?")) {
      axios.delete(`http://localhost:8081/api/dashboard/alerts/${id}`)
        .then(() => fetchAlerts());
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      default: return "bg-green-100 text-green-800"; // low
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Alerts</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              {showForm ? "Cancel" : "Add New Alert"}
            </button>
          </div>

          {/* Form for Add / Edit */}
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <button
                type="submit"
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                {formData.id ? "Update Alert" : "Add Alert"}
              </button>
            </form>
          )}

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">Alert #{alert.id}</h2>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getLevelColor(alert.level)}`}>
                        {alert.level.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Created at: {new Date(alert.created_at).toLocaleString()}
                    </p>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => handleEdit(alert)}
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(alert.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AlertsPage;
