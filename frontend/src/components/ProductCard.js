import "./ProductCard.css"
import {useEffect, useState} from "react"
import {addToCart} from "../utils/cartUtils"
import {loadCategories} from "../utils/categoryUtils";

function ProductCard({ product }) {
  const [adding, setAdding] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories().then(setCategories);
  }, []);

  // New function to find the matching category image
  const getCategoryImage = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.image : "./all-products.jpg";
  };

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      const message = await addToCart(product.id, 1);
      setFeedback(message);
    } catch (error) {
      setFeedback("Error: " + error.message);
    }
    setAdding(false);
    setTimeout(() => setFeedback(""), 2000);
  };

  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full-star">⭐</span>)
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half-star">⭐</span>)
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty-star">☆</span>)
    }
    return stars
  }

  return (
      <div className="product-card">
        <div className="product-badge">
          <span className="product-category">{product.category}</span>
        </div>

        <div className="product-image">
          {/* Updated image source to use the mapped category image */}
          <img src={getCategoryImage(product.category)} alt={product.name} />
          <div className="product-actions">
            <button className="action-button wishlist-button" title="Add to Wishlist">❤️</button>
            <button className="action-button view-button" title="Quick View">👁️</button>
          </div>
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>

          <div className="product-rating">
            {renderStarRating(product.description)}
            <span className="rating-number">{product.description}</span>
          </div>

          <div className="product-price-row">
            <span className="product-price">Rs. {product.price.toFixed(2)}</span>
            {!product.inStock && <span className="out-of-stock">Out of Stock</span>}
          </div>

          <button
              className="add-to-cart-button"
              disabled={!product.inStock || adding}
              onClick={handleAddToCart}
          >
            {adding ? "Adding..." : product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>

          {feedback && <div className="cart-feedback">{feedback}</div>}
        </div>
      </div>
  )
}

export default ProductCard
