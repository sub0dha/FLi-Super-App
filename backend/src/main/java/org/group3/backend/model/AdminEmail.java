package org.group3.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// backend/src/main/java/org/group3/backend/model/AdminEmail.java
@Entity
@Table(name = "admin_emails")
@Getter
@Setter
@NoArgsConstructor
public class AdminEmail {

    @Id
    @Column(unique = true, nullable = false)
    private String email;

    public AdminEmail(String email) {
        this.email = email;
    }
}

