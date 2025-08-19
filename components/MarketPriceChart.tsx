

import React from 'react';
import { MarketPriceDataPoint } from '../types';
import type { TranslationKeys } from '../translations';

interface MarketPriceChartProps {
  history: MarketPriceDataPoint[];
  currency: string;
  t: TranslationKeys;
}

const MarketPriceChart: React.FC<MarketPriceChartProps> = ({ history, currency, t }) => {
  if (!history || history.length === 0) {
    return <p className="text-text-secondary">{t.marketChartNotAvailable}</p>;
  }

  const chartWidth = 500;
  const chartHeight = 250;
  const padding = { top: 40, right: 20, bottom: 40, left: 50 };

  const prices = history.map(d => d.price);
  const minPrice = Math.min(...prices) * 0.95;
  const maxPrice = Math.max(...prices) * 1.05;
  
  const getX = (index: number) => padding.left + index * (chartWidth - padding.left - padding.right) / (history.length - 1);
  const getY = (price: number) => chartHeight - padding.bottom - ((price - minPrice) / (maxPrice - minPrice)) * (chartHeight - padding.top - padding.bottom);

  const pathData = history.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.price)}`).join(' ');

  const priceTicks = Array.from({ length: 5 }, (_, i) => minPrice + i * (maxPrice - minPrice) / 4);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  }
  
  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString('default', { month: 'short' });
  };

  return (
    <div className="w-full bg-background/80 p-4 rounded-lg border border-gray-200/50">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto" aria-labelledby="chart-title" role="img">
        <title id="chart-title">{t.marketChartTitle}</title>
        
        {/* Y-axis (Price) */}
        <g className="text-gray-500 text-xs">
          {priceTicks.map(price => (
            <g key={price}>
              <line x1={padding.left} x2={chartWidth - padding.right} y1={getY(price)} y2={getY(price)} className="stroke-gray-200" strokeWidth="1" />
              <text x={padding.left - 8} y={getY(price) + 3} textAnchor="end">{formatCurrency(price)}</text>
            </g>
          ))}
          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={chartHeight - padding.bottom} className="stroke-gray-300" strokeWidth="1" />
        </g>

        {/* X-axis (Date) */}
        <g className="text-text-secondary text-xs font-medium">
          {history.map((d, i) => {
             // Show label for every 2nd month to avoid clutter
            if (i % 2 === 0) {
              return <text key={i} x={getX(i)} y={chartHeight - padding.bottom + 20} textAnchor="middle">{formatDate(d.date)}</text>
            }
            return null;
          })}
        </g>

        {/* Price Line */}
        <path d={pathData} className="stroke-secondary" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Data Points */}
        {history.map((d, i) => (
          <g key={`point-${i}`}>
            <circle cx={getX(i)} cy={getY(d.price)} r="3" className="fill-secondary" >
                <title>{formatDate(d.date)} {d.date.split('-')[0]}: {formatCurrency(d.price)}</title>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default MarketPriceChart;