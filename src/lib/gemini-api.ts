const GEMINI_API_KEY = "";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export type NutritionAnalysisResult = {
  calories: number;
  carbs: number;
  protein: number;
  fats: number;
  fitsInDiet: boolean;
  mealName: string;
  ingredients: string[];
  alternatives?: { original: string; replacement: string }[];
};

export const analyzeFoodImage = async (imageFile: File): Promise<NutritionAnalysisResult> => {
  try {
    const base64Image = await fileToBase64(imageFile);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Analise esta imagem de comida e forneça informações nutricionais completas e precisas.

Considere todos os detalhes visíveis na imagem e forneça a análise mais precisa e detalhada possível.

Retorne a resposta em formato JSON com os seguintes campos:
- calories: total de calorias
- carbs: gramas de carboidratos
- protein: gramas de proteínas
- fats: gramas de gorduras
- mealName: nome da refeição/prato
- ingredients: lista de ingredientes visíveis
- fitsInDiet: sua avaliação se esta refeição é saudável (true/false)`
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image.split(",")[1]
                }
              }
            ]
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    const responseText = data.candidates[0].content.parts[0].text;
    
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                      responseText.match(/{[\s\S]*}/);
                      
    let parsedResponse;
    
    if (jsonMatch) {
      try {
        parsedResponse = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } catch (e) {
        console.error("Failed to parse JSON response", e);
        throw new Error("Failed to parse nutrition data");
      }
    } else {
      throw new Error("Couldn't extract valid JSON from the response");
    }
    
    const fitsInDiet = parsedResponse.fitsInDiet ?? false;
    
    const result: NutritionAnalysisResult = {
      ...parsedResponse,
      fitsInDiet,
      alternatives: !fitsInDiet ? generateAlternatives(parsedResponse.ingredients) : undefined
    };
    
    return result;
    
  } catch (error) {
    console.error("Error analyzing food image:", error);
    throw new Error("Failed to analyze food image");
  }
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const generateAlternatives = (ingredients: string[]): { original: string; replacement: string }[] => {
  const alternativesMap: Record<string, string> = {
    "Arroz Branco": "Arroz Integral",
    "Pão Branco": "Pão Integral",
    "Açúcar": "Adoçante Natural",
    "Batata Frita": "Batata Doce Assada",
    "French Fries": "Batata Doce Assada",
    "Macarrão": "Macarrão de Grão-de-Bico",
    "Refrigerante": "Água com Gás e Limão",
    "Cola": "Água com Gás e Limão",
    "Coca-Cola": "Água com Gás e Limão",
    "Sorvete": "Iogurte Grego com Frutas",
    "Bacon": "Peito de Peru",
    "Carne Vermelha": "Frango ou Peixe",
    "Beef patty": "Hambúrguer de Frango",
    "Big Mac": "Sanduíche de Frango Grelhado",
    "Maionese": "Abacate",
    "Special sauce": "Molho de Iogurte com Ervas",
    "Batata": "Abobrinha",
    "Potato": "Abobrinha",
    "Croutons": "Castanhas",
    "Queijo Cheddar": "Queijo Cottage",
    "Cheese": "Queijo Cottage Magro",
    "Molho de Salada Cremoso": "Azeite e Limão",
    "Chocolate": "Chocolate Amargo 70%",
    "Salgadinho": "Mix de Castanhas",
    "Pão de Forma": "Wrap de Alface",
    "Bun": "Wrap de Alface",
    "Sesame seed bun": "Wrap de Alface",
    "Sugar": "Adoçante Stevia",
  };
  
  return ingredients
    .filter(ingredient => Object.keys(alternativesMap).some(key => 
      ingredient.toLowerCase().includes(key.toLowerCase())))
    .slice(0, 3)
    .map(ingredient => {
      const matchedKey = Object.keys(alternativesMap).find(key => 
        ingredient.toLowerCase().includes(key.toLowerCase()));
        
      return {
        original: ingredient,
        replacement: matchedKey ? alternativesMap[matchedKey] : ingredient
      };
    });
}; 
