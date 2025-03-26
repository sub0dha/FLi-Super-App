import React, { useEffect, useState } from 'react';
import './ViewProducts.css';
import ProductForm from './ProductForm';

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

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
        fetch(`http://localhost:8080/products/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted product from the state
                    setProducts(products.filter(product => product.id !== id));
                    // Custom notification instead of alert
                    showNotification(`Product with (ID: ${id}) deleted successfully!`);
                } else {
                    showNotification('Failed to delete product.');
                }
            })
            .catch(error => {
                console.error('There was an error deleting the product!', error);
                showNotification('Error occurred while deleting product.');
            });
    };

// Add this function to create custom notifications
    const showNotification = (message) => {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        notification.textContent = message;

        // Add to DOM
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    };

    // edit product
    const handleEdit = (id) => {
        alert(`Edit product with ID: ${id}`);
        // You can implement a modal or redirect logic here
    };

    // add product
    const handleAddProduct = () => {
        // alert('Redirect to add product page');
        setShowAddForm(!showAddForm);
        // You can implement a modal or redirect logic here
    };

    const handleCloseForm = () => {
        setShowAddForm(false);
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

            {showAddForm && <ProductForm onClose={handleCloseForm} />} {/* Conditionally render the ProductForm */}
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