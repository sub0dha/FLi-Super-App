import React, { useEffect, useState } from 'react';

const CartComponent = ({ userId }) => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the cart when the component is mounted
    fetch(`/cart/view?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
      })
      .catch((err) => {
        setError("Error fetching cart data");
      });
  }, [userId]);

  // Handle quantity change
  const handleQuantityChange = (productId, quantity) => {
    fetch(`/cart/update?userId=${userId}&productId=${productId}&quantity=${quantity}`, {
      method: 'PUT',
    })
      .then(() => {
        // Refresh the cart data after updating quantity
        return fetch(`/cart/view?userId=${userId}`);
      })
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
      })
      .catch(() => {
        setError("Error updating item quantity");
      });
  };

  // Handle item removal
  const handleRemoveItem = (productId) => {
    fetch(`/cart/remove?userId=${userId}&productId=${productId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Refresh the cart data after removing item
        return fetch(`/cart/view?userId=${userId}`);
      })
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
      })
      .catch(() => {
        setError("Error removing item from cart");
      });
  };

  return (
    <div className="cart-container">
      {error && <p className="error">{error}</p>}
      {cart ? (
        <div>
          <h2>Your Cart</h2>
          {cart.items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product.name}</td>
                    <td>${item.product.price}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(item.product.id, e.target.value)
                        }
                      />
                    </td>
                    <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleRemoveItem(item.product.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="cart-total">
            <h3>Total: ${cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}</h3>
          </div>
        </div>
      ) : (
        <p>Loading cart...</p>
      )}
    </div>
  );
};

export default CartComponent;
