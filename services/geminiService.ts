

import { GoogleGenAI, Type } from "@google/genai";
import type { RiskAssessmentResponse, FarmingSuggestions } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const farmingSuggestionsSchema = {
    type: Type.OBJECT,
    properties: {
        profitableCrops: {
            type: Type.ARRAY,
            description: "A list of profitable crops suitable for the location.",
            items: {
                type: Type.OBJECT,
                properties: {
                    cropName: {
                        type: Type.STRING,
                        description: "The name of the suggested crop."
                    },
                    yieldStartDate: {
                        type: Type.STRING,
                        description: "The typical start month of the harvest period (e.g., 'August')."
                    },
                    yieldEndDate: {
                        type: Type.STRING,
                        description: "The typical end month of the harvest period (e.g., 'September')."
                    },
                    seasonDescription: {
                        type: Type.STRING,
                        description: "A short, descriptive name for the harvest season (e.g., 'Spring Harvest', 'Late Summer Crop')."
                    },
                    reasoning: {
                        type: Type.STRING,
                        description: "A brief explanation for why this crop is profitable in this location (e.g., market demand, climate match)."
                    },
                    imageUrl: {
                        type: Type.STRING,
                        description: "Construct a URL for a photorealistic, high-quality, royalty-free image of the crop using source.unsplash.com. The URL MUST be in the format 'https://source.unsplash.com/500x300/?{keywords}'. CRITICAL INSTRUCTIONS FOR KEYWORDS: Your goal is to construct a keyword query that maximizes the chance of getting a beautiful, relevant, and real photograph from Unsplash. 1. Always use 2-4 simple, common, comma-separated English words. 2. Always include the primary crop name. 3. Always include a context word that describes where or how it grows. Good context words include: 'field', 'farm', 'orchard', 'plantation', 'harvest', 'vine', 'plant', 'tree'. 4. If the crop is very specific or rare (e.g., 'Saffron', 'Quinoa', 'Mamey Sapote'), be more creative. Think about its appearance or environment, or use a more general but related term. For 'Saffron', 'saffron,flower,harvest' is good. For 'Mamey Sapote', 'tropical,fruit,tree' is better than 'mamey,sapote'. 5. Combine these to create a robust query. The goal is to ALWAYS return a valid, high-quality image URL. A fallback image is a poor user experience. GOOD EXAMPLES: For 'Wheat', use 'wheat,field,sun'. For 'Tomatoes', use 'tomatoes,vine,farm'. For 'Grapes', use 'grapes,vineyard'. For 'Coffee', use 'coffee,beans,harvest'. For 'Avocado', use 'avocado,tree,orchard'. For 'Millet', use 'millet,grain,field'."
                    }
                },
                required: ["cropName", "yieldStartDate", "yieldEndDate", "seasonDescription", "reasoning", "imageUrl"]
            }
        },
        farmerAdvice: {
            type: Type.ARRAY,
            description: "A list of general, actionable advice for farmers in this region.",
            items: {
                type: Type.STRING
            }
        }
    },
    required: ["profitableCrops", "farmerAdvice"]
};


