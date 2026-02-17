import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LightboxSlider from '@/components/gallery/LightboxSlider';
import { Dumbbell, Zap, Box, Flame, Music, IceCream, Sparkles, Coffee } from 'lucide-react';

const galleryCategories = [
  { id: 'gym', label: 'Gym Area', icon: Dumbbell },
  { id: 'crossfit', label: 'Crossfit Zone', icon: Zap },
  { id: 'boxing', label: 'Boxing Ring', icon: Box },
  { id: 'mma', label: 'MMA Training', icon: Flame },
  { id: 'zumba', label: 'Zumba Class', icon: Music },
  { id: 'skating', label: 'Skating Area', icon: Zap },
  { id: 'massage', label: 'Massage Room', icon: Sparkles },
  { id: 'icebath', label: 'Ice Bath', icon: IceCream },
  { id: 'restaurant', label: 'Restaurant', icon: Coffee },
  { id: 'coffee', label: 'Coffee Lounge', icon: Coffee },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState('gym');

  // Placeholder images for each category
  const images = Array(8).fill(null).map((_, i) => ({
    id: i,
    category: currentCategory,
  }));

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-luxury font-bold heading-luxury mb-4">
            Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our world-class facilities and premium amenities
          </p>
        </div>

        <Tabs defaultValue="gym" className="w-full" onValueChange={setCurrentCategory}>
          <TabsList className="w-full flex flex-wrap justify-center gap-2 h-auto bg-card/50 border border-gold/20 p-2 mb-8">
            {galleryCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-gold data-[state=active]:text-black flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {galleryCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-card/30 border border-gold/20 rounded-lg flex items-center justify-center gold-glow cursor-pointer overflow-hidden"
                    onClick={() => setSelectedImage(index)}
                  >
                    <category.icon className="h-16 w-16 text-gold/30" />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {selectedImage !== null && (
          <LightboxSlider
            images={images}
            currentIndex={selectedImage}
            onClose={() => setSelectedImage(null)}
            onNavigate={setSelectedImage}
          />
        )}
      </div>
    </div>
  );
}
