import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";
import "./Map.css";  // 🔹 CSS import

const mapContainerStyle = { width: "100%", height: "500px" };
const center = { lat: 23.8103, lng: 90.4125 }; // Dhaka

export default function Map() {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [sharing, setSharing] = useState(false);
  const clientRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBgUJRZj3SoUKyVeIITRIq80nu0w-aCji0",
  });

  useEffect(() => {
    if (!token) {
      alert("You must login to access the map!");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");
        client.subscribe("/topic/locations", (message) => {
          const loc = JSON.parse(message.body);
          setLocations((prev) => {
            if (
              currentLocation &&
              loc.latitude === currentLocation.latitude &&
              loc.longitude === currentLocation.longitude
            ) return prev;
            return [...prev, loc];
          });
        });
      },
      onStompError: (frame) => console.error("⚠️ Broker error:", frame.headers["message"]),
    });

    client.activate();
    clientRef.current = client;

    return () => clientRef.current?.deactivate();
  }, [currentLocation, token]);

  const shareLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          message: "My current location",
        };
        setCurrentLocation(loc);
        setLocations((prev) => [...prev, loc]);

        if (clientRef.current?.connected) {
          clientRef.current.publish({
            destination: "/app/shareLocation",
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify(loc),
          });
          setSharing(true);
        } else {
          console.error("⚠️ WebSocket not connected");
        }
      },
      (err) => alert("Failed to get current location")
    );
  };

  if (!token) return null;
  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="map-container">
  <button onClick={shareLocation} className="map-button">
    {sharing ? "Shared" : "Share My Location"}
  </button>
  <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
    {locations.map((loc, idx) => (
      <Marker key={idx} position={{ lat: loc.latitude, lng: loc.longitude }} />
    ))}
  </GoogleMap>
</div>

  );
}
