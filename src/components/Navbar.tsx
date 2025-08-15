
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
  ];
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-md"
    >
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
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className="px-3 py-2 text-foreground hover:text-neon transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative ml-2 h-10 w-10 rounded-full flex items-center justify-center">
                    {user?.profileImageUrl ? (
                      <img 
                        src={user.profileImageUrl}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                    <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-neon" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                  <div className="flex items-center justify-start gap-2 p-2 border-b border-border">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {user?.profileImageUrl ? (
                        <img 
                          src={user.profileImageUrl}
                          alt={user.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </div>
                    <div className="space-y-0.5 text-left">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  
                  <Link to="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="border-neon text-neon hover:bg-neon/20 transition-all duration-300">
                  Login
                </Button>
              </Link>
            )}
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
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className="block py-2 px-3 text-foreground hover:text-neon transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 py-2 px-3 text-foreground hover:text-neon transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img 
                    src={user?.profileImageUrl || "https://i.pravatar.cc/150?u=user123"}
                    alt={user?.name || "User"} 
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="flex flex-col text-left">
                    <span>{user?.name}</span>
                    <span className="text-xs text-muted-foreground">View profile</span>
                  </div>
                </Link>
                
                <Button 
                  variant="outline" 
                  className={cn(
                    "w-full mt-2 border-destructive text-destructive hover:bg-destructive/10",
                    "flex items-center justify-center gap-2"
                  )}
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" /> Log out
                </Button>
              </>
            ) : (
              <Link 
                to="/auth" 
                onClick={() => setIsMenuOpen(false)}
              >
                <Button 
                  variant="outline" 
                  className="w-full mt-2 border-neon text-neon hover:bg-neon/20 transition-all duration-300"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
}
