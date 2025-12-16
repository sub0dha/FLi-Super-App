package org.group3.backend.controller;

import jakarta.transaction.Transactional;
import org.group3.backend.model.*;
import org.group3.backend.repository.CartRepository;
import org.group3.backend.repository.OrderRepository;
import org.group3.backend.repository.ProductRepository;
import org.group3.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.group3.backend.dto.OrderRequestDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCart(@PathVariable Long id) {
        return ResponseEntity.ok(cartService.getCart(id));
    }

    @PostMapping
    public ResponseEntity<Cart> createCart() {
        return ResponseEntity.ok(cartService.createCart());
    }

    @PostMapping("/{cartId}/items")
    public ResponseEntity<Cart> addItemToCart(
            @PathVariable Long cartId,
            @RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(cartService.addItemToCart(cartId, payload));
    }

    @PutMapping("/{cartId}/items/{productId}")
    public ResponseEntity<Cart> updateCartItemQuantity(
            @PathVariable Long cartId,
            @PathVariable Long productId,
            @RequestBody Map<String, Integer> payload) {
        return ResponseEntity.ok(cartService.updateCartItemQuantity(cartId, productId, payload.get("quantity")));
    }

    @DeleteMapping("/{cartId}/items/{productId}")
    public ResponseEntity<Cart> removeItemFromCart(
            @PathVariable Long cartId,
            @PathVariable Long productId) {
        return ResponseEntity.ok(cartService.removeItemFromCart(cartId, productId));
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<Cart> clearCart(@PathVariable Long cartId) {
        return ResponseEntity.ok(cartService.clearCart(cartId));
    }

    @PostMapping("/{cartId}/checkout")
    public ResponseEntity<Order> checkout(
            @PathVariable Long cartId,
            @RequestBody OrderRequestDTO orderRequest) {
        return new ResponseEntity<>(cartService.checkout(cartId, orderRequest), HttpStatus.CREATED);
    }
}
