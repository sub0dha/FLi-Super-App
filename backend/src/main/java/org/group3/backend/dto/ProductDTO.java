package org.group3.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import org.group3.backend.model.Product;

@Getter
@Setter
public class ProductDTO {
    private Long id;
   @NotBlank
   private String name;
    private String description;
    @Positive
    private double price;
    @NotBlank private String category;
    @Min(0) private double stock_quantity;
    private String imageUrl;
    private boolean inStock;

    public ProductDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.category = product.getCategory();
        this.stock_quantity = product.getStock_quantity();
        this.inStock = product.getStock_quantity() > 0;
    }

    public ProductDTO(String name, String description, double price, String category, int stock_quantity) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.stock_quantity = stock_quantity;
    }

    public ProductDTO(@Valid String name, String description, @Valid double price, @Valid String category, @Valid int stockQuantity, String imageUrl) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.stock_quantity = stock_quantity;
        this.imageUrl = imageUrl;

    }
}
