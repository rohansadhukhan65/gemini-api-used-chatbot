interface SafetyRating {
  category:
    | "HARM_CATEGORY_SEXUALLY_EXPLICIT"
    | "HARM_CATEGORY_HATE_SPEECH"
    | "HARM_CATEGORY_HARASSMENT"
    | "HARM_CATEGORY_DANGEROUS_CONTENT";
  probability: "NEGLIGIBLE" | "LOW" | "MEDIUM" | "HIGH";
}

interface Part {
  text: string;
}

interface Content {
  parts: Part[];
  role: string;
}

interface Candidate {
  content: Content;
  finishReason: "STOP" | string;
  index: number;
  safetyRatings: SafetyRating[];
}

interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
}

interface ResponseData {
  candidates: Candidate[];
  usageMetadata: UsageMetadata;
}

export interface ApiResponse {
  response: ResponseData;
}
