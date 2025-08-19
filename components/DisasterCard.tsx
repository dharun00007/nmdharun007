import React from 'react';
import { DisasterRisk } from '../types';
import { SunIcon } from './icons/SunIcon';
import { CloudRainIcon } from './icons/CloudRainIcon';
import { BugIcon } from './icons/BugIcon';
import { CloudHailIcon } from './icons/CloudHailIcon';
import { SnowflakeIcon } from './icons/SnowflakeIcon';
import { WindIcon } from './icons/WindIcon';
import { FireIcon } from './icons/FireIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';

interface DisasterCardProps {
  risk: DisasterRisk;
}

const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  drought: SunIcon,
  flood: CloudRainIcon,
  pest: BugIcon,
  hail: CloudHailIcon,
  frost: SnowflakeIcon,
  wind: WindIcon,
  fire: FireIcon,
  default: AlertTriangleIcon,
};

const getProbabilityColor = (probability: number) => {
  if (probability < 33) return 'text-risk-low';
  if (probability < 66) return 'text-risk-medium';
  return 'text-risk-high';
};

const getHoverShadow = (probability: number) => {
    if (probability < 33) return 'hover:shadow-[0_0_20px_rgba(22,163,74,0.3)]';
    if (probability < 66) return 'hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]';
    return 'hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]';
}

const DisasterCard: React.FC<DisasterCardProps> = ({ risk }) => {
  const IconComponent = iconMap[risk.iconName] || iconMap.default;
  const probabilityColor = getProbabilityColor(risk.probability);
  const hoverShadow = getHoverShadow(risk.probability);

  return (
    <div className={`bg-background/80 p-5 rounded-xl border border-gray-200/50 transition-all duration-300 transform hover:-translate-y-1 ${hoverShadow}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <IconComponent className="h-6 w-6 text-primary" />
          <h4 className="font-bold text-lg text-text-primary">{risk.disaster}</h4>
        </div>
        <span className={`text-2xl font-bold ${probabilityColor}`}>{risk.probability}%</span>
      </div>
      <p className="text-text-secondary text-sm">{risk.description}</p>
    </div>
  );
};

export default DisasterCard;