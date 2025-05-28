
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from "lucide-react";

interface Consultant {
  id: string;
  name: string;
  category: string;
  adherence: number;
  lastUpdate: string;
  targetCalories: number;
  currentCalories: number;
  status: "following" | "deviating" | "excellent";
}

const mockConsultants: Consultant[] = [
  {
    id: "1",
    name: "Maria Silva",
    category: "Perda de Gordura",
    adherence: 85,
    lastUpdate: "Hoje",
    targetCalories: 1800,
    currentCalories: 1950,
    status: "following"
  },
  {
    id: "2",
    name: "João Santos",
    category: "Ganho de Massa",
    adherence: 45,
    lastUpdate: "Ontem",
    targetCalories: 2800,
    currentCalories: 2100,
    status: "deviating"
  },
  {
    id: "3",
    name: "Ana Costa",
    category: "Manutenção",
    adherence: 95,
    lastUpdate: "Hoje",
    targetCalories: 2200,
    currentCalories: 2180,
    status: "excellent"
  },
  {
    id: "4",
    name: "Pedro Lima",
    category: "Ganho de Massa",
    adherence: 78,
    lastUpdate: "2 dias atrás",
    targetCalories: 3000,
    currentCalories: 2850,
    status: "following"
  },
  {
    id: "5",
    name: "Carla Oliveira",
    category: "Perda de Gordura",
    adherence: 35,
    lastUpdate: "3 dias atrás",
    targetCalories: 1600,
    currentCalories: 2200,
    status: "deviating"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "excellent":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "following":
      return <TrendingUp className="h-4 w-4 text-blue-500" />;
    case "deviating":
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "excellent":
      return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Excelente</Badge>;
    case "following":
      return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Seguindo</Badge>;
    case "deviating":
      return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Desviando</Badge>;
    default:
      return null;
  }
};

export function ConsultantsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acompanhamento de Consultados</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Aderência</TableHead>
              <TableHead>Calorias</TableHead>
              <TableHead>Última Atualização</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockConsultants.map((consultant) => (
              <TableRow key={consultant.id}>
                <TableCell className="font-medium">{consultant.name}</TableCell>
                <TableCell>{consultant.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {consultant.adherence}%
                    {consultant.adherence >= 80 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{consultant.currentCalories} / {consultant.targetCalories} cal</div>
                    <div className="text-muted-foreground text-xs">
                      {consultant.currentCalories > consultant.targetCalories ? "+" : ""}
                      {consultant.currentCalories - consultant.targetCalories} cal
                    </div>
                  </div>
                </TableCell>
                <TableCell>{consultant.lastUpdate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(consultant.status)}
                    {getStatusBadge(consultant.status)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
