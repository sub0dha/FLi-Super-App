import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import ProductCard from "./ProductCard"
import "./ProductsPage.css"

function ProductsPage() {
  const categories = [
    "All Products",
    "Fruits & Vegetables",
    "Meat & Seafood",
    "Dairy & Eggs",
    "Bakery",
    "Frozen Foods",
    "Beverages",
    "Snacks",
    "Household",
  ]

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cart, setCart] = useState([])

  // Fetch products from the backend
  useEffect(() => {
    fetch("http://localhost:8080/products") // Change to your actual API URL
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products")
        }
        return res.json()
      })
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Optional: Retrieve cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Optional: Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [sortOption, setSortOption] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const productsPerPage = 8

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  // Function to add product to the cart
  const handleAddToCart = (product) => {
    // Update local state (cart in memory)
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      let updatedCart;

      if (existingProduct) {
        updatedCart = prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      // Send the updated cart to the backend
      updateCartInDatabase(updatedCart);

      return updatedCart;
    });
  };

// Send cart data to backend (API call)
  const updateCartInDatabase = async (cartData) => {
    try {
      const response = await fetch("http://localhost:8080/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData), // Send updated cart data
      });

      if (!response.ok) {
        throw new Error("Failed to update cart in the database");
      }

      console.log("Cart successfully updated in the database");
    } catch (error) {
      console.error("Error updating cart in database:", error);
    }
  };

  return (
    <div className="products-page">
      <Navbar cart={cart} /> {/* Pass cart to Navbar */}
      <div className="container">
        <div className="products-header">
          <h1>Our Products</h1>
          <p>Browse our wide selection of high-quality products</p>
        </div>

        <div className="products-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="sort-container">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        <div className="products-layout">
          <div className="categories-sidebar">
            <h3>Categories</h3>
            <ul className="category-list">
              {categories.map((category, index) => (
                <li key={index}>
                  <button
                    className={`category-button ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="products-container">
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <>
                <div className="products-count">
                  Showing {currentProducts.length} of {filteredProducts.length} products
                </div>

                {currentProducts.length === 0 ? (
                  <div className="no-products">
                    <p>No products found.</p>
                  </div>
                ) : (
                  <div className="products-grid">
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-button"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      &laquo; Previous
                    </button>
                    <div className="pagination-numbers">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          className={`pagination-number ${currentPage === index + 1 ? "active" : ""}`}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      className="pagination-button"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next &raquo;
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
