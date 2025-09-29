import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        stripeProductId: {
            type: String
        },
        stripePriceId: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export const Product = mongoose.model("Product", productSchema)