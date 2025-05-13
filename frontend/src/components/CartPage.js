import { useEffect, useState } from "react";
import { getOrCreateCartId } from "../utils/cartUtils.js";
import { Link, useNavigate } from "react-router-dom";
import "./CartPage.css";

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const cartId = await getOrCreateCartId()
      const response = await fetch(`http://localhost:8080/cart/${cartId}`)
      if (!response.ok) throw new Error("Failed to fetch cart")
      const data = await response.json()
      setCart(data)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const cartId = localStorage.getItem("cartId");
      const res = await fetch(`http://localhost:8080/cart/${cartId}/items/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) throw new Error("Failed to update quantity");
      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const removeItem = async (productId) => {
    try {
      const cartId = localStorage.getItem("cartId");
      const res = await fetch(`http://localhost:8080/cart/${cartId}/items/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to remove item");
      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const clearCart = async () => {
    try {
      const cartId = localStorage.getItem("cartId");
      const res = await fetch(`http://localhost:8080/cart/${cartId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to clear cart");
      localStorage.removeItem("cartId");
      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCheckout = () => {
    if (!cart || cart.items.length === 0) {
      setError("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  if (loading) return <p className="cart-message">Loading cart...</p>;
  if (error) return <p className="cart-message error">Error: {error}</p>;
  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <p className="cart-message">Your cart is empty.</p>
        <Link to="/ProductPage">
          <button className="back-button">Back to Products</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      
      {/* Green Back Button */}
      <Link to="/ProductPage">
        <button className="back-button">Back to Products</button>
      </Link>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price (Rs.)</th>
            <th>Quantity</th>
            <th>Subtotal (Rs.)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item.product.id}>
              <td>{item.product.name}</td>
              <td>{item.product.price.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                />
              </td>
              <td>{(item.product.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  className="remove-button"
                  onClick={() => removeItem(item.product.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <p>Total: <strong>Rs. {cart.totalPrice.toFixed(2)}</strong></p>
        <div className="cart-actions">
          <button className="clear-button" onClick={clearCart}>
            Clear Cart
          </button>
          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={!cart || cart.items.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;