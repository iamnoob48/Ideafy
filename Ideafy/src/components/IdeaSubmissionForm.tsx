
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Lightbulb, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChatbotAnalysis } from "@/components/ChatbotAnalysis";

interface IdeaSubmissionFormProps {
  onBack: () => void;
}

interface IdeaData {
  title: string;
  description: string;
  category: string;
  file?: File;
}

export function IdeaSubmissionForm({ onBack }: IdeaSubmissionFormProps) {
  const [ideaData, setIdeaData] = useState<IdeaData>({
    title: '',
    description: '',
    category: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const { toast } = useToast();

  const handleInputChange = (field: keyof IdeaData, value: string) => {
    setIdeaData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdeaData(prev => ({ ...prev, file }));
      toast({
        title: "File uploaded",
        description: `${file.name} has been attached to your idea.`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ideaData.title || !ideaData.description || !ideaData.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate chatbot analysis
    setTimeout(() => {
      const mockAnalysis = {
        marketPotential: Math.floor(Math.random() * 2) + 4, // 4-5 rating
        swotAnalysis: {
          strengths: [
            "Innovative approach to solving existing problems",
            "Clear target market identification",
            "Scalable business model"
          ],
          weaknesses: [
            "Potential high initial investment required",
            "Competition from established players"
          ],
          opportunities: [
            "Growing market demand",
            "Potential for strategic partnerships",
            "Technology advancement opportunities"
          ],
          threats: [
            "Market saturation risk",
            "Regulatory changes",
            "Economic downturn impact"
          ]
        },
        suggestions: [
          "Consider conducting market research to validate demand",
          "Develop a minimum viable product (MVP) for testing",
          "Identify potential funding sources early",
          "Build a strong team with complementary skills"
        ],
        overallScore: Math.floor(Math.random() * 20) + 80 // 80-100 score
      };
      
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete!",
        description: "Your idea has been analyzed successfully.",
      });
    }, 3000);
  };

  if (analysisResult) {
    return (
      <ChatbotAnalysis 
        ideaData={ideaData} 
        analysis={analysisResult} 
        onBack={onBack}
        onNewIdea={() => {
          setAnalysisResult(null);
          setIdeaData({ title: '', description: '', category: '' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="hover:bg-primary/10 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <Card className="glass-card border-primary/20">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <Lightbulb className="h-16 w-16 text-primary animate-glow" />
            </div>
            <CardTitle className="text-3xl gradient-text">Submit Your Startup Idea</CardTitle>
            <CardDescription className="text-lg">
              Share your innovative concept and get instant AI-powered feedback
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-semibold">
                  Idea Title *
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a compelling title for your startup idea"
                  value={ideaData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="text-base py-3"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-semibold">
                  Category *
                </Label>
                <Select value={ideaData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="text-base py-3">
                    <SelectValue placeholder="Select your startup category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="fintech">FinTech</SelectItem>
                    <SelectItem value="ecommerce">E-Commerce</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="sustainability">Sustainability</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                    <SelectItem value="transport">Transportation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-semibold">
                  Detailed Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your startup idea in detail. Include the problem you're solving, your solution, target market, and business model..."
                  value={ideaData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="min-h-[200px] text-base resize-none"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  {ideaData.description.length}/1000 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file" className="text-base font-semibold">
                  Supporting Document (Optional)
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Upload business plan, wireframes, or any supporting documents
                    </p>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('file')?.click()}
                      className="border-primary/50 hover:border-primary hover:bg-primary/10"
                    >
                      Choose File
                    </Button>
                    {ideaData.file && (
                      <p className="text-sm text-primary mt-2">
                        {ideaData.file.name} selected
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing Your Idea...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Submit for AI Analysis
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
