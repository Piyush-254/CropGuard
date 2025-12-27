
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, Calendar, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SeverityBadge } from '@/components/SeverityBadge';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { pests } from '@/data/pests';
import { crops } from '@/data/crops';
import { format } from 'date-fns';

export default function History() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { detections, setCurrentDetection } = useApp();

  const handleDetectionClick = (detection) => {
    setCurrentDetection(detection);
    navigate('/result');
  };

  return (
    <MobileLayout>
      <div className="px-5 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <HistoryIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t.previousDetections}</h1>
            <p className="text-sm text-muted-foreground">{detections.length} scans</p>
          </div>
        </div>

        {detections.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <HistoryIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{t.noDetections}</h3>
            <p className="text-muted-foreground max-w-xs mx-auto">
              Start scanning your crops to see detection history here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {detections.map((detection, index) => {
              const pest = pests.find(p => p.id === detection.pestId);
              const crop = crops.find(c => c.id === detection.cropId);

              return (
                <Card
                  key={detection.id}
                  className="cursor-pointer hover:shadow-floating transition-all duration-200 active:scale-[0.98] animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => handleDetectionClick(detection)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Pest icon */}
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl shrink-0">
                        {pest?.image || '🐛'}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-foreground truncate">
                            {pest?.name[language] || 'Unknown Pest'}
                          </h3>
                          <SeverityBadge severity={detection.severity} size="sm" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{crop?.image}</span>
                          <span>{crop ? t[crop.nameKey] : 'Unknown'}</span>
                          <span>•</span>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{format(new Date(detection.date), 'dd MMM yyyy')}</span>
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
