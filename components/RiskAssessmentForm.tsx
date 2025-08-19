

import React, { useState, useEffect } from 'react';
import { getFarmingSuggestions } from '../services/geminiService';
import type { FarmingSuggestions } from '../types';
import type { TranslationKeys } from '../translations';
import { SparklesIcon } from './icons/SparklesIcon';
import { XIcon } from './icons/XIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { LeafIcon } from './icons/LeafIcon';
import ImageWithFallback from './ImageWithFallback';

interface RiskAssessmentFormProps {
  onSubmit: (location: string, crop: string) => void;
  isLoading: boolean;
  t: TranslationKeys;
  language: string;
}

const RiskAssessmentForm: React.FC<RiskAssessmentFormProps> = ({ onSubmit, isLoading, t, language }) => {
  const [location, setLocation] = useState<string>('');
  const [crop, setCrop] = useState<string>('');
  const [suggestions, setSuggestions] = useState<FarmingSuggestions | null>(null);
  const [isSuggesting, setIsSuggesting] = useState<boolean>(false);
  const [suggestionError, setSuggestionError] = useState<string | null>(null);
  const [suggestionLoadingMessage, setSuggestionLoadingMessage] = useState('');

  useEffect(() => {
    setSuggestions(null);
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim() && crop.trim()) {
      onSubmit(location, crop);
    }
  };

  const handleSuggest = async () => {
      if (!location.trim()) return;
      setIsSuggesting(true);
      setSuggestionError(null);
      setSuggestions(null);
      setSuggestionLoadingMessage(t.findingSuggestions.replace('{location}', location));
      try {
          const result = await getFarmingSuggestions(location, language);
          setSuggestions(result);
      } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
          setSuggestionError(errorMessage);
      } finally {
          setIsSuggesting(false);
          setSuggestionLoadingMessage('');
      }
  };

  const handleSelectSuggestion = (cropName: string) => {
      setCrop(cropName);
      setSuggestions(null); // Hide suggestions after selection
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-text-secondary mb-1">
            {t.locationLabel}
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={t.locationPlaceholder}
            className="block w-full px-4 py-2 text-text-primary placeholder-gray-500 bg-surface/50 border border-gray-300/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent sm:text-sm transition-colors"
            required
            disabled={isLoading}
          />
        </div>
        <div>
           <div className="flex justify-between items-center mb-1">
            <label htmlFor="crop" className="block text-sm font-medium text-text-secondary">
              {t.cropTypeLabel}
            </label>
            <button
                type="button"
                onClick={handleSuggest}
                disabled={!location.trim() || isSuggesting || isLoading}
                className="flex items-center gap-1 text-xs font-semibold text-secondary hover:text-secondary/80 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
                <SparklesIcon className="h-4 w-4" />
                {isSuggesting ? t.suggestingCropsButton : t.suggestCropsButton}
            </button>
          </div>
          <input
            type="text"
            id="crop"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            placeholder={t.cropPlaceholder}
            className="block w-full px-4 py-2 text-text-primary placeholder-gray-500 bg-surface/50 border border-gray-300/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent sm:text-sm transition-colors"
            required
            disabled={isLoading}
          />
        </div>
      </div>
      
      {isSuggesting && (
         <div className="text-center py-4" aria-live="polite">
            <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
            </div>
            <p className="mt-2 text-sm text-primary font-medium">{suggestionLoadingMessage}</p>
        </div>
      )}

      {suggestionError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert" aria-live="assertive">
            <strong className="font-bold">{t.errorTitle}</strong>
            <span className="block sm:inline ml-2">{suggestionError}</span>
        </div>
      )}

      {suggestions && (
          <div className="pt-6 border-t border-gray-200/50 animate-slide-fade-in space-y-8">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-primary">{t.suggestionsFor.replace('{location}', location)}</h3>
                <button 
                    onClick={() => setSuggestions(null)} 
                    className="p-1 rounded-full hover:bg-gray-200/50"
                    aria-label={t.closeSuggestions}
                >
                    <XIcon className="h-5 w-5 text-text-secondary"/>
                </button>
             </div>

            {/* Profitable Crops */}
            <div>
                <h4 className="text-lg font-semibold text-primary mb-4">{t.profitableCrops}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {suggestions.profitableCrops.map(crop => (
                        <div key={crop.cropName} className="bg-surface/60 rounded-lg border border-gray-200/50 flex flex-col overflow-hidden shadow-md transition-transform hover:scale-105 duration-300">
                            <div className="h-40 bg-gray-200">
                                <ImageWithFallback
                                    src={crop.imageUrl}
                                    alt={crop.cropName}
                                    className="w-full h-full object-cover"
                                    fallback={<LeafIcon className="h-16 w-16 text-gray-300" />}
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h5 className="font-bold text-text-primary">{crop.cropName}</h5>
                                <p className="text-xs font-semibold text-secondary mb-2">{t.yieldLabel} {crop.yieldStartDate} - {crop.yieldEndDate} ({crop.seasonDescription})</p>
                                <p className="text-sm text-text-secondary mb-4 flex-grow">{crop.reasoning}</p>
                                <button
                                    type="button"
                                    onClick={() => handleSelectSuggestion(crop.cropName)}
                                    className="w-full mt-auto text-sm font-bold text-primary bg-secondary/20 hover:bg-secondary/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary rounded-md py-2 transition-colors"
                                >
                                    {t.selectThisCrop}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Farmer Advice */}
            {suggestions.farmerAdvice?.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <LightbulbIcon className="h-6 w-6 text-secondary" />
                        <h4 className="text-lg font-semibold text-primary">{t.generalAdvice}</h4>
                    </div>
                     <ul className="space-y-3 pl-2">
                        {suggestions.farmerAdvice.map((advice, index) => (
                            <li key={index} className="flex items-start gap-3">
                            <CheckCircleIcon className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                            <span className="text-text-primary">{advice}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
          </div>
      )}


      <div>
        <button
          type="submit"
          disabled={isLoading || !location.trim() || !crop.trim()}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-primary bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed transition-all duration-200 transform active:scale-[0.98]"
        >
          {isLoading ? t.assessingRiskButton : t.assessRiskButton}
        </button>
      </div>
    </form>
  );
};

export default RiskAssessmentForm;