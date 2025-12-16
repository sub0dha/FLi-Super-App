package org.group3.backend.service;

import org.group3.backend.model.Order;
import org.group3.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Map<String, Object> getOrderDetails(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

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

        return response;
    }

    public List<Map<String, Object>> getAllOrdersSummary() {
        return orderRepository.findAll().stream().map(order -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", order.getId());
            map.put("fullName", order.getFullName());
            map.put("address", order.getAddress());
            map.put("email", order.getEmail());
            map.put("status", order.getStatus());
            map.put("totalPrice", order.getTotalPrice());
            return map;
        }).collect(Collectors.toList());
    }

    public String updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        if (!newStatus.equalsIgnoreCase("PENDING") && !newStatus.equalsIgnoreCase("PROCESSED")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status value");
        }

        order.setStatus(newStatus.toUpperCase());
        orderRepository.save(order);
        return "Order status updated to " + newStatus;
    }
}
