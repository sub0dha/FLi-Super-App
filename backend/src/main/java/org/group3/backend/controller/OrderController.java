package org.group3.backend.controller;

import org.group3.backend.model.Order;
import org.group3.backend.repository.OrderRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping()
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders() {
        var orders = orderRepository.findAll().stream().map(order -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", order.getId());
            map.put("fullName", order.getFullName());
            map.put("address", order.getAddress());
            map.put("email", order.getEmail());
            map.put("status", order.getStatus()); // assuming you have a status field
            map.put("totalPrice", order.getTotalPrice());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/admin/orders/{orderId}")
    public ResponseEntity<?> getOrderDetails(@PathVariable Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        // Convert to DTO to avoid infinite recursion with relationships
        Map<String, Object> response = new HashMap<>();
        response.put("id", order.getId());
        response.put("fullName", order.getFullName());
        response.put("address", order.getAddress());
        response.put("phone", order.getPhone());
        response.put("email", order.getEmail());
        response.put("deliveryMethod", order.getDeliveryMethod());
        response.put("paymentMethod", order.getPaymentMethod());
        response.put("totalPrice", order.getTotalPrice());
        response.put("items", order.getItems().stream().map(item -> {
            Map<String, Object> itemMap = new HashMap<>();
            itemMap.put("product", item.getProduct());
            itemMap.put("quantity", item.getQuantity());
            itemMap.put("subtotal", item.getSubtotal());
            return itemMap;
        }).collect(Collectors.toList()));

        return ResponseEntity.ok(response);
    }

    @PutMapping("/admin/orders/{orderId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> body) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        String newStatus = body.get("status");
        if (newStatus == null || (!newStatus.equalsIgnoreCase("PENDING") && !newStatus.equalsIgnoreCase("PROCESSED"))) {
            return ResponseEntity.badRequest().body("Invalid status value");
        }

        order.setStatus(newStatus.toUpperCase());
        orderRepository.save(order);

        return ResponseEntity.ok("Order status updated to " + newStatus);
    }

}

