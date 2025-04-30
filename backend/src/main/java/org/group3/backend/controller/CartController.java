package org.group3.backend.controller;

import jakarta.transaction.Transactional;
import org.group3.backend.model.Cart;
import org.group3.backend.model.CartItem;
import org.group3.backend.model.Product;
import org.group3.backend.repository.CartItemRepository;
import org.group3.backend.repository.CartRepository;
import org.group3.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    // Get cart by id
    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCart(@PathVariable Long id) {
        Optional<Cart> cart = cartRepository.findById(id);
        if (cart.isPresent()) {
            return ResponseEntity.ok(cart.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Create a new cart
    @PostMapping
    public ResponseEntity<Cart> createCart() {
        Cart newCart = new Cart();
        return ResponseEntity.ok(cartRepository.save(newCart));
    }

    // Add item to cart
    @PostMapping("/{cartId}/items")
    @Transactional
    public ResponseEntity<Cart> addItemToCart(
            @PathVariable Long cartId,
            @RequestBody Map<String, Object> payload) {

        Long productId = Long.parseLong(payload.get("productId").toString());
        int quantity = Integer.parseInt(payload.get("quantity").toString());

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        if (product.getStock_quantity() < quantity) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not enough stock available");
        }

        CartItem cartItem = new CartItem(product, quantity);
        cart.addItem(cartItem);

        return ResponseEntity.ok(cartRepository.save(cart));
    }

    // Update item quantity in cart
    @PutMapping("/{cartId}/items/{productId}")
    @Transactional
    public ResponseEntity<Cart> updateCartItemQuantity(
            @PathVariable Long cartId,
            @PathVariable Long productId,
            @RequestBody Map<String, Integer> payload) {

        int quantity = payload.get("quantity");

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart not found"));

        cart.updateItemQuantity(productId, quantity);

        return ResponseEntity.ok(cartRepository.save(cart));
    }

    // Remove item from cart
    @DeleteMapping("/{cartId}/items/{productId}")
    @Transactional
    public ResponseEntity<Cart> removeItemFromCart(
            @PathVariable Long cartId,
            @PathVariable Long productId) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart not found"));

        cart.removeItem(productId);

        return ResponseEntity.ok(cartRepository.save(cart));
    }

    // Clear cart
    @DeleteMapping("/{cartId}")
    @Transactional
    public ResponseEntity<Cart> clearCart(@PathVariable Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart not found"));

        cart.clear();

        return ResponseEntity.ok(cartRepository.save(cart));
    }
}