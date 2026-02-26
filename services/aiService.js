const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

  // MOCK AI SERVICE (No OpenAI call)

async function getFoodRecommendation(item, userHistory) {
  console.log("Mock AI Called ✅");
  console.log("Item:", item);
  console.log("History:", userHistory);

  return `
1. Garlic Bread
2. Chocolate Milkshake
3. French Fries
  `;


  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a smart food pairing AI." },
      { role: "user", content: prompt }
    ],
  });

  return response.choices[0].message.content;
}

module.exports = { getFoodRecommendation };