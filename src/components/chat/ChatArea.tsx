
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Image, 
  Mic, 
  MicOff, 
  Paperclip,
  Bot,
  User,
  Sparkles,
  Car
} from "lucide-react";
import { Conversation, Message } from "@/pages/Chat";
import { useToast } from "@/hooks/use-toast";
import { CohereService, CohereMessage } from "@/services/cohereService";

interface ChatAreaProps {
  conversation?: Conversation;
  onUpdateConversation: (conversationId: string, updates: Partial<Conversation>) => void;
  onNewConversation: () => void;
}

const ChatArea = ({ conversation, onUpdateConversation, onNewConversation }: ChatAreaProps) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const cohereService = CohereService.getInstance();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [conversation?.messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // If no conversation exists, create a new one
    if (!conversation) {
      onNewConversation();
      return;
    }

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      content: message.trim(),
      role: "user",
      timestamp: new Date()
    };

    // Update conversation title if it's the first message
    const newTitle = conversation.messages.length === 0 
      ? message.trim().slice(0, 50) + (message.trim().length > 50 ? "..." : "")
      : conversation.title;

    // Add user message
    const updatedMessages = [...conversation.messages, userMessage];
    onUpdateConversation(conversation.id, {
      messages: updatedMessages,
      title: newTitle
    });

    setMessage("");
    setIsLoading(true);

    try {
      // Convert conversation history to Cohere format
      const cohereHistory: CohereMessage[] = conversation.messages.map(msg => ({
        role: msg.role === "user" ? "USER" : "CHATBOT",
        message: msg.content
      }));

      // Get AI response from Cohere
      const aiResponse = await cohereService.generateResponse(userMessage.content, cohereHistory);

      const assistantMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        content: aiResponse,
        role: "assistant",
        timestamp: new Date()
      };

      onUpdateConversation(conversation.id, {
        messages: [...updatedMessages, assistantMessage]
      });

    } catch (error) {
      console.error("AI response error:", error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceRecording = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Voice recording",
        description: "Voice recording feature coming soon!",
      });
    }
  };

  const handleImageUpload = () => {
    toast({
      title: "Image upload",
      description: "Image recognition feature coming soon!",
    });
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/5">
        <div className="text-center space-y-8 max-w-lg px-8">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Welcome to WGPT
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your AI-powered automotive expert. Get instant answers about cars, trucks, 
              maintenance, buying guides, and everything automotive.
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full">🚗 Cars</span>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full">🚛 Trucks</span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full">🔧 Maintenance</span>
              <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full">⚡ EVs</span>
            </div>
          </div>
          <Button onClick={onNewConversation} size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
            <Car className="mr-2 h-5 w-5" />
            Start Your Automotive Journey
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-background via-background to-secondary/5">
      {/* Enhanced Chat Header */}
      <div className="p-6 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Car className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {conversation.title}
            </h1>
            <p className="text-sm text-muted-foreground flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              {conversation.messages.length} messages • Automotive Expert Mode
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
        <div className="space-y-8 max-w-4xl mx-auto">
          {conversation.messages.length === 0 ? (
            <div className="text-center py-16 space-y-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                <Bot className="h-8 w-8 text-blue-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Ready to help with your automotive needs</h3>
                <p className="text-muted-foreground">Ask me anything about cars, trucks, maintenance, or automotive technology</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                  <p className="text-sm text-blue-400">💡 "What's the best SUV for families?"</p>
                </div>
                <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                  <p className="text-sm text-green-400">🔧 "How often should I change my oil?"</p>
                </div>
                <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                  <p className="text-sm text-purple-400">⚡ "Tell me about electric vehicle benefits"</p>
                </div>
                <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                  <p className="text-sm text-orange-400">🚛 "Best pickup truck for work?"</p>
                </div>
              </div>
            </div>
          ) : (
            conversation.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${msg.role === "assistant" ? "" : "flex-row-reverse"} animate-fade-in`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "assistant" 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600" 
                    : "bg-gradient-to-r from-green-500 to-blue-500"
                }`}>
                  {msg.role === "assistant" ? (
                    <Car className="h-5 w-5 text-white" />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>
                
                <div className={`flex-1 space-y-2 ${msg.role === "assistant" ? "" : "text-right"}`}>
                  <div className={`inline-block max-w-[85%] p-4 rounded-2xl backdrop-blur-sm ${
                    msg.role === "assistant"
                      ? "bg-muted/80 text-foreground rounded-tl-sm border border-border/50"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-sm shadow-lg"
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex gap-4 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Car className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-muted/80 backdrop-blur-sm p-4 rounded-2xl rounded-tl-sm max-w-[80%] border border-border/50">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">WGPT is analyzing your automotive query...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Enhanced Input Area */}
      <div className="p-6 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about cars, trucks, or automotive technology..."
                className="min-h-[60px] max-h-[200px] resize-none pr-20 bg-background/50 backdrop-blur-sm border-border/50 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-2xl"
                disabled={isLoading}
              />
              <div className="absolute right-3 bottom-3 flex items-center space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleImageUpload}
                  className="w-8 h-8 p-0 hover:bg-blue-500/10 hover:text-blue-400"
                >
                  <Image className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleVoiceRecording}
                  className={`w-8 h-8 p-0 ${isListening ? "text-red-500 hover:bg-red-500/10" : "hover:bg-purple-500/10 hover:text-purple-400"}`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              size="lg"
              className="h-[60px] px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-3 text-center">
            WGPT Automotive Expert • Powered by advanced AI • 
            <span className="text-blue-400">Specializing in cars, trucks & automotive technology</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
