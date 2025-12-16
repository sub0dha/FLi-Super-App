package org.group3.backend.controller;

import org.group3.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/orders/{orderId}")
    public ResponseEntity<?> getOrderDetails(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrderDetails(orderId));
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrdersSummary());
    }

    @PutMapping("/orders/{orderId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> body) {
        String newStatus = body.get("status");
        if (newStatus == null) {
            return ResponseEntity.badRequest().body("Status field is required");
        }
        String result = orderService.updateOrderStatus(orderId, newStatus);
        return ResponseEntity.ok(result);
    }
}
