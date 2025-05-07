package org.group3.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequestDTO {
    private String fullName;
    private String address;
    private String phone;
    private String email;
    private String deliveryMethod;
    private String paymentMethod;
}
