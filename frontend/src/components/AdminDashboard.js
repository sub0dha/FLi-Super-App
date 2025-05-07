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
            <li><a href="/admin">Home</a></li>
            <li><a href="/admin/products">Products</a></li>
            <li><a href="/admin/users">Users</a></li>
            <li><a href="/admin/profile">Profile</a></li>
            <li><a href="/admin/settings">Settings</a></li>
          </ul>
        </nav>

        <div className="container">
          <h1>Admin Dashboard</h1>
          <div className="admin-actions">
            <ActionCard title="Manage orders" link="/orders" />
            <ActionCard title="Manage Products" link="/products" />
            <ActionCard title="Manage Users" link="/admin/users" />
            <ActionCard title="Admin Profile" link="  /profile" />
          </div>
        </div>

        <footer>
          <div className="footer-links">
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
            <a href="/faq">FAQ</a>
          </div>
          <div>456 Grocery Avenue, Veggie Town, VT 78910</div>
          <div>(123) 456-7890 | support@flisuper.com</div>
          <div className="copyright">
            &copy; 2025 FLi Super Grocery. All rights reserved.
          </div>
        </footer>
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
