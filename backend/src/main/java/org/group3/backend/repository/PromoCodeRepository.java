package org.group3.backend.repository;

import org.group3.backend.model.PromoCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PromoCodeRepository extends JpaRepository<PromoCode, Long> {
    Optional<PromoCode> findByCode(String code);
    List<PromoCode> findAllByActiveTrue();
}

