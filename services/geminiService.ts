
import { GoogleGenAI } from "@google/genai";
import { Shop } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getBusinessInsights = async (shopData: Shop): Promise<string> => {
  try {
    const salesByService: { [key: string]: { count: number; name: string } } = {};
    shopData.sales.forEach(sale => {
      if (!salesByService[sale.serviceId]) {
        const service = shopData.services.find(s => s.id === sale.serviceId);
        salesByService[sale.serviceId] = { count: 0, name: service?.name || 'Unknown' };
      }
      salesByService[sale.serviceId].count++;
    });

    const sortedServices = Object.values(salesByService).sort((a, b) => b.count - a.count);
    const popularServices = sortedServices.slice(0, 3).map(s => s.name).join(', ');
    const leastPopularServices = sortedServices.slice(-2).map(s => s.name).join(', ');

    const salesByDate: { [key: string]: number } = {};
    shopData.sales.forEach(sale => {
      salesByDate[sale.date] = (salesByDate[sale.date] || 0) + sale.amount;
    });
    const salesTrend = Object.entries(salesByDate).map(([date, total]) => `${date}: ${total}`).join('; ');

    const prompt = `
      You are a business consultant for small, local shops in India. Based on the following data for a ${shopData.category} named "${shopData.name}", provide 3-5 actionable, simple, and encouraging suggestions to improve sales and customer engagement. The suggestions should be very easy to understand for someone who is not a business expert.

      Shop Data:
      - Services Offered: ${shopData.services.map(s => `${s.name} (Rs. ${s.price})`).join(', ')}
      - Most Popular Services: ${popularServices || 'Not enough data'}
      - Least Popular Services: ${leastPopularServices || 'Not enough data'}
      - Recent Sales Trend: ${salesTrend || 'Not enough data'}

      Provide the output as a simple, unnumbered list. Each suggestion must start with a relevant emoji. Write in a friendly and supportive tone.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error("Error generating business insights:", error);
    return "We're sorry, but we couldn't generate suggestions at this moment. Please check your connection or try again later.";
  }
};
