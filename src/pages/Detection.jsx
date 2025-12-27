import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Loader2, Focus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { pests } from '@/data/pests';
import { cn } from '@/lib/utils';

export default function Detection() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { selectedCrop, addDetection, setCurrentDetection } = useApp();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleCapture = () => {
    simulateDetection();
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
        simulateDetection();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateDetection = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const relevantPests = selectedCrop
        ? pests.filter(p => p.affectedCrops.includes(selectedCrop.id))
        : pests;
      
      const randomPest = relevantPests[Math.floor(Math.random() * relevantPests.length)] || pests[0];
      const severities = ['low', 'medium', 'high'];
      const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
      const confidence = 75 + Math.floor(Math.random() * 20);

      const detection = {
        id: Date.now().toString(),
        date: new Date(),
        cropId: selectedCrop?.id || 'unknown',
        pestId: randomPest.id,
        severity: randomSeverity,
        confidence,
        imageUrl: capturedImage || undefined,
      };

      addDetection(detection);
      setCurrentDetection(detection);
      setIsAnalyzing(false);
      navigate('/result');
    }, 2500);
  };

  const clearImage = () => {
    setCapturedImage(null);
  };

  return (
    <MobileLayout showBack title={t.detectPest} showNav={false}>
      <div className="flex flex-col h-full">
        {/* Camera view area */}
        <div className="flex-1 relative bg-foreground/5 m-4 rounded-3xl overflow-hidden">
          {capturedImage ? (
            <div className="relative h-full">
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-full object-cover"
              />
              <button
                onClick={clearImage}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground/80 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-background" />
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              {/* Camera frame overlay */}
              <div className="relative w-64 h-64 mb-6">
                <div className="absolute inset-0 border-2 border-dashed border-primary/50 rounded-3xl" />
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Focus className="w-16 h-16 text-primary/30" />
                </div>
              </div>
              <p className="text-muted-foreground max-w-xs">
                {t.cameraInstruction}
              </p>
              {selectedCrop && (
                <div className="mt-4 px-4 py-2 bg-primary/10 rounded-full">
                  <span className="text-sm font-medium text-primary">
                    {selectedCrop.image} {t[selectedCrop.nameKey]}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Analyzing overlay */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
              <p className="text-lg font-semibold text-foreground">{t.analyzing}</p>
              <p className="text-sm text-muted-foreground mt-1">Please wait...</p>
            </div>
          )}
        </div>

        {/* Control buttons */}
        <div className="flex-shrink-0 p-6 bg-background/80 backdrop-blur-lg border-t border-border">
          <div className="flex items-center justify-center gap-6">
            <Button
              variant="outline"
              size="lg"
              className="rounded-2xl h-14 px-6"
              onClick={handleUpload}
              disabled={isAnalyzing}
            >
              <Upload className="w-5 h-5 mr-2" />
              {t.uploadFromGallery}
            </Button>
            <Button
              variant="capture"
              onClick={handleCapture}
              disabled={isAnalyzing}
            >
              <Camera className="w-8 h-8" />
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </MobileLayout>
  );
}
