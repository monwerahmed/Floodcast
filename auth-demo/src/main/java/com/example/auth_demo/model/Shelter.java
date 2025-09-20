package com.example.auth_demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "shelters")
public class Shelter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private String location;

    @Column(nullable=false)
    private int capacity;

    @Column(nullable=false)
    private int occupied;

    // Default constructor (JPA এর জন্য দরকার)
    public Shelter() {}

    // Parameterized constructor
    public Shelter(String name, String location, int capacity, int occupied) {
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.occupied = occupied;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

    public int getOccupied() { return occupied; }
    public void setOccupied(int occupied) { this.occupied = occupied; }
}
