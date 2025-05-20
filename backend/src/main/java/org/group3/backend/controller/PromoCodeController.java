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

    // Get all promo codes (admin)
    @GetMapping
    public List<PromoCode> getAllPromoCodes() {
        return promoCodeRepository.findAll();
    }

    // Get all active promo codes (for display)
    @GetMapping("/active")
    public List<PromoCode> getActivePromoCodes() {
        return promoCodeRepository.findAllByActiveTrue();
    }

    // Get single promo code by ID
    @GetMapping("/{id}")
    public ResponseEntity<PromoCode> getPromoCodeById(@PathVariable Long id) {
        return promoCodeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create new promo code
    @PostMapping
    public PromoCode createPromoCode(@RequestBody PromoCode promoCode) {
        return promoCodeRepository.save(promoCode);
    }

    // Update existing promo code
    @PutMapping("/{id}")
    public ResponseEntity<PromoCode> updatePromoCode(
            @PathVariable Long id,
            @RequestBody PromoCode promoCodeDetails) {
        return promoCodeRepository.findById(id)
                .map(promo -> {
                    promo.setCode(promoCodeDetails.getCode());
                    promo.setTitle(promoCodeDetails.getTitle());
                    promo.setDescription(promoCodeDetails.getDescription());
                    promo.setDiscountPercentage(promoCodeDetails.getDiscountPercentage());
                    promo.setStartDate(promoCodeDetails.getStartDate());
                    promo.setEndDate(promoCodeDetails.getEndDate());
                    promo.setActive(promoCodeDetails.isActive());
                    PromoCode updatedPromo = promoCodeRepository.save(promo);
                    return ResponseEntity.ok(updatedPromo);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete promo code
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePromoCode(@PathVariable Long id) {
        return promoCodeRepository.findById(id)
                .map(promo -> {
                    promoCodeRepository.delete(promo);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
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