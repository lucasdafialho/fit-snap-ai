
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function FeatureCard({ title, description, icon: Icon, className }: FeatureCardProps) {
  return (
    <div className={cn(
      "group rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-neon/50 hover:neon-shadow hover-scale",
      className
    )}>
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-background p-2 shadow-md group-hover:bg-neon/10">
        <Icon className="h-6 w-6 text-neon" />
      </div>
      <h3 className="mb-2 text-xl font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
