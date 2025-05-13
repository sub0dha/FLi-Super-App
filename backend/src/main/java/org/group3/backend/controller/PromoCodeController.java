package org.group3.backend.controller;

import org.group3.backend.model.PromoCode;
import org.group3.backend.repository.PromoCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/promocodes")
public class PromoCodeController {
    @Autowired
    private PromoCodeRepository promoCodeRepository;

    // Get all active promo codes (for display)
    @GetMapping("/active")
    public List<PromoCode> getActivePromoCodes() {
        return promoCodeRepository.findAllByActiveTrue();
    }

    // Validate a promo code
    @GetMapping("/validate/{code}")
    public ResponseEntity<?> validatePromoCode(@PathVariable String code) {
        Optional<PromoCode> optional = promoCodeRepository.findByCode(code);

        if (optional.isPresent()) {
            PromoCode promo = optional.get();
            LocalDate now = LocalDate.now();
            if (promo.isActive() && !now.isBefore(promo.getStartDate()) && !now.isAfter(promo.getEndDate())) {
                return ResponseEntity.ok(promo);
            }
        }

        return ResponseEntity.badRequest().body("Invalid or expired promo code.");
    }

}
