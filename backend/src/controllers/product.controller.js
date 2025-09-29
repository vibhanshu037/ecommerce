import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Product } from "../models/product.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

// Mock product data
const mockProducts = [
    {
        _id: "1",
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        category: "Electronics",
        stock: 50
    },
    {
        _id: "2",
        name: "Smart Watch",
        description: "Fitness tracking smartwatch with heart rate monitor",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        category: "Electronics",
        stock: 30
    },
    {
        _id: "3",
        name: "Laptop Stand",
        description: "Adjustable aluminum laptop stand for better ergonomics",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
        category: "Accessories",
        stock: 75
    },
    {
        _id: "4",
        name: "Coffee Mug",
        description: "Premium ceramic coffee mug with thermal insulation",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80", // Updated coffee mug image
        category: "Kitchen",
        stock: 100
    },
    {
        _id: "5",
        name: "Backpack",
        description: "Waterproof travel backpack with multiple compartments",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        category: "Travel",
        stock: 40
    },
    {
        _id: "6",
        name: "Desk Lamp",
        description: "LED desk lamp with adjustable brightness and color",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
        category: "Home",
        stock: 60
    }
];

const getAllProducts = asyncHandler(async (req, res) => {
    // Using mock data instead of database
    return res
        .status(200)
        .json(new ApiResponse(200, mockProducts, "Products fetched successfully"))
})

const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params
    
    const product = mockProducts.find(p => p._id === id)
    
    if (!product) {
        throw new ApiError(404, "Product not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, product, "Product fetched successfully"))
})

export {
    getAllProducts,
    getProductById
}