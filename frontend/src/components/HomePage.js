import "./HomePage.css"
import Navbar from "./Navbar.js"
import {useEffect, useState} from "react";
import {addToCart} from "../utils/cartUtils.js";
import {loadCategories} from "../utils/categoryUtils";

function HomePage() {
  // Featured products data
  const [adding, setAdding] = useState(false)
  const [setFeedback] = useState("");
  const featuredProducts = [
    {
      id: 1,
      name: "Fresh Organic Vegetables",
      price: "Rs. 800",
      image: "./veges.jpg",
    },
    { id: 2, name: "Premium Dairy Products", price: "Rs. 800", image: "./egg.jpg" },
    {
      id: 3,
      name: "Artisan Bakery Selection",
      price: "Rs. 800",
      image: "./bakery.jpg",
    },
    { id: 4, name: "Gourmet Meat Cuts", price: "Rs. 800", image: "./meat.jpg" },
  ]

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories().then(setCategories);
  }, []);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      const message = await addToCart(featuredProducts.id, 1);
      setFeedback(message);
    } catch (error) {
      setFeedback("Error: " + error.message);
    }
    setAdding(false);
    setTimeout(() => setFeedback(""), 2000);
  };

  return (
    <div className="home-page">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1>Fresh Food, Delivered to Your Doorstep</h1>
                <p>Shop quality groceries at affordable prices with our convenient online supermarket.</p>
                <div className="hero-buttons">
                  <a href="/productpage" className="btn btn-primary">
                    Shop Now
                  </a>
                  <a href="/promotions" className="btn btn-outline">
                    View Offers
                  </a>
                </div>
              </div>
              <div className="hero-image">
                <img src="./Logo.png" alt="Fresh groceries" />
              </div>

            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="container">
            <div className="section-header">
              <h2>Shop by Category</h2>
              <p>Browse our wide selection of products by category</p>
            </div>
            <div className="categories-grid">
              {categories.map((category, index) => (
                <a href={`/ProductPage`} className="category-card" key={index}>
                  <div className="category-icon">
                    <img src={category.image} alt={category.name} />
                  </div>
                  <span className="category-name">{category.name}</span>
                </a>
              ))}
            </div>

          </div>
        </section>

        {/* Featured Products */}
        <section className="products-section">
          <div className="container">
            <div className="section-header">
              <h2>Featured Products</h2>
              <p>Check out our most popular items this week</p>
            </div>
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-image">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">{product.price}</p>
                    <button className="btn btn-add-cart"
                            disabled={!product.inStock || adding}
                            onClick={handleAddToCart}
                    >
                        {adding ? "Adding..." : product.inStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="view-all">
              <a href="/productPage" className="btn btn-primary">
                View All Products
              </a>
            </div>
          </div>
        </section>

        {/* Special Offers */}
        <section className="offers-section">
          <div className="container">
            <div className="section-header">
              <h2>Special Offers</h2>
              <p>Limited time deals you don't want to miss</p>
            </div>
            <div className="offers-grid">
              <div className="offer-card offer-weekend">
                <div className="offer-content">
                  <span className="offer-badge">WEEKEND SPECIAL</span>
                  <h3 className="offer-title">20% OFF Fresh Fruits</h3>
                  <p className="offer-description">Get a discount on all fresh fruits this weekend only!</p>
                  <a href="/promotions" className="btn btn-light">
                    View Offers
                  </a>
                </div>
                <div className="offer-image">
                  <img src="./veges.jpg" alt="Weekend special offer" />
                </div>
              </div>

              <div className="offer-card offer-members">
                <div className="offer-content">
                  <span className="offer-badge">MEMBERS ONLY</span>
                  <h3 className="offer-title">Buy 2 Get 1 Free</h3>
                  <p className="offer-description">Exclusive offer for FLI SUPER members on selected items!</p>
                  <a href="/promotions" className="btn btn-light">
                    View Offers
                  </a>
                </div>
                <div className="offer-image">
                  <img src="./Offer-main.jpg" alt="Membership offer" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter-section">
          <div className="container">
            <div className="newsletter-content">
              <h2>Join Our Newsletter</h2>
              <p>Subscribe to receive updates on new products, special offers, and exclusive discounts.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Enter your email address" required />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <a href="/" className="logo">
                <span className="logo-fli">FLI</span>
                <span className="logo-super">SUPER</span>
              </a>
              <p>Your one-stop shop for fresh groceries and household essentials at competitive prices.</p>
              <div className="social-links">
                <a href="https://www.facebook.com/FLiSuper/" className="social-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/products">Products</a>
                </li>
                <li>
                  <a href="/offers">Special Offers</a>
                </li>
                <li>
                  <a href="/recipes">Recipes</a>
                </li>
                <li>
                  <a href="/careers">Careers</a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/register">Register</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Customer Service</h3>
              <ul className="footer-links">
                <li>
                  <a href="/help">Help Center</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/shipping">Shipping Policy</a>
                </li>
                <li>
                  <a href="/returns">Returns & Refunds</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Contact Us</h3>
              <address className="contact-info">
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  123 New Kandy Road, Malabe
                </p>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  081 234 5432
                </p>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  flisuper@gmail.com
                </p>
              </address>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} FLI SUPER. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage

