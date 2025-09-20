package com.example.auth_demo.controller;

import com.example.auth_demo.model.Alert;
import com.example.auth_demo.model.Shelter;
import com.example.auth_demo.model.HelpRequest;
import com.example.auth_demo.model.Resource;
import com.example.auth_demo.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // ===============================
    // DASHBOARD STATS (Summary Cards)
    // ===============================
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        return dashboardService.getDashboardStats();
    }

    // ===============================
    // ALERTS
    // ===============================
    @GetMapping("/alerts")
    public List<Alert> getAlerts() {
        return dashboardService.getActiveAlerts();
    }

    // ===============================
    // SHELTERS CRUD
    // ===============================
    @GetMapping("/shelters")
    public List<Shelter> getShelters() {
        return dashboardService.getShelters();
    }
    @GetMapping("/resource")
    public List<Resource> getResources() {
        return dashboardService.getResources();
    }

    @GetMapping("/requests")
    public List<HelpRequest> getRequests() {
        return dashboardService.getHelpRequests();
    }
}
