
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/ui/section-heading";
import { DietAdjustments } from "@/components/DietAdjustments";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const AdjustmentPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [adjustmentSaved, setAdjustmentSaved] = useState(false);
  
  const handleSaveAdjustments = () => {
    toast.success("Diet adjustments saved successfully!");
    setAdjustmentSaved(true);
    
    // Simulate loading
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-2">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Assessment
            </Button>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            title="Adjust Your Diet"
            subtitle="Fine-tune your meal plan based on our analysis"
            align="left"
            className="mb-8"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8"
        >
          {adjustmentSaved ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-neon/20 p-4 mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <svg className="h-12 w-12 text-neon" viewBox="0 0 24 24" fill="none">
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      d="M5 13L9 17L19 7" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Diet Plan Updated!</h2>
              <p className="text-muted-foreground mb-6 max-w-lg">
                Your adjustments have been saved. We've updated your nutrition plan to incorporate these changes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/dashboard">
                  <Button className="bg-neon text-background hover:bg-neon/90">
                    View Dashboard
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline">
                    Registrar outra dieta
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <DietAdjustments onSave={handleSaveAdjustments} />
          )}
        </motion.div>
        
        {!adjustmentSaved && !isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 rounded-xl bg-muted/30 border border-border"
          >
            <p className="text-sm text-center text-muted-foreground">
              <Link to="/auth" className="text-neon hover:underline">Sign in</Link> to save your diet adjustments and track your progress over time.
            </p>
          </motion.div>
        )}
      </div>
    </PageLayout>
  );
};

export default AdjustmentPage;
