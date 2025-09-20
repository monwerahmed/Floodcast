package com.example.auth_demo.service;

import com.example.auth_demo.model.Alert;
import com.example.auth_demo.model.Shelter;
import com.example.auth_demo.model.Resource;
import com.example.auth_demo.model.HelpRequest;
import com.example.auth_demo.repository.AlertRepository;
import com.example.auth_demo.repository.ShelterRepository;
import com.example.auth_demo.repository.HelpRequestRepository;
import com.example.auth_demo.repository.ResourceRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {
    private final AlertRepository alertRepository;
    private final ShelterRepository shelterRepository;
    private final HelpRequestRepository requestRepository;
    private final ResourceRepository resourceRepository;

    public DashboardService(AlertRepository alertRepository,
                            ShelterRepository shelterRepository,
                            HelpRequestRepository requestRepository, ResourceRepository resourceRepository) {
        this.alertRepository = alertRepository;
        this.shelterRepository = shelterRepository;
        this.requestRepository = requestRepository;
        this.resourceRepository = resourceRepository;  
    }

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalShelters", shelterRepository.count());
        stats.put("activeAlerts", alertRepository.count());
        stats.put("pendingRequests", requestRepository.countByStatus(HelpRequest.Status.PENDING));
        return stats;
    }

    public List<Alert> getActiveAlerts() {
        return alertRepository.findAll();
    }

    public List<Shelter> getShelters() {
        return shelterRepository.findAll();
    }

    public List<HelpRequest> getHelpRequests() {
        return requestRepository.findAll();
    }
    public List<Resource> getResources() {
        return resourceRepository.findAll();
    }
}
