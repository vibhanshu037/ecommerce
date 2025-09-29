import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema({
    product: {
        type: String,  
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
})

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false 
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        items: [orderItemSchema],
        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },
        paymentStatus: {
            type: String,
            required: true,
            enum: ['pending', 'successful'], 
            default: 'pending'
        },
        stripePaymentIntentId: {
            type: String,
            required: true
        },
        stripeSessionId: {
            type: String,
            required: true
        },
        shippingAddress: {
            name: String,
            address: String,
            city: String,
            postalCode: String,
            country: String
        }
    },
    {
        timestamps: true
    }
)

export const Order = mongoose.model("Order", orderSchema)