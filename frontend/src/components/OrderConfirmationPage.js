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

      <div className="order-summary">
        <h3>Order Summary</h3>
        <ul>
          {orderDetails.items.map((item, index) => (
            <li key={index}>
              {item.product.name} - Qty: {item.quantity} - Rs. {item.subtotal.toFixed(2)}
            </li>
          ))}
        </ul>

        <p><strong>Subtotal:</strong> Rs. {orderDetails.totalPrice.toFixed(2)}</p>

        {orderDetails.discount > 0 && (
          <p><strong>Discount ({orderDetails.discount * 100}%):</strong> - Rs. {(orderDetails.totalPrice * orderDetails.discount).toFixed(2)}</p>
        )}

        <p><strong>Total to Pay:</strong> Rs. {orderDetails.finalPrice ? parseFloat(orderDetails.finalPrice).toFixed(2) : orderDetails.totalPrice.toFixed(2)}</p>
      </div>


      <div className="delivery-details">
        <h3>Delivery Details</h3>
        <p><strong>Name:</strong> {orderDetails.fullName}</p>
        <p><strong>Address:</strong> {orderDetails.address}</p>
        <p><strong>Phone:</strong> {orderDetails.phone}</p>
        <p><strong>Email:</strong> {orderDetails.email}</p>
        <p><strong>Method:</strong> {orderDetails.deliveryMethod === "homeDelivery" ? "Home Delivery" : "Store Pickup"}</p>
        <p><strong>Payment:</strong> {orderDetails.paymentMethod === "cod" ? "Cash on Delivery" : "Credit/Debit Card"}</p>
      </div>

      <button className="home-button" onClick={() => navigate("/")}>
        Return to Home
      </button>
    </div>
  );
}

export default OrderConfirmationPage;