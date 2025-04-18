import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage.js';
import Login from './components/Login.js';
import AdminDashboard from './components/AdminDashboard.js';
import HomePage from './components/HomePage.js';
import ViewProducts from './components/ViewProducts.js';
import ProductsPage from './components/ProductsPage.js';
import UserProfile from './components/UserProfile.js';

const App = () => {
  const userRole = localStorage.getItem('userRole');

  return (
    <Router>
      <Routes>
        {/* Routes for user registration and login */}
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* User Role Based Dashboard */}
        <Route
          path="/HomePage"
          element={userRole === 'USER' ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/admin"
          element={userRole === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        {/* Routes for viewing and managing products */}
        <Route path="/products" element={<ViewProducts />} />
        <Route path="/productPage" element={<ProductsPage />} />


        <Route path="/profile" element={<UserProfile />} />

      </Routes>
    </Router>
  );
};

export default App;
