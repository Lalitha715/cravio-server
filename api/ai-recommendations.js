const { getFoodRecommendation } = require("../services/aiService");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { item, history } = req.body;

    const suggestions = await getFoodRecommendation(item, history);

    res.status(200).json({ suggestions });

  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ error: err.message });
  }
};