
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Plus } from "lucide-react";
import { toast } from "sonner";

interface DietUploadProps {
  onUpload: (dietData: any) => void;
}

export function DietUpload({ onUpload }: DietUploadProps) {
  const [patientName, setPatientName] = useState("");
  const [category, setCategory] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dietData = {
      patientName,
      category,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fats: Number(fats),
      notes,
      date: new Date().toISOString(),
      nutritionist: "Dr. Sarah Chen"
    };

    onUpload(dietData);
    
    // Reset form
    setPatientName("");
    setCategory("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFats("");
    setNotes("");
    
    toast.success("Dieta registrada com sucesso!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-neon" />
          Upload de Dieta - Nutricionista
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientName">Nome do Paciente</Label>
              <Input
                id="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ganho_massa">Ganho de Massa</SelectItem>
                  <SelectItem value="perda_gordura">Perda de Gordura</SelectItem>
                  <SelectItem value="manutencao">Manutenção do Físico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="calories">Calorias</Label>
              <Input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="protein">Proteínas (g)</Label>
              <Input
                id="protein"
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="carbs">Carboidratos (g)</Label>
              <Input
                id="carbs"
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="fats">Gorduras (g)</Label>
              <Input
                id="fats"
                type="number"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Observações sobre a dieta, restrições, etc."
            />
          </div>

          <Button type="submit" className="bg-neon text-background hover:bg-neon/90">
            <Plus className="h-4 w-4 mr-2" />
            Registrar Dieta
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
