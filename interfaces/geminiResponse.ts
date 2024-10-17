interface SafetyRating {
  category: string;
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
  finishReason: string;
  index: number;
  safetyRatings: SafetyRating[];
}

interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
}

export interface ApiResponse {
  candidates: Candidate[];
  usageMetadata: UsageMetadata;
}
