import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [shelters, setShelters] = useState([]); // for dropdown
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, type: "", quantity: 0, shelter_id: "" });

  useEffect(() => {
    fetchResources();
    fetchShelters();
  }, []);

  const fetchResources = () => {
    setLoading(true);
    axios.get("http://localhost:8081/api/dashboard/resource")
      .then(res => {
        setResources(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const fetchShelters = () => {
    axios.get("http://localhost:8081/api/dashboard/shelters")
      .then(res => setShelters(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update
      axios.put(`http://localhost:8081/api/dashboard/resource/${formData.id}`, formData)
        .then(() => {
          fetchResources();
          setShowForm(false);
          setFormData({ id: null, type: "", quantity: 0, shelter_id: "" });
        });
    } else {
      // Add new
      axios.post("http://localhost:8081/api/dashboard/resource", formData)
        .then(() => {
          fetchResources();
          setShowForm(false);
          setFormData({ id: null, type: "", quantity: 0, shelter_id: "" });
        });
    }
  };

  const handleEdit = (resource) => {
    setFormData(resource);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      axios.delete(`http://localhost:8081/api/dashboard/resource/${id}`)
        .then(() => fetchResources());
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Resources</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              {showForm ? "Cancel" : "Add New Resource"}
            </button>
          </div>

          {/* Form for Add / Edit */}
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="type"
                  placeholder="Resource Type"
                  value={formData.type}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <select
                  name="shelter_id"
                  value={formData.shelter_id}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                >
                  <option value="">Select Shelter</option>
                  {shelters.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                {formData.id ? "Update Resource" : "Add Resource"}
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
              {resources.map(resource => {
                const shelter = shelters.find(s => s.id === resource.shelter_id);

                return (
                  <div
                    key={resource.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{resource.type}</h2>
                        <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          Qty: {resource.quantity}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 flex items-center">
                        📍 {shelter ? shelter.name : "Unknown Shelter"}
                      </p>

                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => handleEdit(resource)}
                          className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id)}
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

export default ResourcesPage;
