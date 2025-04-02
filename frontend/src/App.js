import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewProducts from "./components/ViewProducts";
import HomePage from "./components/HomePage";
import "./App.css"
import ProductsPage from "./components/ProductsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ViewProducts />} />
        <Route path="/productPage" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
