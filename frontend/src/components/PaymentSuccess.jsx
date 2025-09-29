import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const PaymentSuccess = ({ refreshCart }) => {
  const [searchParams] = useSearchParams()
  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      updateOrderAndFetch()
    } else {
      setLoading(false)
    }
  }, [sessionId])

  const updateOrderAndFetch = async () => {
    try {
      console.log('Updating order status for session:', sessionId)
      
      // First, try to update the order status (fallback for webhook)
      await fetch('http://localhost:5000/api/v1/checkout/update-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })

      // Then fetch the updated order details
      await fetchOrderDetails()
      
      // IMPORTANT: Refresh the cart in the main app after successful payment
      if (refreshCart) {
        console.log('Refreshing cart after successful payment...')
        await refreshCart()
      }
      
    } catch (error) {
      console.error('Error updating order:', error)
      // Still try to fetch order details even if update fails
      await fetchOrderDetails()
      
      // Still refresh cart even if update fails
      if (refreshCart) {
        await refreshCart()
      }
    }
  }

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/checkout/order-status/${sessionId}`)
      const data = await response.json()
      if (data.success) {
        setOrderDetails(data.data)
        console.log('Order details:', data.data)
      }
    } catch (error) {
      console.error('Error fetching order details:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="card">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful! 🎉</h1>
          <p className="text-gray-600">Thank you for your purchase.</p>
        </div>

        {loading ? (
          <div className="text-gray-600 mb-6">
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing your order...
            </div>
          </div>
        ) : orderDetails ? (
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
            
            <div className="space-y-2 mb-4">
              <p><strong>Order ID:</strong> <span className="font-mono text-sm">{orderDetails._id}</span></p>
              <p><strong>Email:</strong> {orderDetails.email}</p>
              <p><strong>Total Amount:</strong> <span className="text-green-600 font-semibold">${orderDetails.totalAmount}</span></p>
              <p><strong>Payment Status:</strong> 
                <span className={`capitalize ml-1 font-semibold ${
                  orderDetails.paymentStatus === 'successful' ? 'text-green-600' : 
                  orderDetails.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {orderDetails.paymentStatus}
                </span>
              </p>
              <p><strong>Order Date:</strong> {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
            </div>
            
            <h3 className="font-semibold mb-3">Items Ordered:</h3>
            <div className="space-y-2">
              {orderDetails.items?.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-600 ml-2">×{item.quantity}</span>
                  </div>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">Order details not available</p>
          </div>
        )}

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            ✅ Your order has been confirmed and will be processed shortly.<br/>
            📧 You will receive an email confirmation soon.<br/>
            🛒 Your cart has been cleared.
          </p>
        </div>

        <Link to="/" className="btn-primary inline-block">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess