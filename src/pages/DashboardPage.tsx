import { useEffect, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/dashboard/StatCard";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { RecentMeals } from "@/components/dashboard/RecentMeals";
import { Activity, TrendingUp, Utensils, Scale, CalendarDays, Clock, ThumbsUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <SectionHeading
            title={`${greeting}, ${user?.name?.split(' ')[0] || 'Friend'}!`}
            subtitle="Track your nutrition journey"
            align="left"
            className="mb-0"
          />
          <div className="flex items-center gap-3">
            <Link to="/upload">
              <Button className="bg-neon text-background hover:bg-neon/90 flex items-center gap-2">
                <Utensils className="h-4 w-4" /> Analyze a Meal
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline">View Profile</Button>
            </Link>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <StatCard
            title="Daily Calories"
            value="2,100"
            icon={Activity}
            trend={{ value: 12, isPositive: true }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <StatCard
            title="Weekly Progress"
            value="85%"
            icon={TrendingUp}
            trend={{ value: 8, isPositive: true }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <StatCard
            title="Meals Tracked"
            value="21"
            icon={Utensils}
            trend={{ value: 5, isPositive: true }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <StatCard
            title="Weight Goal"
            value="-2.5 kg"
            icon={Scale}
            trend={{ value: 3, isPositive: true }}
          />
        </motion.div>
      </div>
      
      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-card/50 border border-border rounded-2xl p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium">Streak</h3>
            <div className="bg-neon/10 p-2 rounded-full">
              <CalendarDays className="h-4 w-4 text-neon" />
            </div>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold">7</span>
            <span className="text-sm text-muted-foreground">days</span>
          </div>
          <p className="text-sm text-muted-foreground">You're on a roll! Keep tracking your meals daily.</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-card/50 border border-border rounded-2xl p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium">Time to Goal</h3>
            <div className="bg-neon/10 p-2 rounded-full">
              <Clock className="h-4 w-4 text-neon" />
            </div>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold">23</span>
            <span className="text-sm text-muted-foreground">days left</span>
          </div>
          <p className="text-sm text-muted-foreground">You're on track to reach your weight goal!</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-card/50 border border-border rounded-2xl p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-medium">Consistency</h3>
            <div className="bg-neon/10 p-2 rounded-full">
              <ThumbsUp className="h-4 w-4 text-neon" />
            </div>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold">92%</span>
          </div>
          <p className="text-sm text-muted-foreground">Excellent! You're staying consistent with your diet plan.</p>
        </motion.div>
      </div>
      
      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="lg:col-span-2"
        >
          <WeeklyChart />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <RecentMeals />
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
