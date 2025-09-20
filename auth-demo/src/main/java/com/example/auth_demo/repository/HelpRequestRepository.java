package com.example.auth_demo.repository;

import com.example.auth_demo.model.HelpRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HelpRequestRepository extends JpaRepository<HelpRequest, Long> {
    long countByStatus(HelpRequest.Status status);
}
