package org.group3.backend.service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.group3.backend.dto.ProductDTO;
import org.group3.backend.model.Product;
import org.group3.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final Path rootLocation = Paths.get("frontend/public/uploads/product-images");

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage", e);
        }
    }

    public Product createProduct(ProductDTO productDTO, MultipartFile imageFile) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setCategory(productDTO.getCategory());
        product.setStock_quantity(productDTO.getStock_quantity());

        if (imageFile != null && !imageFile.isEmpty()) {
            String imagePath = storeImage(imageFile);
            product.setImagePath(imagePath);
        }

        return productRepository.save(product);
    }

    private String storeImage(MultipartFile file) {
        try {
            String filename = StringUtils.cleanPath(
                    UUID.randomUUID() + "_" + file.getOriginalFilename()
            );

            Path destination = this.rootLocation.resolve(filename);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
            return destination.toString();

        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }
}
