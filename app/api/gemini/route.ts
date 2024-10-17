import { GEM_API } from "@/data/key";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (req:unknown) => {
  try {
    const { prompt } = await req.json();
    const genAI = new GoogleGenerativeAI(GEM_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { response } = await model.generateContent(prompt);

    return Response.json({
      response: response?.candidates[0]?.content?.parts[0],
    });
  } catch (error) {
    console.log(error);
  }
};
