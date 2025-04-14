
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className={cn(
      "rounded-2xl border border-border bg-card/50 p-6 hover:border-neon/50 hover:neon-shadow transition-all duration-300",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {trend && (
            <p className={cn(
              "text-sm mt-1",
              trend.isPositive ? "text-neon" : "text-destructive"
            )}>
              {trend.isPositive ? "+" : "-"}{trend.value}%
            </p>
          )}
        </div>
        <div className="rounded-full bg-neon/10 p-3">
          <Icon className="h-5 w-5 text-neon" />
        </div>
      </div>
    </div>
  );
}
