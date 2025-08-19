

const englishTranslations = {
  // App.tsx
  mainTitle: 'AI Agriculture Risk Management',
  mainSubtitle: 'Leverage AI to analyze potential risks for your crops and location. Get detailed insights and actionable mitigation strategies.',
  footerText: 'Powered by Google Gemini. Data is for informational purposes only.',
  
  // RiskAssessmentForm.tsx
  locationLabel: 'Location',
  locationPlaceholder: 'e.g., Central Valley, California',
  cropTypeLabel: 'Crop Type',
  suggestCropsButton: 'Suggest Crops',
  suggestingCropsButton: 'Suggesting...',
  cropPlaceholder: 'e.g., Almonds',
  assessRiskButton: 'Assess Risk',
  assessingRiskButton: 'Assessing...',
  suggestionsFor: 'Farming Suggestions for {location}',
  closeSuggestions: 'Close suggestions',
  profitableCrops: 'Profitable Crops',
  selectThisCrop: 'Select this Crop',
  generalAdvice: 'General Advice for Farmers',
  findingSuggestions: 'Finding farming suggestions for {location}...',
  yieldLabel: 'Yield:',

  // Loading/Error Messages
  loadingRisks: 'Analyzing agricultural risks...',
  generatingImage: 'Generating crop image...',
  errorTitle: 'Error:',
  imageUnavailable: 'Image Unavailable',

  // RiskResultDisplay.tsx
  executiveSummary: 'Executive Summary',
  analysisFor: 'Analysis for',
  geoLocation: 'Geographic Location',
  overallRisk: 'Overall Risk',
  cropAndMarketInsights: 'Crop & Market Insights',
  expectedYield: 'Expected Yield',
  yieldSeason: 'Yield Season:',
  currentMarketPrice: 'Current Market Price',
  historicalMarketPrice: 'Historical Market Price (12 Months)',
  potentialDisasters: 'Potential Disasters',
  weatherAndClimate: 'Weather & Climate Analysis',
  climateProfile: 'Climate Profile',
  sevenDayForecast: '7-Day Forecast Visualization',
  dailyForecast: 'Daily Forecast',
  detailedView: 'Detailed View:',
  mitigationStrategies: 'Mitigation Strategies',
  fertilizerAndSoil: 'Fertilizer & Soil Health',

  // FertilizerSuggestions.tsx
  description: 'Description',
  applicationNotes: 'Application Notes',
  onlineRetailers: 'Online Retailers',
  buyNow: 'Buy Now',
  localSuppliers: 'Local Suppliers',
  
  // WeatherForecast.tsx
  weatherForecastAriaLabel: 'View detailed forecast for {day}',
  rain: 'rain',
  high: 'High',
  low: 'Low',
  chanceOfRain: 'Chance of Rain',

  // Gauge.tsx
  gaugeAriaLabel: 'Risk level: {level}',

  // MapDisplay.tsx
  mapLocationNotAvailable: 'Location data not available.',
  mapAriaLabel: 'Interactive map showing the assessed location',
  
  // WeatherChart.tsx
  weatherChartTitle: '7-Day Weather Forecast Chart',
  weatherChartTooltip: '{day}: {chance}% chance of rain',

  // MarketPriceChart.tsx
  marketChartNotAvailable: 'Market price history not available.',
  marketChartTitle: 'Historical Market Price Chart',
};

