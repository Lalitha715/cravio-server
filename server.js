require("dotenv").config();

const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

// Import AI Routes
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// =============================
// Middlewares
// =============================
app.use(
  cors({
    origin: [
      "http://localhost:3000",             // local dev
      "https://cravio-user.vercel.app"     // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// Parse JSON body
app.use(express.json());

// =============================
// Razorpay Configuration
// =============================
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// =============================
// Test Route
// =============================
app.get("/", (req, res) => {
  res.send("Cravio Server Running with Razorpay + AI ✅");
});

// =============================
// Razorpay Create Order API
// =============================
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ error: "Error creating Razorpay order" });
  }
});

// =============================
// AI Routes
// =============================
app.use("/api/ai", aiRoutes);

// =============================
// Start Server
// =============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});