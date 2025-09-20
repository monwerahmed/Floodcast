package com.example.auth_demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "requests")
public class HelpRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private int peopleCount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Urgency urgency;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Urgency {
        LOW, MEDIUM, HIGH
    }

    public enum Status {
        PENDING, IN_PROGRESS, RESOLVED
    }

    // Default constructor
    public HelpRequest() {}

    // Parameterized constructor
    public HelpRequest(String location, int peopleCount, Urgency urgency, Status status, LocalDateTime createdAt) {
        this.location = location;
        this.peopleCount = peopleCount;
        this.urgency = urgency;
        this.status = status;
        this.createdAt = createdAt; // <-- semicolon fixed
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLocation() { return location; } // fixed method name
    public void setLocation(String location) { this.location = location; }

    public int getPeopleCount() { return peopleCount; } // fixed method name
    public void setPeopleCount(int peopleCount) { this.peopleCount = peopleCount; }

    public Urgency getUrgency() { return urgency; }
    public void setUrgency(Urgency urgency) { this.urgency = urgency; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
