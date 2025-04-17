"use client"

import { useState } from "react"
import "./Navbar.css"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <a href="/" className="logo">
            <span className="logo-fli">FLI</span>
            <span className="logo-super">SUPER</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-links">
              <li><a href="/" className="nav-link">Home</a></li>
              <li><a href="/products" className="nav-link">Products</a></li>
              <li><a href="/categories" className="nav-link">Categories</a></li>
              <li><a href="/offers" className="nav-link">Special Offers</a></li>
              <li><a href="/about" className="nav-link">About Us</a></li>
            </ul>
          </nav>

          {/* Search, Cart & Profile */}
          <div className="nav-actions">
            <div className="search-container">
              <input type="text" placeholder="Search products..." className="search-input" />
              <button className="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>

            {/* Cart Button */}
            <a href="/cart" className="cart-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-count">3</span>
            </a>

            {/* Profile Button (moved here) */}
            <a href="/profile" className="profile-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M4 21v-2a4 4 0 0 1 3-3.87"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="nav-mobile">
            <ul className="mobile-links">
              <li><a href="/" className="mobile-link" onClick={toggleMenu}>Home</a></li>
              <li><a href="/products" className="mobile-link" onClick={toggleMenu}>Products</a></li>
              <li><a href="/categories" className="mobile-link" onClick={toggleMenu}>Categories</a></li>
              <li><a href="/offers" className="mobile-link" onClick={toggleMenu}>Special Offers</a></li>
              <li><a href="/about" className="mobile-link" onClick={toggleMenu}>About Us</a></li>
              <li><a href="/profile" className="mobile-link" onClick={toggleMenu}>Profile</a></li>
            </ul>
            <div className="mobile-search">
              <input type="text" placeholder="Search products..." className="mobile-search-input" />
              <button className="mobile-search-button">Search</button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
