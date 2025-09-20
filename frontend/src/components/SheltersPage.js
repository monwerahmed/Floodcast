import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const SheltersPage = () => {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", location: "", capacity: 0, occupied: 0 });

  useEffect(() => {
    fetchShelters();
  }, []);

  const fetchShelters = () => {
    setLoading(true);
    axios.get("http://localhost:8081/api/dashboard/shelters")
      .then(res => {
        setShelters(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add / Update shelter
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update
      axios.put(`http://localhost:8081/api/dashboard/shelters/${formData.id}`, formData)
        .then(() => {
          fetchShelters();
          setShowForm(false);
          setFormData({ id: null, name: "", location: "", capacity: 0, occupied: 0 });
        });
    } else {
      // Add new
      axios.post("http://localhost:8081/api/dashboard/shelters", formData)
        .then(() => {
          fetchShelters();
          setShowForm(false);
          setFormData({ id: null, name: "", location: "", capacity: 0, occupied: 0 });
        });
    }
  };

  // Edit shelter
  const handleEdit = (shelter) => {
    setFormData(shelter);
    setShowForm(true);
  };

  // Delete shelter
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this shelter?")) {
      axios.delete(`http://localhost:8081/api/dashboard/shelters/${id}`)
        .then(() => fetchShelters());
    }
  };

  // Occupancy calculation
  const getOccupancyPercentage = (occupied, capacity) => {
    return capacity > 0 ? Math.round((occupied / capacity) * 100) : 0;
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 90) return "bg-red-100 text-red-800";
    if (percentage >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Shelters</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              {showForm ? "Cancel" : "Add New Shelter"}
            </button>
          </div>

          {/* Form for Add / Edit */}
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Shelter Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  name="capacity"
                  placeholder="Capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  name="occupied"
                  placeholder="Occupied"
                  value={formData.occupied}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                {formData.id ? "Update Shelter" : "Add Shelter"}
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
              {shelters.map((shelter) => {
                const occupancyPercentage = getOccupancyPercentage(shelter.occupied, shelter.capacity);
                const statusColor = getStatusColor(occupancyPercentage);

                return (
                  <div
                    key={shelter.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{shelter.name}</h2>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor}`}>
                          {occupancyPercentage}% Full
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 flex items-center">
                        📍 {shelter.location}
                      </p>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Occupancy</span>
                          <span>{shelter.occupied} / {shelter.capacity}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              occupancyPercentage >= 90 ? "bg-red-500" : occupancyPercentage >= 70 ? "bg-yellow-500" : "bg-green-500"
                            }`}
                            style={{ width: `${occupancyPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => handleEdit(shelter)}
                          className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(shelter.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SheltersPage;
