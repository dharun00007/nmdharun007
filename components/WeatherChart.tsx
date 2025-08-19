
import React from 'react';
import { DailyForecast } from '../types';
import type { TranslationKeys } from '../translations';

interface WeatherChartProps {
  forecast: DailyForecast[];
  t: TranslationKeys;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ forecast, t }) => {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  const chartWidth = 500;
  const chartHeight = 250;
  const padding = { top: 40, right: 20, bottom: 40, left: 40 };

  const temps = forecast.flatMap(d => [d.highTemp, d.lowTemp]);
  const minTemp = Math.min(...temps) - 5;
  const maxTemp = Math.max(...temps) + 5;

  const getX = (index: number) => padding.left + index * (chartWidth - padding.left - padding.right) / (forecast.length - 1);
  const getTempY = (temp: number) => chartHeight - padding.bottom - ((temp - minTemp) / (maxTemp - minTemp)) * (chartHeight - padding.top - padding.bottom);
  const getPrecipY = (chance: number) => chartHeight - padding.bottom - (chance / 100) * (chartHeight - padding.top - padding.bottom);
  
  const highTempPath = forecast.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getTempY(d.highTemp)}`).join(' ');
  const lowTempPath = forecast.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getTempY(d.lowTemp)}`).join(' ');

  const tempTicks = Array.from({ length: 5 }, (_, i) => minTemp + i * (maxTemp - minTemp) / 4);

  return (
    <div className="w-full bg-background/80 p-4 rounded-lg border border-gray-200/50">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto" aria-labelledby="chart-title" role="img">
        <title id="chart-title">{t.weatherChartTitle}</title>
        
        {/* Y-axis (Temperature) */}
        <g className="text-gray-500 text-xs">
          {tempTicks.map(temp => (
            <g key={temp}>
              <line x1={padding.left} x2={chartWidth - padding.right} y1={getTempY(temp)} y2={getTempY(temp)} className="stroke-gray-200" strokeWidth="1" />
              <text x={padding.left - 8} y={getTempY(temp) + 3} textAnchor="end">{Math.round(temp)}°C</text>
            </g>
          ))}
          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={chartHeight - padding.bottom} className="stroke-gray-300" strokeWidth="1" />
        </g>

        {/* X-axis (Days) */}
        <g className="text-text-secondary text-xs font-medium">
          {forecast.map((d, i) => (
            <text key={i} x={getX(i)} y={chartHeight - padding.bottom + 20} textAnchor="middle">{d.day.substring(0, 3)}</text>
          ))}
        </g>

        {/* Precipitation Bars */}
        <g>
          {forecast.map((d, i) => (
            <rect 
              key={i} 
              x={getX(i) - 10} 
              y={getPrecipY(d.precipitationChance)} 
              width="20" 
              height={chartHeight - padding.bottom - getPrecipY(d.precipitationChance)} 
              className="fill-accent-blue/30" 
              rx="2"
            >
              <title>{t.weatherChartTooltip.replace('{day}', d.day).replace('{chance}', d.precipitationChance.toString())}</title>
            </rect>
          ))}
        </g>

        {/* Temperature Lines */}
        <path d={highTempPath} className="stroke-risk-high" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d={lowTempPath} className="stroke-accent-blue" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Temperature Data Points */}
        {forecast.map((d, i) => (
          <g key={`points-${i}`}>
            <circle cx={getX(i)} cy={getTempY(d.highTemp)} r="3" className="fill-risk-high" />
            <text x={getX(i)} y={getTempY(d.highTemp) - 8} className="text-xs fill-risk-high font-semibold" textAnchor="middle">{d.highTemp}°</text>
            
            <circle cx={getX(i)} cy={getTempY(d.lowTemp)} r="3" className="fill-accent-blue" />
            <text x={getX(i)} y={getTempY(d.lowTemp) + 16} className="text-xs fill-accent-blue font-semibold" textAnchor="middle">{d.lowTemp}°</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default WeatherChart;
