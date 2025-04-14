
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/ui/section-heading";
import { DietAdjustments } from "@/components/DietAdjustments";
import { useToast } from "@/hooks/use-toast";

const AdjustmentPage = () => {
  const { toast } = useToast();

  const handleSaveAdjustments = () => {
    // In a real app, this would save to a database
    toast({
      title: "Adjustments Saved",
      description: "Your dietary adjustments have been saved successfully.",
    });
  };

  return (
    <PageLayout>
      <SectionHeading
        title="Diet Adjustment"
        subtitle="Personalize your nutrition plan to meet your goals"
        align="center"
        className="mb-12"
      />
      
      <div className="max-w-3xl mx-auto bg-card/50 rounded-2xl border border-border p-6 md:p-8 shadow-lg">
        <DietAdjustments onSave={handleSaveAdjustments} />
      </div>
    </PageLayout>
  );
};

export default AdjustmentPage;
