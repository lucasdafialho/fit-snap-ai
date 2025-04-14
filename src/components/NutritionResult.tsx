
import { CheckCircle2, XCircle, Loader2, Grid3X3 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NutritionResultProps {
  isLoading?: boolean;
  calories?: number;
  carbs?: number;
  protein?: number;
  fats?: number;
  fitsInDiet?: boolean;
  mealName?: string;
  ingredients?: string[];
  alternatives?: {original: string, replacement: string}[];
  className?: string;
}

export function NutritionResult({
  isLoading = false,
  calories,
  carbs,
  protein,
  fats,
  fitsInDiet,
  mealName,
  className,
}: NutritionResultProps) {
  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex flex-col items-center justify-center py-12 rounded-2xl border border-border bg-card/50 backdrop-blur-sm",
          className
        )}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative h-20 w-20"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-14 w-14 text-neon" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Grid3X3 className="h-14 w-14 text-neon animate-pulse" /> 
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-xl font-medium"
        >
          Crunching calories... guilt-free!
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground max-w-xs text-center mt-2"
        >
          Our AI is analyzing your meal and identifying nutritional information
        </motion.p>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          transition={{ delay: 0.6, duration: 8, ease: "easeInOut" }}
          className="h-1 bg-neon/50 rounded-full mt-6"
        />
      </motion.div>
    );
  }

  if (!calories) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl border backdrop-blur-sm p-6 transition-all duration-300",
        fitsInDiet 
          ? "border-neon/30 bg-gradient-to-br from-neon/5 to-transparent shadow-[0_0_15px_rgba(57,255,20,0.15)]" 
          : "border-destructive/30 bg-gradient-to-br from-destructive/5 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.15)]",
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
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-neon/10">
              <CheckCircle2 className="h-10 w-10 text-neon" />
            </div>
          ) : (
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-destructive/10">
              <XCircle className="h-10 w-10 text-destructive" />
            </div>
          )}
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-medium mb-1"
        >
          {fitsInDiet ? "Fits Your Diet" : "Doesn't Fit Your Diet"}
        </motion.h3>
        
        {mealName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neon font-medium mb-1"
          >
            {mealName}
          </motion.p>
        )}
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-6 max-w-md"
        >
          {fitsInDiet 
            ? "This meal aligns with your dietary goals. Great choice for your nutrition plan!" 
            : "This meal may not align with your dietary goals. Check out our suggestions below."
          }
        </motion.p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-gradient-to-br from-background to-background/70 p-5 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <p className="text-sm text-muted-foreground">Calories</p>
            <p className="text-2xl font-bold text-neon mt-1">{calories}</p>
            <p className="text-xs text-muted-foreground mt-1">kcal</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl bg-gradient-to-br from-background to-background/70 p-5 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <p className="text-sm text-muted-foreground">Carbs</p>
            <p className="text-2xl font-bold mt-1">{carbs}g</p>
            <p className="text-xs text-muted-foreground mt-1">{Math.round(carbs * 4)} kcal</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl bg-gradient-to-br from-background to-background/70 p-5 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <p className="text-sm text-muted-foreground">Protein</p>
            <p className="text-2xl font-bold mt-1">{protein}g</p>
            <p className="text-xs text-muted-foreground mt-1">{Math.round(protein * 4)} kcal</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-xl bg-gradient-to-br from-background to-background/70 p-5 text-center shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <p className="text-sm text-muted-foreground">Fats</p>
            <p className="text-2xl font-bold mt-1">{fats}g</p>
            <p className="text-xs text-muted-foreground mt-1">{Math.round(fats * 9)} kcal</p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full mt-6 grid grid-cols-3 gap-2"
        >
          <div className="bg-background/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Carbs</p>
            <p className="font-medium text-sm">{Math.round((carbs * 4 / calories) * 100)}%</p>
            <div className="w-full bg-muted/50 h-1 mt-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.round((carbs * 4 / calories) * 100)}%` }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="h-full bg-blue-500 rounded-full"
              />
            </div>
          </div>
          
          <div className="bg-background/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Protein</p>
            <p className="font-medium text-sm">{Math.round((protein * 4 / calories) * 100)}%</p>
            <div className="w-full bg-muted/50 h-1 mt-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.round((protein * 4 / calories) * 100)}%` }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="h-full bg-green-500 rounded-full"
              />
            </div>
          </div>
          
          <div className="bg-background/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Fats</p>
            <p className="font-medium text-sm">{Math.round((fats * 9 / calories) * 100)}%</p>
            <div className="w-full bg-muted/50 h-1 mt-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.round((fats * 9 / calories) * 100)}%` }}
                transition={{ delay: 1, duration: 0.5 }}
                className="h-full bg-yellow-500 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
