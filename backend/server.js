import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();
import Stripe from "stripe";
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env from the backend folder
config({ path: resolve(process.cwd(), 'backend/.env') });

// console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);


// const app = express();
// app.use(cors());
// app.use(express.json());
// ✅ Load .env from the backend folder - ONLY ONCE
// config({ path: resolve(process.cwd(), '.env') });

console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);
console.log("Current directory:", process.cwd());

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Check if Stripe key exists
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ ERROR: STRIPE_SECRET_KEY is missing!");
  console.log("💡 Make sure your .env file is in the backend folder");
  console.log("💡 And contains: STRIPE_SECRET_KEY=sk_test_your_actual_key");
  process.exit(1); // Stop server if no key
}

// Stripe secret key (from your dashboard -> Developers -> API keys)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Checkout Session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { all_products } = req.body;
    const line_items = all_products.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.images[0]],
        },
        unit_amount: Math.round(item.price * 100), // Stripe works in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `http://localhost:5173/success`, // frontend success page  `${req.headers.origin}/success`
      cancel_url: `http://localhost:5173/cancel`,   // frontend cancel page
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Run server
app.listen(8000, () => console.log("Server running on http://localhost:8000"));