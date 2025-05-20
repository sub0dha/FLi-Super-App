import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to update the cart count from localStorage
  const updateCartCountFromStorage = () => {
    const stored = localStorage.getItem("cartCount");
    const count = stored ? parseInt(stored, 10) : 0;
    setCartCount(isNaN(count) ? 0 : count);
  };

  useEffect(() => {
    updateCartCountFromStorage();

    const handler = () => updateCartCountFromStorage();
    window.addEventListener("cartCountUpdated", handler);

    return () => {
      window.removeEventListener("cartCountUpdated", handler);
    };
  }, []);

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
      <header className="navbar">
        <div className="container">
          <div className="navbar-content">
            {/* Logo */}
            <a href="/home" className="logo">
              <span className="logo-fli">FLI</span>
              <span className="logo-super">SUPER</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="nav-desktop">
              <ul className="nav-links">
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/ProductPage" className="nav-link">Products</Link></li>
                <li><Link to="/categories" className="nav-link">Categories</Link></li>
                <li><Link to="/promotions" className="nav-link">Special Offers</Link></li>
                <li><Link to="/about" className="nav-link">About Us</Link></li>
              </ul>
            </nav>

            {/* Search, Cart & Profile */}
            <div className="nav-actions">
              {/* Cart Button */}
              <Link to="/cart" className="cart-button">
                <div className="cart-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  {cartCount > 0 && (
                      <span className="cart-count-badge">{cartCount}</span>
                  )}
                </div>
              </Link>

              {/* Profile Button */}
              <Link to="/profile" className="profile-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M4 21v-2a4 4 0 0 1 3-3.87"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
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
                  <li><Link to="/" className="mobile-link" onClick={toggleMenu}>Home</Link></li>
                  <li><Link to="/products" className="mobile-link" onClick={toggleMenu}>Products</Link></li>
                  <li><Link to="/categories" className="mobile-link" onClick={toggleMenu}>Categories</Link></li>
                  <li><Link to="/offers" className="mobile-link" onClick={toggleMenu}>Special Offers</Link></li>
                  <li><Link to="/about" className="mobile-link" onClick={toggleMenu}>About Us</Link></li>
                  <li><Link to="/profile" className="mobile-link" onClick={toggleMenu}>Profile</Link></li>
                </ul>
                <div className="mobile-search">
                  <input type="text" placeholder="Search products..." className="mobile-search-input" />
                  <button className="mobile-search-button">Search</button>
                </div>
              </div>
          )}
        </div>
      </header>
  );
}

export default Navbar;
