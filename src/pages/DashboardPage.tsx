
import { useEffect, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/dashboard/StatCard";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { RecentMeals } from "@/components/dashboard/RecentMeals";
import { DietUpload } from "@/components/dashboard/DietUpload";
import { ConsultantsTable } from "@/components/dashboard/ConsultantsTable";
import { DietAlerts } from "@/components/dashboard/DietAlerts";
import { CategoryStats } from "@/components/dashboard/CategoryStats";
import { Activity, TrendingUp, Utensils, Scale, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardPage = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");
  const [totalConsultants, setTotalConsultants] = useState(28);
  const [followingDiet, setFollowingDiet] = useState(22);
  const [deviatingDiet, setDeviatingDiet] = useState(6);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  const handleDietUpload = (dietData: any) => {
    console.log("Nova dieta registrada:", dietData);
    // Aqui seria a lógica para somar dados antigos com novos
    // Por exemplo, atualizar estatísticas globais
    setTotalConsultants(prev => prev + 1);
    setFollowingDiet(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header com navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-md">
        {/* Navbar será renderizada aqui pelo PageLayout */}
      </div>
      
      {/* Conteúdo principal com padding-top para compensar a navbar fixa */}
      <div className="pt-20 pb-8 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <SectionHeading
                title={`${greeting}, ${user?.name?.split(' ')[0] || 'Nutricionista'}!`}
                subtitle="Dashboard de Acompanhamento Nutricional"
                align="left"
                className="mb-0"
              />
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button className="bg-neon text-background hover:bg-neon/90 flex items-center gap-2">
                    <Utensils className="h-4 w-4" /> Registrar Dieta
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="outline">Ver Perfil</Button>
                </Link>
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="upload">Upload de Dieta</TabsTrigger>
              <TabsTrigger value="consultants">Consultados</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <StatCard
                    title="Total de Consultados"
                    value={totalConsultants.toString()}
                    icon={Users}
                    trend={{ value: 12, isPositive: true }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <StatCard
                    title="Seguindo a Dieta"
                    value={followingDiet.toString()}
                    icon={CheckCircle}
                    trend={{ value: 8, isPositive: true }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <StatCard
                    title="Alertas Ativos"
                    value={deviatingDiet.toString()}
                    icon={AlertTriangle}
                    trend={{ value: 5, isPositive: false }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <StatCard
                    title="Taxa de Aderência"
                    value="78%"
                    icon={TrendingUp}
                    trend={{ value: 3, isPositive: true }}
                  />
                </motion.div>
              </div>

              {/* Category Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <CategoryStats />
              </motion.div>

              {/* Charts and Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="lg:col-span-2"
                >
                  <WeeklyChart />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <DietAlerts />
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="upload">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DietUpload onUpload={handleDietUpload} />
              </motion.div>
            </TabsContent>

            <TabsContent value="consultants" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ConsultantsTable />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
