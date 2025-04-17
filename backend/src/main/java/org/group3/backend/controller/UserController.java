package org.group3.backend.controller;

import lombok.RequiredArgsConstructor;
import org.group3.backend.dto.UserDTO;
import org.group3.backend.model.User;
import org.group3.backend.repository.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/profile")
    public UserDTO getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            throw new RuntimeException("User not authenticated");
        }

        // Assuming JWT subject = email
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDTO(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
        );
    }
}
