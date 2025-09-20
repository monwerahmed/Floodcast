import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const FloodCast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [floodAlerts, setFloodAlerts] = useState([]);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  
  const navigate = useNavigate();

  // -------- Weather API Config --------
  const API_KEY = "b247f205f007843b144acd7e59e0ed16";
  const CITY = "Dhaka,BD";
  const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(WEATHER_URL);
      const data = await response.json();
      const weather = {
        location: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        rainfall: data.rain ? `${data.rain["1h"] || 0} mm` : "0 mm",
        forecast: `Weather: ${data.weather[0].description}`
      };
      setWeatherData(weather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // -------- Fetch Flood Alerts from API --------
  const fetchFloodAlerts = async () => {
    try {
      setLoadingAlerts(true);
      const response = await fetch('http://localhost:8081/api/dashboard/alert/');
      if (!response.ok) {
        throw new Error('Failed to fetch alerts');
      }
      const data = await response.json();
      setFloodAlerts(data);
      setLoadingAlerts(false);
    } catch (error) {
      console.error("Error fetching flood alerts:", error);
      setLoadingAlerts(false);
      
      // Fallback to dummy data if API fails
      setFloodAlerts([
        { id: 1, area: 'Northern Districts', level: 'High', created_at: new Date(Date.now() - 2*60*60*1000).toISOString() },
        { id: 2, area: 'Central Basin', level: 'Medium', created_at: new Date(Date.now() - 5*60*60*1000).toISOString() },
        { id: 3, area: 'Southern Region', level: 'Low', created_at: new Date(Date.now() - 12*60*60*1000).toISOString() }
      ]);
    }
  };

  // Format time difference for display
  const formatTimeDifference = (dateString) => {
    const now = new Date();
    const alertDate = new Date(dateString);
    const diffMs = now - alertDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffMinutes} minutes ago`;
    }
  };

  // Handle emergency call
  const handleEmergencyCall = () => {
    window.location.href = 'tel:999';
  };

  // Handle navigation to resource pages
  const handleResourceNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // Initial fetch
    fetchWeatherData();
    fetchFloodAlerts();

    // Set intervals
    const weatherInterval = setInterval(fetchWeatherData, 300000); // 5 min
    const alertsInterval = setInterval(fetchFloodAlerts, 600000); // 10 min

    return () => {
      clearInterval(weatherInterval);
      clearInterval(alertsInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">FloodCast</div>
          <div className="space-x-4">
            <a href="#alerts" className="hover:underline">Alerts</a>
            <a href="#resources" className="hover:underline">Resources</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Flood Cast
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Real-time Flood Emergency Response. Providing critical flood alerts, weather information, and resources to affected communities, NGOs, and government agencies.
            </p>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
              onClick={handleEmergencyCall}
            >
              New Alert of flood or rever erosion?
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Current Weather</h2>
              {weatherData ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold">{weatherData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temperature:</span>
                    <span className="font-semibold">{weatherData.temperature}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Condition:</span>
                    <span className="font-semibold">{weatherData.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Humidity:</span>
                    <span className="font-semibold">{weatherData.humidity}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rainfall:</span>
                    <span className="font-semibold">{weatherData.rainfall}</span>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-800">{weatherData.forecast}</p>
                  </div>
                </div>
              ) : (
                <p>Loading weather data...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Flood Alerts Section */}
      <section id="alerts" className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Current Flood Alerts</h2>
          <div className="text-center mb-4">
            <Link to="/alertopen" className="text-blue-600 hover:text-blue-800 font-medium">
              View All Alerts &rarr;
            </Link>
          </div>
          
          {loadingAlerts ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {floodAlerts.slice(0, 3).map(alert => (
                <div key={alert.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{alert.area}</h3>
                    <span className={`px-3 py-1 rounded-full text-white ${
                      alert.level === 'High' || alert.level === 'high' ? 'bg-red-500' : 
                      alert.level === 'Medium' || alert.level === 'medium' ? 'bg-orange-500' : 
                      alert.level === 'Critical' || alert.level === 'critical' ? 'bg-purple-500' : 'bg-yellow-500'
                    }`}>
                      {alert.level}
                    </span>
                  </div>
                  <p className="text-gray-600">Updated: {formatTimeDifference(alert.created_at)}</p>
                  <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                    View Details &rarr;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Emergency Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-blue-600 text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold mb-2">Emergency Contacts</h3>
              <p className="text-gray-600">Immediate help numbers for flood affected areas</p>
              <button 
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                onClick={handleEmergencyCall}
              >
                Call 999 &rarr;
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-blue-600 text-4xl mb-4">🛟</div>
              <h3 className="text-xl font-bold mb-2">Rescue Requests</h3>
              <p className="text-gray-600">Request emergency evacuation and rescue</p>
              <button 
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => handleResourceNavigation('/relief')}
              >
                Request Help &rarr;
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-blue-600 text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-bold mb-2">Medical Aid</h3>
              <p className="text-gray-600">Find medical facilities and assistance</p>
              <button 
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => handleResourceNavigation('/medical')}
              >
                Get Medical Aid &rarr;
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-blue-600 text-4xl mb-4">🍞</div>
              <h3 className="text-xl font-bold mb-2">Supplies & Relief</h3>
              <p className="text-gray-600">Locate food, water and essential supplies</p>
              <button 
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => handleResourceNavigation('/suply')}
              >
                Find Supplies &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <section id="about" className="py-12">
              <h3 className="text-xl font-bold mb-4">FloodCast</h3>
              <p>Providing critical flood emergency response information to communities, NGOs and government agencies.</p>
            </section>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#alerts" className="hover:underline">Flood Alerts</a></li>
                <li><a href="/resourceopen" className="hover:underline">Emergency Resources</a></li>
                <li><a href="/" className="hover:underline">About Us</a></li>
                <li><a href="#contact" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <section id="contact"></section>
              <h3 className="text-xl font-bold mb-4">Developers</h3>
              <div className="flex space-x-4 items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white bg-blue-700 flex items-center justify-center">
                  <img 
                  src="/images/suk.png" 
                  alt="Sukanta Nag Hirock"
                  className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Sukanta Nag Hirock</h4>
                  <p>Developer</p>
                  <p>sukantanagh@gmail.com</p>
                </div>
              </div>
              <div className="flex space-x-4 items-center mt-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white bg-blue-700 flex items-center justify-center">
                  <img 
                  src="/images/dipu.jpg" 
                  alt="Monwer Ahmed Dipu"
                  className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Monwer Ahmed Dipu</h4>
                  <p>Developer</p>
                  <p>monwerahmad55@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} FloodCast. All rights reserved by the Developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FloodCast;