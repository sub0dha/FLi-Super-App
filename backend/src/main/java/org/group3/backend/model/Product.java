package org.group3.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private String category;
    private double stock_quantity;

    @Column(length = 2048)
    private String imagePath;

    @Enumerated(EnumType.STRING)
    private ProductStatus status = ProductStatus.AVAILABLE; // default status

    public Product(String name, String description, double price, String category, int stockQuantity) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.stock_quantity = stockQuantity;
    }
}
