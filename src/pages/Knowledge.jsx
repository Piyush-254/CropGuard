import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Bug, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { pests } from '@/data/pests';
import { cn } from '@/lib/utils';

export default function Knowledge() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPests = pests.filter(pest => {
    const name = pest.name[language].toLowerCase();
    const scientific = pest.scientificName.toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || scientific.includes(query);
  });

  const tips = [
    {
      title: { en: 'Regular Monitoring', hi: 'नियमित निगरानी', ta: 'தொடர் கண்காணிப்பு', te: 'క్రమ పర్యవేక్షణ', mr: 'नियमित देखरेख' },
      description: { 
        en: 'Inspect your crops at least twice a week for early pest detection.',
        hi: 'शुरुआती कीट पहचान के लिए सप्ताह में कम से कम दो बार अपनी फसलों का निरीक्षण करें।',
        ta: 'ஆரம்ப பூச்சி கண்டறிதலுக்கு வாரத்திற்கு இரண்டு முறையாவது உங்கள் பயிர்களை ஆய்வு செய்யுங்கள்.',
        te: 'ప్రారంభ పురుగు గుర్తింపు కోసం వారానికు కనీసం రెండుసార్లు మీ పంటలను తనిఖీ చేయండి.',
        mr: 'लवकर कीड ओळखण्यासाठी आठवड्यातून किमान दोनदा आपल्या पिकांची तपासणी करा.'
      },
    },
    {
      title: { en: 'Crop Rotation', hi: 'फसल चक्र', ta: 'பயिர் சுழற்சி', te: 'పంట మార్పిడి', mr: 'पीक फेरपालट' },
      description: { 
        en: 'Rotate crops each season to break pest life cycles and improve soil health.',
        hi: 'कीट जीवन चक्र को तोड़ने और मिट्टी के स्वास्थ्य में सुधार के लिए हर मौसम में फसलें बदलें।',
        ta: 'பூச்சி வாழ்க்கை சுழற்சியை உடைக்கவும் மண் ஆரோக்கியத்தை மேம்படுத்தவும் ஒவ்வொரு பருவமும் பயிர்களை மாற்றவும்.',
        te: 'పురుగు జీవిత చక్రాన్ని విచ్ఛిన్నం చేయడానికి మరియు నేల ఆరోగ్యాన్ని మెరుగుపరచడానికి ప్రతి సీజన్ పంటలను మార్చండి.',
        mr: 'कीड जीवन चक्र तोडण्यासाठी आणि मातीचे आरोग्य सुधारण्यासाठी दर हंगामात पिके बदला.'
      },
    },
    {
      title: { en: 'Natural Predators', hi: 'प्राकृतिक शिकारी', ta: 'இயற்கை வேட்டையாடிகள்', te: 'సహజ వేటగాళ్లు', mr: 'नैसर्गिक शिकारी' },
      description: { 
        en: 'Encourage beneficial insects like ladybugs and spiders that prey on harmful pests.',
        hi: 'हानिकारक कीटों का शिकार करने वाले लेडीबग और मकड़ियों जैसे लाभकारी कीड़ों को प्रोत्साहित करें।',
        ta: 'தீங்கு விளைவிக்கும் பூச்சிகளை வேட்டையாடும் லேடிபக்ஸ் மற்றும் சிலந்திகள் போன்ற நன்மை செய்யும் பூச்சிகளை ஊக்குவிக்கவும்.',
        te: 'హానికరమైన పురుగులను వేటాడే లేడీబగ్స్ మరియు సాలెపురుగులు వంటి ప్రయోజనకరమైన కీటకాలను ప్రోత్సహించండి.',
        mr: 'हानिकारक कीटकांची शिकार करणाऱ्या लेडीबग्स आणि कोळी सारख्या फायदेशीर कीटकांना प्रोत्साहित करा.'
      },
    },
  ];

  return (
    <MobileLayout>
      <div className="px-5 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t.pestLibrary}</h1>
            <p className="text-sm text-muted-foreground">Learn about common pests</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t.searchPests}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl bg-card border-border text-base"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pests" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 h-12 mb-4">
            <TabsTrigger value="pests">
              <Bug className="w-4 h-4 mr-2" />
              {t.commonPests}
            </TabsTrigger>
            <TabsTrigger value="tips">
              💡 {t.preventiveTips}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pests">
            <div className="space-y-3">
              {filteredPests.map((pest, index) => (
                <Card
                  key={pest.id}
                  className="cursor-pointer hover:shadow-floating transition-all duration-200 active:scale-[0.98] animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => navigate(`/treatment/${pest.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-3xl shrink-0">
                        {pest.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground truncate">
                          {pest.name[language]}
                        </h3>
                        <p className="text-sm text-muted-foreground italic truncate">
                          {pest.scientificName}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {pest.affectedCrops.slice(0, 3).map(cropId => {
                            const crop = { rice: '🌾', wheat: '🌾', maize: '🌽', cotton: '☁️', tomato: '🍅', chilli: '🌶️', brinjal: '🍆' };
                            return (
                              <span key={cropId} className="text-lg">
                                {crop[cropId] || '🌱'}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips">
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <Card
                  key={index}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <h3 className="font-bold text-foreground mb-2">
                      {tip.title[language]}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tip.description[language]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}
