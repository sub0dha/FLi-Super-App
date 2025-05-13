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

    private final CartRepository cartRepository;

    private final ProductRepository productRepository;

    public CartController(CartRepository cartRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    @Autowired
    private EmailService emailService;

    @Autowired
    private OrderRepository orderRepository;

    // Get cart by id
    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCart(@PathVariable Long id) {
        Optional<Cart> cart = cartRepository.findById(id);
        return cart.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
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

    // checkout
    @PostMapping("/{cartId}/checkout")
    @Transactional
    public ResponseEntity<?> checkout(
            @PathVariable Long cartId,
            @RequestBody OrderRequestDTO orderRequest) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cart is empty");
        }

        // Check stock before proceeding
        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();
            if (product.getStock_quantity() < cartItem.getQuantity()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Not enough stock for product: " + product.getName());
            }
        }

        // Create and save order
        Order order = new Order();
        order.setFullName(orderRequest.getFullName());
        order.setAddress(orderRequest.getAddress());
        order.setPhone(orderRequest.getPhone());
        order.setEmail(orderRequest.getEmail());
        order.setDeliveryMethod(orderRequest.getDeliveryMethod());
        order.setPaymentMethod(orderRequest.getPaymentMethod());
        order.setTotalPrice(cart.getTotalPrice());

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setSubtotal(cartItem.getSubtotal());
            orderItems.add(orderItem);

            // Update product stock
            Product product = cartItem.getProduct();
            product.setStock_quantity(product.getStock_quantity() - cartItem.getQuantity());
            productRepository.save(product);
        }

        order.setItems(orderItems);
        Order savedOrder = orderRepository.save(order);

        // Clear cart after successful checkout
        cart.clear();
        cartRepository.save(cart);

        // Send confirmation email
        String emailContent = buildOrderConfirmationEmail(savedOrder);
        emailService.sendOrderConfirmationEmail(savedOrder.getEmail(), emailContent);

        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    private String buildOrderConfirmationEmail(Order order) {
        StringBuilder emailContent = new StringBuilder();
        emailContent.append("Order Summary:\n");

        for (OrderItem item : order.getItems()) {
            emailContent.append(item.getProduct().getName())
                    .append(" x ").append(item.getQuantity())
                    .append(" = Rs. ").append(item.getSubtotal()).append("\n");
        }

        emailContent.append("\nTotal: Rs. ").append(order.getTotalPrice());
        emailContent.append("\n\nDelivery Address: ").append(order.getAddress());
        emailContent.append("\n\nWe'll contact you at ").append(order.getPhone()).append(" for delivery.");

        return emailContent.toString();
    }
}