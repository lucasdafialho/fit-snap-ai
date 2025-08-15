
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/PageLayout";
import { FeatureCard } from "@/components/FeatureCard";
import { Brain, Utensils, Users, Camera, ArrowRight, Sparkles, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-25"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
        <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-neon/10 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[24rem] w-[24rem] rounded-full bg-neon/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            <span className="text-glow text-neon">Snap.</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Assess.</span>{" "}
            <span className="text-glow text-neon">Adjust.</span>
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Live Light with AI
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl"
          >
            Transform your eating habits with AI-powered insights. Capture meals, get instant nutritional feedback, and receive personalized recommendations from certified professionals.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <Link to="/dashboard">
              <Button className="text-background bg-neon hover:bg-neon/90 px-8 py-6 text-lg rounded-full group">
                Get Started
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" className="px-8 py-6 text-lg rounded-full border-neon text-neon hover:bg-neon/10">
                How it works
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-muted/5 rounded-3xl mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-neon mb-2">98%</h3>
            <p className="text-muted-foreground">Accuracy Rate</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-neon mb-2">0+</h3>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-neon mb-2">0+</h3>
            <p className="text-muted-foreground">Expert Nutritionists</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/5 rounded-3xl my-20">
        <div className="text-center mb-16">
          <span className="text-neon font-medium mb-4 inline-block">WHY CHOOSE FITSNAP</span>
          <h2 className="text-3xl font-bold mb-4">Transform Your Diet with AI</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our powerful AI analyzes your meals and provides personalized recommendations to help you achieve your fitness goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <FeatureCard
            title="AI-powered meal analysis"
            description="Our advanced AI recognizes food items and accurately estimates their nutritional content in seconds."
            icon={Brain}
          />
          
          <FeatureCard
            title="Personalized nutrition suggestions"
            description="Get tailored recommendations based on your specific dietary needs and fitness goals."
            icon={Utensils}
          />
          
          <FeatureCard
            title="Professional dietary support"
            description="Access insights and advice from certified nutritionists and dieticians when you need it."
            icon={Users}
          />
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 my-20">
        <div className="text-center mb-16">
          <span className="text-neon font-medium mb-4 inline-block">HOW IT WORKS</span>
          <h2 className="text-3xl font-bold mb-4">Simple as 1-2-3</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <div className="text-center group">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-neon/10 group-hover:bg-neon/20 transition-colors">
              <Camera className="h-8 w-8 text-neon" />
            </div>
            <h3 className="text-xl font-medium mb-2">Take a Photo</h3>
            <p className="text-muted-foreground">Snap a picture of your meal or upload an existing one.</p>
          </div>
          
          <div className="text-center group">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-neon/10 group-hover:bg-neon/20 transition-colors">
              <Sparkles className="h-8 w-8 text-neon" />
            </div>
            <h3 className="text-xl font-medium mb-2">AI Analysis</h3>
            <p className="text-muted-foreground">Our AI instantly analyzes the nutritional content.</p>
          </div>
          
          <div className="text-center group">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-neon/10 group-hover:bg-neon/20 transition-colors">
              <Trophy className="h-8 w-8 text-neon" />
            </div>
            <h3 className="text-xl font-medium mb-2">Get Results</h3>
            <p className="text-muted-foreground">Receive personalized recommendations and insights.</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-16 mb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon/5 to-transparent rounded-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-8">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your diet?</h2>
            <p className="text-muted-foreground mb-6">
              Start making smarter food choices today with FitSnap's AI-powered meal analysis.
            </p>
            
            <Link to="/dashboard">
              <Button className="text-background bg-neon hover:bg-neon/90 group">
                Upload Your First Meal
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="w-full md:w-1/2 aspect-square md:aspect-video relative">
            <img
              src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80"
              alt="Person taking a photo of food"
              className="rounded-xl object-cover h-full w-full shadow-lg animate-float"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 mb-20 bg-card/40 rounded-3xl">
        <div className="text-center max-w-3xl mx-auto px-4">
          <p className="text-2xl font-light italic mb-6">
            "FitSnap has completely changed my relationship with food. Now I make informed choices without obsessing over calories."
          </p>
          <p className="text-neon font-medium">— Sarah T., Lost 15 pounds in 3 months</p>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
