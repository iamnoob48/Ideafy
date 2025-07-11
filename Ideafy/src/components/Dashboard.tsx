
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Filter, TrendingUp, ThumbsUp, ThumbsDown, Star, Calendar, User } from "lucide-react";

interface DashboardProps {
  onBack: () => void;
}

// Mock data for demonstration
const mockIdeas = [
  {
    id: 1,
    title: "AI-Powered Fitness Coach",
    description: "A mobile app that uses AI to create personalized workout plans based on user goals, fitness level, and available equipment...",
    category: "Technology",
    author: "John Doe",
    date: "2024-01-15",
    marketPotential: 5,
    overallScore: 92,
    upvotes: 24,
    downvotes: 3,
    status: "Analyzed"
  },
  {
    id: 2,
    title: "Sustainable Food Packaging",
    description: "Biodegradable food packaging made from agricultural waste that dissolves in water within 30 days...",
    category: "Sustainability",
    author: "Jane Smith",
    date: "2024-01-14",
    marketPotential: 4,
    overallScore: 88,
    upvotes: 31,
    downvotes: 5,
    status: "Analyzed"
  },
  {
    id: 3,
    title: "Virtual Reality Therapy",
    description: "VR platform for mental health therapy sessions, allowing patients to engage in immersive therapeutic environments...",
    category: "Healthcare",
    author: "Dr. Mike Johnson",
    date: "2024-01-13",
    marketPotential: 5,
    overallScore: 95,
    upvotes: 42,
    downvotes: 2,
    status: "Analyzed"
  },
  {
    id: 4,
    title: "Smart Urban Farming",
    description: "IoT-enabled vertical farming system for urban areas with automated nutrient delivery and climate control...",
    category: "Sustainability",
    author: "Sarah Wilson",
    date: "2024-01-12",
    marketPotential: 4,
    overallScore: 85,
    upvotes: 18,
    downvotes: 4,
    status: "Analyzed"
  }
];

export function Dashboard({ onBack }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredIdeas = mockIdeas
    .filter(idea => 
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === 'all' || idea.category === categoryFilter)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.overallScore - a.overallScore;
        case 'popularity':
          return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-yellow-400";
    return "text-red-400";
  };

  const getRatingStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="hover:bg-primary/10 hover:text-primary mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-3xl font-bold gradient-text">Ideas Dashboard</h1>
          </div>
        </div>

        {/* Filters */}
        <Card className="glass-card border-primary/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-primary" />
              Filter & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search ideas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Sustainability">Sustainability</SelectItem>
                  <SelectItem value="FinTech">FinTech</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Most Recent</SelectItem>
                  <SelectItem value="score">Highest Score</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Ideas Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredIdeas.map((idea) => (
            <Card key={idea.id} className="glass-card border-primary/20 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="mb-2">
                    {idea.category}
                  </Badge>
                  <div className={`text-2xl font-bold ${getScoreColor(idea.overallScore)}`}>
                    {idea.overallScore}%
                  </div>
                </div>
                <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                  {idea.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {idea.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {idea.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(idea.date).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Market Potential */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Market Potential:</span>
                    <div className="flex items-center">
                      {getRatingStars(idea.marketPotential)}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {idea.marketPotential}/5
                      </span>
                    </div>
                  </div>

                  {/* Voting */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300 hover:bg-green-400/10">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {idea.upvotes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        {idea.downvotes}
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="border-primary/50 hover:border-primary hover:bg-primary/10">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      View Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIdeas.length === 0 && (
          <Card className="glass-card border-primary/20 text-center py-12">
            <CardContent>
              <p className="text-muted-foreground text-lg mb-4">
                No ideas found matching your criteria
              </p>
              <Button onClick={onBack} className="bg-primary hover:bg-primary/90">
                Submit Your First Idea
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
