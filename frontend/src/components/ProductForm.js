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

  useEffect(() => {
    fetch("http://localhost:8080/products")
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

  return (
    <div className="products-page">
      <Navbar />
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
                      <ProductCard key={product.id} product={product} />
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
