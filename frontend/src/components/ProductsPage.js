"use client"

import { useState } from "react"
import Navbar from "./Navbar"
import ProductCard from "./ProductCard"
import "./ProductsPage.css"

function ProductsPage() {
  // Categories from the homepage
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

  // Sample products data
  const allProducts = [
    {
      id: 1,
      name: "Organic Bananas",
      price: 450,
      category: "Fruits & Vegetables",
      image: "./veges.jpg",
      rating: 4.5,
      inStock: true,
    },
    {
      id: 2,
      name: "Fresh Strawberries",
      price: 450,
      category: "Fruits & Vegetables",
      image: "./veges.jpg",
      rating: 4.2,
      inStock: true,
    },
    {
      id: 3,
      name: "Avocado",
      price: 450,
      category: "Fruits & Vegetables",
      image: "./veges.jpg",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 4,
      name: "Red Bell Pepper",
      price: 450,
      category: "Fruits & Vegetables",
      image: "./veges.jpg",
      rating: 4.0,
      inStock: true,
    },
    {
      id: 5,
      name: "Chicken Breast",
      price: 450,
      category: "Meat & Seafood",
      image: "./veges.jpg",
      rating: 4.6,
      inStock: true,
    },
    {
      id: 6,
      name: "Atlantic Salmon",
      price: 450,
      category: "Meat & Seafood",
      image: "./veges.jpg",
      rating: 4.7,
      inStock: true,
    },
    {
      id: 7,
      name: "Ground Beef",
      price: 450,
      category: "Meat & Seafood",
      image: "./veges.jpg",
      rating: 4.3,
      inStock: true,
    },
    {
      id: 8,
      name: "Organic Eggs",
      price: 450,
      category: "Dairy & Eggs",
      image: "./veges.jpg",
      rating: 4.9,
      inStock: true,
    },
    {
      id: 9,
      name: "Greek Yogurt",
      price: 450,
      category: "Dairy & Eggs",
      image: "./veges.jpg",
      rating: 4.4,
      inStock: true,
    },
    {
      id: 10,
      name: "Cheddar Cheese",
      price: 450,
      category: "Dairy & Eggs",
      image: "./veges.jpg",
      rating: 4.5,
      inStock: true,
    },
    {
      id: 11,
      name: "Whole Grain Bread",
      price: 450,
      category: "Bakery",
      image: "./veges.jpg",
      rating: 4.2,
      inStock: true,
    },
    {
      id: 12,
      name: "Chocolate Muffins",
      price: 450,
      category: "Bakery",
      image: "./veges.jpg",
      rating: 4.6,
      inStock: true,
    },
    {
      id: 13,
      name: "Frozen Pizza",
      price: 450,
      category: "Frozen Foods",
      image: "./veges.jpg",
      rating: 4.0,
      inStock: true,
    },
    {
      id: 14,
      name: "Ice Cream",
      price: 450,
      category: "Frozen Foods",
      image: "./veges.jpg",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 15,
      name: "Orange Juice",
      price: 450,
      category: "Beverages",
      image: "./veges.jpg",
      rating: 4.3,
      inStock: true,
    },
    {
      id: 16,
      name: "Sparkling Water",
      price: 450,
      category: "Beverages",
      image: "./veges.jpg",
      rating: 4.1,
      inStock: true,
    },
    {
      id: 17,
      name: "Potato Chips",
      price: 450,
      category: "Snacks",
      image: "./veges.jpg",
      rating: 4.4,
      inStock: true,
    },
    {
      id: 18,
      name: "Mixed Nuts",
      price: 450,
      category: "Snacks",
      image: "./veges.jpg",
      rating: 4.7,
      inStock: true,
    },
    {
      id: 19,
      name: "Laundry Detergent",
      price: 450,
      category: "Household",
      image: "./veges.jpg",
      rating: 4.5,
      inStock: true,
    },
    {
      id: 20,
      name: "Paper Towels",
      price: 450,
      category: "Household",
      image: "./veges.jpg",
      rating: 4.2,
      inStock: true,
    },
  ]

  // State for filtering, sorting, and pagination
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [sortOption, setSortOption] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const productsPerPage = 8

  // Filter products based on selected category and search query
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort products based on selected option
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
        return 0 // featured - no specific sort
    }
  })

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Scroll to top when changing page
    window.scrollTo(0, 0)
  }

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1) // Reset to first page when changing category
  }

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  return (
    <div className="products-page">
      <Navbar />

      <div className="container">
        <div className="products-header">
          <h1>Our Products</h1>
          <p>Browse our wide selection of high-quality products</p>
        </div>

        {/* Search and Sort Controls */}
        <div className="products-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button className="search-button">
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
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
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
          {/* Categories Sidebar */}
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

          {/* Products Grid */}
          <div className="products-container">
            <div className="products-count">
              Showing {currentProducts.length} of {filteredProducts.length} products
            </div>

            {currentProducts.length === 0 ? (
              <div className="no-products">
                <p>No products found. Try a different search or category.</p>
              </div>
            ) : (
              <div className="products-grid">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage

