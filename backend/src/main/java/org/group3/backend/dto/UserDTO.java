package org.group3.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phoneNumber;

    public UserDTO(String firstname, String lastname, String email, String address, String phoneNumber) {
        this.firstName = firstname;
        this.lastName = lastname;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

}
