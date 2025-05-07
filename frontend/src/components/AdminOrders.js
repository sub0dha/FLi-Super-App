import React, { useEffect, useState } from 'react';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8080/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await fetch(`http://localhost:8080/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const renderOrderCard = (order) => {
    const isPending = order.status === 'PENDING';
    return (
      <div key={order.id} className="admin-card">
        <h3>Order #{order.id}</h3>
        <p><strong>Name:</strong> {order.fullName}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ${order.totalPrice}</p>
        <button
          onClick={() => setSelectedOrder(order)}
          className="admin-button view-button"
        >
          View Order
        </button>
        <button
          onClick={() =>
            updateOrderStatus(order.id, isPending ? 'PROCESSED' : 'PENDING')
          }
          className={`admin-button ${isPending ? 'button-green' : 'button-red'}`}
        >
          Mark as {isPending ? 'Processed' : 'Pending'}
        </button>
      </div>
    );
  };

  const closeModal = () => setSelectedOrder(null);

  const renderModal = () => {
    if (!selectedOrder) return null;
    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="modal-close" onClick={closeModal}>&times;</span>
          <h3>Order Details</h3>
          <p><strong>ID:</strong> {selectedOrder.id}</p>
          <p><strong>Name:</strong> {selectedOrder.fullName}</p>
          <p><strong>Email:</strong> {selectedOrder.email}</p>
          <p><strong>Phone:</strong> {selectedOrder.phone}</p>
          <p><strong>Address:</strong> {selectedOrder.address}</p>
          <p><strong>Delivery:</strong> {selectedOrder.deliveryMethod}</p>
          <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
          <p><strong>Total:</strong> ${selectedOrder.totalPrice}</p>
          <div>
            <h4>Items:</h4>
            <ul>
              {selectedOrder.items?.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.product.name}</strong> - Qty: {item.quantity}, Subtotal: ${item.subtotal}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const pendingOrders = orders.filter((o) => o.status === 'PENDING');
  const processedOrders = orders.filter((o) => o.status === 'PROCESSED');

  return (
    <div className="admin-container">
      <h2>Admin Orders Dashboard</h2>

      <div className="admin-section">
        <h3>Pending Orders</h3>
        <div className="admin-grid">
          {pendingOrders.map(renderOrderCard)}
        </div>
      </div>

      <div className="admin-section">
        <h3>Processed Orders</h3>
        <div className="admin-grid">
          {processedOrders.map(renderOrderCard)}
        </div>
      </div>

      {renderModal()}
    </div>
  );
};

export default AdminOrders;
