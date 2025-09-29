import React, { useState, useEffect } from 'react'

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/products')
      const data = await response.json()
      if (data.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageError = (e) => {
    // Fallback image if the original fails to load
    e.target.src = 'https://via.placeholder.com/500x300/f0f0f0/666666?text=Image+Not+Found'
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Our Products
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="card hover:shadow-lg transition-shadow">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
              onError={handleImageError} // Add error handler
              loading="lazy" // Add lazy loading
            />
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {product.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <div className="text-sm text-gray-500">
                  {product.category}
                </div>
              </div>
              
              <button
                onClick={() => addToCart(product._id)}
                className="btn-primary"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList