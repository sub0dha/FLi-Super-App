import React, { useEffect, useState } from 'react';
import './ViewProducts.css';
import ProductUpdateForm from "./ProductUpdateForm";
import ProductAddForm from "./ProductAddForm";

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showProductUpdateForm, setShowProductUpdateForm] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);

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

    const filteredProducts = products.filter(product => {
        const query = searchQuery.toLowerCase();
        return (
            (product.name && product.name.toLowerCase().includes(query)) ||
            (product.category && product.category.toLowerCase().includes(query)) ||
            (product.description && product.description.toLowerCase().includes(query))
        );
    });



    // delete product
    const handleDelete = (id) => {
        fetch(`http://localhost:8080/products/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted product from the state
                    setProducts(products.filter(product => product.id !== id));
                    alert('Product made unavailable.');
                } else {
                    alert('Product made unavailable.');
                }
            })
            .catch(error => {
                console.error('There was an error deleting the product!', error);
            });
    };

    // edit product
    const handleEdit = (id) => {
        setEditingProductId(id);
        setShowProductUpdateForm(!showProductUpdateForm);
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
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                </div>
                <button className="add-product-button" onClick={handleAddProduct}>
                    Add Product
                </button>
            </div>

            {showAddForm && <ProductAddForm onClose={handleCloseForm} onAdd={(newProduct) => {
                // Add the new product to the existing list
                setProducts([...products, newProduct]);
            }}
            />} {/* Conditionally render the ProductAddForm */}
            {showProductUpdateForm && editingProductId && (
                <ProductUpdateForm
                    productId={editingProductId}
                    onClose={() => {
                        setShowProductUpdateForm(false);
                        setEditingProductId(null);
                    }}
                    onUpdate={(updatedProduct) => {
                        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
                        setShowProductUpdateForm(false);
                        setEditingProductId(null);
                    }}
                />
            )}
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
                {filteredProducts.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.description}</td>
                        <td>{product.stock_quantity}</td>
                        <td>
                        <div className="action-buttons">
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
                            Make Unavailable
                            </button>
                        </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewProducts;