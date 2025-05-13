package org.group3.backend.controller;

import jakarta.validation.Valid;
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
            @Valid @RequestParam(value = "name") String name,
            @RequestParam(value = "description") String description,
            @Valid @RequestParam(value = "price") double price,
            @Valid @RequestParam(value = "category") String category,
            @Valid @RequestParam(value = "stock_quantity") int stock_quantity,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        ProductDTO newProduct = new ProductDTO(name, description, price, category, stock_quantity);
        Product savedProduct = productService.createProduct(newProduct, image);
        return ResponseEntity.ok(savedProduct);
    }


//    @PostMapping("/admin/products/add")
//    ResponseEntity<Product> addProduct(
//            @RequestPart("product") ProductDTO productDTO,
//            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
//        Product savedProduct = productService.createProduct(productDTO, imageFile);
//        return ResponseEntity.ok(savedProduct);
//    }

    @GetMapping({"/products", "/admin/products"})
    List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }

    @PutMapping(value = "/products/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> updateProductWithImage(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("category") String category,
            @RequestParam("stock_quantity") int stock_quantity,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        ProductDTO updateDTO = new ProductDTO(name, description, price, category, stock_quantity);
        Product updatedProduct = productService.updateProduct(id, updateDTO, image);
        return ResponseEntity.ok(updatedProduct);
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
    
    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(product -> ResponseEntity.ok(new ProductDTO(product)))
                .orElse(ResponseEntity.notFound().build());
    }


}