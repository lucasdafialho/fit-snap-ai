
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { CircleUser, Settings, SlidersHorizontal, MessageSquareText } from "lucide-react";
import { Button } from "./ui/button";
import { UserProfileForm } from "./UserProfileForm";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface UserProfileTabsProps {
  className?: string;
}

export function UserProfileTabs({ className }: UserProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("profile");

  const handleSaveChanges = () => {
    toast.success("Changes saved successfully!");
  };

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className={cn("w-full", className)}
    >
      <TabsList className="grid grid-cols-4 w-full mb-8">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <CircleUser className="h-4 w-4" /> Profile
        </TabsTrigger>
        <TabsTrigger value="preferences" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" /> Preferences
        </TabsTrigger>
        <TabsTrigger value="messages" className="flex items-center gap-2">
          <MessageSquareText className="h-4 w-4" /> Messages (3)
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" /> Settings
        </TabsTrigger>
      </TabsList>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6"
      >
        <TabsContent value="profile">
          <UserProfileForm onSave={handleSaveChanges} />
        </TabsContent>
        
        <TabsContent value="preferences">
          <div className="space-y-6">
            <h2 className="text-xl font-medium mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <h3 className="font-medium">Daily Reminders</h3>
                  <p className="text-sm text-muted-foreground">Get reminded to log your meals</p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neon/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <h3 className="font-medium">Weekly Reports</h3>
                  <p className="text-sm text-muted-foreground">Receive weekly nutrition reports</p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neon/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <h3 className="font-medium">Professional Advice</h3>
                  <p className="text-sm text-muted-foreground">Get notified about new advice from nutritionists</p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neon/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button 
                onClick={handleSaveChanges} 
                className="bg-neon text-background hover:bg-neon/90"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="messages">
          <div className="space-y-6">
            <h2 className="text-xl font-medium mb-4">Messages</h2>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  sender: "Dr. Sarah Chen",
                  subject: "About your recent meal analysis",
                  preview: "I noticed your protein intake has been...",
                  time: "Today, 10:32 AM",
                  unread: true
                },
                {
                  id: 2,
                  sender: "Nutritionist Team",
                  subject: "Weekly Diet Review",
                  preview: "Here's your personalized feedback on...",
                  time: "Yesterday, 3:15 PM",
                  unread: true
                },
                {
                  id: 3,
                  sender: "System",
                  subject: "Welcome to Premium Plan",
                  preview: "Thank you for upgrading to our premium...",
                  time: "May 10, 2:45 PM",
                  unread: true
                }
              ].map(message => (
                <div 
                  key={message.id}
                  className={cn(
                    "p-4 rounded-lg border border-border hover:border-neon/30 transition-all cursor-pointer",
                    message.unread && "bg-neon/5 border-neon/20"
                  )}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium flex items-center">
                      {message.sender}
                      {message.unread && (
                        <span className="ml-2 h-2 w-2 rounded-full bg-neon"></span>
                      )}
                    </h3>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{message.subject}</h4>
                  <p className="text-sm text-muted-foreground">{message.preview}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="space-y-6">
            <h2 className="text-xl font-medium mb-4">Account Settings</h2>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Email Preferences</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="marketing" type="checkbox" className="h-4 w-4 rounded border-gray-600 text-neon focus:ring-neon/50" />
                    <label htmlFor="marketing" className="ml-2 block text-sm">Marketing emails</label>
                  </div>
                  <div className="flex items-center">
                    <input id="social" type="checkbox" className="h-4 w-4 rounded border-gray-600 text-neon focus:ring-neon/50" defaultChecked />
                    <label htmlFor="social" className="ml-2 block text-sm">Social notifications</label>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Privacy</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="public-profile" type="checkbox" className="h-4 w-4 rounded border-gray-600 text-neon focus:ring-neon/50" defaultChecked />
                    <label htmlFor="public-profile" className="ml-2 block text-sm">Public profile</label>
                  </div>
                  <div className="flex items-center">
                    <input id="data-sharing" type="checkbox" className="h-4 w-4 rounded border-gray-600 text-neon focus:ring-neon/50" />
                    <label htmlFor="data-sharing" className="ml-2 block text-sm">Data sharing with partners</label>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                <h3 className="font-medium mb-2 text-destructive">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">These actions are irreversible.</p>
                <div className="space-x-2">
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                    Delete Account
                  </Button>
                  <Button variant="outline" className="border-border text-muted-foreground">
                    Export Data
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button 
                onClick={handleSaveChanges} 
                className="bg-neon text-background hover:bg-neon/90"
              >
                Save Settings
              </Button>
            </div>
          </div>
        </TabsContent>
      </motion.div>
    </Tabs>
  );
}
