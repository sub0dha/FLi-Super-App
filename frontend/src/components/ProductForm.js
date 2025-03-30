import React, { useState } from 'react';
import './ProductForm.css'; // Import the CSS

function ProductForm({ onClose, onProductAdded }) {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock_quantity: '',
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                const newProduct = await response.json();
                console.log('Product added successfully!');
                // Clear the form or redirect
                setProduct({ name: '', description: '', price: '', category: '', stock_quantity: '' });
                if (onProductAdded) {
                    onProductAdded(newProduct); // Pass the new product to ViewProducts
                }
                if (onClose) { // Call onClose if it's provided
                    onClose();
                }
            } else {
                console.error('Failed to add product');
                alert('Failed to add product. Check the console for details.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={ "product-form"}>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br/>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </label>
                <br/>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br/>
                <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br/>
                <label>
                    Stock Quantity:
                    <input
                        type="number"
                        name="stock_quantity"
                        value={product.stock_quantity}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </label>
                <br/>
                <button type="submit">Add Product</button>
                <br/>
                {onClose && (
                    <button type="button" onClick={onClose} className="cancel-button">
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
}

export default ProductForm;