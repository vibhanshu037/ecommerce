import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import PaymentSuccess from './components/PaymentSuccess'
import PaymentFailed from './components/PaymentFailed'

const API_BASE = 'http://localhost:5000/api/v1'

function App() {
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)

  // Load cart on app start
  useEffect(() => {
    loadCart()
  }, [])

  // Update cart count when cart changes
  useEffect(() => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    setCartCount(count)
  }, [cart])

  const loadCart = async () => {
    try {
      const response = await fetch(`${API_BASE}/cart`)
      const data = await response.json()
      if (data.success) {
        setCart(data.data.items || [])
        console.log('Cart loaded:', data.data.items) // Debug log
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    }
  }

  const addToCart = async (productId) => {
    try {
      const response = await fetch(`${API_BASE}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 })
      })
      const data = await response.json()
      if (data.success) {
        await loadCart() // Reload cart
        alert('Added to cart!')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`${API_BASE}/cart/remove/${productId}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (data.success) {
        setCart(data.data)
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
    }
  }

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return
    try {
      const response = await fetch(`${API_BASE}/cart/update/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      })
      if (response.ok) {
        await loadCart()
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  const clearCart = () => {
    setCart([])
  }

  // Function to refresh cart - pass to PaymentSuccess component
  const refreshCart = async () => {
    console.log('Refreshing cart after payment...')
    await loadCart()
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Header cartCount={cartCount} />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <Routes>
            <Route 
              path="/" 
              element={<ProductList addToCart={addToCart} />} 
            />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cart={cart} 
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={<Checkout cart={cart} clearCart={clearCart} />} 
            />
            <Route 
              path="/payment-success" 
              element={<PaymentSuccess refreshCart={refreshCart} />} 
            />
            <Route path="/payment-failed" element={<PaymentFailed />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App