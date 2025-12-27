
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Camera, History, BookOpen, Settings, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function MobileLayout({ children, showBack = false, title, showNav = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/detect', icon: Camera, label: t.detectPest },
    { path: '/history', icon: History, label: t.detectionHistory },
    { path: '/knowledge', icon: BookOpen, label: t.pestKnowledge },
    { path: '/settings', icon: Settings, label: t.settings },
  ];

  return (
    <div className="min-h-screen nature-bg flex flex-col">
      {/* Header */}
      {(showBack || title) && (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            {showBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            {title && (
              <h1 className="text-lg font-bold text-foreground truncate">{title}</h1>
            )}
          </div>
        </header>
      )}

      {/* Main content */}
      <main className={cn(
        "flex-1 overflow-y-auto",
        showNav && "pb-20"
      )}>
        {children}
      </main>

      {/* Bottom navigation */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border">
          <div className="flex items-center justify-around py-2">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    isActive && "scale-110"
                  )} />
                  <span className="text-[10px] font-medium">{label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
