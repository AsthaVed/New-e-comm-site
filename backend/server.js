import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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

