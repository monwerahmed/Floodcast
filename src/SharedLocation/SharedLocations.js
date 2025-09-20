import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import "./SharedLocations.css";  // 🔹 CSS import

const defaultCenter = { lat: 23.8103, lng: 90.4125 };

export default function SharedLocations() {
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBgUJRZj3SoUKyVeIITRIq80nu0w-aCji0",
  });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("http://localhost:8080/locations");
        setLocations(res.data);
      } catch (err) {
        console.error("Failed to fetch shared locations:", err);
      }
    };
    fetchLocations();
    const interval = setInterval(fetchLocations, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="shared-container">
      <h2>Shared User Locations</h2>
      <GoogleMap
        mapContainerClassName="shared-map"
        zoom={12}
        center={defaultCenter}
      >
        {locations.map((loc, idx) => (
          <Marker
            key={idx}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            onClick={() => setSelected(loc)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h4>{selected.username}</h4>
              <p>{selected.message}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
