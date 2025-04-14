
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
  align?: "left" | "center" | "right";
}

export function SectionHeading({ 
  title, 
  subtitle, 
  className, 
  children,
  align = "left" 
}: SectionHeadingProps) {
  return (
    <div className={cn(
      "mb-8",
      align === "center" && "text-center",
      align === "right" && "text-right",
      className
    )}>
      <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-xl text-muted-foreground">{subtitle}</p>
      )}
      {children}
    </div>
  );
}
