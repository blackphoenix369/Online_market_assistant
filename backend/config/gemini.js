import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Example: Text generation function
export const generateContent = async (prompt) => {
try {
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const result = await model.generateContent(prompt);
return result.response.text();
} catch (error) {
console.error("❌ Gemini API Error:", error.message);
return null;
}
};