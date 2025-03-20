import React, { useEffect, useState } from 'react';
import './ViewProducts.css';

const ViewProducts = () => {
    const [products, setProducts] = useState([]);

    // Fetch products from the backend
    useEffect(() => {
        fetch('http://localhost:8080/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    // delete product
    const handleDelete = (id) => {
        fetch(`http://localhost:8080/product/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted product from the state
                    setProducts(products.filter(product => product.id !== id));
                    alert('Product deleted successfully!');
                } else {
                    alert('Failed to delete product.');
                }
            })
            .catch(error => {
                console.error('There was an error deleting the product!', error);
            });
    };

    // edit product
    const handleEdit = (id) => {
        alert(`Edit product with ID: ${id}`);
        // You can implement a modal or redirect logic here
    };

    // add product
    const handleAddProduct = () => {
        alert('Redirect to add product page');
        // You can implement a modal or redirect logic here
    };

    return (
        <div>
            <h1>Available Products</h1>
            <div className="top-bar">
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                </div>
                <button className="add-product-button" onClick={handleAddProduct}>
                    Add Product
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Stock Quantity</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.description}</td>
                        <td>{product.stock_quantity}</td>
                        <td>
                            <button
                                className="action-button edit"
                                onClick={() => handleEdit(product.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="action-button delete"
                                onClick={() => handleDelete(product.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewProducts;