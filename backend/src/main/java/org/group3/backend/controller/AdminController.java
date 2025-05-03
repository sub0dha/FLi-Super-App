package org.group3.backend.controller;

import lombok.RequiredArgsConstructor;
import org.group3.backend.model.AdminEmail;
import org.group3.backend.repository.AdminEmailRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// backend/src/main/java/org/group3/backend/controller/AdminController.java
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminEmailRepository adminEmailRepository;

    @PostMapping("/emails")
    public ResponseEntity<?> addAdminEmail(@RequestBody String email) {
        AdminEmail adminEmail = new AdminEmail(email);
        adminEmailRepository.save(adminEmail);
        return ResponseEntity.ok().build();
    }
}

