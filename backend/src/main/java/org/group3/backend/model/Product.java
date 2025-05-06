package org.group3.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private double price;
    private String category;
    private double stock_quantity;
    @Column(length = 2048) // For longer file paths
    private String imagePath;

    public Product() {
    }
}