
import { useNavigate } from 'react-router-dom';
import { Camera, Sprout, History, BookOpen, Shield, Leaf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { cn } from '@/lib/utils';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const actions = [
    {
      icon: Camera,
      title: t.detectPest,
      description: 'AI-powered detection',
      path: '/crops',
      color: 'bg-primary',
      iconColor: 'text-primary-foreground',
    },
    {
      icon: Sprout,
      title: t.selectCrop,
      description: 'Choose your crop',
      path: '/crops',
      color: 'bg-secondary',
      iconColor: 'text-secondary-foreground',
    },
    {
      icon: History,
      title: t.detectionHistory,
      description: 'View past scans',
      path: '/history',
      color: 'bg-accent',
      iconColor: 'text-accent-foreground',
    },
    {
      icon: BookOpen,
      title: t.pestKnowledge,
      description: 'Learn about pests',
      path: '/knowledge',
      color: 'bg-muted',
      iconColor: 'text-foreground',
    },
  ];

  return (
    <MobileLayout>
      <div className="px-5 py-6">
        {/* Welcome header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">CropGuard</h1>
              <p className="text-sm text-muted-foreground">Pest Detection</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {t.welcomeMessage}
          </p>
        </div>

        {/* Quick action cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {actions.map((action, index) => (
            <Card
              key={action.path + index}
              className={cn(
                "cursor-pointer hover:shadow-floating transition-all duration-300 active:scale-[0.98] animate-slide-up overflow-hidden",
                index === 0 && "col-span-2"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(action.path)}
            >
              <CardContent className={cn(
                "p-5",
                index === 0 && "flex items-center gap-4"
              )}>
                <div className={cn(
                  "rounded-xl flex items-center justify-center mb-3",
                  action.color,
                  index === 0 ? "w-16 h-16 mb-0" : "w-12 h-12"
                )}>
                  <action.icon className={cn(
                    action.iconColor,
                    index === 0 ? "w-8 h-8" : "w-6 h-6"
                  )} />
                </div>
                <div className={index === 0 ? "flex-1" : ""}>
                  <h3 className={cn(
                    "font-bold text-foreground",
                    index === 0 ? "text-xl mb-1" : "text-base mb-0.5"
                  )}>
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips section */}
        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Quick Tip</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For best results, capture a close-up image of the affected leaf in good lighting conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
