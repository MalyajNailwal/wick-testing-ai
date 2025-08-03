
import { ResponseFormatter } from './responseFormatter';

const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;
const COHERE_API_URL = "https://api.cohere.ai/v1/chat";

export interface CohereMessage {
  role: "USER" | "CHATBOT";
  message: string;
}

export class CohereService {
  private static instance: CohereService;
  
  static getInstance(): CohereService {
    if (!CohereService.instance) {
      CohereService.instance = new CohereService();
    }
    return CohereService.instance;
  }

  async generateResponse(message: string, conversationHistory: CohereMessage[] = []): Promise<string> {
    const systemPrompt = `You are WGPT, the world's leading automotive AI expert. You specialize exclusively in automobiles, trucks, motorcycles, and all automotive technology. Your responses should be:

PROFESSIONAL FORMATTING RULES:
- Never use markdown formatting like **bold** or *italic*
- Write in clear, professional paragraphs
- Use numbered lists for step-by-step instructions
- Use bullet points for feature lists
- Keep responses concise but comprehensive
- Always maintain a professional, expert tone

AUTOMOTIVE EXPERTISE:
- Cars, trucks, SUVs, motorcycles, and commercial vehicles
- Engine technology, transmissions, and drivetrain systems
- Electric vehicles, hybrids, and alternative fuel technologies
- Vehicle maintenance, repairs, and troubleshooting
- Automotive industry trends and future mobility
- Performance modifications and racing technology
- Buying guides and vehicle recommendations
- Safety systems and automotive regulations

Always provide detailed, accurate automotive insights with practical advice. If asked about non-automotive topics, briefly acknowledge the question but redirect to automotive applications or alternatives.`;

    try {
      const response = await fetch(COHERE_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command-r-plus",
          message: message,
          chat_history: conversationHistory,
          preamble: systemPrompt,
          temperature: 0.7,
          max_tokens: 1200,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Cohere API error: ${response.status}`);
      }

      const data = await response.json();
      const rawResponse = data.text || "I apologize, but I couldn't generate a response. Please try again.";
      
      // Format the response professionally
      return ResponseFormatter.formatResponse(rawResponse);
    } catch (error) {
      console.error("Cohere API error:", error);
      throw new Error("Failed to get AI response. Please check your connection and try again.");
    }
  }
}
