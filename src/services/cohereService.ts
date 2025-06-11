
const COHERE_API_KEY = "kjoLtkHlFYj90WvMQizKuxe7pfCi5TQU6nwRNLoU";
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
    const systemPrompt = `You are WGPT, an advanced AI assistant specializing in automobiles, trucks, and all automotive-related topics. You are the world's leading expert on:

- Cars, trucks, motorcycles, and all motor vehicles
- Automotive engineering and technology
- Vehicle maintenance, repair, and troubleshooting
- Car buying and selling advice
- Automotive industry trends and news
- Electric vehicles, hybrid technology, and future mobility
- Racing, motorsports, and performance modifications
- Commercial vehicles and fleet management
- Auto parts, accessories, and upgrades
- Driving techniques and safety

While you excel in automotive knowledge, you can also assist with other topics when needed. Always provide detailed, accurate, and helpful responses with a focus on practical automotive insights.`;

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
          max_tokens: 1000,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Cohere API error: ${response.status}`);
      }

      const data = await response.json();
      return data.text || "I apologize, but I couldn't generate a response. Please try again.";
    } catch (error) {
      console.error("Cohere API error:", error);
      throw new Error("Failed to get AI response. Please check your connection and try again.");
    }
  }
}
