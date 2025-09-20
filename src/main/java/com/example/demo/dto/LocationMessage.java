package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;

public class LocationMessage {

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;

    private String message;

    // username হবে token থেকে নেওয়া, frontend থেকে আর পাঠানোর দরকার নেই
    // private String username;

    // Getters & Setters
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
