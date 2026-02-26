const express = require("express");
const router = express.Router();
const { getFoodRecommendation } = require("../services/aiService");

router.post("/recommendations", async (req, res) => {
  try {
    const { item, history } = req.body;
    const result = await getFoodRecommendation(item, history);
    res.json({ suggestions: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;