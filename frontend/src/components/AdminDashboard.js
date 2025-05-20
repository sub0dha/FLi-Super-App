import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div>
      <header>
        <div className="logo">FLi Super Grocery</div>
      </header>

      <nav>
        <ul>
          <li><a href="/products">Manage Products</a></li>
          <li><a href="/orders">Manage Orders</a></li>
          <li><a href="/viewpromocodes">Manage Discounts</a></li>
          <li><a href="/profile">Admin Profile</a></li>
        </ul>
      </nav>

      <div className="container">
        <h1>Admin Dashboard</h1>
        <div className="admin-actions">
          <ActionCard title="Manage Products" link="/products" />
          <ActionCard title="Manage Orders" link="/orders" />
          <ActionCard title="Manage Discounts" link="/viewpromocodes" />
          <ActionCard title="Admin Profile" link="/profile" />
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ title, link }) => (
  <div className="action-card">
    <h2>{title}</h2>
    <a href={link}>Go</a>
  </div>
);

export default AdminDashboard;
