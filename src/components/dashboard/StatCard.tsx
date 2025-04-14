
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-2xl border border-border bg-gradient-to-br from-card/80 to-card/30 p-6 hover:border-neon/50 hover:neon-shadow transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2 bg-gradient-to-r from-white to-white/80 bg-clip-text">{value}</h3>
          {trend && (
            <div className="flex items-center mt-1">
              <div
                className={cn(
                  "flex items-center text-sm",
                  trend.isPositive ? "text-neon" : "text-destructive"
                )}
              >
                <svg 
                  className={cn(
                    "w-3 h-3 mr-1",
                    trend.isPositive ? "rotate-0" : "rotate-180"
                  )}
                  viewBox="0 0 10 10"
                >
                  <path 
                    fill="currentColor"
                    d="M5 0L9.66 5H0.34L5 0Z"
                  />
                </svg>
                {trend.value}%
              </div>
              <span className="text-xs text-muted-foreground ml-1.5">vs. last week</span>
            </div>
          )}
        </div>
        <motion.div 
          whileHover={{ rotate: 15 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="rounded-full bg-neon/10 p-3"
        >
          <Icon className="h-5 w-5 text-neon" />
        </motion.div>
      </div>
    </motion.div>
  );
}
