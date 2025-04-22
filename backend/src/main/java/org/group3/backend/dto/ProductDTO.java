package org.group3.backend.dto;

import lombok.Getter;
import lombok.Setter;
import org.group3.backend.model.Product;

@Getter
@Setter
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private String category;
    private double stock_quantity;
    private boolean inStock;

    public ProductDTO(Product product) {
        this.id = (long) product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.category = product.getCategory();
        this.stock_quantity = product.getStock_quantity();
        this.inStock = product.getStock_quantity() > 0;
    }

    // Getters and Setters
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

}
