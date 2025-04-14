
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, ClipboardList, LineChart, Lock } from "lucide-react";

const DashboardPage = () => {
  return (
    <PageLayout>
      <SectionHeading
        title="Dashboard"
        subtitle="Coming soon: Your intelligent food diary"
        align="center"
        className="mb-12"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Weekly Progress Chart */}
        <div className="col-span-full lg:col-span-2 rounded-2xl border border-border bg-card/50 p-6 h-[300px] relative overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <div className="text-center">
              <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">Weekly Progress Chart</h3>
              <p className="text-muted-foreground mb-4">Track your nutrition progress over time</p>
              <Button variant="outline" className="border-neon text-neon hover:bg-neon/10">
                Coming Soon
              </Button>
            </div>
          </div>
          
          {/* Mockup chart bg */}
          <div className="w-full h-full flex items-end gap-2 opacity-30">
            {[35, 45, 60, 75, 50, 65, 80].map((height, i) => (
              <div key={i} className="flex-1 bg-neon/20 rounded-t-md" style={{ height: `${height}%` }}></div>
            ))}
          </div>
        </div>
        
        {/* Nutrition Stats */}
        <div className="rounded-2xl border border-border bg-card/50 p-6 relative overflow-hidden group h-[300px]">
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <div className="text-center">
              <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">Nutrition Statistics</h3>
              <p className="text-muted-foreground mb-4">Analyze your dietary patterns</p>
              <Button variant="outline" className="border-neon text-neon hover:bg-neon/10">
                Coming Soon
              </Button>
            </div>
          </div>
          
          {/* Mockup stats bg */}
          <div className="w-full h-full opacity-30">
            <div className="flex items-center justify-between mb-4">
              <span>Protein</span>
              <div className="h-2 rounded-full bg-muted w-32">
                <div className="h-full rounded-full bg-neon" style={{ width: '75%' }}></div>
              </div>
              <span>75%</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span>Carbs</span>
              <div className="h-2 rounded-full bg-muted w-32">
                <div className="h-full rounded-full bg-neon" style={{ width: '60%' }}></div>
              </div>
              <span>60%</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span>Fats</span>
              <div className="h-2 rounded-full bg-muted w-32">
                <div className="h-full rounded-full bg-neon" style={{ width: '40%' }}></div>
              </div>
              <span>40%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Meal History */}
      <div className="rounded-2xl border border-border bg-card/50 p-6 relative overflow-hidden mb-8 min-h-[200px]">
        <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
          <div className="text-center">
            <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-2">Meal History</h3>
            <p className="text-muted-foreground mb-4">Review and learn from your past meals</p>
            <Button variant="outline" className="border-neon text-neon hover:bg-neon/10">
              Coming Soon
            </Button>
          </div>
        </div>
        
        {/* Mockup history bg */}
        <div className="opacity-30">
          <div className="flex items-center p-3 border-b border-border mb-2">
            <div className="w-12 h-12 bg-muted rounded-md mr-4"></div>
            <div>
              <h4>Breakfast</h4>
              <p className="text-sm text-muted-foreground">Eggs & Avocado Toast</p>
            </div>
            <div className="ml-auto">
              <span className="text-neon">420 cal</span>
            </div>
          </div>
          <div className="flex items-center p-3 border-b border-border mb-2">
            <div className="w-12 h-12 bg-muted rounded-md mr-4"></div>
            <div>
              <h4>Lunch</h4>
              <p className="text-sm text-muted-foreground">Chicken Salad</p>
            </div>
            <div className="ml-auto">
              <span className="text-neon">380 cal</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Coming Soon Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border bg-card/50 p-6 text-center hover-scale">
          <LineChart className="h-12 w-12 mx-auto mb-4 text-neon" />
          <h3 className="text-lg font-medium mb-2">Trend Analysis</h3>
          <p className="text-sm text-muted-foreground">Track your nutritional patterns over time</p>
        </div>
        
        <div className="rounded-2xl border border-border bg-card/50 p-6 text-center hover-scale">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-neon" />
          <h3 className="text-lg font-medium mb-2">Meal Planning</h3>
          <p className="text-sm text-muted-foreground">Schedule your meals in advance</p>
        </div>
        
        <div className="rounded-2xl border border-border bg-card/50 p-6 text-center hover-scale">
          <ClipboardList className="h-12 w-12 mx-auto mb-4 text-neon" />
          <h3 className="text-lg font-medium mb-2">Shopping Lists</h3>
          <p className="text-sm text-muted-foreground">Generate shopping lists based on your meal plans</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
