import React, {useEffect, useState} from 'react';
import './ProductAddForm.css'; // Import the CSS
import {uploadImageToGCS} from "../utils/imageUploadUtils";
import {loadCategories} from "../utils/categoryUtils";

function ProductAddForm({ onClose, onAdd }) {
    // State Management
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock_quantity: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Data fetching effect
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await loadCategories();
                setCategories(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadCategories()
    }, []);

    // Event handlers
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let imageUrl = null;
        if (imageFile) imageUrl = await uploadImageToGCS(imageFile);

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("stock_quantity", product.stock_quantity);

      if (imageFile) {
        formData.append("image", imageUrl);
      }

        const response = await fetch('http://localhost:8080/products/add', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
            const savedProduct = await response.json();
            console.log('Product added successfully!');
            setProduct({ name: '', description: '', price: '', category: '', stock_quantity: '' });
            setImageFile(null);
            setImagePreview(null);
            if (onClose) onClose();
            if (onAdd) onAdd(savedProduct);
        } else {
          console.error('Failed to add product');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={"product-form"}>
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
                    <select name="category" value={product.category} onChange={handleChange}>
                        <option value="" disabled>
                            Select a category
                        </option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name} disabled={cat.name === "All Products"}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
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
                <label>
                    Product Image:
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>
                {imagePreview && <img className={"preview-img"} src={imagePreview} alt="Preview" />}
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

export default ProductAddForm;