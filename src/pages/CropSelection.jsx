import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { crops } from '@/data/crops';
import { cn } from '@/lib/utils';

export default function CropSelection() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { setSelectedCrop } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCrops = crops.filter(crop => {
    const cropName = t[crop.nameKey];
    return cropName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop);
    navigate('/detect');
  };

  const categories = [
    { key: 'grain', label: 'Grains' },
    { key: 'vegetable', label: 'Vegetables' },
    { key: 'cash', label: 'Cash Crops' },
  ];

  return (
    <MobileLayout showBack title={t.selectYourCrop}>
      <div className="px-5 py-4">
        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t.searchCrops}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl bg-card border-border text-base"
          />
        </div>

        {/* Crop categories */}
        {searchQuery === '' ? (
          categories.map((category, catIndex) => {
            const categoryCrops = crops.filter(c => c.category === category.key);
            if (categoryCrops.length === 0) return null;

            return (
              <div key={category.key} className="mb-6">
                <h2 className="text-lg font-bold text-foreground mb-3 px-1">
                  {category.label}
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {categoryCrops.map((crop, index) => (
                    <Card
                      key={crop.id}
                      className="cursor-pointer hover:shadow-floating transition-all duration-200 active:scale-[0.95] animate-scale-in"
                      style={{ animationDelay: `${(catIndex * 3 + index) * 0.05}s` }}
                      onClick={() => handleCropSelect(crop)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-4xl mb-2">{crop.image}</div>
                        <p className="text-sm font-semibold text-foreground line-clamp-1">
                          {t[crop.nameKey]}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {filteredCrops.map((crop, index) => (
              <Card
                key={crop.id}
                className="cursor-pointer hover:shadow-floating transition-all duration-200 active:scale-[0.95] animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleCropSelect(crop)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-2">{crop.image}</div>
                  <p className="text-sm font-semibold text-foreground line-clamp-1">
                    {t[crop.nameKey]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No crops found</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
