import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})

// Debug: Check if environment variables are loaded
console.log('=== Environment Variables Debug ===')
console.log('PORT:', process.env.PORT)
console.log('MONGODB_URL:', process.env.MONGODB_URL ? 'Set' : 'Not set')
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not set')
console.log('STRIPE_WEBHOOK_SECRET:', process.env.STRIPE_WEBHOOK_SECRET ? 'Set' : 'Not set')
console.log('===================================')


import connectDB from "./config/db.js";
import { app } from "./App.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running at PORT : ${process.env.PORT || 5000}`)
        })
    })
    .catch((err) => {
        console.log("MONGO DB connection error !!!", err)
    })