package com.example.auth_demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type; // resource type, যেমন water, food, medicine

    @Column(nullable = false)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "shelter_id", nullable = false)
    private Shelter shelter; // relation to Shelter

    // Default constructor
    public Resource() {}

    // Parameterized constructor
    public Resource(String type, int quantity, Shelter shelter) {
        this.type = type;
        this.quantity = quantity;
        this.shelter = shelter;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public Shelter getShelter() { return shelter; }
    public void setShelter(Shelter shelter) { this.shelter = shelter; }
}
