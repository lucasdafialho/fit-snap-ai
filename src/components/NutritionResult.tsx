
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NutritionResultProps {
  isLoading?: boolean;
  calories?: number;
  carbs?: number;
  protein?: number;
  fats?: number;
  fitsInDiet?: boolean;
  className?: string;
}

export function NutritionResult({
  isLoading = false,
  calories,
  carbs,
  protein,
  fats,
  fitsInDiet,
  className,
}: NutritionResultProps) {
  if (isLoading) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-12", className)}>
        <Loader2 className="h-12 w-12 text-neon animate-spin" />
        <p className="mt-4 text-lg font-medium">Crunching calories... guilt-free!</p>
        <p className="text-muted-foreground">Our AI is analyzing your meal</p>
      </div>
    );
  }

  if (!calories) return null;

  return (
    <div className={cn(
      "rounded-2xl border bg-card/50 backdrop-blur-sm p-6 transition-all duration-300",
      fitsInDiet 
        ? "border-neon/30 shadow-[0_0_15px_rgba(57,255,20,0.15)]" 
        : "border-destructive/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]",
      className
    )}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          {fitsInDiet ? (
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-neon/10">
              <CheckCircle2 className="h-10 w-10 text-neon" />
            </div>
          ) : (
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-destructive/10">
              <XCircle className="h-10 w-10 text-destructive" />
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-medium mb-1">
          {fitsInDiet ? "Fits Your Diet" : "Doesn't Fit Your Diet"}
        </h3>
        
        <p className="text-muted-foreground mb-6">
          {fitsInDiet 
            ? "This meal aligns with your dietary goals." 
            : "This meal may not align with your dietary goals."
          }
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <div className="rounded-xl bg-background p-4 text-center">
            <p className="text-sm text-muted-foreground">Calories</p>
            <p className="text-2xl font-bold text-neon mt-1">{calories}</p>
          </div>
          
          <div className="rounded-xl bg-background p-4 text-center">
            <p className="text-sm text-muted-foreground">Carbs</p>
            <p className="text-2xl font-bold mt-1">{carbs}g</p>
          </div>
          
          <div className="rounded-xl bg-background p-4 text-center">
            <p className="text-sm text-muted-foreground">Protein</p>
            <p className="text-2xl font-bold mt-1">{protein}g</p>
          </div>
          
          <div className="rounded-xl bg-background p-4 text-center">
            <p className="text-sm text-muted-foreground">Fats</p>
            <p className="text-2xl font-bold mt-1">{fats}g</p>
          </div>
        </div>
      </div>
    </div>
  );
}
