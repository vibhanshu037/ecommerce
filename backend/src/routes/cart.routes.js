import { Router } from "express";
import {
    addToCart,
    removeFromCart,
    updateCartItem,
    getCart,
    clearCart
} from "../controllers/cart.controller.js";
import { optionalAuth } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/").get(optionalAuth, getCart)
router.route("/add").post(optionalAuth, addToCart)
router.route("/remove/:productId").delete(optionalAuth, removeFromCart)
router.route("/update/:productId").patch(optionalAuth, updateCartItem)
router.route("/clear").delete(optionalAuth, clearCart)

export default router