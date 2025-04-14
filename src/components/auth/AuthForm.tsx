import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowRight, Mail, Lock, User, UserCheck, Key } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

interface AuthFormProps {
  className?: string;
}

export function AuthForm({ className }: AuthFormProps) {
  const [formType, setFormType] = useState<"login" | "register">("login");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginData.email, loginData.password);
    navigate("/dashboard");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setFormType("login");
    setLoginData({
      email: registerData.email,
      password: registerData.password,
    });
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <Tabs 
        defaultValue="login" 
        value={formType} 
        onValueChange={(v) => setFormType(v as "login" | "register")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="login">
            <UserCheck className="mr-2 h-4 w-4" /> Login
          </TabsTrigger>
          <TabsTrigger value="register">
            <User className="mr-2 h-4 w-4" /> Register
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="pl-10"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-neon hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="pl-10"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-neon text-background hover:bg-neon/90"
              >
                <span className="flex items-center">
                  Login <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </form>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="register">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    className="pl-10"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="pl-10"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="pl-10"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="pl-10"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-neon text-background hover:bg-neon/90"
              >
                <span className="flex items-center">
                  Create Account <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </form>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
