
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Star, Download, Share2, Lightbulb, TrendingUp, AlertTriangle, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatbotAnalysisProps {
  ideaData: any;
  analysis: any;
  onBack: () => void;
  onNewIdea: () => void;
}

export function ChatbotAnalysis({ ideaData, analysis, onBack, onNewIdea }: ChatbotAnalysisProps) {
  const { toast } = useToast();

  const handleExportPDF = () => {
    toast({
      title: "PDF Export",
      description: "Your analysis report is being generated...",
    });
  };

  const handleShare = () => {
    navigator.share?.({
      title: `${ideaData.title} - IdeaReview Analysis`,
      text: `Check out my startup idea analysis on IdeaReview!`,
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Share link copied to clipboard.",
      });
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-400";
    if (rating >= 3) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="hover:bg-primary/10 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportPDF}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={onNewIdea} className="bg-primary hover:bg-primary/90">
              <Lightbulb className="h-4 w-4 mr-2" />
              Submit New Idea
            </Button>
          </div>
        </div>

        {/* Header Card */}
        <Card className="glass-card border-primary/20 mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl gradient-text mb-2">{ideaData.title}</CardTitle>
                <CardDescription className="text-lg mb-4">
                  {ideaData.description.substring(0, 200)}...
                </CardDescription>
                <Badge variant="secondary" className="mb-4">
                  {ideaData.category}
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">
                  {analysis.overallScore}%
                </div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
                <Progress 
                  value={analysis.overallScore} 
                  className="w-24 mt-2"
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Market Potential */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Market Potential
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className={`text-6xl font-bold ${getRatingColor(analysis.marketPotential)}`}>
                  {analysis.marketPotential}
                </div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < analysis.marketPotential 
                          ? "text-yellow-400 fill-current" 
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mt-2">out of 5 stars</p>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                This rating is based on market size, competition analysis, and growth potential.
              </p>
            </CardContent>
          </Card>

          {/* SWOT Analysis */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                SWOT Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-400 mb-2">Strengths</h4>
                <ul className="text-sm space-y-1">
                  {analysis.swotAnalysis.strengths.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-red-400 mb-2">Weaknesses</h4>
                <ul className="text-sm space-y-1">
                  {analysis.swotAnalysis.weaknesses.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Opportunities & Threats */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                Opportunities & Threats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">Opportunities</h4>
                <ul className="text-sm space-y-1">
                  {analysis.swotAnalysis.opportunities.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-orange-400 mb-2">Threats</h4>
                <ul className="text-sm space-y-1">
                  {analysis.swotAnalysis.threats.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysis.suggestions.map((suggestion: string, index: number) => (
                  <li key={index} className="flex items-start p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <span className="text-primary mr-3 font-bold">{index + 1}.</span>
                    <span className="text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to take your idea to the next level?
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={onNewIdea}>
              Submit Another Idea
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              Get Detailed Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
