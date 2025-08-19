

export interface DisasterRisk {
  disaster: string;
  probability: number; // 0 to 100
  description: string;
  iconName: 'drought' | 'flood' | 'pest' | 'hail' | 'frost' | 'wind' | 'fire' | 'default';
}

export type WeatherIcon = 'sunny' | 'partly-cloudy' | 'cloudy' | 'rain' | 'thunderstorm' | 'default';

export interface DailyForecast {
  day: string;
  highTemp: number;
  lowTemp: number;
  precipitationChance: number;
  weather: string;
  iconName: WeatherIcon;
}

export interface OnlinePurchaseOption {
  storeName: string;
  productUrl: string;
  price: string;
}

export interface LocalShop {
  shopName: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export interface FertilizerSuggestion {
  fertilizerType: string;
  description: string;
  applicationNotes: string;
  imageUrl: string;
  onlineOptions: OnlinePurchaseOption[];
  localShops: LocalShop[];
}

export interface CropYield {
  amount: string;
  unit: string;
  yieldStartDate: string;
  yieldEndDate: string;
  seasonDescription: string;
}

export interface ProfitableCrop {
  cropName: string;
  yieldStartDate: string;
  yieldEndDate: string;
  seasonDescription: string;
  reasoning: string;
  imageUrl: string;
}

export interface FarmingSuggestions {
  profitableCrops: ProfitableCrop[];
  farmerAdvice: string[];
}


export interface MarketPriceDataPoint {
  date: string; // "YYYY-MM"
  price: number;
}

export interface MarketPrice {
  currentPrice: {
    value: number;
    currency: string;
    unit: string;
  };
  priceHistory: MarketPriceDataPoint[];
}

export interface RiskAssessmentResponse {
  location: string;
  crop: string;
  latitude: number;
  longitude: number;
  overallRiskLevel: 'Low' | 'Medium' | 'High';
  executiveSummary: string;
  disasterRisks: DisasterRisk[];
  mitigationStrategies: string[];
  climateProfile: string;
  weatherForecast: DailyForecast[];
  fertilizerSuggestions: FertilizerSuggestion[];
  cropYield: CropYield;
  marketPrice: MarketPrice;
}