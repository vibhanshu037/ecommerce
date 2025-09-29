# 🛍️ E-Commerce Platform with Stripe Integration
A complete full-stack e-commerce platform with React frontend and Node.js backend, featuring user authentication, shopping cart, and secure Stripe payment processing.

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Frontend Overview](#-frontend-overview)


## 🌟 Overview
This project is a modern e-commerce platform that supports both authenticated users and guest checkout. It includes a React frontend with Vite and a Node.js backend with Express, MongoDB, and Stripe integration.

Live Demo: [Add your deployed URL here]  
Frontend Repository: https://github.com/vibhanshu037/stripe/frontend
Backend Repository: https://github.com/vibhanshu037/stripe/backend

## ✨ Features
**Backend Features**  
User Authentication - JWT-based auth with access/refresh tokens  
Guest Checkout - Purchase without account registration  
Product Management - Mock product catalog with images  
Shopping Cart - In-memory cart with persistent sessions  
Stripe Integration - Secure payment processing with webhooks  
Order Tracking - Complete order management system  
Real-time Updates - Webhook-based payment status updates  
CORS Support - Cross-origin requests enabled  

**Frontend Features**  
Responsive Design - Mobile-first with Tailwind CSS  
Shopping Cart UI - Real-time cart updates and management  
Stripe Checkout - Seamless payment experience  
Order Confirmation - Success/failure pages with order details  
Product Catalog - Grid layout with product images  
Route Protection - Navigation between cart, checkout, and products  

## 🛠️ Tech Stack
**Backend**  
Runtime: Node.js  
Framework: Express.js  
Database: MongoDB with Mongoose  
Authentication: JWT (jsonwebtoken)  
Payment: Stripe API  
Security: bcrypt, CORS  
Environment: dotenv  

**Frontend**  
Framework: React 18  
Build Tool: Vite  
Styling: Tailwind CSS  
Routing: React Router v6  
HTTP Client: Fetch API  
Payment UI: Stripe Checkout  

## 🚀 Quick Start
**Prerequisites**  
Node.js (v16 or higher)  
npm or yarn  
MongoDB (local or Atlas)  
Stripe Account  

**Clone and Setup Backend**
```bash
# Clone the backend repository
git clone https://github.com/vibhanshu037/backend.git
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration (see Environment Setup section)

# Start MongoDB (if local)
mongod

# Start development server
npm run dev
```

**Clone and Setup Frontend**
```bash
# In a new terminal, clone frontend (or create with Vite)
git clone <repository-url>
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Quick Test**  
Backend: http://localhost:5000  
Frontend: http://localhost:3000  
Test API: `curl http://localhost:5000/api/v1/products`

## 📁 Project Structure

### Backend Structure
Code
```
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── stripe.js          # Stripe configuration
│   ├── controllers/
│   │   ├── cart.controller.js     # Cart operations
│   │   ├── checkout.controller.js # Payment processing
│   │   ├── product.controller.js  # Product CRUD
│   │   └── user.controller.js     # User authentication
│   ├── middleware/
│   │   └── auth.middleware.js     # JWT verification
│   ├── models/
│   │   ├── order.model.js         # Order schema
│   │   ├── product.model.js       # Product schema
│   │   └── user.model.js          # User schema
│   ├── routes/
│   │   ├── cart.routes.js         # Cart endpoints
│   │   ├── checkout.routes.js     # Payment endpoints
│   │   ├── product.routes.js      # Product endpoints
│   │   └── user.routes.js         # Auth endpoints
│   ├── utils/
│   │   ├── ApiError.js           # Custom error handling
│   │   ├── ApiResponse.js        # Standardized responses
│   │   └── asyncHandler.js       # Async wrapper utility
│   ├── App.js                    # Express app setup
│   └── index.js                  # Server entry point
├── .env                          # Environment variables
├── package.json                  # Dependencies & scripts
└── README.md                     # This file
```

### Frontend Structure
Code
```
ecommerce-frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx            # Navigation with cart count
│   │   ├── ProductList.jsx       # Product grid display
│   │   ├── Cart.jsx              # Shopping cart UI
│   │   ├── Checkout.jsx          # Checkout form
│   │   ├── PaymentSuccess.jsx    # Success page
│   │   └── PaymentFailed.jsx     # Failure page
│   ├── App.jsx                   # Main app with routing
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind styles
├── index.html                    # HTML template
├── tailwind.config.js            # Tailwind configuration
├── vite.config.js               # Vite configuration
└── package.json                 # Dependencies & scripts
```

## 📡 API Documentation
Base URL: http://localhost:5000/api/v1

### 🔐 User Authentication Routes
**Register User**  
HTTP  
POST /users/register  
Content-Type: application/json  
Request:

JSON
```json
{
  "fullName": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```
Response:

JSON
```json
{
  "statusCode": 200,
  "data": {
    "_id": "676f8a2e5c4d3f001a2b3c4d",
    "fullName": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2025-09-29T08:53:06.123Z",
    "updatedAt": "2025-09-29T08:53:06.123Z"
  },
  "message": "User registered successfully",
  "success": true
}
```

**Login User**  
HTTP  
POST /users/login  
Content-Type: application/json  
Request:

JSON
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```
Response:

JSON
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "676f8a2e5c4d3f001a2b3c4d",
      "fullName": "John Doe",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User logged In Successfully",
  "success": true
}
```

**Logout User (Protected)**  
HTTP  
POST /users/logout  
Authorization: Bearer <access_token>  

**Get Current User (Protected)**  
HTTP  
GET /users/current-user  
Authorization: Bearer <access_token>  

**Refresh Access Token**  
HTTP  
POST /users/refresh-token  
Content-Type: application/json  
Request:

JSON
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 🛍️ Product Routes (Public - No Auth Required)
**Get All Products**  
HTTP  
GET /products  
Response:

JSON
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "1",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation",
      "price": 99.99,
      "image": "https://images.unsplash.com/photo-15057404",
      "category": "Electronics",
      "stock": 50
    },
    {
      "_id": "2",
      "name": "Smart Watch",
      "description": "Fitness tracking smartwatch with heart rate monitor",
      "price": 199.99,
      "image": "https://images.unsplash.com/photo-15232750",
      "category": "Electronics",
      "stock": 30
    },
    {
      "_id": "3",
      "name": "Laptop Stand",
      "description": "Adjustable aluminum laptop stand for better ergonomics",
      "price": 49.99,
      "image": "https://images.unsplash.com/photo-152786455041",
      "category": "Accessories",
      "stock": 75
    },
    {
      "_id": "4",
      "name": "Coffee Mug",
      "description": "Premium ceramic coffee mug with thermal insulation",
      "price": 24.99,
      "image": "https://images.unsplash.com/photo-15069059253",
      "category": "Kitchen",
      "stock": 100
    },
    {
      "_id": "5",
      "name": "Backpack",
      "description": "Waterproof travel backpack with multiple compartments",
      "price": 79.99,
      "image": "https://images.unsplash.com/photo-15530",
      "category": "Travel",
      "stock": 40
    },
    {
      "_id": "6",
      "name": "Desk Lamp",
      "description": "LED desk lamp with adjustable brightness and color",
      "price": 34.99,
      "image": "https://images.unsplash.com/photo-1507003211",
      "category": "Home",
      "stock": 60
    }
  ],
  "message": "Products fetched successfully",
  "success": true
}
```

**Get Product by ID**  
HTTP  
GET /products/:id  
Example: GET /products/1  

Response:

JSON
```json
{
  "statusCode": 200,
  "data": {
    "_id": "1",
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation",
    "price": 99.99,
    "image": "https://images.unsplash.com/photo-1505740420928-",
    "category": "Electronics",
    "stock": 50
  },
  "message": "Product fetched successfully",
  "success": true
}
```

### 🛒 Shopping Cart Routes (Supports Both Auth & Guest Users)
Note: Cart routes use optionalAuth middleware - they work for both authenticated users and guest users. Guest users are identified by userId: 'guest'.

**Get Cart Contents**  
HTTP  
GET /cart  
Authorization: Bearer <access_token> (optional)  
Guest User Response:

JSON
```json
{
  "statusCode": 200,
  "data": {
    "items": [
      {
        "productId": "1",
        "name": "Wireless Headphones",
        "price": 99.99,
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        "quantity": 2
      },
      {
        "productId": "4",
        "name": "Coffee Mug",
        "price": 24.99,
        "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
        "quantity": 1
      }
    ],
    "totalItems": 3,
    "totalAmount": "224.97"
  },
  "message": "Cart fetched successfully",
  "success": true
}
```

**Add Item to Cart**  
HTTP  
POST /cart/add  
Content-Type: application/json  
Authorization: Bearer <access_token> (optional)  
Request:

JSON
```json
{
  "productId": "1",
  "quantity": 1
}
```
Response:

JSON
```json
{
  "statusCode": 200,
  "data": [
    {
      "productId": "1",
      "name": "Wireless Headphones",
      "price": 99.99,
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "quantity": 1
    }
  ],
  "message": "Product added to cart successfully",
  "success": true
}
```

**Update Cart Item Quantity**  
HTTP  
PATCH /cart/update/:productId  
Content-Type: application/json  
Authorization: Bearer <access_token> (optional)  
 

Request:

JSON
```json
{
  "quantity": 3
}
```
Response:

JSON
```json
{
  "statusCode": 200,
  "data": [
    {
      "productId": "1",
      "name": "Wireless Headphones",
      "price": 99.99,
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "quantity": 3
    }
  ],
  "message": "Cart updated successfully",
  "success": true
}
```

**Remove Item from Cart**  
HTTP  
DELETE /cart/remove/:productId  
Authorization: Bearer <access_token> (optional)  
 

Response:

JSON
```json
{
  "statusCode": 200,
  "data": [],
  "message": "Product removed from cart successfully",
  "success": true
}
```

**Clear Entire Cart**  
HTTP  
DELETE /cart/clear  
Authorization: Bearer <access_token> (optional)  
Response:

JSON
```json
{
  "statusCode": 200,
  "data": [],
  "message": "Cart cleared successfully",
  "success": true
}
```

### 💳 Checkout & Payment Routes (Supports Guest Checkout)
**Create Stripe Checkout Session**  
HTTP  
POST /checkout/create-session  
Content-Type: application/json  
Authorization: Bearer <access_token> (optional for guest checkout)  
Request (Guest User):

JSON
```json
{
  "email": "guest@example.com"
}
```
Request (Authenticated User):

JSON
```json
{
  "email": "user@example.com"
}
```
Response:

JSON
```json
{
  "statusCode": 200,
  "data": {
    "sessionId": "cs_test_b1eZFazy0ZuTuHCVzcZE7",
    "url": "https://checkout.stripe.com/c/pay/cs_testjkjkkjhk",
    "orderId": "676f8a2e5c4d3f001a2b3c4e"
  },
  "message": "Checkout session created successfully",
  "success": true
}
```

**Stripe Webhook Endpoint**  
HTTP  
POST /checkout/webhook  
Content-Type: application/json  
Stripe-Signature: t=1704067200,v1=8f7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d  
Note: This endpoint is called automatically by Stripe. It verifies the webhook signature and updates order status.

Webhook Events Handled:

checkout.session.completed - Payment successful  
checkout.session.async_payment_failed - Payment failed  

**Update Order Status (Fallback for Webhook Issues)**  
HTTP  
POST /checkout/update-order  
Content-Type: application/json  
Request:

JSON
```json
{
  "sessionId": "cs_test_b1eZFazy0ZuTuHCVzYaBoPjeE5ZDm2loVImqrIvdMokgiJIU3r7BIRcZE7"
}
```
Response:

JSON
```json
{
  "statusCode": 200,
  "data": {
    "_id": "676f8a2e5c4d3f001a2b3c4e",
    "user": null,
    "email": "guest@example.com",
    "items": [
      {
        "product": "1",
        "name": "Wireless Headphones",
        "price": 99.99,
        "quantity": 2
      }
    ],
    "totalAmount": 199.98,
    "paymentStatus": "successful",
    "stripePaymentIntentId": "pi_3P1234567890abcdef123456",
    "stripeSessionId": "cs_test_b1eZFazy0ZuTuHCVzYaBoPjeE5ZDm2loVImqrIvdMokgiJIU3r7BIRcZE7",
    "createdAt": "2025-09-29T08:53:06.123Z",
    "updatedAt": "2025-09-29T08:58:15.456Z"
  },
  "message": "Order updated successfully",
  "success": true
}
```

**Get Order Status by Session ID**  
HTTP  
GET /checkout/order-status/:sessionId  


Response:

JSON
```json
{
  "statusCode": 200,
  "data": {
    "_id": "676f8a2e5c4d3f001a2b3c4e",
    "user": null,
    "email": "guest@example.com",
    "items": [
      {
        "product": "1",
        "name": "Wireless Headphones",
        "price": 99.99,
        "quantity": 2,
        "_id": "676f8a2e5c4d3f001a2b3c4f"
      },
      {
        "product": "4",
        "name": "Coffee Mug",
        "price": 24.99,
        "quantity": 1,
        "_id": "676f8a2e5c4d3f001a2b3c50"
      }
    ],
    "totalAmount": 224.97,
    "paymentStatus": "successful",
    "stripePaymentIntentId": "pi_3P1234567890abcdef123456",
    "stripeSessionId": "cs_test_b1eZFazy0ZuTuHCVzYaBoPjeE5ZDm2loVImqrIvdMokgiJIU3r7BIRcZE7",
    "createdAt": "2025-09-29T08:53:06.123Z",
    "updatedAt": "2025-09-29T08:58:15.456Z",
    "__v": 0
  },
  "message": "Order status fetched successfully",
  "success": true
}
```

## 🎨 Frontend Overview
The frontend is built with React 18 and Vite for fast development and optimized builds. It provides a modern, responsive e-commerce interface.

**Key Frontend Features**  
🏠 Product Catalog Page (/)  
Grid layout displaying all available products  
Product cards with images, names, descriptions, prices  
"Add to Cart" buttons for each product  
Responsive design (1-3 columns based on screen size)  

🛒 Shopping Cart Page (/cart)  
Displays all items added to cart  
Quantity adjustment controls (+/- buttons)  
Individual item removal  
Cart total calculation  
Empty cart state with call-to-action  
"Proceed to Checkout" button  

💳 Checkout Page (/checkout)  
Order summary with item details and total  
Email input field (required)  
Stripe checkout integration  
Loading states during payment processing  
Error handling and validation  

✅ Payment Success Page (/payment-success)  
Success confirmation with order details  
Order ID, email, total amount display  
List of purchased items  
Payment status indicator  
"Continue Shopping" button  

❌ Payment Failed Page (/payment-failed)  
Failure notification with helpful messaging  
Common reasons for payment failure  
Options to retry payment or return to cart  
"Continue Shopping" fallback  

🧭 Navigation Header  
Site branding/logo  
Cart icon with real-time item count badge  
Navigation links (Products, Cart)  
Responsive mobile-friendly design  

**Frontend Tech Implementation**  
State Management: React useState/useEffect hooks  
Routing: React Router v6 with programmatic navigation  
Styling: Tailwind CSS with custom components  
HTTP Requests: Fetch API with error handling  
Payment Integration: Stripe Checkout redirect flow  
Real-time Updates: Cart count updates automatically  

**Frontend API Integration**  
Products: Fetches from /api/v1/products  
Cart Operations: All cart endpoints for CRUD operations  
Checkout: Creates Stripe sessions via /api/v1/checkout/create-session  
Order Status: Retrieves order details for success page  

## ⚙️ Environment Setup
**Backend Environment Variables (.env)**  
env
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URL=mongodb://localhost:27017/ecommerce
# For MongoDB Atlas:
# MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
# For production:
# CORS_ORIGIN=https://yourdomain.com

# JWT Authentication
ACCESS_TOKEN_SECRET=your-super-secure-access-token-secret-min-32-characters
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-super-secure-refresh-token-secret-min-32-characters
REFRESH_TOKEN_EXPIRY=10d

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_51ABC
STRIPE_WEBHOOK_SECRET=whsec

# Frontend URL (for Stripe redirects)
FRONTEND_URL=http://localhost:3000
# For production:
# FRONTEND_URL=https://yourdomain.com
```

