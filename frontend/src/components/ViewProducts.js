import React, { useEffect, useState } from "react";
import "./ViewProducts.css";
import ProductForm from "./ProductForm";
import ProductUpdateForm from "./ProductUpdateForm";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array means this runs only once on mount

  // Function to fetch all products
  const fetchProducts = () => {
    fetch(`http://localhost:8080/products`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
      })
      .then(setProducts)
      .catch(console.error);
  };

  // Function to handle search
  const handleSearch = (query) => {
    if (query.trim() === "") {
      fetchProducts(); // If search is empty, fetch all products
      return;
    }

    fetch(`http://localhost:8080/products/search?q=${query}`)
      .then((response) => {
        if (!response.ok) throw new Error("Search failed");
        return response.json();
      })
      .then(setProducts)
      .catch(console.error);
  };

  // Debounced search handler
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timer); // Cleanup on unmount or searchQuery change
  }, [searchQuery]);

  // ... rest of your component remains the same ...
  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setProducts(products.filter((product) => product.id !== id));
          alert("Product deleted successfully!");
        } else {
          alert("Failed to delete product.");
        }
      })
      .catch((error) => {
        console.error("There was an error deleting the product!", error);
      });
  };

  const handleEdit = (id) => {
    setEditingProductId(id);
  };

  const handleCloseUpdateForm = () => {
    setEditingProductId(null);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Available Products</h1>
      <div className="top-bar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery} // Bind search query state
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
        </div>
        <button
          className="add-product-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          Add Product
        </button>
      </div>

      {showAddForm && (
        <ProductForm
          onClose={() => setShowAddForm(false)}
          onProductAdded={handleProductAdded}
        />
      )}

      {editingProductId && (
        <ProductUpdateForm
          productId={editingProductId}
          onClose={handleCloseUpdateForm}
          onUpdate={(updatedProduct) => {
            setProducts(
              products.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p
              )
            );
            handleCloseUpdateForm();
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
          {filteredProducts.map((product) => (
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
