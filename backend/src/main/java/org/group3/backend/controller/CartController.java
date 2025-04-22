package org.group3.backend.controller;

import org.group3.backend.dto.*;
import org.group3.backend.model.*;
import org.group3.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    // Get current user's cart
    @GetMapping
    public ResponseEntity<CartDTO> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        User user = getUserFromUserDetails(userDetails);
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> createNewCart(user));

        return ResponseEntity.ok(mapCartToDTO(cart));
    }

    // Add item to cart
    @PostMapping("/add")
    public ResponseEntity<CartDTO> addToCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody AddToCartRequest request
    ) {
        User user = getUserFromUserDetails(userDetails);
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> createNewCart(user));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Update or add item
        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId() == product.getId()) // Use == instead of equals()
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity());
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(request.getQuantity());
            cart.getItems().add(newItem);
        }

        cart.calculateTotal();
        cartRepository.save(cart);

        return ResponseEntity.ok(mapCartToDTO(cart));
    }

    // Remove item from cart
    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<CartDTO> removeItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long itemId
    ) {
        User user = getUserFromUserDetails(userDetails);
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        cart.getItems().remove(item);
        cartItemRepository.delete(item);

        cart.calculateTotal();
        cartRepository.save(cart);

        return ResponseEntity.ok(mapCartToDTO(cart));
    }

    // Helper: Fetch user from Spring Security's UserDetails
    private User getUserFromUserDetails(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Helper: Create a new cart for a user
    private Cart createNewCart(User user) {
        Cart newCart = new Cart();
        newCart.setUser(user);
        return cartRepository.save(newCart);
    }

    // Helper: Convert Cart to DTO
    private CartDTO mapCartToDTO(Cart cart) {
        CartDTO dto = new CartDTO();
        dto.setId(cart.getId());
        dto.setTotalPrice(cart.getTotalPrice());

        List<CartItemDTO> itemDTOs = cart.getItems().stream().map(item -> {
            CartItemDTO itemDTO = new CartItemDTO();
            itemDTO.setId(item.getId());
            itemDTO.setProductId(item.getProduct().getId());
            itemDTO.setProductName(item.getProduct().getName());
            itemDTO.setPrice(item.getProduct().getPrice());
            itemDTO.setQuantity(item.getQuantity());
            return itemDTO;
        }).collect(Collectors.toList());

        dto.setItems(itemDTOs);
        return dto;
    }
}