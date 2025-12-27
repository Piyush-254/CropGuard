
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, Globe, Ruler, MapPin, Info, ChevronRight, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export default function Settings() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  ];

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <MobileLayout>
      <div className="px-5 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <SettingsIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t.settings}</h1>
            <p className="text-sm text-muted-foreground">Customize your experience</p>
          </div>
        </div>

        {/* Language section */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            {t.changeLanguage}
          </h2>
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              {languages.map((lang, index) => (
                <button
                  key={lang.code}
                  className={cn(
                    "w-full flex items-center justify-between p-4 transition-colors",
                    language === lang.code && "bg-primary/5"
                  )}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div className="text-left">
                      <p className="font-medium text-foreground">{lang.nativeName}</p>
                      {lang.code !== 'en' && (
                        <p className="text-sm text-muted-foreground">{lang.name}</p>
                      )}
                    </div>
                  </div>
                  {language === lang.code && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Other settings */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Preferences
          </h2>
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              <button className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-muted-foreground" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">{t.unitPreferences}</p>
                    <p className="text-sm text-muted-foreground">Metric (ml/L, kg/ha)</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">{t.regionSelection}</p>
                    <p className="text-sm text-muted-foreground">India</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* About */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            {t.about}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Info className="w-5 h-5 text-muted-foreground" />
                <p className="font-medium text-foreground">CropGuard v1.0</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-powered pest detection app designed to help farmers protect their crops. 
                Supports multiple Indian languages for better accessibility.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
}