const riskAssessmentSchema = {
  type: Type.OBJECT,
  properties: {
    location: { 
      type: Type.STRING,
      description: "The geographical location being assessed."
    },
    crop: {
      type: Type.STRING,
      description: "The specific crop being assessed."
    },
    latitude: {
        type: Type.NUMBER,
        description: "The latitude for the center of the specified location."
    },
    longitude: {
        type: Type.NUMBER,
        description: "The longitude for the center of the specified location."
    },
    overallRiskLevel: {
      type: Type.STRING,
      description: "A single overall risk assessment level.",
      enum: ['Low', 'Medium', 'High']
    },
    executiveSummary: {
        type: Type.STRING,
        description: "A 2-3 sentence executive summary of the overall risk assessment, highlighting the most critical factors."
    },
    disasterRisks: {
      type: Type.ARRAY,
      description: "A list of potential disasters, each with a name, probability, description, and an icon identifier.",
      items: {
        type: Type.OBJECT,
        properties: {
          disaster: {
            type: Type.STRING,
            description: "The name of the disaster (e.g., Drought, Flood, Pest Infestation, Hailstorm, Late Frost)."
          },
          probability: {
            type: Type.INTEGER,
            description: "The estimated probability of this disaster occurring, as a percentage (0-100)."
          },
          description: {
            type: Type.STRING,
            description: "A concise explanation of the risk."
          },
          iconName: {
              type: Type.STRING,
              description: "A single, lowercase keyword to represent the disaster iconically. Must be one of: 'drought', 'flood', 'pest', 'hail', 'frost', 'wind', 'fire', 'default'.",
              enum: ['drought', 'flood', 'pest', 'hail', 'frost', 'wind', 'fire', 'default']
          }
        },
        required: ["disaster", "probability", "description", "iconName"]
      }
    },
    mitigationStrategies: {
      type: Type.ARRAY,
      description: "A list of actionable strategies to help mitigate the identified risks.",
      items: {
        type: Type.STRING
      }
    },
    climateProfile: {
        type: Type.STRING,
        description: "A concise summary of the typical climate for the location, suitable for agricultural planning."
    },
    weatherForecast: {
        type: Type.ARRAY,
        description: "A 7-day weather forecast for the location.",
        items: {
            type: Type.OBJECT,
            properties: {
                day: { type: Type.STRING, description: "The day of the week (e.g., 'Monday')." },
                highTemp: { type: Type.INTEGER, description: "The forecasted high temperature in Celsius." },
                lowTemp: { type: Type.INTEGER, description: "The forecasted low temperature in Celsius." },
                precipitationChance: { type: Type.INTEGER, description: "The probability of precipitation as a percentage (0-100)." },
                weather: { type: Type.STRING, description: "A brief description of the weather (e.g., 'Partly Cloudy')." },
                iconName: {
                    type: Type.STRING,
                    description: "A single, lowercase keyword for the weather icon. Must be one of: 'sunny', 'partly-cloudy', 'cloudy', 'rain', 'thunderstorm', 'default'.",
                    enum: ['sunny', 'partly-cloudy', 'cloudy', 'rain', 'thunderstorm', 'default']
                }
            },
            required: ["day", "highTemp", "lowTemp", "precipitationChance", "weather", "iconName"]
        }
    },
    fertilizerSuggestions: {
      type: Type.ARRAY,
      description: "A list of 2-3 suitable fertilizer suggestions for the crop and location.",
      items: {
        type: Type.OBJECT,
        properties: {
          fertilizerType: { type: Type.STRING, description: "The type or name of the fertilizer (e.g., 'Nitrogen-Rich Fertilizer', 'Potassium Sulfate')." },
          description: { type: Type.STRING, description: "A brief description of why this fertilizer is suitable." },
          applicationNotes: { type: Type.STRING, description: "Instructions or notes on how to apply the fertilizer." },
          imageUrl: {
            type: Type.STRING,
            description: "Construct a URL for a high-quality, royalty-free image of the fertilizer product, often in a bag or container. Use source.unsplash.com. The URL MUST be in the format 'https://source.unsplash.com/500x300/?{keywords}'. Keywords should be simple and effective, like 'fertilizer,bag', 'plant,food', 'soil,amendment'."
          },
          onlineOptions: {
            type: Type.ARRAY,
            description: "A list of 1-2 online stores where a similar fertilizer can be purchased.",
            items: {
              type: Type.OBJECT,
              properties: {
                storeName: { type: Type.STRING, description: "The name of the online retailer." },
                productUrl: { type: Type.STRING, description: "A functional search URL on the retailer's website (e.g., a Google Shopping or Amazon search link) for the fertilizer." },
                price: { type: Type.STRING, description: "An estimated price for the product, in Indian Rupees (INR), including units (e.g., '₹450 / 5kg bag')." }
              },
              required: ["storeName", "productUrl", "price"]
            }
          },
          localShops: {
            type: Type.ARRAY,
            description: "A list of 2-3 local agricultural suppliers near the location.",
            items: {
              type: Type.OBJECT,
              properties: {
                shopName: { type: Type.STRING, description: "The name of the local shop." },
                address: { type: Type.STRING, description: "The full address of the shop." },
                phone: { type: Type.STRING, description: "The contact phone number for the shop." },
                latitude: { type: Type.NUMBER, description: "The latitude of the shop's location." },
                longitude: { type: Type.NUMBER, description: "The longitude of the shop's location." }
              },
              required: ["shopName", "address", "phone", "latitude", "longitude"]
            }
          }
        },
        required: ["fertilizerType", "description", "applicationNotes", "imageUrl", "onlineOptions", "localShops"]
      }
    },
    cropYield: {
      type: Type.OBJECT,
      description: "Information about the typical yield for this crop in this location.",
      properties: {
        amount: { type: Type.STRING, description: "The typical yield amount as a string (e.g., '5-7 tons')." },
        unit: { type: Type.STRING, description: "The unit for the yield amount (e.g., 'per hectare')." },
        yieldStartDate: { type: Type.STRING, description: "The typical start month of the harvest period (e.g., 'August')." },
        yieldEndDate: { type: Type.STRING, description: "The typical end month of the harvest period (e.g., 'September')." },
        seasonDescription: { type: Type.STRING, description: "A short description of the season, like 'Late Summer' or 'Autumn'." }
      },
      required: ["amount", "unit", "yieldStartDate", "yieldEndDate", "seasonDescription"]
    },
    marketPrice: {
      type: Type.OBJECT,
      description: "Market price information for the crop, in Indian Rupees (INR).",
      properties: {
        currentPrice: {
          type: Type.OBJECT,
          properties: {
            value: { type: Type.NUMBER, description: "The current market price value in INR." },
            currency: { type: Type.STRING, description: "The currency of the price. Must be 'INR'.", enum: ["INR"] },
            unit: { type: Type.STRING, description: "The unit for the price (e.g., 'per ton', 'per quintal')." }
          },
          required: ["value", "currency", "unit"]
        },
        priceHistory: {
          type: Type.ARRAY,
          description: "A list of historical price data points in INR for the last 6-12 months. Should contain about 12 data points.",
          items: {
            type: Type.OBJECT,
            properties: {
              date: { type: Type.STRING, description: "The date of the price point in 'YYYY-MM' format." },
              price: { type: Type.NUMBER, description: "The price on that date, in INR." }
            },
            required: ["date", "price"]
          }
        }
      },
      required: ["currentPrice", "priceHistory"]
    }
  },
  required: ["location", "crop", "latitude", "longitude", "overallRiskLevel", "executiveSummary", "disasterRisks", "mitigationStrategies", "climateProfile", "weatherForecast", "fertilizerSuggestions", "cropYield", "marketPrice"]
};


