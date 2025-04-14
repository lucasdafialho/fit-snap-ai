
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/ui/section-heading";
import { UserProfileTabs } from "@/components/UserProfileTabs";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Redirect to login if not authenticated
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <SectionHeading
            title={`Welcome, ${user?.name?.split(' ')[0] || 'User'}!`}
            subtitle="Manage your profile and preferences"
            align="left"
            className="mb-0"
          />
        </div>
        
        <UserProfileTabs />
      </motion.div>
    </PageLayout>
  );
};

export default ProfilePage;
