

import React from 'react';
import type { RiskAssessmentResponse } from '../types';
import type { TranslationKeys } from '../translations';
import { ShieldIcon } from './icons/ShieldIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ThermometerIcon } from './icons/ThermometerIcon';
import { SoilIcon } from './icons/SoilIcon';
import { HarvestIcon } from './icons/HarvestIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import Gauge from './Gauge';
import DisasterCard from './DisasterCard';
import MapDisplay from './MapDisplay';
import WeatherChart from './WeatherChart';
import WeatherForecast from './WeatherForecast';
import FertilizerSuggestions from './FertilizerSuggestions';
import MarketPriceChart from './MarketPriceChart';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';

interface DashboardProps {
  data: RiskAssessmentResponse;
  cropImageUrl: string | null;
  imageError: string | null;
  t: TranslationKeys;
}

const Dashboard: React.FC<DashboardProps> = ({ data, t, cropImageUrl, imageError }) => {
  const cardBaseStyles = "bg-surface/60 backdrop-blur-xl rounded-2xl shadow-card border border-white/20";

  return (
    <div className="animate-slide-fade-in space-y-8">
        <div className={`${cardBaseStyles} p-6`}>
            <div className="flex items-center gap-3 mb-4">
                <DocumentTextIcon className="h-7 w-7 text-secondary" />
                <h3 className="text-2xl font-bold text-primary">{t.executiveSummary}</h3>
            </div>
            <p className="text-text-primary text-lg">{data.executiveSummary}</p>
        </div>
    
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className={`${cardBaseStyles} relative flex flex-col items-center justify-center text-center h-72 overflow-hidden`}>
                    {cropImageUrl ? (
                        <>
                            <div className="absolute inset-0 bg-cover bg-center transition-all duration-500" style={{ backgroundImage: `url(${cropImageUrl})` }}></div>
                            <div className="absolute inset-0 bg-black/50"></div>
                            <div className="relative z-10 text-white p-4">
                                <p className="text-xl text-white/80">{t.analysisFor}</p>
                                <h3 className="text-5xl font-bold tracking-tight">{data.crop}</h3>
                            </div>
                        </>
                    ) : imageError ? (
                         <div className="bg-red-50 w-full h-full flex flex-col items-center justify-center p-4 text-center">
                            <AlertTriangleIcon className="h-12 w-12 text-red-400 mb-4" />
                            <h4 className="font-bold text-red-700">{t.imageUnavailable}</h4>
                            <p className="text-sm text-red-600 max-w-xs">{imageError}</p>
                        </div>
                    ) : (
                        <div className="bg-primary/5 w-full h-full flex flex-col items-center justify-center p-4">
                            <HarvestIcon className="h-20 w-20 text-secondary mb-4" />
                            <p className="text-xl text-text-secondary">{t.analysisFor}</p>
                            <h3 className="text-5xl font-bold text-primary tracking-tight">{data.crop}</h3>
                        </div>
                    )}
                </div>
                <div className={`${cardBaseStyles} p-6`}>
                    <h4 className="font-semibold text-text-secondary mb-2">{t.geoLocation}</h4>
                    <p className="text-xl font-bold text-primary mb-4">{data.location}</p>
                    <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-300/50">
                        <MapDisplay latitude={data.latitude} longitude={data.longitude} t={t} />
                    </div>
                </div>
            </div>

            <div className={`${cardBaseStyles} flex flex-col justify-center items-center text-center p-6`}>
                 <h3 className="text-xl font-semibold text-primary mb-4">{t.overallRisk}</h3>
                 <Gauge level={data.overallRiskLevel} t={t} />
            </div>
        </div>

      {data.cropYield && data.marketPrice && (
        <div className={`${cardBaseStyles} p-6`}>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUpIcon className="h-7 w-7 text-secondary" />
            <h3 className="text-2xl font-bold text-primary">{t.cropAndMarketInsights}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Yield Card */}
            <div className="bg-background/80 p-5 rounded-xl border border-gray-200/50 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <HarvestIcon className="h-6 w-6 text-primary" />
                <h4 className="font-bold text-lg text-text-primary">{t.expectedYield}</h4>
              </div>
              <p className="text-2xl font-bold text-secondary">{data.cropYield.amount} <span className="text-base font-medium text-text-secondary">{data.cropYield.unit}</span></p>
              <p className="text-sm text-text-secondary mt-1">{t.yieldSeason} {data.cropYield.yieldStartDate} – {data.cropYield.yieldEndDate} {data.cropYield.seasonDescription && `(${data.cropYield.seasonDescription})`}</p>
            </div>
            {/* Market Price Card */}
            <div className="bg-background/80 p-5 rounded-xl border border-gray-200/50 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <DollarSignIcon className="h-6 w-6 text-primary" />
                <h4 className="font-bold text-lg text-text-primary">{t.currentMarketPrice}</h4>
              </div>
              <p className="text-2xl font-bold text-secondary">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: data.marketPrice.currentPrice.currency, minimumFractionDigits: 0 }).format(data.marketPrice.currentPrice.value)}
              </p>
              <p className="text-sm text-text-secondary mt-1">{data.marketPrice.currentPrice.unit}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-text-secondary mb-4 text-sm uppercase tracking-wider">{t.historicalMarketPrice}</h4>
            <MarketPriceChart 
              history={data.marketPrice.priceHistory} 
              currency={data.marketPrice.currentPrice.currency}
              t={t}
            />
          </div>
        </div>
      )}
      
      <div className={`${cardBaseStyles} p-6`}>
        <h3 className="text-2xl font-bold text-primary mb-6">{t.potentialDisasters}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.disasterRisks.map((risk, index) => (
                <DisasterCard key={index} risk={risk} />
            ))}
        </div>
      </div>

      <div className={`${cardBaseStyles} p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <ThermometerIcon className="h-7 w-7 text-secondary" />
          <h3 className="text-2xl font-bold text-primary">{t.weatherAndClimate}</h3>
        </div>
        
        <div className="mb-8 p-4 bg-background/80 border border-gray-200/50 rounded-lg">
            <h4 className="font-semibold text-text-secondary mb-2 text-sm uppercase tracking-wider">{t.climateProfile}</h4>
            <p className="text-text-primary">{data.climateProfile}</p>
        </div>

        <div className="mb-8">
            <h4 className="font-semibold text-text-secondary mb-4 text-sm uppercase tracking-wider">{t.sevenDayForecast}</h4>
            {data.weatherForecast && data.weatherForecast.length > 0 ? (
                <WeatherChart forecast={data.weatherForecast} t={t} />
            ) : (
                <p className="text-text-secondary">Weather chart data not available.</p>
            )}
        </div>

        <div>
            <h4 className="font-semibold text-text-secondary mb-4 text-sm uppercase tracking-wider">{t.dailyForecast}</h4>
            {data.weatherForecast && data.weatherForecast.length > 0 ? (
                <WeatherForecast 
                  forecast={data.weatherForecast} 
                  t={t}
                />
            ) : (
                <p className="text-text-secondary">Weather forecast data not available.</p>
            )}
        </div>
      </div>
      
      <div className={`${cardBaseStyles} p-6`}>
        <div className="flex items-center gap-3 mb-4">
          <ShieldIcon className="h-7 w-7 text-secondary" />
          <h3 className="text-2xl font-bold text-primary">{t.mitigationStrategies}</h3>
        </div>
        <ul className="space-y-3 pl-2">
          {data.mitigationStrategies.map((strategy, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircleIcon className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
              <span className="text-text-primary">{strategy}</span>
            </li>
          ))}
        </ul>
      </div>

      {data.fertilizerSuggestions && data.fertilizerSuggestions.length > 0 && (
        <div className={`${cardBaseStyles} p-6`}>
          <div className="flex items-center gap-3 mb-6">
            <SoilIcon className="h-7 w-7 text-secondary" />
            <h3 className="text-2xl font-bold text-primary">{t.fertilizerAndSoil}</h3>
          </div>
          <FertilizerSuggestions suggestions={data.fertilizerSuggestions} t={t} />
        </div>
      )}

    </div>
  );
};

export default Dashboard;