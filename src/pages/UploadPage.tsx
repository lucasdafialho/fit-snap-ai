
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { ImageUploader } from "@/components/ImageUploader";
import { NutritionResult } from "@/components/NutritionResult";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "react-router-dom";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    calories: number;
    carbs: number;
    protein: number;
    fats: number;
    fitsInDiet: boolean;
  } | null>(null);

  const handleImageCapture = (capturedFile: File) => {
    setFile(capturedFile);
    setResults(null);
  };

  const handleAnalyzeClick = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock response
      setResults({
        calories: 450,
        carbs: 35,
        protein: 22,
        fats: 15,
        fitsInDiet: Math.random() > 0.5 // Randomly determine fit
      });
      
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <PageLayout>
      <SectionHeading
        title="Upload & Analyze Your Meal"
        subtitle="Take a picture or upload an image of your food for AI analysis"
        align="center"
        className="mb-12"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <ImageUploader
            onImageCapture={handleImageCapture}
            className="mb-6"
          />
          
          {file && !isAnalyzing && !results && (
            <Button
              onClick={handleAnalyzeClick}
              className="w-full bg-neon text-background hover:bg-neon/90 py-6"
            >
              Submit for Analysis
            </Button>
          )}
        </div>
        
        <div>
          <NutritionResult
            isLoading={isAnalyzing}
            {...results}
          />
          
          {results && (
            <div className="mt-6">
              <Link to="/adjust">
                <Button className="w-full bg-neon text-background hover:bg-neon/90 py-6">
                  Adjust My Diet
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default UploadPage;
