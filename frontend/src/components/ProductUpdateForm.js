"use client";

import { useState, useEffect } from "react";
import "./ProductUpdateForm.css";

function ProductUpdateForm({ productId, onClose, onUpdate }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock_quantity: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the product data when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/products/${productId}`
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          setError("Failed to fetch product");
        }
      } catch (error) {
        setError("Error fetching product: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/products/${productId}`,
        {
          method: "PUT", // or 'PATCH' depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (response.ok) {
        console.log("Product updated successfully!");
        if (onUpdate) {
          onUpdate(product); // Notify parent component about the update
        }
        if (onClose) {
          onClose();
        }
      } else {
        setError("Failed to update product");
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  if (loading) return <div className="product-form-loading">Loading...</div>;
  if (error) return <div className="product-form-error">{error}</div>;

  return (
    <div className="product-form">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Stock Quantity:
          <input
            type="number"
            name="stock_quantity"
            value={product.stock_quantity}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update Product</button>
        <br />
        {onClose && (
          <button type="button" onClick={onClose} className="cancel-button">
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default ProductUpdateForm;
