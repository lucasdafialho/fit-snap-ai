
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/ui/section-heading";
import { UserProfile } from "@/components/UserProfile";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to login if not authenticated
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <PageLayout>
      <SectionHeading
        title="Your Profile"
        subtitle="Manage your account details and preferences"
        align="left"
        className="mb-8"
      />
      
      <UserProfile />
    </PageLayout>
  );
};

export default ProfilePage;
