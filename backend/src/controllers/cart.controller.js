import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";

// In-memory cart storage (in production, use Redis or database)
const userCarts = new Map();

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
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80", // Updated here too
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

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user?._id?.toString() || 'guest';

    if (!productId) {
        throw new ApiError(400, "Product ID is required");
    }

    // Find product in mock data (convert string ID back to ObjectId for comparison)
    const product = mockProducts.find(p => p._id.toString() === productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // Get or create user cart
    let cart = userCarts.get(userId) || [];

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.productId === productId);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity
        });
    }

    userCarts.set(userId, cart);

    return res
        .status(200)
        .json(new ApiResponse(200, cart, "Product added to cart successfully"));
});

const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user?._id?.toString() || 'guest';

    let cart = userCarts.get(userId) || [];
    cart = cart.filter(item => item.productId !== productId);
    userCarts.set(userId, cart);

    return res
        .status(200)
        .json(new ApiResponse(200, cart, "Product removed from cart successfully"));
});

const updateCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user?._id?.toString() || 'guest';

    if (quantity <= 0) {
        throw new ApiError(400, "Quantity must be greater than 0");
    }

    let cart = userCarts.get(userId) || [];
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity = quantity;
        userCarts.set(userId, cart);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, cart, "Cart updated successfully"));
});

const getCart = asyncHandler(async (req, res) => {
    const userId = req.user?._id?.toString() || 'guest';
    const cart = userCarts.get(userId) || [];

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return res
        .status(200)
        .json(new ApiResponse(200, {
            items: cart,
            totalItems,
            totalAmount: totalAmount.toFixed(2)
        }, "Cart fetched successfully"));
});

const clearCart = asyncHandler(async (req, res) => {
    const userId = req.user?._id?.toString() || 'guest';
    userCarts.set(userId, []);

    return res
        .status(200)
        .json(new ApiResponse(200, [], "Cart cleared successfully"));
});

export {
    addToCart,
    removeFromCart,
    updateCartItem,
    getCart,
    clearCart,
    userCarts // Export for use in checkout
}