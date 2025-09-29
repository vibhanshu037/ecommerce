import React from 'react'
import { Link } from 'react-router-dom'

const PaymentFailed = () => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="card">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed ❌</h1>
          <p className="text-gray-600">Unfortunately, your payment could not be processed.</p>
        </div>

        {/* Error Details */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-red-800 mb-3">What happened?</h2>
          <div className="text-left text-red-700">
            <p className="mb-3">Your payment was not successful. Common reasons include:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Insufficient funds in your account</li>
              <li>Card declined by your bank</li>
              <li>Incorrect payment information</li>
              <li>Network or technical issues</li>
              <li>Payment was cancelled</li>
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <p className="text-gray-600">
            📱 Don't worry! Your items are still in your cart.<br/>
            🔄 You can try again or contact support if issues persist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Link to="/cart" className="btn-primary flex-1 text-center">
              Return to Cart
            </Link>
            <Link to="/checkout" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex-1 text-center">
              Try Again
            </Link>
          </div>
          
          <Link to="/" className="text-blue-600 hover:text-blue-700 underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailed