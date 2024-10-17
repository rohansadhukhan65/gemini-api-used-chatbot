import { GEM_API } from "@/data/key";
// import { ApiResponse } from "@/interfaces/apiResponseGemini";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (req: Request) => {
  try {
    const { prompt } = await req.json();
    const genAI = new GoogleGenerativeAI(GEM_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data : any = await model.generateContent(prompt);
    console.log(JSON.stringify(data))
    const myResponse = data.response.candidates[0].content.parts[0];
    return Response.json({
      response: myResponse,
    });
  } catch (error) {
    console.log(error);
  }
};
