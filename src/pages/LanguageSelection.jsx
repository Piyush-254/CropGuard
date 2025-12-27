import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
];

export default function LanguageSelection() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(language);

  const handleContinue = () => {
    setLanguage(selectedLang);
    navigate('/home');
  };

  return (
    <div className="min-h-screen nature-bg flex flex-col">
      {/* Hero section */}
      <div className="flex-shrink-0 pt-12 pb-8 px-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-bounce-gentle">
          <Leaf className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in">
          {translations[selectedLang].chooseLanguage}
        </h1>
        <p className="text-muted-foreground animate-fade-in">
          Select your preferred language
        </p>
      </div>

      {/* Language options */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="space-y-3">
          {languages.map((lang, index) => (
            <Button
              key={lang.code}
              variant={selectedLang === lang.code ? 'languageActive' : 'language'}
              className={cn(
                "w-full h-auto py-4 px-5 animate-slide-up",
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedLang(lang.code)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-xl">{lang.nativeName}</span>
                  {lang.code !== 'en' && (
                    <span className="text-sm text-muted-foreground">{lang.name}</span>
                  )}
                </div>
                {selectedLang === lang.code && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Continue button */}
      <div className="flex-shrink-0 p-6 bg-background/80 backdrop-blur-lg border-t border-border">
        <Button
          variant="action"
          size="xl"
          className="w-full"
          onClick={handleContinue}
        >
          {translations[selectedLang].continue}
        </Button>
      </div>
    </div>
  );
}
