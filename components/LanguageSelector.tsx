
import React, { useState, useEffect, useRef } from 'react';
import { GlobeIcon } from './icons/GlobeIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
}

const languages = [
  'English',
  'Tamil',
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onSelectLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (lang: string) => {
    onSelectLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300/50 shadow-sm px-4 py-2 bg-surface/60 text-sm font-medium text-text-primary hover:bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <GlobeIcon className="mr-2 h-5 w-5 text-text-secondary" />
          {selectedLanguage}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-surface ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-slide-fade-in"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1 max-h-60 overflow-y-auto" role="none">
            {languages.map(lang => (
              <a
                key={lang}
                href="#"
                className={`text-text-primary block px-4 py-2 text-sm hover:bg-gray-100 ${selectedLanguage === lang ? 'font-bold bg-secondary/20' : ''}`}
                role="menuitem"
                onClick={(e) => {
                    e.preventDefault();
                    handleSelect(lang);
                }}
              >
                {lang}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
