package org.group3.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Product product;

    private int quantity;

    public Cart() {
        this.quantity = 1;
    }

    public Cart(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public double getSubtotal() {
        return product.getPrice() * quantity;
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
}
