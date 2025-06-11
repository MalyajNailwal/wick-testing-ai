
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
  User
} from "lucide-react";
import { Conversation, Message } from "@/pages/Chat";
import { useToast } from "@/hooks/use-toast";

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
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      const aiResponses = [
        "I understand your question. Let me help you with that...",
        "That's an interesting point. Here's what I think...",
        "Based on what you've shared, I'd suggest...",
        "Great question! Let me break this down for you...",
        "I can definitely help with that. Here's my response...",
        "Thank you for asking. Here's what I'd recommend...",
      ];

      const assistantMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        role: "assistant",
        timestamp: new Date()
      };

      onUpdateConversation(conversation.id, {
        messages: [...updatedMessages, assistantMessage]
      });

    } catch (error) {
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
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome to WGPT</h2>
            <p className="text-muted-foreground">
              Start a new conversation to begin chatting with AI
            </p>
          </div>
          <Button onClick={onNewConversation} size="lg">
            Start New Chat
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-semibold truncate">{conversation.title}</h1>
        <p className="text-sm text-muted-foreground">
          {conversation.messages.length} messages
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6 max-w-4xl mx-auto">
          {conversation.messages.length === 0 ? (
            <div className="text-center py-12">
              <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No messages yet</h3>
              <p className="text-muted-foreground">Send a message to start the conversation</p>
            </div>
          ) : (
            conversation.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${msg.role === "assistant" ? "" : "flex-row-reverse"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "assistant" 
                    ? "bg-primary/10 text-primary" 
                    : "bg-secondary text-secondary-foreground"
                }`}>
                  {msg.role === "assistant" ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                
                <div className={`flex-1 space-y-2 ${msg.role === "assistant" ? "" : "text-right"}`}>
                  <div className={`inline-block max-w-[80%] p-4 rounded-2xl ${
                    msg.role === "assistant"
                      ? "bg-muted text-foreground rounded-tl-sm"
                      : "bg-primary text-primary-foreground rounded-tr-sm"
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="bg-muted p-4 rounded-2xl rounded-tl-sm max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">WGPT is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message WGPT..."
                className="min-h-[60px] max-h-[200px] resize-none pr-12"
                disabled={isLoading}
              />
              <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleImageUpload}
                  className="w-8 h-8 p-0"
                >
                  <Image className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleVoiceRecording}
                  className={`w-8 h-8 p-0 ${isListening ? "text-red-500" : ""}`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              size="lg"
              className="h-[60px] px-6"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2 text-center">
            WGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
