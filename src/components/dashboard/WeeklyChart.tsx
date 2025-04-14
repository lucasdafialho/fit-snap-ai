
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { day: "Mon", calories: 2100 },
  { day: "Tue", calories: 1950 },
  { day: "Wed", calories: 2300 },
  { day: "Thu", calories: 2000 },
  { day: "Fri", calories: 2200 },
  { day: "Sat", calories: 1800 },
  { day: "Sun", calories: 2100 },
];

export function WeeklyChart() {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-semibold">Weekly Calorie Intake</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="day" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Calories
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="calories" fill="#39FF14" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
