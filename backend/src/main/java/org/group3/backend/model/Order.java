package org.group3.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "`order`")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String address;
    private String phone;
    private String email;
    private String deliveryMethod;
    private String paymentMethod;
    @Column(nullable = false)
    private String status = "PENDING";

    private Double totalPrice;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<OrderItem> items = new ArrayList<>();


    private LocalDateTime createdAt = LocalDateTime.now();

    public Order() {
    }
}
