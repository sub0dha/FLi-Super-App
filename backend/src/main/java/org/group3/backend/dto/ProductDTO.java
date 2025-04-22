package org.group3.backend.dto;

import org.group3.backend.model.Product;

public class ProductDTO {

    private long id;
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }

    public double getStock_quantity() {
        return stock_quantity;
    }

    public void setStock_quantity(double stock_quantity) {
        this.stock_quantity = stock_quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
