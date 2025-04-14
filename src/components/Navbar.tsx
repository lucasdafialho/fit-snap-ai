
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-neon text-glow flex items-center gap-2">
              <span className="rounded-full h-8 w-8 bg-neon/20 flex items-center justify-center">
                <span className="text-neon text-sm">FS</span>
              </span>
              FitSnap
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-foreground hover:text-neon transition-colors duration-200">
              Home
            </Link>
            <Link to="/upload" className="text-foreground hover:text-neon transition-colors duration-200">
              Analyze
            </Link>
            <Link to="/dashboard" className="text-foreground hover:text-neon transition-colors duration-200">
              Dashboard
            </Link>
            <Button variant="outline" className="border-neon text-neon hover:bg-neon/20 transition-all duration-300">
              Login
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-neon focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border shadow-lg animate-fade-in">
          <div className="px-4 pt-2 pb-4 space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-foreground hover:text-neon transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/upload" 
              className="block py-2 text-foreground hover:text-neon transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Analyze
            </Link>
            <Link 
              to="/dashboard" 
              className="block py-2 text-foreground hover:text-neon transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Button 
              variant="outline" 
              className="w-full border-neon text-neon hover:bg-neon/20 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
