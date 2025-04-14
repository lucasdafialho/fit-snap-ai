
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full bg-background/90 backdrop-blur-sm border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-xl font-bold text-neon text-glow flex items-center gap-2">
              <span className="rounded-full h-6 w-6 bg-neon/20 flex items-center justify-center">
                <span className="text-neon text-xs">FS</span>
              </span>
              FitSnap
            </span>
            <p className="mt-2 text-sm text-muted-foreground">
              Snap. Analyze. Adjust. Live Light with AI.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-neon transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-muted-foreground hover:text-neon transition-colors duration-200">
                  Analyze
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-neon transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-neon transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-neon transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-neon transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border text-sm text-muted-foreground text-center">
          <p>© {new Date().getFullYear()} FitSnap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
