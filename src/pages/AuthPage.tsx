
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/ui/section-heading";
import { AuthForm } from "@/components/auth/AuthForm";
import { motion } from "framer-motion";

const AuthPage = () => {
  return (
    <PageLayout className="flex items-center">
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            title="Join FitSnap"
            subtitle="Your journey to better health starts with a simple login"
            align="left"
            className="mb-6"
          />
          
          <div className="space-y-6">
            <div className="p-4 bg-muted/30 rounded-xl">
              <h3 className="text-neon font-semibold text-lg mb-2">Track Smarter, Not Harder</h3>
              <p className="text-sm text-muted-foreground">
                FitSnap uses AI to analyze your meals, track your nutrition, and help you make better food choices.
              </p>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-xl">
              <h3 className="text-neon font-semibold text-lg mb-2">Personalized Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Get tailored nutrition advice and meal suggestions based on your personal goals and preferences.
              </p>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-xl">
              <h3 className="text-neon font-semibold text-lg mb-2">Connect with Professionals</h3>
              <p className="text-sm text-muted-foreground">
                Access to a network of nutritionists and fitness experts for personalized guidance.
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-neon/20 transition-all duration-300"
        >
          <AuthForm />
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default AuthPage;
