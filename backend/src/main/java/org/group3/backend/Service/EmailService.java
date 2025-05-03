package org.group3.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOrderConfirmationEmail(String to, String orderDetails) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("mnaveeth45@gmail.com");
        message.setTo(to);
        message.setSubject("Order Confirmation");
        message.setText("Thank you for your order!\n\n" + orderDetails);

        mailSender.send(message);
    }
}
