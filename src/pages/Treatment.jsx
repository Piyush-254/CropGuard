
import { useParams, useNavigate } from 'react-router-dom';
import { Leaf, FlaskConical, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { pests } from '@/data/pests';
import { cn } from '@/lib/utils';

export default function Treatment() {
  const { pestId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const pest = pests.find(p => p.id === pestId);

  if (!pest) {
    navigate('/home');
    return null;
  }

  return (
    <MobileLayout showBack title={pest.name[language]} showNav={false}>
      <div className="px-5 py-4">
        {/* Pest header */}
        <div className="text-center mb-6 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-4xl mb-3">
            {pest.image}
          </div>
          <h2 className="text-xl font-bold text-foreground">{pest.name[language]}</h2>
          <p className="text-sm text-muted-foreground italic">{pest.scientificName}</p>
        </div>

        {/* Description */}
        <Card className="mb-6 animate-slide-up">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" />
              {t.pestDescription}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {pest.description[language]}
            </p>
          </CardContent>
        </Card>

        {/* Treatment tabs */}
        <Tabs defaultValue="organic" className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <TabsList className="grid w-full grid-cols-3 h-12 mb-4">
            <TabsTrigger value="organic" className="text-xs">
              🌿 {t.organicTreatment.split(' ')[0]}
            </TabsTrigger>
            <TabsTrigger value="chemical" className="text-xs">
              🧪 {t.chemicalTreatment.split(' ')[0]}
            </TabsTrigger>
            <TabsTrigger value="prevention" className="text-xs">
              🛡️ {t.preventiveMeasures.split(' ')[0]}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="organic">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-success">
                  <Leaf className="w-5 h-5" />
                  {t.organicTreatment}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pest.organicTreatment[language].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-3 bg-success/5 rounded-xl animate-scale-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <span className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center text-success text-sm font-bold shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-sm text-foreground leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chemical">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-secondary">
                  <FlaskConical className="w-5 h-5" />
                  {t.chemicalTreatment}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pest.chemicalTreatment[language].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-3 bg-secondary/5 rounded-xl animate-scale-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <span className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-sm font-bold shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-sm text-foreground leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 p-3 bg-muted rounded-xl">
                  ⚠️ Always follow safety guidelines when applying chemical treatments. Wear protective equipment.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prevention">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-primary">
                  <Shield className="w-5 h-5" />
                  {t.preventiveMeasures}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pest.prevention[language].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-3 bg-primary/5 rounded-xl animate-scale-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-sm text-foreground leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}
