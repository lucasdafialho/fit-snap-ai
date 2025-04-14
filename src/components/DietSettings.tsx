
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Salad, Dumbbell, Scale, Ban, CalendarRange, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

interface DietSettingsProps {
  onSave: () => void;
  className?: string;
}

export function DietSettings({ onSave, className }: DietSettingsProps) {
  const [dietData, setDietData] = useState({
    dietType: "balanced",
    goal: "weight-loss",
    targetWeight: "150",
    currentWeight: "165",
    height: "5'10\"",
    activityLevel: "moderate",
    caloriesPerDay: "2100",
  });

  const [restrictions, setRestrictions] = useState([
    { id: "dairy", name: "Dairy", enabled: false },
    { id: "gluten", name: "Gluten", enabled: false },
    { id: "nuts", name: "Nuts", enabled: true },
    { id: "shellfish", name: "Shellfish", enabled: false },
    { id: "soy", name: "Soy", enabled: false },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDietData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleRestriction = (id: string) => {
    setRestrictions(
      restrictions.map((restriction) =>
        restriction.id === id
          ? { ...restriction, enabled: !restriction.enabled }
          : restriction
      )
    );
  };

  const dietTypes = [
    { id: "balanced", name: "Balanced" },
    { id: "keto", name: "Ketogenic" },
    { id: "paleo", name: "Paleo" },
    { id: "vegetarian", name: "Vegetarian" },
    { id: "vegan", name: "Vegan" },
    { id: "mediterranean", name: "Mediterranean" },
    { id: "low-carb", name: "Low Carb" },
  ];

  const goals = [
    { id: "weight-loss", name: "Weight Loss" },
    { id: "weight-gain", name: "Weight Gain" },
    { id: "maintenance", name: "Maintenance" },
    { id: "muscle-gain", name: "Muscle Gain" },
    { id: "athletic-performance", name: "Athletic Performance" },
  ];

  const activityLevels = [
    { id: "sedentary", name: "Sedentary (little or no exercise)" },
    { id: "light", name: "Light (exercise 1-3 days/week)" },
    { id: "moderate", name: "Moderate (exercise 3-5 days/week)" },
    { id: "active", name: "Active (exercise 6-7 days/week)" },
    { id: "very-active", name: "Very Active (hard exercise every day)" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Basic Diet Information</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dietType">Diet Type</Label>
              <Select 
                value={dietData.dietType}
                onValueChange={(value) => setDietData((prev) => ({ ...prev, dietType: value }))}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Salad className="h-4 w-4 text-neon" />
                    <SelectValue placeholder="Select diet type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {dietTypes.map((diet) => (
                    <SelectItem key={diet.id} value={diet.id}>
                      {diet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goal">Goal</Label>
              <Select
                value={dietData.goal}
                onValueChange={(value) => setDietData((prev) => ({ ...prev, goal: value }))}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-neon" />
                    <SelectValue placeholder="Select your goal" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {goals.map((goal) => (
                    <SelectItem key={goal.id} value={goal.id}>
                      {goal.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentWeight">Current Weight (lbs)</Label>
                <div className="relative">
                  <Scale className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="currentWeight"
                    name="currentWeight"
                    value={dietData.currentWeight}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetWeight">Target Weight (lbs)</Label>
                <div className="relative">
                  <Scale className="absolute left-3 top-3 h-4 w-4 text-neon" />
                  <Input
                    id="targetWeight"
                    name="targetWeight"
                    value={dietData.targetWeight}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select
                value={dietData.activityLevel}
                onValueChange={(value) => setDietData((prev) => ({ ...prev, activityLevel: value }))}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Select activity level" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {activityLevels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="caloriesPerDay">Daily Calorie Target</Label>
              <div className="relative">
                <Input
                  id="caloriesPerDay"
                  name="caloriesPerDay"
                  value={dietData.caloriesPerDay}
                  onChange={handleChange}
                  className="pl-4"
                />
                <span className="absolute right-4 top-3 text-sm text-muted-foreground">
                  kcal
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Dietary Restrictions & Preferences</h3>
          
          <div className="p-4 bg-muted/30 rounded-lg border border-border mb-6">
            <div className="flex flex-wrap gap-2">
              {restrictions.map((restriction) => (
                <button
                  key={restriction.id}
                  type="button"
                  onClick={() => toggleRestriction(restriction.id)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm flex items-center gap-1.5 transition-colors",
                    restriction.enabled
                      ? "bg-destructive/80 text-white hover:bg-destructive"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {restriction.enabled && <Ban className="h-3 w-3" />}
                  {restriction.name}
                </button>
              ))}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 px-2 rounded-full">
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Add Restriction</DropdownMenuItem>
                  <DropdownMenuItem>Clear All</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-medium mb-3">Macro Distribution</h4>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "Carbs", value: 40, color: "bg-blue-500" },
                  { name: "Protein", value: 30, color: "bg-green-500" },
                  { name: "Fat", value: 30, color: "bg-yellow-500" }
                ].map((macro) => (
                  <div key={macro.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{macro.name}</span>
                      <span className="text-neon">{macro.value}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${macro.value}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full ${macro.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-base font-medium mb-3">Meal Frequency</h4>
              <div className="grid grid-cols-2 gap-4">
                <Select defaultValue="3">
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <CalendarRange className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Meals per day" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 meals per day</SelectItem>
                    <SelectItem value="3">3 meals per day</SelectItem>
                    <SelectItem value="4">4 meals per day</SelectItem>
                    <SelectItem value="5">5 meals per day</SelectItem>
                    <SelectItem value="6">6 meals per day</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="yes">
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <CalendarRange className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Include snacks" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Include snacks</SelectItem>
                    <SelectItem value="no">No snacks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-neon/30 bg-neon/5">
              <h4 className="text-base font-medium mb-2">Recommendation</h4>
              <p className="text-sm text-muted-foreground">
                Based on your activity level and goals, we recommend a daily intake of 
                <span className="text-neon font-bold mx-1">2,100 calories</span>
                to achieve your target weight of 150 lbs in about 12 weeks.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-neon text-background hover:bg-neon/90">
          Save Diet Settings
        </Button>
      </div>
    </form>
  );
}
