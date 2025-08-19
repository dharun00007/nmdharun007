

import React, { useState } from 'react';
import type { FertilizerSuggestion } from '../types';
import type { TranslationKeys } from '../translations';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import ImageWithFallback from './ImageWithFallback';
import { SoilIcon } from './icons/SoilIcon';

interface FertilizerSuggestionsProps {
  suggestions: FertilizerSuggestion[];
  t: TranslationKeys;
}

const FertilizerAccordion: React.FC<{ suggestion: FertilizerSuggestion, t: TranslationKeys }> = ({ suggestion, t }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200/50 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 px-2 hover:bg-black/5 focus:outline-none focus-visible:ring focus-visible:ring-secondary focus-visible:ring-opacity-75 rounded-t-lg transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-primary">{suggestion.fertilizerType}</span>
        <ChevronDownIcon className={`h-6 w-6 text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <div className="p-4 space-y-6 bg-background/80">
          <div className="h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <ImageWithFallback
                  src={suggestion.imageUrl}
                  alt={suggestion.fertilizerType}
                  className="w-full h-full object-cover"
                  fallback={<SoilIcon className="h-20 w-20 text-gray-300" />}
              />
          </div>
          <div>
            <h4 className="font-semibold text-text-secondary mb-1">{t.description}</h4>
            <p className="text-text-primary">{suggestion.description}</p>
          </div>
          <div>
            <h4 className="font-semibold text-text-secondary mb-1">{t.applicationNotes}</h4>
            <p className="text-text-primary">{suggestion.applicationNotes}</p>
          </div>

          {suggestion.onlineOptions?.length > 0 && (
            <div>
              <h4 className="font-semibold text-text-secondary mb-2">{t.onlineRetailers}</h4>
              <ul className="space-y-2">
                {suggestion.onlineOptions.map((option, index) => (
                  <li key={index} className="flex items-center justify-between p-3 bg-background rounded-md">
                    <div>
                      <p className="font-medium text-text-primary">{option.storeName}</p>
                      <p className="text-sm text-text-secondary">{option.price}</p>
                    </div>
                    <a
                      href={option.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-primary bg-secondary rounded-md hover:bg-secondary/90 transition-colors"
                    >
                      <ShoppingCartIcon className="h-4 w-4" />
                      {t.buyNow}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {suggestion.localShops?.length > 0 && (
             <div>
              <h4 className="font-semibold text-text-secondary mb-2">{t.localSuppliers}</h4>
              <ul className="space-y-3">
                {suggestion.localShops.map((shop, index) => (
                  <li key={index} className="p-3 border border-gray-200/50 rounded-md">
                    <p className="font-medium text-text-primary">{shop.shopName}</p>
                    <a
                      href={`https://www.google.com/maps?q=${shop.latitude},${shop.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-text-secondary hover:text-secondary group"
                    >
                      <MapPinIcon className="h-4 w-4 text-gray-400 group-hover:text-secondary" />
                      <span>{shop.address}</span>
                    </a>
                    <p className="text-sm text-text-secondary mt-1 pl-6">{shop.phone}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const FertilizerSuggestions: React.FC<FertilizerSuggestionsProps> = ({ suggestions, t }) => {
  if (!suggestions || suggestions.length === 0) {
    return <p className="text-text-secondary">No fertilizer suggestions available.</p>;
  }

  return (
    <div className="bg-background/50 rounded-lg border border-gray-200/50 overflow-hidden">
      {suggestions.map((suggestion, index) => (
        <FertilizerAccordion key={index} suggestion={suggestion} t={t} />
      ))}
    </div>
  );
};

export default FertilizerSuggestions;