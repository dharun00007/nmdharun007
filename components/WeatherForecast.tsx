

import React, { useState } from 'react';
import { DailyForecast, WeatherIcon } from '../types';
import type { TranslationKeys } from '../translations';
import { SunIcon } from './icons/SunIcon';
import { PartlyCloudyIcon } from './icons/PartlyCloudyIcon';
import { CloudyIcon } from './icons/CloudyIcon';
import { CloudRainIcon } from './icons/CloudRainIcon';
import { ThunderstormIcon } from './icons/ThunderstormIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';

interface WeatherForecastProps {
  forecast: DailyForecast[];
  t: TranslationKeys;
}

const iconMap: Record<WeatherIcon, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'sunny': SunIcon,
  'partly-cloudy': PartlyCloudyIcon,
  'cloudy': CloudyIcon,
  'rain': CloudRainIcon,
  'thunderstorm': ThunderstormIcon,
  'default': AlertTriangleIcon,
};

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, t }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  const handleDayClick = (index: number) => {
    setSelectedDayIndex(index);
  };

  return (
    <div className="relative">
      <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4">
        {forecast.map((day, index) => {
          const IconComponent = iconMap[day.iconName] || iconMap.default;
          const isSelected = selectedDayIndex === index;
          return (
            <div
              key={index}
              onClick={() => handleDayClick(index)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleDayClick(index)}
              className={`flex-shrink-0 w-32 text-center bg-background/80 border rounded-lg p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${isSelected ? 'border-transparent ring-2 ring-secondary' : 'border-gray-200/50'}`}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={t.weatherForecastAriaLabel.replace('{day}', day.day)}
            >
              <p className="font-bold text-primary">{day.day}</p>
              <p className="text-sm text-text-secondary mb-2 truncate" title={day.weather}>{day.weather}</p>
              <IconComponent className="h-10 w-10 mx-auto text-yellow-500 mb-2" />
              <div className="font-semibold text-text-primary">
                <span className="text-risk-high">{day.highTemp}°</span>
                <span className="text-text-secondary"> / </span>
                <span className="text-accent-blue">{day.lowTemp}°</span>
              </div>
              <p className="text-sm text-accent-blue mt-1">{day.precipitationChance}% {t.rain}</p>
            </div>
          );
        })}
      </div>

      {selectedDayIndex !== null && (
        <div className="mt-8 animate-slide-fade-in">
          <div className="bg-surface/80 rounded-lg shadow-lg border border-gray-200/50 p-6">
            <h4 className="text-lg font-bold text-primary mb-4">
              {t.detailedView} {forecast[selectedDayIndex].day}
            </h4>
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              {(() => {
                const day = forecast[selectedDayIndex];
                const IconComponent = iconMap[day.iconName] || iconMap.default;
                return (
                  <>
                    <IconComponent className="h-20 w-20 text-yellow-500 flex-shrink-0" />
                    <div>
                      <p className="text-2xl font-bold text-text-primary">{day.weather}</p>
                      <div className="flex justify-center sm:justify-start items-baseline gap-4 mt-2">
                        <p className="text-xl">
                          <span className="font-semibold text-risk-high">{day.highTemp}°C</span>
                          <span className="text-text-secondary"> {t.high}</span>
                        </p>
                        <p className="text-xl">
                          <span className="font-semibold text-accent-blue">{day.lowTemp}°C</span>
                          <span className="text-text-secondary"> {t.low}</span>
                        </p>
                      </div>
                      <p className="text-xl mt-2">
                        <span className="font-semibold text-accent-blue">{day.precipitationChance}%</span>
                        <span className="text-text-secondary"> {t.chanceOfRain}</span>
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
