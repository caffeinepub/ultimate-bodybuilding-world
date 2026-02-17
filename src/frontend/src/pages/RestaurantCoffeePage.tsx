import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee, Salad, Beef, Apple, Droplet } from 'lucide-react';

const offerings = [
  {
    name: 'Healthy Restaurant',
    icon: Salad,
    description: 'Nutritious meals prepared with fresh ingredients',
  },
  {
    name: 'Protein Meals',
    icon: Beef,
    description: 'High-protein dishes for muscle building and recovery',
  },
  {
    name: 'Diet Food',
    icon: Apple,
    description: 'Customized meal plans for your fitness goals',
  },
  {
    name: 'Coffee Lounge',
    icon: Coffee,
    description: 'Premium coffee and beverages in a relaxing atmosphere',
  },
  {
    name: 'Post Workout Refreshments',
    icon: Droplet,
    description: 'Protein shakes, smoothies, and energy drinks',
  },
];

export default function RestaurantCoffeePage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-luxury font-bold heading-luxury mb-4">
            Restaurant & Coffee Area
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fuel your body with healthy, delicious meals and premium beverages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {offerings.map((offering) => (
            <Card key={offering.name} className="bg-card/50 border-gold/20 gold-glow">
              <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                  <offering.icon className="h-5 w-5" />
                  {offering.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{offering.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gallery Placeholder */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-luxury font-bold text-gold text-center mb-8">
            Café Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="aspect-square bg-card/30 border border-gold/20 rounded-lg flex items-center justify-center gold-glow cursor-pointer"
              >
                <Coffee className="h-12 w-12 text-gold/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
