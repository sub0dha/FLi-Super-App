package org.group3.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<CartItem> items = new ArrayList<>();

    private double totalPrice;

    @Column(nullable = false)
    private double discountedTotalPrice = 0.0;

    public Cart() {
        this.totalPrice = 0.0;
        this.discountedTotalPrice = 0.0;
    }

    public void addItem(CartItem item) {
        // Check if product already exists in cart
        for (CartItem existingItem : this.items) {
            if (existingItem.getProduct().getId() == item.getProduct().getId()) {
                existingItem.setQuantity(existingItem.getQuantity() + item.getQuantity());
                recalculateTotalPrice();
                return;
            }
        }

        // If product doesn't exist, add as new item
        this.items.add(item);
        recalculateTotalPrice();
    }

    public void updateItemQuantity(Long productId, int quantity) {
        for (CartItem item : this.items) {
            if (item.getProduct().getId() == productId) {
                item.setQuantity(quantity);
                recalculateTotalPrice();
                return;
            }
        }
    }

    public void removeItem(Long productId) {
        this.items.removeIf(item -> item.getProduct().getId() == productId);
        recalculateTotalPrice();
    }

    public void clear() {
        this.items.clear();
        this.totalPrice = 0.0;
    }

    private void recalculateTotalPrice() {
        this.totalPrice = 0.0;
        for (CartItem item : this.items) {
            this.totalPrice += item.getSubtotal();
        }
    }
}