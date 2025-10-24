
import { GoogleGenAI, Type } from "@google/genai";
import type { Product } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateCatalogData = async (): Promise<Product[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Genera una lista de 20 productos creativos y diversos para una tienda online ficticia en español. Incluye productos de categorías como 'Electrónica', 'Hogar', 'Ropa', 'Libros' y 'Deportes'. Para cada producto, proporciona un ID único, un nombre atractivo, una breve descripción (alrededor de 15-20 palabras), un precio realista, su categoría, y una URL de imagen de picsum.photos.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER, description: "Identificador único del producto" },
              name: { type: Type.STRING, description: "Nombre del producto" },
              description: { type: Type.STRING, description: "Una breve descripción del producto" },
              price: { type: Type.NUMBER, description: "Precio en USD" },
              category: { type: Type.STRING, description: "Categoría del producto" },
              imageUrl: { type: Type.STRING, description: "URL para la imagen del producto, debe ser de https://picsum.photos/seed/{semilla_aleatoria}/600/400" },
            },
            required: ["id", "name", "description", "price", "category", "imageUrl"],
          },
        },
      },
    });

    const jsonString = response.text.trim();
    const products: Product[] = JSON.parse(jsonString);
    
    // Ensure image URLs are valid and diverse by adding a random seed
    return products.map(p => ({
        ...p,
        imageUrl: `https://picsum.photos/seed/${p.id}-${Math.random()}/600/400`
    }));

  } catch (error) {
    console.error("Error al generar datos del catálogo:", error);
    throw new Error("No se pudo obtener los datos de los productos desde la API de Gemini.");
  }
};
