import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { ImageUploader } from "@/components/ImageUploader";
import { NutritionResult } from "@/components/NutritionResult";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  History, 
  BarChart3, 
  BookOpen, 
  AlertTriangle,
  Trash2,
  ArrowRight,
  Sparkles,
  Filter,
  Upload
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { analyzeFoodImage, NutritionAnalysisResult } from "@/lib/gemini-api";
import { toast } from "@/components/ui/use-toast";

const UploadPage = () => {
  const { isAuthenticated } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("camera");
  const [recentImages, setRecentImages] = useState([
    { id: 1, url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=480&auto=format&fit=crop", name: "Breakfast Bowl", date: "Today" },
    { id: 2, url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=480&auto=format&fit=crop", name: "Dinner Plate", date: "Yesterday" },
    { id: 3, url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=480&auto=format&fit=crop", name: "Colorful Salad", date: "May 12" },
    { id: 4, url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=480&auto=format&fit=crop", name: "Grilled Salmon", date: "May 10" }
  ]);
  const [results, setResults] = useState<NutritionAnalysisResult | null>(null);

  const handleImageCapture = (capturedFile: File) => {
    setFile(capturedFile);
    setResults(null);
  };

  const handleAnalyzeClick = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    try {
      const analysisResult = await analyzeFoodImage(file);
      setResults(analysisResult);
      
      const newRecentImage = {
        id: Date.now(),
        url: URL.createObjectURL(file),
        name: analysisResult.mealName,
        date: "Agora"
      };
      
      setRecentImages([newRecentImage, ...recentImages.slice(0, 3)]);
      
    } catch (error) {
      console.error("Failed to analyze image:", error);
      toast({
        title: "Erro na análise",
        description: "Não foi possível analisar a imagem. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleDeleteRecent = (id: number) => {
    setRecentImages(recentImages.filter(img => img.id !== id));
  };
  
  const handleSelectRecent = async (image: typeof recentImages[0]) => {
    setIsAnalyzing(true);
    setFile(null);
    
    try {
      setTimeout(() => {
        setResults({
          calories: 520,
          carbs: 42,
          protein: 28,
          fats: 18,
          fitsInDiet: true,
          mealName: image.name,
          ingredients: [
            "Ingrediente principal",
            "Acompanhamento",
            "Temperos"
          ]
        });
        
        setIsAnalyzing(false);
      }, 1000);
      
    } catch (error) {
      console.error("Failed to retrieve analysis:", error);
      toast({
        title: "Erro ao recuperar dados",
        description: "Não foi possível recuperar a análise anterior.",
        variant: "destructive"
      });
      setIsAnalyzing(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 flex flex-col items-center">
        <SectionHeading
          title="Analyze Your Meal"
          subtitle="Take a picture or upload an image of your food for AI nutritional analysis"
          align="center"
          className="mb-8 pt-6 md:pt-8 w-full max-w-4xl"
        />
        
        <div className="w-full max-w-4xl ml-[270px] md:ml-[370px] lg:ml-[460px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 hover:border-neon/20 transition-all duration-300"
              >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-3 mb-6 rounded-lg bg-background/50">
                    <TabsTrigger value="camera" className="rounded-md flex items-center justify-center gap-2 data-[state=active]:bg-neon data-[state=active]:text-background">
                      <Camera className="h-4 w-4" /> Capture
                    </TabsTrigger>
                    <TabsTrigger value="recent" className="rounded-md flex items-center justify-center gap-2 data-[state=active]:bg-neon data-[state=active]:text-background">
                      <History className="h-4 w-4" /> Recent
                    </TabsTrigger>
                    <TabsTrigger value="stats" className="rounded-md flex items-center justify-center gap-2 data-[state=active]:bg-neon data-[state=active]:text-background">
                      <BarChart3 className="h-4 w-4" /> Stats
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="camera" className="focus-visible:outline-none focus-visible:ring-0">
                    <div className="flex flex-col items-center">
                      <ImageUploader
                        onImageCapture={handleImageCapture}
                        className="mb-6 w-full"
                      />
                      
                      {file && !isAnalyzing && !results && (
                        <Button
                          onClick={handleAnalyzeClick}
                          className="w-full bg-neon text-background hover:bg-neon/90 py-6 flex items-center justify-center gap-2 group"
                        >
                          <Sparkles className="h-5 w-5 group-hover:animate-pulse" />
                          Analyze with AI
                        </Button>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="recent" className="focus-visible:outline-none focus-visible:ring-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Recent Analyses</h3>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1.5 h-8">
                          <Filter className="h-3.5 w-3.5" /> Filter
                        </Button>
                      </div>
                      
                      {recentImages.length > 0 ? (
                        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 scrollbar-thin">
                          {recentImages.map(image => (
                            <div 
                              key={image.id}
                              className="flex items-center gap-4 p-3 rounded-xl border border-border hover:border-neon/30 transition-all cursor-pointer group bg-background/40"
                              onClick={() => handleSelectRecent(image)}
                            >
                              <img 
                                src={image.url} 
                                alt={image.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="font-medium group-hover:text-neon transition-colors">{image.name}</h3>
                                <p className="text-sm text-muted-foreground">{image.date}</p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteRecent(image.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No recent analyses found</p>
                        </div>
                      )}
                      
                      {isAuthenticated ? (
                        <Button 
                          variant="outline"
                          className="w-full mt-2"
                          onClick={() => setActiveTab("camera")}
                        >
                          Analyze a New Meal
                        </Button>
                      ) : (
                        <div className="bg-muted/30 rounded-xl p-4 mt-4 text-center">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Sign in to save your meal history
                          </p>
                          <Link to="/auth">
                            <Button size="sm" variant="outline" className="border-neon text-neon">
                              Login or Register
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="stats" className="focus-visible:outline-none focus-visible:ring-0">
                    <div className="space-y-6 py-4">
                      {isAuthenticated ? (
                        <>
                          <div className="space-y-4">
                            <h3 className="font-medium text-lg">Weekly Summary</h3>
                            <div className="bg-background/70 rounded-xl p-4 border border-border">
                              <div className="h-[140px] w-full flex items-end justify-between gap-2">
                                {[65, 40, 85, 70, 45, 90, 60].map((value, i) => (
                                  <div 
                                    key={i} 
                                    className="relative h-full flex-1 flex items-end group"
                                  >
                                    <div 
                                      className="w-full rounded-t-sm bg-neon/60 group-hover:bg-neon transition-colors"
                                      style={{ height: `${value}%` }}
                                    >
                                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-neon text-background text-xs px-1 rounded">
                                        {value}%
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span>Sun</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="font-medium text-lg">Nutrient Balance</h3>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="bg-background/70 rounded-xl p-4 text-center border border-border">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-2">
                                  <div className="w-8 h-8 rounded-full bg-green-500/40 flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                  </div>
                                </div>
                                <h4 className="text-sm text-muted-foreground">Protein</h4>
                                <p className="font-bold">24%</p>
                              </div>
                              <div className="bg-background/70 rounded-xl p-4 text-center border border-border">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 mb-2">
                                  <div className="w-8 h-8 rounded-full bg-blue-500/40 flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                  </div>
                                </div>
                                <h4 className="text-sm text-muted-foreground">Carbs</h4>
                                <p className="font-bold">48%</p>
                              </div>
                              <div className="bg-background/70 rounded-xl p-4 text-center border border-border">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/20 mb-2">
                                  <div className="w-8 h-8 rounded-full bg-yellow-500/40 flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                                  </div>
                                </div>
                                <h4 className="text-sm text-muted-foreground">Fats</h4>
                                <p className="font-bold">28%</p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="py-10 text-center space-y-4">
                          <BookOpen className="h-10 w-10 mx-auto text-muted-foreground" />
                          <h3 className="text-xl font-medium">Track Your Progress</h3>
                          <p className="text-muted-foreground max-w-xs mx-auto">
                            Sign in to view detailed statistics and track your nutrition journey
                          </p>
                          <Link to="/auth">
                            <Button className="mt-2 bg-neon text-background hover:bg-neon/90">
                              Get Started
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
              
              {!isAnalyzing && !results && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-neon/10 p-3 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-neon" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">For best results</h3>
                      <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                        <li>Take a clear photo from above</li>
                        <li>Ensure good lighting</li>
                        <li>Include all food items in the frame</li>
                        <li>Try to separate different foods</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="w-full">
              <NutritionResult
                isLoading={isAnalyzing}
                {...results}
                className="mb-6"
              />
              
              {results && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="space-y-6"
                >
                  {results.ingredients && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-border hover:border-neon/20 transition-all duration-300"
                    >
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-neon" /> Detected Ingredients
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {results.ingredients.map((ingredient, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-background/70 text-sm border border-border"
                          >
                            {ingredient}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {results.alternatives && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className={cn(
                        "rounded-xl p-5 border backdrop-blur-sm hover:shadow-lg transition-all duration-300",
                        results.fitsInDiet 
                          ? "bg-card/50 border-border hover:border-neon/20" 
                          : "bg-destructive/5 border-destructive/30 hover:border-destructive/50"
                      )}
                    >
                      <h3 className="font-medium mb-3">Suggested Alternatives</h3>
                      <div className="space-y-3">
                        {results.alternatives.map((alt, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border"
                          >
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground">Replace</p>
                              <p className="font-medium">{alt.original}</p>
                            </div>
                            
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                              <ArrowRight className="h-4 w-4 text-neon flex-shrink-0" />
                            </motion.div>
                            
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground">With</p>
                              <p className="font-medium">{alt.replacement}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="mt-6">
                    <Link to="/adjust">
                      <Button className="w-full bg-neon text-background hover:bg-neon/90 py-6 group">
                        Adjust My Diet
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UploadPage;
