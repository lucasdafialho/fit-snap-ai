import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user info exists in localStorage
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Create a mock user immediately
    const mockUser: User = {
      id: "user123",
      name: "Demo User",
      email,
      profileImageUrl: "https://i.pravatar.cc/150?u=user123"
    };
    
    // Set user in state and localStorage immediately
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    setIsLoading(false);
    return Promise.resolve();
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // This is just a frontend simulation
    // In a real app, you would make an API call here
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve();
      }, 1500);
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
