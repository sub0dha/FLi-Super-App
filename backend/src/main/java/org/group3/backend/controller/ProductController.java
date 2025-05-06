package org.group3.backend.controller;

import org.group3.backend.dto.ProductDTO;
import org.group3.backend.model.Product;
import org.group3.backend.repository.ProductRepository;
import org.group3.backend.service.ProductService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductService productService;

    public ProductController(ProductRepository productRepository, ProductService productService) {
        this.productRepository = productRepository;
        this.productService = productService;
    }

    @PostMapping(value = "products/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> addProduct(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("category") String category,
            @RequestParam("stock_quantity") int stock_quantity,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        ProductDTO newProduct = new ProductDTO(name, description, price, category, stock_quantity);
        Product savedProduct = productService.createProduct(newProduct, image);
        return ResponseEntity.ok(productRepository.save(savedProduct));
    }


    @PostMapping("/admin/products/add")
    ResponseEntity<Product> addProduct(
            @RequestPart("product") ProductDTO productDTO,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
        Product savedProduct = productService.createProduct(productDTO, imageFile);
        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping({"/products", "/admin/products"})
    List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }

    @PutMapping("/products/{id}")
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

    @DeleteMapping("/products/{id}")
    String deleteProduct(@PathVariable Long id) {
        if (!productRepository.existsById(id)) {
            return "Product not found with id " + id;
        }
        productRepository.deleteById(id);
        return "Product with id" + id + " deleted";
    }

    @GetMapping({"/products/", "/admin/products/"})
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String query) {
        List<Product> results = productService.searchProducts(query);
        return ResponseEntity.ok(results);
    }

}