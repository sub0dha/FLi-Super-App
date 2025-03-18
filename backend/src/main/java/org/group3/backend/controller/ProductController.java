package org.group3.backend.controller;

import org.group3.backend.model.Product;
import org.group3.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {
    
    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/product")
    Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @GetMapping("/products")
    List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @PutMapping("/product/{id}")
    Product updateProduct(@RequestBody Product product, @PathVariable Long id) {
        return productRepository.findById(id)
                .map(existingProduct -> {
                    existingProduct.setName(product.getName());
                    existingProduct.setPrice(product.getPrice());
                    existingProduct.setDescription(product.getDescription());
                    existingProduct.setCategory(product.getCategory());
                    existingProduct.setStock_quantity(product.getStock_quantity());

                    return productRepository.save(existingProduct);
                })
                .orElseThrow(() ->
                        new RuntimeException("Product not found with id " + id));

    }

    @DeleteMapping("/product/{id}")
    String deleteProduct(@PathVariable Long id) {
            if(!productRepository.existsById(id)) {
                return "Product not found with id " + id;
            }
            productRepository.deleteById(id);
            return "Product with id" + id + " deleted";
        }
}