export const getRiskAssessment = async (location: string, crop: string, language: string): Promise<RiskAssessmentResponse> => {
  const prompt = `
    Analyze agricultural risks for growing "${crop}" in "${location}". Provide a detailed dashboard-style analysis.
    
    CRITICAL INSTRUCTION: All monetary values (market prices, online purchase options) MUST be in Indian Rupees (INR). The currency field in the schema must be 'INR', and price strings must use the '₹' symbol.

    - Provide an overall risk level ('Low', 'Medium', 'High').
    - Provide a concise 2-3 sentence executive summary of the overall situation, highlighting the most critical risk and the general outlook for growing the crop in this location.
    - Provide the exact latitude and longitude for the center of "${location}".
    - Identify a list of 4 to 6 major potential disasters (like drought, flood, pests, frost, etc.). For each disaster, provide its probability as a percentage (0-100), a short description, and a single keyword for an icon from this list: ['drought', 'flood', 'pest', 'hail', 'frost', 'wind', 'fire', 'default'].
    - List 3 to 5 actionable mitigation strategies.
    - Provide a concise summary of the typical climate profile for the location.
    - Provide a 7-day weather forecast. For each day, include the day of the week, high and low temperatures in Celsius, precipitation chance (0-100), a short weather description, and an icon name from this list: ['sunny', 'partly-cloudy', 'cloudy', 'rain', 'thunderstorm', 'default'].
    - Suggest 2-3 suitable fertilizers for growing "${crop}" in "${location}". For each fertilizer:
        - Provide a name/type, a description of its benefits, brief application notes, and an imageUrl. Construct the imageUrl using source.unsplash.com with keywords like 'fertilizer bag' or 'plant food'.
        - List 1-2 plausible online purchase options. For each, provide a store name, an estimated price in INR with units (e.g., '₹450 / 5kg bag'), and a functional search URL on the retailer's website (e.g., a Google Shopping or Amazon search link for the fertilizer type) in the 'productUrl' field.
        - List 2-3 real or plausible local agricultural supply shops near "${location}". For each shop, provide its name, full address, phone number, and its precise latitude and longitude.
    - Provide typical crop yield information for "${crop}" in this region: amount (e.g., "5-7 tons"), unit (e.g., "per hectare"), the start and end month of the yield period, and a 'seasonDescription' (e.g., 'Late Summer').
    - Provide current market price information for "${crop}" in INR: current price (value, currency='INR', unit) and a plausible historical price trend in INR for the last 12 months (an array of about 12 data points with "YYYY-MM" date and price).
    
    IMPORTANT: Generate the entire response in ${language}. All text, including descriptions, names, and strategies, must be in ${language}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: riskAssessmentSchema,
        temperature: 0.5,
      },
    });

    const text = response.text?.trim();
    if (!text) {
        throw new Error("Received an empty response from the AI.");
    }
    
    let parsedResponse;
    try {
        const cleanJsonText = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        parsedResponse = JSON.parse(cleanJsonText);
    } catch (jsonError) {
        console.error("Failed to parse JSON response from AI:", text);
        throw new Error("The AI returned a response that was not valid JSON. Please try again.");
    }

    if (!parsedResponse.overallRiskLevel || !parsedResponse.disasterRisks || !parsedResponse.mitigationStrategies) {
      throw new Error("AI response is missing required data. Please try a different query.");
    }

    return parsedResponse as RiskAssessmentResponse;

  } catch (error) {
    console.error("Error in getRiskAssessment:", error);
    if (error instanceof Error && error.message.includes('429')) {
         throw new Error("API quota exceeded. Please check your plan and billing details.");
    }
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while communicating with the AI service.");
  }
};

export const generateCropImage = async (crop: string): Promise<string> => {
    const prompt = `A photorealistic, vibrant, high-quality photograph of ${crop} growing in a natural agricultural setting. The crop should be the main focus. The style should be professional, suitable for a dashboard header.`;
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("AI did not return an image.");
        }
    } catch (error) {
        console.error("Error in generateCropImage:", error);
        if (error instanceof Error && (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED'))) {
             throw new Error("Image generation failed due to API quota limits. Please check your plan and billing details.");
        }
        if (error instanceof Error) {
            throw new Error(`Image generation failed: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the crop image.");
    }
}

