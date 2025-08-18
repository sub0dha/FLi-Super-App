package org.group3.backend.repository;

import org.group3.backend.model.AdminEmail;
import org.springframework.data.jpa.repository.JpaRepository;

// backend/src/main/java/org/group3/backend/repository/AdminEmailRepository.java
public interface AdminEmailRepository extends JpaRepository<AdminEmail, String> {
    boolean existsByEmail(String email);
}

