

import React, { useState, useEffect } from 'react';
import type { RiskAssessmentResponse } from './types';
import { getRiskAssessment, generateCropImage } from './services/geminiService';
import RiskAssessmentForm from './components/RiskAssessmentForm';
import Dashboard from './components/RiskResultDisplay';
import { LeafIcon } from './components/icons/LeafIcon';
import LanguageSelector from './components/LanguageSelector';
import { getTranslations } from './translations';

const backgroundImages = [
  'https://images.unsplash.com/photo-1416239946363-b88718536324?q=80&w=2070&auto=format&fit=crop', // Wheat field at sunset
  'https://images.unsplash.com/photo-1625246333195-78d9c38AD449?q=80&w=2070&auto=format&fit=crop', // High-tech greenhouse
  'https://images.unsplash.com/photo-1530863375354-051a3899882a?q=80&w=2070&auto=format&fit=crop', // Rice terraces
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop', // Farmer with crate of vegetables
  'https://images.unsplash.com/photo-1580992367831-9f79430c33c3?q=80&w=2070&auto=format&fit=crop', // Drone over a field
  'https://images.unsplash.com/photo-1589855239567-c25736e65893?q=80&w=2070&auto=format&fit=crop', // Olive grove
  'https://images.unsplash.com/photo-1559441221-82d33b563911?q=80&w=2070&auto=format&fit=crop', // Close-up of coffee beans
];

const App: React.FC = () => {
  const [assessment, setAssessment] = useState<RiskAssessmentResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [language, setLanguage] = useState<string>('English');

  const t = getTranslations(language);

  useEffect(() => {
    const preloadImages = () => {
      backgroundImages.forEach(src => {
        new Image().src = src;
      });
    };
    preloadImages();

    const intervalId = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSelectLanguage = (newLanguage: string) => {
    if (newLanguage !== language) {
      setLanguage(newLanguage);
      setAssessment(null);
      setCropImageUrl(null);
      setImageError(null);
    }
  };

  const handleAssessRisk = async (location: string, crop: string) => {
    setIsLoading(true);
    setError(null);
    setAssessment(null);
    setCropImageUrl(null);
    setImageError(null);

    try {
      setLoadingMessage(t.loadingRisks);
      const result = await getRiskAssessment(location, crop, language);
      setAssessment(result);

      setLoadingMessage(t.generatingImage);
      try {
        const base64Image = await generateCropImage(crop);
        setCropImageUrl(`data:image/jpeg;base64,${base64Image}`);
      } catch (imgErr) {
        const errorMessage = imgErr instanceof Error ? imgErr.message : 'An unknown error occurred while generating the image.';
        setImageError(errorMessage);
        console.error("Could not generate crop image, proceeding without it.", imgErr);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };


  return (
    <div className="relative min-h-screen w-full bg-background font-sans text-text-primary">
       <div className="absolute inset-0 overflow-hidden">
        {backgroundImages.map((src, index) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out"
            style={{
              backgroundImage: `url('${src}')`,
              opacity: currentBgIndex === index ? 0.15 : 0,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:py-16">
        <header className="text-center mb-10 animate-slide-fade-in relative">
          <div className="absolute top-0 right-0 z-20">
              <LanguageSelector selectedLanguage={language} onSelectLanguage={handleSelectLanguage} />
          </div>
          <div className="flex justify-center items-center gap-4 mb-4">
            <LeafIcon className="h-12 w-12 text-secondary" />
            <h1 className="text-4xl sm:text-6xl font-bold text-primary tracking-tight">
              {t.mainTitle}
            </h1>
          </div>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {t.mainSubtitle}
          </p>
        </header>

        <main>
          <div className="bg-surface/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-card border border-white/20">
            <RiskAssessmentForm 
              onSubmit={handleAssessRisk} 
              isLoading={isLoading} 
              t={t}
              language={language} 
            />
          </div>

          {isLoading && (
            <div className="mt-8 text-center" aria-live="polite">
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
              </div>
              <p className="mt-4 text-lg text-primary font-medium">{loadingMessage}</p>
            </div>
          )}

          {error && (
            <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert" aria-live="assertive">
              <strong className="font-bold">{t.errorTitle}</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          {assessment && !isLoading && (
            <div className="mt-12">
              <Dashboard 
                data={assessment}
                cropImageUrl={cropImageUrl}
                imageError={imageError}
                t={t}
              />
            </div>
          )}
        </main>
        
        <footer className="text-center mt-16 text-text-secondary text-sm">
            <p>{t.footerText}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;