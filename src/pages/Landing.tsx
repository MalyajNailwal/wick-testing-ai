
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Zap, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b border-border/40">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            WGPT
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold tracking-tight">
            The AI Assistant
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
              That Understands You
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience next-generation AI conversations with image recognition, voice interaction, 
            and intelligent responses powered by advanced language models.
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Chatting Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <MessageSquare className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Intelligent Conversations</CardTitle>
              <CardDescription>
                Engage in natural, context-aware conversations with advanced AI
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Get instant responses with real-time streaming and optimized performance
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Secure & Private</CardTitle>
              <CardDescription>
                Your conversations are encrypted and protected with enterprise-grade security
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Demo Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-8">See WGPT in Action</h2>
          <div className="bg-card/30 backdrop-blur border border-border/50 rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3 max-w-sm">
                  How can I improve my productivity at work?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 max-w-md">
                  I'd be happy to help you boost your productivity! Here are some proven strategies:
                  
                  1. **Time blocking** - Schedule specific time slots for different tasks
                  2. **Eliminate distractions** - Turn off notifications during focused work
                  3. **Use the 2-minute rule** - If something takes less than 2 minutes, do it now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
