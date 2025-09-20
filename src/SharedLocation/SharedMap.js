// src/SharedLocation/SharedMap.js
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const mapContainerStyle = { width: "100%", height: "500px" };
const defaultCenter = { lat: 23.8103, lng: 90.4125 }; // Dhaka

export default function SharedMap({ locations }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBgUJRZj3SoUKyVeIITRIq80nu0w-aCji0", // এখানে তোমার API key বসাও
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={
        locations.length > 0
          ? { lat: locations[locations.length - 1].latitude, lng: locations[locations.length - 1].longitude }
          : defaultCenter
      }
    >
      {locations.map((loc, idx) => (
        <Marker
          key={idx}
          position={{ lat: loc.latitude, lng: loc.longitude }}
          title={loc.message || `User ${idx + 1}`}
          icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        />
      ))}
    </GoogleMap>
  );
}
