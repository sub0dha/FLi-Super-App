import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderConfirmationPage.css";

function OrderConfirmationPage() {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Retrieve order details from localStorage
    const savedOrder = localStorage.getItem("orderDetails");
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
    } else {
      // If no order found, redirect to home
      navigate("/");
    }
  }, [navigate]);

  if (!orderDetails) {
    return <div className="order-confirmation">Loading order details...</div>;
  }

  return (
    <div className="order-confirmation">
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Thank you for your purchase. Your order has been confirmed.</p>
      <p>A confirmation email has been sent to {orderDetails.email}.</p>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="order-items">
          {orderDetails.items.map((item, index) => (
            <div key={index} className="order-item">
              <span className="item-name">{item.product.name}</span>
              <span className="item-quantity">Qty: {item.quantity}</span>
              <span className="item-price">Rs. {item.subtotal.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="price-breakdown">
          <div className="price-row">
            <span>Subtotal:</span>
            <span>Rs. {orderDetails.originalPrice?.toFixed(2) || orderDetails.totalPrice.toFixed(2)}</span>
          </div>
          
          {orderDetails.discountApplied && (
            <div className="price-row discount">
              <span>Discount ({orderDetails.discountAmount ? 'Rs. ' + orderDetails.discountAmount.toFixed(2) : '10%'}):</span>
              <span>- Rs. {(orderDetails.discountAmount || (orderDetails.originalPrice * 0.1)).toFixed(2)}</span>
            </div>
          )}

          <div className="price-row total">
            <span>Total:</span>
            <span>Rs. {orderDetails.finalPrice?.toFixed(2) || orderDetails.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="delivery-details">
        <h3>Delivery Details</h3>
        <div className="detail-row">
          <span className="detail-label">Name:    </span>
          <span className="detail-value">{orderDetails.fullName}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Address:    </span>
          <span className="detail-value">{orderDetails.address}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Phone:    </span>
          <span className="detail-value">{orderDetails.phone}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email:    </span>
          <span className="detail-value">{orderDetails.email}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Delivery Method:    </span>
          <span className="detail-value">
            {orderDetails.deliveryMethod === "homeDelivery" ? "Home Delivery" : "Store Pickup"}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Payment Method:    </span>
          <span className="detail-value">
            {orderDetails.paymentMethod === "cod" ? "Cash on Delivery" : "Credit/Debit Card"}
          </span>
        </div>
      </div>

      <button className="home-button" onClick={() => navigate("/")}>
        Return to Home
      </button>
    </div>
  );
}

export default OrderConfirmationPage;