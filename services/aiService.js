// Mock AI implementation (replace with OpenAI API if needed)
async function getFoodRecommendation(item, userHistory) {
  console.log("AI called:", item, userHistory);

  return [
    "Garlic Bread",
    "Chocolate Milkshake",
    "French Fries"
  ];
}

module.exports = { getFoodRecommendation };