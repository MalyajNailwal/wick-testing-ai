
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatArea from "@/components/chat/ChatArea";
import { useToast } from "@/hooks/use-toast";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isEditing?: boolean;
  images?: Array<{
    id: string;
    url: string;
    name: string;
  }>;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

const Chat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const storedUser = localStorage.getItem("wgpt_user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));

    // Load conversations from localStorage
    const storedConversations = localStorage.getItem("wgpt_conversations");
    if (storedConversations) {
      const parsed = JSON.parse(storedConversations);
      const conversationsWithDates = parsed.map((conv: any) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      setConversations(conversationsWithDates);
    }
  }, [navigate]);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: `conv_${Date.now()}`,
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedConversations = [newConversation, ...conversations];
    setConversations(updatedConversations);
    setActiveConversationId(newConversation.id);
    localStorage.setItem("wgpt_conversations", JSON.stringify(updatedConversations));
  };

  const deleteConversation = (conversationId: string) => {
    const updatedConversations = conversations.filter(conv => conv.id !== conversationId);
    setConversations(updatedConversations);
    
    if (activeConversationId === conversationId) {
      setActiveConversationId(updatedConversations.length > 0 ? updatedConversations[0].id : null);
    }
    
    localStorage.setItem("wgpt_conversations", JSON.stringify(updatedConversations));
    toast({
      title: "Chat deleted",
      description: "The conversation has been removed.",
    });
  };

  const updateConversation = (conversationId: string, updates: Partial<Conversation>) => {
    const updatedConversations = conversations.map(conv =>
      conv.id === conversationId ? { ...conv, ...updates, updatedAt: new Date() } : conv
    );
    setConversations(updatedConversations);
    localStorage.setItem("wgpt_conversations", JSON.stringify(updatedConversations));
  };

  const editMessage = (conversationId: string, messageId: string, newContent: string) => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (!conversation) return;

    const messageIndex = conversation.messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) return;

    // Remove all messages after the edited message (since we'll regenerate the response)
    const updatedMessages = conversation.messages.slice(0, messageIndex + 1);
    updatedMessages[messageIndex] = {
      ...updatedMessages[messageIndex],
      content: newContent,
      isEditing: false
    };

    updateConversation(conversationId, { messages: updatedMessages });
  };

  const activeConversation = conversations.find(conv => conv.id === activeConversationId);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewConversation={createNewConversation}
        onDeleteConversation={deleteConversation}
        user={user}
      />
      <ChatArea
        conversation={activeConversation}
        onUpdateConversation={updateConversation}
        onNewConversation={createNewConversation}
        onEditMessage={editMessage}
      />
    </div>
  );
};

export default Chat;
