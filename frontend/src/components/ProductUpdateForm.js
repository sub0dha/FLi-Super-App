"use client"

import { useState, useEffect } from "react"
import "./ProductUpdateForm.css"

function ProductUpdateForm({ productId, onClose, onUpdate }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Fetch the product data when the component mounts
  useEffect(() => {
    let isMounted = true // Flag to prevent state updates on unmounted component

    if (!productId) {
      setLoading(false);
      return;
    }

    // Fetch categories
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(data => isMounted && setCategories(data))
      .catch(err => isMounted && console.error("Failed to load categories", err))

    // Fetch product data
    fetch(`http://localhost:8080/products/${productId}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch product')
        return response.json()
      })
      .then(data => {
        if (isMounted) {
          setProduct(data)
          setImagePreview(data.imagePath || null)
          setError(null)
        }
      })
      .catch(error => {
        if (isMounted) setError("Error fetching product: " + error.message)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => isMounted = false
  }, [productId])

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name", product.name)
      formData.append("description", product.description)
      formData.append("price", product.price)
      formData.append("category", product.category)
      formData.append("stock_quantity", product.stock_quantity)

      if (imageFile) {
        formData.append("image", imageFile)
      }

      const response = await fetch(`http://localhost:8080/products/${productId}`, {
        method: "PUT",
        body: formData
      })

      if (response.ok) {
        const updatedProduct = await response.json()
        if (onUpdate) onUpdate(updatedProduct)
        if (onClose) onClose()
      } else {
        setError("Failed to update product")
      }
    } catch (error) {
      setError("Error: " + error.message)
    }
  }

  if (loading) return <div className="product-form-loading">Loading...</div>
  if (error) return <div className="product-form-error">{error}</div>
  if (!product) return null // Prevent rendering form without data

  return (
    <div className="product-form">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={product.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" value={product.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Price:
          <input type="number" name="price" value={product.price} onChange={handleChange} />
        </label>
        <br />
        <label>
          Category:
          <select name="category" value={product.category} onChange={handleChange}>
            <option value="" disabled>Select category</option>
            {categories.map(cat => (
                <option key={cat.id} value={cat.name}
                        disabled={cat.name === "All Products"}>
                  {cat.name}
                </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Stock Quantity:
          <input type="number" name="stock_quantity" value={product.stock_quantity} onChange={handleChange} />
        </label>
        <label>
          Update Image:
          <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
          />
        </label>
        {imagePreview && (
            <img
                className="preview-img"
                src={imagePreview}
                alt="Product preview"
            />
        )}
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
  )
}

export default ProductUpdateForm

