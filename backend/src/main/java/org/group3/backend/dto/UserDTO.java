package org.group3.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private String firstName;
    private String lastname;
    private String email;

    public UserDTO(String firstname, String lastname, String email) {
        this.firstName = firstname;
        this.lastname = lastname;
        this.email = email;
    }

}
