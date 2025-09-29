import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.model.js";
import { userCarts } from "./cart.controller.js";
import { stripe } from "../config/stripe.js";

const createCheckoutSession = asyncHandler(async (req, res) => {
 
    // Check if body exists
    if (!req.body) {
        throw new ApiError(400, "Request body is required");
    }

    const { email } = req.body;
    const userId = req.user?._id?.toString() || 'guest';

    if (!email) {
        throw new ApiError(400, "Email is required for checkout");
    }

    // Get cart items
    const cart = userCarts.get(userId) || [];
    
    if (cart.length === 0) {
        throw new ApiError(400, "Cart is empty");
    }

    // Calculate total amount
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create line items for Stripe
    const lineItems = cart.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
                images: [item.image]
            },
            unit_amount: Math.round(item.price * 100) // Convert to cents
        },
        quantity: item.quantity
    }));

    try {
        console.log('Creating Stripe session...');
        
        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            customer_email: email,
            success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment-failed`,
            metadata: {
                userId: userId,
                email: email
            }
        });

        console.log('Stripe session created:', session.id);

        // Create order in database with pending status
        const order = await Order.create({
            user: req.user?._id || null,
            email: email,
            items: cart.map(item => ({
                product: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            totalAmount: totalAmount,
            paymentStatus: 'pending',
            stripePaymentIntentId: session.payment_intent || 'pending',
            stripeSessionId: session.id
        });

        console.log('Order created:', order._id);

        return res
            .status(200)
            .json(new ApiResponse(200, {
                sessionId: session.id,
                url: session.url,
                orderId: order._id
            }, "Checkout session created successfully"));

    } catch (error) {
        throw new ApiError(500, `Failed to create checkout session: ${error.message}`);
    }
});

const handleWebhook = asyncHandler(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
        console.error('STRIPE_WEBHOOK_SECRET is not set');
        return res.status(400).send('Webhook secret not configured');
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Processing successful payment for session:', session.id);
            
            // Update order status to successful
            const updatedOrder = await Order.findOneAndUpdate(
                { stripeSessionId: session.id },
                { 
                    paymentStatus: 'successful', // Changed from 'completed' to 'successful'
                    stripePaymentIntentId: session.payment_intent
                },
                { new: true }
            );

            if (updatedOrder) {
                
                // Clear user's cart - FIXED: Ensure cart is actually cleared
                const userId = session.metadata.userId;
                if (userId && userCarts.has(userId)) {
                    userCarts.set(userId, []);
                    console.log('✅ Cart cleared for user:', userId);
                } else {
                    console.log('⚠️ User cart not found or already empty for userId:', userId);
                }
            } else {
                console.error('❌ Order not found for session:', session.id);
            }

            break;

        case 'checkout.session.async_payment_failed':
        case 'checkout.session.expired':
            const failedSession = event.data.object;
            console.log('Processing failed payment for session:', failedSession.id);
            
            // Update order status to failed
            const failedOrder = await Order.findOneAndUpdate(
                { stripeSessionId: failedSession.id },
                { paymentStatus: 'failed' },
                { new: true }
            );

            if (failedOrder) {
                console.log('Order status updated to failed:', failedOrder._id);
            } else {
                console.error('Order not found for failed session:', failedSession.id);
            }

            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

const getOrderStatus = asyncHandler(async (req, res) => {
    const { sessionId } = req.params;

    const order = await Order.findOne({ stripeSessionId: sessionId });
    
    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, order, "Order status fetched successfully"));
});

const updateOrderOnSuccess = asyncHandler(async (req, res) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        throw new ApiError(400, "Session ID is required");
    }

    try {
        // Retrieve the session from Stripe to verify payment
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        console.log('Session status:', session.payment_status);
        console.log('Session metadata:', session.metadata);

        if (session.payment_status === 'paid') {
            // Update order status to successful
            const updatedOrder = await Order.findOneAndUpdate(
                { stripeSessionId: sessionId },
                { 
                    paymentStatus: 'successful',
                    stripePaymentIntentId: session.payment_intent
                },
                { new: true }
            );

            if (updatedOrder) {
                console.log('Order manually updated to successful:', updatedOrder._id);
                
                // Clear user's cart
                const userId = session.metadata.userId;
                if (userId && userCarts.has(userId)) {
                    userCarts.set(userId, []);
                    console.log('Cart cleared for user:', userId);
                }

                return res
                    .status(200)
                    .json(new ApiResponse(200, updatedOrder, "Order updated successfully"));
            }
        }
        
        throw new ApiError(400, "Payment not completed or order not found");
        
    } catch (error) {
        console.error('Error updating order:', error);
        throw new ApiError(500, `Failed to update order: ${error.message}`);
    }
});

export {
    createCheckoutSession,
    handleWebhook,
    getOrderStatus,
    updateOrderOnSuccess
}