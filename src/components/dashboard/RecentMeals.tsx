
import { Card } from "@/components/ui/card";

const recentMeals = [
  {
    id: 1,
    name: "Breakfast",
    description: "Oatmeal with fruits",
    calories: 350,
    time: "8:00 AM",
    image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80",
  },
  {
    id: 2,
    name: "Lunch",
    description: "Grilled chicken salad",
    calories: 450,
    time: "12:30 PM",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80",
  },
  {
    id: 3,
    name: "Dinner",
    description: "Salmon with vegetables",
    calories: 550,
    time: "7:00 PM",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80",
  },
];

export function RecentMeals() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Meals</h3>
      <div className="space-y-4">
        {recentMeals.map((meal) => (
          <div key={meal.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="h-12 w-12 rounded-md overflow-hidden">
              <img
                src={meal.image}
                alt={meal.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{meal.name}</h4>
              <p className="text-sm text-muted-foreground">{meal.description}</p>
            </div>
            <div className="text-right">
              <p className="text-neon font-medium">{meal.calories} cal</p>
              <p className="text-sm text-muted-foreground">{meal.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
