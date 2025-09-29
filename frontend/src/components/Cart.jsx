import React from 'react'
import { Link } from 'react-router-dom'

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
  }

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Link to="/" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="card">
        {cart.map((item) => (
          <div key={item.productId} className="flex items-center py-4 border-b last:border-b-0">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
            
            {/* Quantity Controls */}
            <div className="flex items-center mx-4">
              <button
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center"
              >
                -
              </button>
              <span className="mx-3 w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center"
              >
                +
              </button>
            </div>
            
            {/* Item Total */}
            <div className="text-right mr-4 min-w-[80px]">
              <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            
            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.productId)}
              className="text-red-600 hover:text-red-800 p-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
        
        {/* Cart Summary */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total Items: {getTotalItems()}</span>
            <span className="text-2xl font-bold">${getTotalAmount()}</span>
          </div>
          
          <div className="flex space-x-4">
            <Link to="/" className="btn-secondary flex-1 text-center">
              Continue Shopping
            </Link>
            <Link to="/checkout" className="btn-primary flex-1 text-center">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart