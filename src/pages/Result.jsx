import { useNavigate } from 'react-router-dom';
import { AlertTriangle, AlertCircle, ArrowRight, Leaf, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SeverityBadge } from '@/components/SeverityBadge';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { pests } from '@/data/pests';
import { crops } from '@/data/crops';
import { cn } from '@/lib/utils';

export default function Result() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { currentDetection } = useApp();

  if (!currentDetection) {
    navigate('/home');
    return null;
  }

  const pest = pests.find(p => p.id === currentDetection.pestId);
  const crop = crops.find(c => c.id === currentDetection.cropId);

  if (!pest) {
    navigate('/home');
    return null;
  }

  const severityIcon = {
    low: CheckCircle2,
    medium: AlertTriangle,
    high: AlertCircle,
  };

  const SeverityIcon = severityIcon[currentDetection.severity];

  const severityColors = {
    low: 'text-success',
    medium: 'text-warning',
    high: 'text-destructive',
  };

  return (
    <MobileLayout showBack title={t.pestIdentified} showNav={false}>
      <div className="px-5 py-4 pb-32">
        {/* Success indicator */}
        <div className="text-center mb-6 animate-scale-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Target className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            {pest.name[language]}
          </h2>
          <p className="text-sm text-muted-foreground italic">
            {pest.scientificName}
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">{t.confidence}</p>
              <p className="text-3xl font-bold text-primary">{currentDetection.confidence}%</p>
            </CardContent>
          </Card>
          <Card className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">{t.severity}</p>
              <div className="flex items-center justify-center gap-2">
                <SeverityIcon className={cn("w-6 h-6", severityColors[currentDetection.severity])} />
                <SeverityBadge severity={currentDetection.severity} size="lg" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Affected crop */}
        {crop && (
          <Card className="mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">{t.affectedParts}</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{crop.image}</span>
                <div>
                  <p className="font-semibold text-foreground">
                    {t[crop.nameKey]}
                  </p>
                  <p className="text-sm text-muted-foreground">Leaves, Stem</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Description */}
        <Card className="mb-6 animate-slide-up" style={{ animationDelay: '0.25s' }}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">About this pest</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pest.description[language]}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended action preview */}
        <Card className="bg-primary/5 border-primary/20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-4">
            <p className="text-sm font-semibold text-primary mb-2">{t.recommendedAction}</p>
            <ul className="space-y-2">
              {pest.organicTreatment[language].slice(0, 2).map((treatment, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-primary mt-0.5">•</span>
                  {treatment}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Bottom action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/95 backdrop-blur-lg border-t border-border">
        <Button
          variant="action"
          size="xl"
          className="w-full"
          onClick={() => navigate(`/treatment/${pest.id}`)}
        >
          {t.viewTreatment}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </MobileLayout>
  );
}
