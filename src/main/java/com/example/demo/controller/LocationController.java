package com.example.demo.controller;

import com.example.demo.config.JwtUtil;
import com.example.demo.dto.LocationMessage;
import com.example.demo.entity.LocationShare;
import com.example.demo.service.LocationShareService;
import org.springframework.messaging.handler.annotation.Header;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LocationController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private LocationShareService locationShareService;

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public LocationController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // WebSocket endpoint
    @MessageMapping("/shareLocation")
    public void handleLocation(@Valid LocationMessage msg, @Header("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7); // Remove "Bearer "
            String username = jwtUtil.extractUsername(token);

            LocationShare entity = new LocationShare();
            entity.setLatitude(msg.getLatitude());
            entity.setLongitude(msg.getLongitude());
            entity.setMessage(msg.getMessage());
            entity.setUsername(username);
            locationShareService.saveLocation(entity);

            messagingTemplate.convertAndSend("/topic/locations", entity);
        } catch (Exception e) {
            System.out.println("Invalid token for WebSocket: " + e.getMessage());
        }
    }

    // REST API to fetch all locations
    @GetMapping("/locations")
    public List<LocationShare> getAllLocations() {
        return locationShareService.getAllLocations();
    }
}
