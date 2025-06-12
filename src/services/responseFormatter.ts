
export class ResponseFormatter {
  static formatResponse(text: string): string {
    // Remove markdown formatting and make it professional
    let formatted = text
      // Remove bold/italic markdown
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      
      // Convert numbered lists to proper format
      .replace(/^\d+\.\s+\*\*(.*?)\*\*\s*-\s*(.*?)$/gm, '$1: $2')
      
      // Clean up bullet points
      .replace(/^\s*[-•]\s+/gm, '• ')
      
      // Ensure proper paragraph spacing
      .replace(/\n\n+/g, '\n\n')
      
      // Clean up extra spaces
      .replace(/\s+/g, ' ')
      .trim();

    return formatted;
  }

  static createProfessionalResponse(topic: string, points: string[]): string {
    const intro = `I'd be happy to help you with ${topic}. Here are some proven strategies:`;
    const formattedPoints = points.map((point, index) => `${index + 1}. ${point}`).join('\n');
    return `${intro}\n\n${formattedPoints}`;
  }
}
