package org.group3.backend.controller;

import org.group3.backend.model.Product;
import org.group3.backend.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/search")
    public List<Product> getProducts(@RequestParam(value = "q", required = false) String query) {
        if (query != null && !query.trim().isEmpty()) {
            // Use the custom repository method to search products
            return productRepository.findByNameContainingIgnoreCase(query);
        }
        // Return all products if no search query is provided or if it's empty
        return productRepository.findAll();
    }

    @PostMapping("/add")
    Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

     @GetMapping
     List<Product> getAllProducts() {
         return productRepository.findAll();
     }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @PutMapping("/{id}")
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

    @DeleteMapping("/{id}")
    String deleteProduct(@PathVariable Long id) {
        if (!productRepository.existsById(id)) {
            return "Product not found with id " + id;
        }
        productRepository.deleteById(id);
        return "Product with id" + id + " deleted";
    }
}
