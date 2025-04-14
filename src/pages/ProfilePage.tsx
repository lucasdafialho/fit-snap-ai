
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/ui/section-heading";
import { UserProfileTabs } from "@/components/UserProfileTabs";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ImageUploader";
import { useState } from "react";
import { Camera, Shield, Settings, Medal } from "lucide-react";

const ProfilePage = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [showUploader, setShowUploader] = useState(false);

  // Redirect to login if not authenticated
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  const handleImageCapture = (file: File) => {
    console.log("Profile image captured:", file);
    // In a real app, you would upload this image to your backend
    setShowUploader(false);
  };

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-6 md:pt-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-border">
                  <AvatarImage src={user?.profileImageUrl} />
                  <AvatarFallback className="bg-neon/10 text-neon text-2xl">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="icon"
                  variant="secondary" 
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-background border border-border hover:bg-neon hover:text-background"
                  onClick={() => setShowUploader(!showUploader)}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <SectionHeading
                  title={`Welcome, ${user?.name || 'User'}!`}
                  subtitle="Manage your profile and preferences"
                  align="left"
                  className="mb-0"
                />

                <div className="flex items-center gap-2 mt-2">
                  <div className="bg-neon/10 text-neon px-3 py-1 rounded-full text-xs flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Premium Member
                  </div>
                  <div className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs flex items-center gap-1.5">
                    <Medal className="w-3.5 h-3.5" />
                    Level 3
                  </div>
                </div>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="md:self-start flex gap-2 items-center"
            >
              <Settings className="w-4 h-4" />
              Account Settings
            </Button>
          </div>

          {showUploader && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-medium mb-4">Update Profile Picture</h3>
                <ImageUploader onImageCapture={handleImageCapture} />
              </div>
            </motion.div>
          )}
          
          <UserProfileTabs />
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default ProfilePage;
