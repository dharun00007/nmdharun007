
import React from 'react';
import type { TranslationKeys } from '../translations';

interface GaugeProps {
  level: 'Low' | 'Medium' | 'High';
  t: TranslationKeys;
}

const gaugeConfig = {
  Low: {
    value: 33.3,
    colorClass: 'text-risk-low',
    gradientStop: 'var(--color-risk-low)'
  },
  Medium: {
    value: 66.6,
    colorClass: 'text-risk-medium',
    gradientStop: 'var(--color-risk-medium)'
  },
  High: {
    value: 100,
    colorClass: 'text-risk-high',
    gradientStop: 'var(--color-risk-high)'
  },
};

const Gauge: React.FC<GaugeProps> = ({ level, t }) => {
  const config = gaugeConfig[level];
  const radius = 38;
  const strokeWidth = 14;
  const circumference = Math.PI * radius;
  const offset = circumference - (config.value / 100) * circumference;

  // Define CSS variables for colors to use in gradient
  const style = {
    '--color-risk-low': '#16A34A',
    '--color-risk-medium': '#F59E0B',
    '--color-risk-high': '#DC2626'
  } as React.CSSProperties;

  return (
    <div className="relative w-52 h-26" role="meter" aria-valuenow={Math.round(config.value)} aria-valuemin={0} aria-valuemax={100} aria-valuetext={t.gaugeAriaLabel.replace('{level}', level)} style={style}>
      <svg
        viewBox="0 0 100 50"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-risk-low)" />
            <stop offset="50%" stopColor="var(--color-risk-medium)" />
            <stop offset="100%" stopColor="var(--color-risk-high)" />
          </linearGradient>
        </defs>
        
        {/* Background Arc */}
        <path
          d="M 10 45 A 40 40 0 0 1 90 45"
          strokeWidth={strokeWidth}
          fill="none"
          className="stroke-gray-200"
          strokeLinecap="round"
        />
        {/* Value Arc */}
        <path
          d="M 10 45 A 40 40 0 0 1 90 45"
          strokeWidth={strokeWidth}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
        <p className={`text-5xl font-bold ${config.colorClass}`}>{level}</p>
      </div>
    </div>
  );
};

export default Gauge;
