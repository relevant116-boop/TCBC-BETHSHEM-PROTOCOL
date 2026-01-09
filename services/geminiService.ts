
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async moderateImage(base64Image: string): Promise<{ isSafe: boolean; reason?: string }> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            parts: [
              { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
              { text: "Analyze this image for inappropriate content (violence, explicit material, or disrespect towards church values). Return a JSON object with 'isSafe' (boolean) and 'reason' (string)." }
            ]
          }
        ],
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isSafe: { type: Type.BOOLEAN },
              reason: { type: Type.STRING }
            }
          }
        }
      });

      return JSON.parse(response.text || '{"isSafe": true}');
    } catch (error) {
      console.error("Gemini Moderation Error:", error);
      return { isSafe: true }; // Default to safe if API fails for demo
    }
  }

  async generateTrivia(topic: string): Promise<any> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a multiple choice trivia question about ${topic} for a church protocol ministry. Return in JSON format: { question: string, options: string[], correctIndex: number }`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctIndex: { type: Type.NUMBER }
            }
          }
        }
      });
      return JSON.parse(response.text || "");
    } catch (error) {
      console.error("Gemini Trivia Error:", error);
      return null;
    }
  }
}

export const geminiService = new GeminiService();
