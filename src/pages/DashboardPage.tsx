
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/dashboard/StatCard";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { RecentMeals } from "@/components/dashboard/RecentMeals";
import { Activity, TrendingUp, Utensils, Scale } from "lucide-react";

const DashboardPage = () => {
  return (
    <PageLayout>
      <SectionHeading
        title="Dashboard"
        subtitle="Track your nutrition journey"
        align="left"
        className="mb-8"
      />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Daily Calories"
          value="2,100"
          icon={Activity}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Weekly Progress"
          value="85%"
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Meals Tracked"
          value="21"
          icon={Utensils}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Weight Goal"
          value="-2.5 kg"
          icon={Scale}
          trend={{ value: 3, isPositive: true }}
        />
      </div>
      
      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyChart />
        </div>
        <div>
          <RecentMeals />
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
