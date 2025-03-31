import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage.js';
import Login from './components/Login.js';
import UserDashboard from './components/UserDashboard.js';
import AdminDashboard from './components/AdminDashboard.js';

const App = () => {
  const userRole = localStorage.getItem('userRole'); // Retrieve role from localStorage

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/user"
          element={userRole === 'USER' ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/admin"
          element={userRole === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
