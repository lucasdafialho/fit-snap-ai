
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sparkles, ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface DietGoal {
  id: string;
  name: string;
}

interface Suggestion {
  id: string;
  original: string;
  replacement: string;
}

interface NutritionistTip {
  id: string;
  text: string;
  author: string;
  role: string;
}

interface DietAdjustmentsProps {
  className?: string;
  onSave?: () => void;
}

export function DietAdjustments({ className, onSave }: DietAdjustmentsProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [customGoal, setCustomGoal] = useState("");

  const goals: DietGoal[] = [
    { id: "lose-weight", name: "Lose Weight" },
    { id: "gain-muscle", name: "Gain Muscle" },
    { id: "maintain", name: "Maintain Weight" },
    { id: "custom", name: "Custom Goal" }
  ];

  const suggestions: Suggestion[] = [
    { id: "1", original: "White Rice", replacement: "Cauliflower Rice" },
    { id: "2", original: "French Fries", replacement: "Sweet Potato Fries" },
    { id: "3", original: "Regular Soda", replacement: "Sparkling Water" }
  ];

  const tips: NutritionistTip[] = [
    {
      id: "1",
      text: "Try to include a source of protein with every meal to help build muscle and keep you feeling fuller for longer.",
      author: "Dr. Sarah Chen",
      role: "Nutritionist"
    },
    {
      id: "2",
      text: "For weight loss, focus on creating a slight calorie deficit while maintaining adequate protein intake to preserve muscle mass.",
      author: "James Wilson",
      role: "Dietician"
    }
  ];

  return (
    <div className={cn("space-y-8", className)}>
      <div>
        <h3 className="text-xl font-medium mb-4">What's your goal?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {goals.map((goal) => (
            <Button
              key={goal.id}
              variant={selectedGoal === goal.id ? "default" : "outline"}
              className={cn(
                "h-auto py-4 px-3",
                selectedGoal === goal.id && "bg-neon text-background"
              )}
              onClick={() => setSelectedGoal(goal.id)}
            >
              {goal.name}
            </Button>
          ))}
        </div>
        
        {selectedGoal === "custom" && (
          <div className="mt-3">
            <Input
              placeholder="Enter your specific goal..."
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-xl font-medium mb-4 flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-neon" />
          Smart Suggestions
        </h3>
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50 hover:border-neon/30 transition-colors"
            >
              <div className="flex-1">
                <p className="text-muted-foreground">Replace</p>
                <p className="font-medium">{suggestion.original}</p>
              </div>
              
              <ArrowRight className="h-5 w-5 text-neon flex-shrink-0" />
              
              <div className="flex-1">
                <p className="text-muted-foreground">With</p>
                <p className="font-medium">{suggestion.replacement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-medium mb-4 flex items-center">
          <User className="h-5 w-5 mr-2 text-neon" />
          Expert Recommendations
        </h3>
        <div className="space-y-4">
          {tips.map((tip) => (
            <div 
              key={tip.id}
              className="p-4 rounded-xl border border-border bg-card/50"
            >
              <p className="italic mb-3">{tip.text}</p>
              <div className="flex items-center justify-end text-sm text-muted-foreground">
                <p>— {tip.author}, {tip.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button 
          className="bg-neon text-background hover:bg-neon/90 flex-1"
          onClick={onSave}
        >
          Save Adjustments
        </Button>
        <Button 
          variant="outline" 
          className="border-neon text-neon hover:bg-neon/10 flex-1"
        >
          Talk to a Professional
        </Button>
      </div>
    </div>
  );
}
