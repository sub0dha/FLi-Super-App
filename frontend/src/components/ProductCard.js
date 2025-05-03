import { useState } from "react"
import { getOrCreateCartId } from "../utils/CartUtils"
import "./ProductCard.css"

function ProductCard({ product }) {
  const [adding, setAdding] = useState(false)
  const [feedback, setFeedback] = useState("")

  const handleAddToCart = async () => {
    setAdding(true)
    try {
      const cartId = await getOrCreateCartId()

      const res = await fetch(`http://localhost:8080/cart/${cartId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || "Failed to add to cart")
      }

      const cartRes = await fetch(`http://localhost:8080/cart/${cartId}`)
      const cartData = await cartRes.json()

      const newCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0)
      localStorage.setItem("cartCount", newCount)
      window.dispatchEvent(new Event("cartCountUpdated"))

      setFeedback("Added to cart!")
    } catch (error) {
      setFeedback("Error: " + error.message)
    }
    setAdding(false)
    setTimeout(() => setFeedback(""), 2000)
  }

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
          <img src={product.image || "./veges.jpg"} alt={product.name} />
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
