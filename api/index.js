const serverless = require("serverless-http");
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://cravio-user.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Razorpay order
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ error: "Amount is required" });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_order_" + Date.now()
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Razorpay order failed" });
  }
});

app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => res.send("Cravio Server Running ✅"));

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);