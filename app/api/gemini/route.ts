import { GEM_API } from "@/data/key";
import { ApiResponse } from "@/interfaces/geminiResponse";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (req: Request) => {
  try {
    const { prompt } = await req.json();
    const genAI = new GoogleGenerativeAI(GEM_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { response } = await model.generateContent(prompt);
    console.log(JSON.stringify(response));
    const myResponse: any = response;
    return Response.json({
      response: myResponse?.candidates[0]?.content?.parts[0],
    });
  } catch (error) {
    console.log(error);
  }
};
