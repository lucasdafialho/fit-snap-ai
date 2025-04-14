
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  withoutPadding?: boolean;
}

export function PageLayout({ 
  children, 
  className, 
  fullWidth = false,
  withoutPadding = false 
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={cn(
        "flex-grow pt-16", 
        !withoutPadding && "py-8",
        className
      )}>
        <div className={cn(
          fullWidth ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        )}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
