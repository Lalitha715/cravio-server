// api/index.js
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");
const aiRoutes = require("../routes/aiRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Test route
app.get("/", (req, res) => {
  res.send("Cravio Server Running with Razorpay + AI ✅");
});

// Razorpay create-order
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ error: "Amount is required" });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating Razorpay order" });
  }
});

// AI routes
app.use("/api/ai", aiRoutes);

// Export as serverless function
module.exports = app;