export const getFarmingSuggestions = async (location: string, language: string): Promise<FarmingSuggestions> => {
    const prompt = `
        Analyze the agricultural potential of "${location}" and provide farming suggestions focused on profitability.
        Generate a JSON response with two main keys: 'profitableCrops' and 'farmerAdvice'.
        - For 'profitableCrops', provide a list of 5 to 7 highly profitable crops. For each crop, include:
          1. 'cropName': The name of the crop.
          2. 'yieldStartDate': The typical starting month of the harvest/yield season.
          3. 'yieldEndDate': The typical ending month of the harvest/yield season.
          4. 'seasonDescription': A short, descriptive name for the harvest season (e.g., 'Spring Harvest', 'Late Summer Crop').
          5. 'reasoning': A concise sentence explaining why this crop is a profitable choice for this location (e.g., high market value, ideal growing conditions, low-risk).
          6. 'imageUrl': Construct a direct, public URL to a photorealistic, high-quality, royalty-free image representing the crop, using the format 'https://source.unsplash.com/500x300/?{keywords}'. For the keywords, use a comma-separated list of 2-3 specific, relevant ENGLISH keywords that describe the crop in a natural setting (e.g., for corn use 'corn,field,sun'). This is critical.
        - For 'farmerAdvice', provide a list of 3-4 general, actionable tips or suggestions for farmers operating in "${location}".

        IMPORTANT: Generate the entire JSON response in ${language}. All string values (cropName, reasoning, advice, etc.) must be in ${language}.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: farmingSuggestionsSchema,
                temperature: 0.6,
            },
        });

        const text = response.text?.trim();
        if (!text) {
            throw new Error("Received an empty response from the AI for farming suggestions.");
        }

        let parsedResponse;
        try {
            const cleanJsonText = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
            parsedResponse = JSON.parse(cleanJsonText);
        } catch (jsonError) {
            console.error("Failed to parse JSON response for farming suggestions:", text);
            throw new Error("The AI returned an invalid format for farming suggestions. Please try again.");
        }

        return parsedResponse as FarmingSuggestions;

    } catch (error) {
        console.error("Error in getFarmingSuggestions:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to get farming suggestions: ${error.message}`);
        }
        throw new Error("An unknown error occurred while getting farming suggestions.");
    }
};