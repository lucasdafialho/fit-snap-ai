
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, Clock, TrendingDown } from "lucide-react";

interface DietAlert {
  id: string;
  type: "warning" | "danger" | "success" | "info";
  title: string;
  description: string;
  patient: string;
  time: string;
}

const mockAlerts: DietAlert[] = [
  {
    id: "1",
    type: "danger",
    title: "Desvio Significativo da Dieta",
    description: "Excedeu em 600 calorias a meta diária",
    patient: "Carla Oliveira",
    time: "Há 2 horas"
  },
  {
    id: "2",
    type: "warning",
    title: "Baixa Aderência",
    description: "Não registrou refeições por 3 dias",
    patient: "João Santos",
    time: "Há 4 horas"
  },
  {
    id: "3",
    type: "success",
    title: "Meta Atingida",
    description: "Completou 7 dias seguindo a dieta perfeitamente",
    patient: "Ana Costa",
    time: "Há 1 dia"
  },
  {
    id: "4",
    type: "info",
    title: "Ajuste Necessário",
    description: "Meta de proteínas não atingida nos últimos 2 dias",
    patient: "Pedro Lima",
    time: "Há 6 horas"
  }
];

const getAlertIcon = (type: string) => {
  switch (type) {
    case "danger":
      return <AlertTriangle className="h-4 w-4" />;
    case "warning":
      return <Clock className="h-4 w-4" />;
    case "success":
      return <CheckCircle className="h-4 w-4" />;
    case "info":
      return <TrendingDown className="h-4 w-4" />;
    default:
      return null;
  }
};

const getAlertVariant = (type: string) => {
  switch (type) {
    case "danger":
      return "destructive";
    case "warning":
      return "default";
    case "success":
      return "default";
    case "info":
      return "default";
    default:
      return "default";
  }
};

export function DietAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas da Dieta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockAlerts.map((alert) => (
          <Alert key={alert.id} variant={getAlertVariant(alert.type) as any}>
            <div className="flex items-start gap-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <AlertDescription>
                  <div className="font-medium">{alert.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {alert.patient} - {alert.description}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {alert.time}
                  </div>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
}
