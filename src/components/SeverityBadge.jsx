
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function SeverityBadge({ severity, size = 'md' }) {
  const { t } = useLanguage();

  const labels = {
    low: t.low,
    medium: t.medium,
    high: t.high,
  };

  const styles = {
    low: 'bg-success/10 text-success border-success/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    high: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-semibold border',
      styles[severity],
      sizes[size]
    )}>
      {labels[severity]}
    </span>
  );
}
