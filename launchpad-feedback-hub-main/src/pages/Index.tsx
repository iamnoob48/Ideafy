import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, Users, Zap, ChevronRight, Star, BarChart3 } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";
import { IdeaSubmissionForm } from "@/components/IdeaSubmissionForm";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'submit' | 'dashboard'>('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleViewChange = (view: 'home' | 'submit' | 'dashboard') => {
    if (!isAuthenticated && view !== 'home') {
      setIsAuthOpen(true);
      return;
    }
    setCurrentView(view);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsAuthOpen(false);
  };

  if (currentView === 'submit') {
    return <IdeaSubmissionForm onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'dashboard') {
    return <Dashboard onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-8 w-8 text-primary animate-glow" />
            <h1 className="text-2xl font-bold gradient-text">Ideafy</h1>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => handleViewChange('dashboard')}
                  className="hover:text-primary transition-colors"
                >
                  Dashboard
                </Button>
                <Button 
                  onClick={() => handleViewChange('submit')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Submit Idea
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsAuthOpen(true)} className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Turn Your <span className="gradient-text">Ideas</span> Into Success
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
            Get instant AI-powered feedback on your startup ideas. Our advanced chatbot analyzes market potential, 
            provides SWOT analysis, and suggests improvements to help you build the next big thing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button 
              size="lg" 
              onClick={() => handleViewChange('submit')}
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 group"
            >
              Submit Your Idea 
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => handleViewChange('dashboard')}
              className="text-lg px-8 py-6 border-primary/50 hover:border-primary hover:bg-primary/10"
            >
              View Ideas
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
            Why Choose IdeaReview?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Instant AI Analysis",
                description: "Get immediate feedback on your startup idea with our advanced AI chatbot that analyzes market potential and viability."
              },
              {
                icon: TrendingUp,
                title: "Market Insights",
                description: "Receive detailed SWOT analysis and market potential ratings to understand your idea's competitive landscape."
              },
              {
                icon: Users,
                title: "Community Feedback",
                description: "Connect with other entrepreneurs and get community votes and feedback on your innovative ideas."
              }
            ].map((feature, index) => (
              <Card key={index} className="glass-card hover:border-primary/50 transition-all duration-300 animate-fade-in">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Lightbulb, number: "1,000+", label: "Ideas Analyzed" },
              { icon: Star, number: "98%", label: "Success Rate" },
              { icon: BarChart3, number: "500+", label: "Entrepreneurs Helped" }
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in">
                <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Validate Your Idea?</h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who trust IdeaReview to turn their concepts into successful startups.
          </p>
          <Button 
            size="lg" 
            onClick={() => handleViewChange('submit')}
            className="bg-primary hover:bg-primary/90 text-lg px-12 py-6 animate-glow"
          >
            Start Your Journey
          </Button>
        </div>
      </section>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
