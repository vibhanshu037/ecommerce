import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY is not set in environment variables');
    console.error('Please check your .env file');
    process.exit(1);
}

console.log('✅ Stripe initialized successfully');
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);