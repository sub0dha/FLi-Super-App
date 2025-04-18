package org.group3.backend.controller;

import lombok.RequiredArgsConstructor;
import org.group3.backend.dto.UserDTO;
import org.group3.backend.dto.UserUpdateRequest;
import org.group3.backend.model.User;
import org.group3.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/profile")
    public UserDTO getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        System.out.println("UserDetails: " + userDetails);
        if (userDetails == null) {
            throw new RuntimeException("User not authenticated");
        }

        // Assuming JWT subject = email
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDTO(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getAddress(),
                user.getPhoneNumber()
        );
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDTO> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UserUpdateRequest updateRequest) {

        if (userDetails == null) {
            throw new RuntimeException("User not authenticated");
        }

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updateRequest.getFirstName() != null) {
            user.setFirstName(updateRequest.getFirstName());
        }

        if (updateRequest.getLastName() != null) {
            user.setLastName(updateRequest.getLastName());
        }

        if (updateRequest.getEmail() != null && !updateRequest.getEmail().equals(user.getEmail())) {
            if (userRepository.findByEmail(updateRequest.getEmail()).isPresent()) {
                throw new RuntimeException("Email already in use");
            }
            user.setEmail(updateRequest.getEmail());
        }

        if (updateRequest.getPhoneNumber() != null) {
            user.setPhoneNumber(updateRequest.getPhoneNumber());
        }

        if (updateRequest.getAddress() != null) {
            user.setAddress(updateRequest.getAddress());
        }

        // Save the updated user
        User updatedUser = userRepository.save(user);

        // Return the updated user info
        return ResponseEntity.ok(new UserDTO(
                updatedUser.getFirstName(),
                updatedUser.getLastName(),
                updatedUser.getEmail(),
                updatedUser.getAddress(),
                updatedUser.getPhoneNumber()
        ));
    }
}