const tamilTranslations = {
  // App.tsx
  mainTitle: 'AI விவசாய இடர் மேலாண்மை',
  mainSubtitle: 'உங்கள் பயிர்கள் மற்றும் இருப்பிடத்திற்கான சாத்தியமான அபாயங்களை பகுப்பாய்வு செய்ய AI-ஐப் பயன்படுத்தவும். விரிவான நுண்ணறிவுகள் மற்றும் செயல்பாட்டுத் தணிப்பு உத்திகளைப் பெறுங்கள்.',
  footerText: 'Google Gemini மூலம் இயக்கப்படுகிறது. தரவு தகவல் நோக்கங்களுக்காக மட்டுமே.',

  // RiskAssessmentForm.tsx
  locationLabel: 'இடம்',
  locationPlaceholder: 'எ.கா., மத்திய பள்ளத்தாக்கு, கலிபோர்னியா',
  cropTypeLabel: 'பயிர் வகை',
  suggestCropsButton: 'பயிர்களைப் பரிந்துரைக்கவும்',
  suggestingCropsButton: 'பரிந்துரைக்கப்படுகிறது...',
  cropPlaceholder: 'எ.கா., பாதாம்',
  assessRiskButton: 'இடர் மதிப்பீடு',
  assessingRiskButton: 'மதிப்பீடு செய்கிறது...',
  suggestionsFor: '{location} க்கான விவசாயப் பரிந்துரைகள்',
  closeSuggestions: 'பரிந்துரைகளை மூடு',
  profitableCrops: 'லாபகரமான பயிர்கள்',
  selectThisCrop: 'இந்தப் பயிரைத் தேர்ந்தெடுக்கவும்',
  generalAdvice: 'விவசாயிகளுக்கான பொதுவான அறிவுரை',
  findingSuggestions: '{location} க்கான விவசாயப் பரிந்துரைகளைக் கண்டறிதல்...',
  yieldLabel: 'மகசூல்:',

  // Loading/Error Messages
  loadingRisks: 'விவசாய அபாயங்களை பகுப்பாய்வு செய்கிறது...',
  generatingImage: 'பயிர் படத்தை உருவாக்குகிறது...',
  errorTitle: 'பிழை:',
  imageUnavailable: 'படம் கிடைக்கவில்லை',

  // RiskResultDisplay.tsx
  executiveSummary: 'செயல்பாட்டு சுருக்கம்',
  analysisFor: 'பகுப்பாய்வு',
  geoLocation: 'புவியியல் இருப்பிடம்',
  overallRisk: 'ஒட்டுமொத்த இடர்',
  cropAndMarketInsights: 'பயிர் மற்றும் சந்தை நுண்ணறிவு',
  expectedYield: 'எதிர்பார்க்கப்படும் மகசூல்',
  yieldSeason: 'மகசூல் காலம்:',
  currentMarketPrice: 'தற்போதைய சந்தை விலை',
  historicalMarketPrice: 'வரலாற்று சந்தை விலை (12 மாதங்கள்)',
  potentialDisasters: 'சாத்தியமான பேரழிவுகள்',
  weatherAndClimate: 'வானிலை மற்றும் காலநிலை பகுப்பாய்வு',
  climateProfile: 'காலநிலை சுயவிவரம்',
  sevenDayForecast: '7-நாள் முன்னறிவிப்பு காட்சிப்படுத்தல்',
  dailyForecast: 'தினசரி முன்னறிவிப்பு',
  detailedView: 'விரிவான பார்வை:',
  mitigationStrategies: 'தணிப்பு உத்திகள்',
  fertilizerAndSoil: 'உரம் மற்றும் மண் ஆரோக்கியம்',

  // FertilizerSuggestions.tsx
  description: 'விளக்கம்',
  applicationNotes: 'பயன்பாட்டுக் குறிப்புகள்',
  onlineRetailers: 'ஆன்லைன் சில்லறை விற்பனையாளர்கள்',
  buyNow: 'இப்போது வாங்கவும்',
  localSuppliers: 'உள்ளூர் சப்ளையர்கள்',

  // WeatherForecast.tsx
  weatherForecastAriaLabel: '{day}க்கான விரிவான முன்னறிவிப்பைக் காண்க',
  rain: 'மழை',
  high: 'அதிகம்',
  low: 'குறைவு',
  chanceOfRain: 'மழைக்கான வாய்ப்பு',

  // Gauge.tsx
  gaugeAriaLabel: 'இடர் நிலை: {level}',

  // MapDisplay.tsx
  mapLocationNotAvailable: 'இருப்பிடத் தரவு கிடைக்கவில்லை.',
  mapAriaLabel: 'மதிப்பிடப்பட்ட இருப்பிடத்தைக் காட்டும் ஊடாடும் வரைபடம்',

  // WeatherChart.tsx
  weatherChartTitle: '7-நாள் வானிலை முன்னறிவிப்பு விளக்கப்படம்',
  weatherChartTooltip: '{day}: {chance}% மழைக்கான வாய்ப்பு',

  // MarketPriceChart.tsx
  marketChartNotAvailable: 'சந்தை விலை வரலாறு கிடைக்கவில்லை.',
  marketChartTitle: 'வரலாற்று சந்தை விலை விளக்கப்படம்',
};

export const translations = {
  'English': englishTranslations,
  'Tamil': tamilTranslations,
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof englishTranslations;

// Function to get translations, with English as a fallback
export const getTranslations = (language: string): TranslationKeys => {
  if (language in translations) {
    return translations[language as Language];
  }
  return translations.English;
};