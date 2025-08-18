package org.group3.backend.service;

import jakarta.transaction.Transactional;
import org.group3.backend.dto.OrderRequestDTO;
import org.group3.backend.model.*;
import org.group3.backend.repository.CartRepository;
import org.group3.backend.repository.OrderRepository;
import org.group3.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CartService {

    @Autowired private CartRepository cartRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private OrderRepository orderRepository;
    @Autowired private EmailService emailService;

    public Cart getCart(Long id) {
        return cartRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart not found"));
    }

    public Cart createCart() {
        return cartRepository.save(new Cart());
    }

    @Transactional
    public Cart addItemToCart(Long cartId, Map<String, Object> payload) {
        Long productId = Long.parseLong(payload.get("productId").toString());
        int quantity = Integer.parseInt(payload.get("quantity").toString());

        Cart cart = getCart(cartId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        if (product.getStock_quantity() < quantity) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not enough stock available");
        }

        cart.addItem(new CartItem(product, quantity));
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart updateCartItemQuantity(Long cartId, Long productId, int quantity) {
        Cart cart = getCart(cartId);
        cart.updateItemQuantity(productId, quantity);
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart removeItemFromCart(Long cartId, Long productId) {
        Cart cart = getCart(cartId);
        cart.removeItem(productId);
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart clearCart(Long cartId) {
        Cart cart = getCart(cartId);
        cart.clear();
        return cartRepository.save(cart);
    }

    @Transactional
    public Order checkout(Long cartId, OrderRequestDTO orderRequest) {
        Cart cart = getCart(cartId);
        if (cart.getItems().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cart is empty");
        }

        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();
            if (product.getStock_quantity() < cartItem.getQuantity()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Not enough stock for product: " + product.getName());
            }
        }

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

            Product product = cartItem.getProduct();
            product.setStock_quantity(product.getStock_quantity() - cartItem.getQuantity());
            productRepository.save(product);
        }

        order.setItems(orderItems);
        Order savedOrder = orderRepository.save(order);
        cart.clear();
        cartRepository.save(cart);

        String emailContent = buildOrderConfirmationEmail(savedOrder);
        emailService.sendOrderConfirmationEmail(savedOrder.getEmail(), emailContent);

        return savedOrder;
    }

    private String buildOrderConfirmationEmail(Order order) {
        StringBuilder content = new StringBuilder("Order Summary:\n");
        for (OrderItem item : order.getItems()) {
            content.append(item.getProduct().getName()).append(" x ")
                   .append(item.getQuantity()).append(" = Rs. ")
                   .append(item.getSubtotal()).append("\n");
        }
        content.append("\nTotal: Rs. ").append(order.getTotalPrice());
        content.append("\n\nDelivery Address: ").append(order.getAddress());
        content.append("\n\nWe'll contact you at ").append(order.getPhone()).append(" for delivery.");
        return content.toString();
    }
}
