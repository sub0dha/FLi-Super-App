import React, { useState } from 'react';
import './ProductForm.css'; // Import the CSS

function ProductForm({ onClose }) {
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
            const response = await fetch('http://localhost:8081/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                console.log('Product added successfully!');
                // Clear the form or redirect
                setProduct({ name: '', description: '', price: '', category: '', stock_quantity: '' });
                if (onClose) { // Call onClose if it's provided
                    onClose();
                }
            } else {
                console.error('Failed to add product');
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
                    />
                </label>
                <br/>
                <button type="submit">Add Product</button>
                <br/> {/* Add a line break to push the Cancel button down */}
                {onClose && ( // Conditionally render the cancel button if onClose is provided
                    <button type="button" onClick={onClose} className="cancel-button">
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
}

export default ProductForm;