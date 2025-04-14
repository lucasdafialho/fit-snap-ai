
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { User, Settings, Key, Save, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  className?: string;
}

export function UserProfile({ className }: UserProfileProps) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    height: "175",
    weight: "70",
    age: "30",
    activityLevel: "Moderate",
    profileImageUrl: user?.profileImageUrl || "https://i.pravatar.cc/150?u=default"
  });
  
  const [dietData, setDietData] = useState({
    goal: "weight-loss",
    calorieTarget: "2000",
    proteinTarget: "120",
    carbTarget: "200",
    fatTarget: "60",
    restrictions: "None"
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const goalOptions = [
    { id: "weight-loss", label: "Weight Loss" },
    { id: "maintain", label: "Maintain Weight" },
    { id: "muscle-gain", label: "Build Muscle" },
    { id: "performance", label: "Athletic Performance" },
    { id: "health", label: "General Health" }
  ];
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };
  
  const handleDietUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      toast.success("Diet preferences updated!");
    }, 1000);
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      toast.success("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }, 1000);
  };

  return (
    <div className={cn("bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8", className)}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex flex-col items-center">
          <div className="relative group">
            <img 
              src={profileData.profileImageUrl} 
              alt={profileData.name} 
              className="w-32 h-32 rounded-full object-cover border-4 border-neon/30" 
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-black/60">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Camera className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <h2 className="mt-4 text-xl font-semibold">{profileData.name}</h2>
          <p className="text-muted-foreground">{profileData.email}</p>
          
          <Separator className="my-6" />
          
          <TabsList className="grid w-full grid-cols-1 h-auto">
            <TabsTrigger 
              value="profile" 
              onClick={() => setActiveTab("profile")}
              className={cn(
                "flex justify-start px-4 py-3",
                activeTab === "profile" ? "bg-neon/20 text-neon" : ""
              )}
            >
              <User className="mr-2 h-4 w-4" /> 
              Profile Information
            </TabsTrigger>
            <TabsTrigger 
              value="diet" 
              onClick={() => setActiveTab("diet")}
              className={cn(
                "flex justify-start px-4 py-3",
                activeTab === "diet" ? "bg-neon/20 text-neon" : ""
              )}
            >
              <Settings className="mr-2 h-4 w-4" /> 
              Diet Preferences
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              onClick={() => setActiveTab("security")}
              className={cn(
                "flex justify-start px-4 py-3",
                activeTab === "security" ? "bg-neon/20 text-neon" : ""
              )}
            >
              <Key className="mr-2 h-4 w-4" /> 
              Security
            </TabsTrigger>
          </TabsList>
          
          <Button 
            variant="outline" 
            className="w-full mt-6 border-destructive text-destructive hover:bg-destructive/10"
            onClick={logout}
          >
            Log Out
          </Button>
        </div>
        
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="profile" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                <p className="text-muted-foreground mb-6">
                  Update your profile information and physical characteristics
                </p>
              </div>
              
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={isUpdating}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={isUpdating}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input 
                      id="height"
                      type="number"
                      value={profileData.height}
                      onChange={(e) => setProfileData({...profileData, height: e.target.value})}
                      disabled={isUpdating}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input 
                      id="weight"
                      type="number"
                      value={profileData.weight}
                      onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
                      disabled={isUpdating}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age"
                      type="number"
                      value={profileData.age}
                      onChange={(e) => setProfileData({...profileData, age: e.target.value})}
                      disabled={isUpdating}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="activity">Activity Level</Label>
                    <select 
                      id="activity"
                      value={profileData.activityLevel}
                      onChange={(e) => setProfileData({...profileData, activityLevel: e.target.value})}
                      disabled={isUpdating}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      <option>Sedentary</option>
                      <option>Light</option>
                      <option>Moderate</option>
                      <option>Active</option>
                      <option>Very Active</option>
                    </select>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-neon text-background hover:bg-neon/90"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save className="mr-2 h-4 w-4" /> Update Profile
                    </span>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="diet" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Diet Preferences</h2>
                <p className="text-muted-foreground mb-6">
                  Set your nutrition goals and dietary restrictions
                </p>
              </div>
              
              <form onSubmit={handleDietUpdate} className="space-y-6">
                <div className="space-y-4">
                  <Label>Your Goal</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {goalOptions.map(goal => (
                      <Button
                        key={goal.id}
                        type="button"
                        variant="outline"
                        className={cn(
                          dietData.goal === goal.id
                            ? "bg-neon/20 text-neon border-neon"
                            : "border-input"
                        )}
                        onClick={() => setDietData({...dietData, goal: goal.id})}
                      >
                        {goal.label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="calories">Daily Calorie Target</Label>
                    <Input 
                      id="calories"
                      type="number"
                      value={dietData.calorieTarget}
                      onChange={(e) => setDietData({...dietData, calorieTarget: e.target.value})}
                      disabled={isUpdating}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="protein">Protein Target (g)</Label>
                    <Input 
                      id="protein"
                      type="number"
                      value={dietData.proteinTarget}
                      onChange={(e) => setDietData({...dietData, proteinTarget: e.target.value})}
                      disabled={isUpdating}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="carbs">Carbohydrates Target (g)</Label>
                    <Input 
                      id="carbs"
                      type="number"
                      value={dietData.carbTarget}
                      onChange={(e) => setDietData({...dietData, carbTarget: e.target.value})}
                      disabled={isUpdating}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fat">Fat Target (g)</Label>
                    <Input 
                      id="fat"
                      type="number"
                      value={dietData.fatTarget}
                      onChange={(e) => setDietData({...dietData, fatTarget: e.target.value})}
                      disabled={isUpdating}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="restrictions">Dietary Restrictions</Label>
                  <select 
                    id="restrictions"
                    value={dietData.restrictions}
                    onChange={(e) => setDietData({...dietData, restrictions: e.target.value})}
                    disabled={isUpdating}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    <option>None</option>
                    <option>Vegetarian</option>
                    <option>Vegan</option>
                    <option>Gluten-Free</option>
                    <option>Lactose-Free</option>
                    <option>Keto</option>
                    <option>Paleo</option>
                  </select>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-neon text-background hover:bg-neon/90"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save className="mr-2 h-4 w-4" /> Save Diet Preferences
                    </span>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
                <p className="text-muted-foreground mb-6">
                  Update your password and security preferences
                </p>
              </div>
              
              <form onSubmit={handlePasswordUpdate} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input 
                      id="current-password"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      disabled={isUpdating}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      disabled={isUpdating}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input 
                      id="confirm-password"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      disabled={isUpdating}
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-neon text-background hover:bg-neon/90"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save className="mr-2 h-4 w-4" /> Update Password
                    </span>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
