import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountedTotal, setDiscountedTotal] = useState(0);

  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("homeDelivery");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartId = localStorage.getItem("cartId");
        if (!cartId) {
          navigate("/cart");
          return;
        }

        const res = await fetch(`http://localhost:8080/cart/${cartId}`);
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        setCart(data);
        setDiscountedTotal(data.totalPrice);
      } catch (err) {
        setError(err.message);
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePromoCodeApply = () => {
    if (promoCode.trim() && cart) {
      const discount = cart.totalPrice * 0.1;
      const newTotal = cart.totalPrice - discount;
      setDiscountedTotal(newTotal);
      setDiscountApplied(true);
      alert(`10% discount applied! New total: Rs. ${newTotal.toFixed(2)}`);
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!cart || cart.items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    const cartId = localStorage.getItem("cartId");
    const orderData = {
      fullName: deliveryDetails.fullName,
      address: deliveryDetails.address,
      phone: deliveryDetails.phone,
      email: deliveryDetails.email,
      deliveryMethod: deliveryMethod,
      paymentMethod: paymentMethod,
      items: cart.items.map(item => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price
        },
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity
      })),
      totalPrice: discountApplied ? discountedTotal : cart.totalPrice,
      originalPrice: cart.totalPrice,
      discountApplied: discountApplied,
      discountAmount: discountApplied ? (cart.totalPrice * 0.1) : 0,
      promoCode: discountApplied ? promoCode : null,
      ...(paymentMethod === "card" && {
        cardNumber: cardDetails.cardNumber,
        cardName: cardDetails.cardName,
        expiry: cardDetails.expiry,
        cvv: cardDetails.cvv
      })
    };

    try {
      // Process checkout
      const response = await fetch(`http://localhost:8080/cart/${cartId}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Checkout failed");
      }

      const order = await response.json();

      // Trigger email confirmation
      await fetch(`http://localhost:8080/cart/${cartId}/confirm`, {
        method: "POST",
      });

      // Save order details to localStorage before navigating
      localStorage.setItem("orderDetails", JSON.stringify({
        ...order,
        deliveryMethod,
        paymentMethod,
        items: cart.items,
        totalPrice: discountApplied ? discountedTotal : cart.totalPrice,
        originalPrice: cart.totalPrice,
        discountApplied,
        discountAmount: discountApplied ? (cart.totalPrice * 0.1) : 0
      }));

      alert("Order placed successfully! Confirmation email sent.");

      // Navigate to confirmation page
      navigate("/order/confirmation");
    } catch (err) {
      setError("Checkout failed: " + err.message);
    }
  };

  if (loading) return <div className="checkout-loading">Loading checkout...</div>;
  if (error) return <div className="checkout-error">{error}</div>;
  if (!cart) return <div className="checkout-error">Unable to load cart data</div>;

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <form onSubmit={handleSubmitOrder}>
        <section className="checkout-section">
          <h2>Delivery Information</h2>
          <div className="delivery-info-vertical">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={deliveryDetails.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={deliveryDetails.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={deliveryDetails.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={deliveryDetails.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </section>

        <section className="checkout-section">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cart.items.map((item) => (
              <div key={item.product.id} className="order-item">
                <div className="item-info">
                  <span className="item-name">{item.product.name}</span>
                  <span className="item-quantity">Qty: {item.quantity}</span>
                </div>
                <div className="item-price">
                  Rs. {(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Promo Code Section */}
          <div className="promo-code-section">
            <div className="form-group">
              <label>Promo Code</label>
              <div className="promo-code-input">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  disabled={discountApplied}
                />
                <button
                  type="button"
                  className="apply-promo-button"
                  onClick={handlePromoCodeApply}
                  disabled={!promoCode.trim() || discountApplied}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
          
          {/* Price Summary */}
          <div className="price-summary">
            {discountApplied && (
              <>
                <div className="price-row">
                  <span>Subtotal:</span>
                  <span>Rs. {cart.totalPrice.toFixed(2)}</span>
                </div>
                <div className="price-row discount">
                  <span>Discount (10%):</span>
                  <span>- Rs. {(cart.totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </>
            )}
            <div className="price-row total">
              <span>Total:</span>
              <span>Rs. {(discountApplied ? discountedTotal : cart.totalPrice).toFixed(2)}</span>
            </div>
          </div>
        </section>

        <section className="checkout-section">
          <h2>Delivery Method</h2>
          <div className="delivery-methods">
            <label className="delivery-option">
              <input
                type="radio"
                name="deliveryMethod"
                value="homeDelivery"
                checked={deliveryMethod === "homeDelivery"}
                onChange={() => setDeliveryMethod("homeDelivery")}
              />
              <span>Home Delivery</span>
            </label>
            <label className="delivery-option">
              <input
                type="radio"
                name="deliveryMethod"
                value="storePickup"
                checked={deliveryMethod === "storePickup"}
                onChange={() => setDeliveryMethod("storePickup")}
              />
              <span>Store Pickup</span>
            </label>
          </div>
        </section>

        <section className="checkout-section">
          <h2>Payment Method</h2>
          <div className="payment-methods">
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <span>Cash on Delivery (COD)</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <span>Credit/Debit Card</span>
            </label>
          </div>

          {paymentMethod === "card" && (
            <div className="card-details">
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="form-group">
                <label>Name on Card</label>
                <input
                  type="text"
                  name="cardName"
                  value={cardDetails.cardName}
                  onChange={handleCardInputChange}
                  required
                />
              </div>
              <div className="card-grid">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleCardInputChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardInputChange}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {error && <div className="checkout-error">{error}</div>}

        <div className="checkout-actions">
          <button 
            type="button" 
            className="back-button" 
            onClick={() => navigate("/cart")}
          >
            Back to Cart
          </button>
          <button 
            type="submit" 
            className="confirm-order-button"
            disabled={!cart || cart.items.length === 0}
          >
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;