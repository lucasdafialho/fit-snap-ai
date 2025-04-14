
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("flex flex-col items-center justify-center py-12", className)}
      >
        <Loader2 className="h-12 w-12 text-neon animate-spin" />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg font-medium"
        >
          Crunching calories... guilt-free!
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground"
        >
          Our AI is analyzing your meal
        </motion.p>
      </motion.div>
    );
  }

  if (!calories) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl border bg-card/50 backdrop-blur-sm p-6 transition-all duration-300",
        fitsInDiet 
          ? "border-neon/30 shadow-[0_0_15px_rgba(57,255,20,0.15)]" 
          : "border-destructive/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]",
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="mb-4"
        >
          {fitsInDiet ? (
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-neon/10">
              <CheckCircle2 className="h-10 w-10 text-neon" />
            </div>
          ) : (
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-destructive/10">
              <XCircle className="h-10 w-10 text-destructive" />
            </div>
          )}
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-medium mb-1"
        >
          {fitsInDiet ? "Fits Your Diet" : "Doesn't Fit Your Diet"}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-6"
        >
          {fitsInDiet 
            ? "This meal aligns with your dietary goals." 
            : "This meal may not align with your dietary goals."
          }
        </motion.p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl bg-background p-4 text-center hover:bg-muted/50 transition-colors"
          >
            <p className="text-sm text-muted-foreground">Calories</p>
            <p className="text-2xl font-bold text-neon mt-1">{calories}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl bg-background p-4 text-center hover:bg-muted/50 transition-colors"
          >
            <p className="text-sm text-muted-foreground">Carbs</p>
            <p className="text-2xl font-bold mt-1">{carbs}g</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-xl bg-background p-4 text-center hover:bg-muted/50 transition-colors"
          >
            <p className="text-sm text-muted-foreground">Protein</p>
            <p className="text-2xl font-bold mt-1">{protein}g</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-xl bg-background p-4 text-center hover:bg-muted/50 transition-colors"
          >
            <p className="text-sm text-muted-foreground">Fats</p>
            <p className="text-2xl font-bold mt-1">{fats}g</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
