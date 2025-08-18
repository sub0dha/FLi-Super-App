import React, {useEffect, useState} from 'react';
import './ProductAddForm.css'; // Import the CSS

function ProductAddForm({ onClose, onAdd }) {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock_quantity: '',
    });

    const [imageFile, setImageFile] = useState(null);

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Failed to load categories", err))
    }, [])

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("category", product.category);
  formData.append("stock_quantity", product.stock_quantity);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const response = await fetch('http://localhost:8080/products/add', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
        const savedProduct = await response.json();
        console.log('Product added successfully!');
        setProduct({ name: '', description: '', price: '', category: '', stock_quantity: '' });
        setImageFile(null);
        if (onClose) onClose();
        if (onAdd) onAdd(savedProduct);
    } else {
      console.error('Failed to add product');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

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