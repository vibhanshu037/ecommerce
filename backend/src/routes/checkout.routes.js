import { Router } from "express";
import {
    createCheckoutSession,
    handleWebhook,
    getOrderStatus,
    updateOrderOnSuccess
} from "../controllers/checkout.controller.js";
import { optionalAuth } from "../middleware/auth.middleware.js";
import express from "express";

const router = Router()

// Webhook route with raw body parsing
router.post("/webhook", express.raw({ type: 'application/json' }), handleWebhook)

// Regular routes
router.post("/create-session", optionalAuth, createCheckoutSession)
router.get("/order-status/:sessionId", getOrderStatus)
router.post("/update-order", updateOrderOnSuccess) // New route

export default router