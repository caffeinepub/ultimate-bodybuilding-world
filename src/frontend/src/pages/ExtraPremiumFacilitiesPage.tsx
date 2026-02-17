import { Card, CardContent } from '@/components/ui/card';
import { Car, Clock, Users, Award, Sparkles } from 'lucide-react';

const facilities = [
  {
    name: 'Personal Parking',
    icon: Car,
    description: 'Dedicated parking space for all members',
  },
  {
    name: '24x7 Open',
    icon: Clock,
    description: 'Train anytime, day or night, 365 days a year',
  },
  {
    name: 'Separate Training Zones',
    icon: Users,
    description: 'Specialized areas for different workout styles',
  },
  {
    name: 'Professional Trainers',
    icon: Award,
    description: 'Certified experts to guide your fitness journey',
  },
  {
    name: 'Hygienic Environment',
    icon: Sparkles,
    description: 'Maintained to the highest cleanliness standards',
  },
];

export default function ExtraPremiumFacilitiesPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-luxury font-bold heading-luxury mb-4">
            Extra Premium Facilities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience luxury amenities that set us apart
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {facilities.map((facility) => (
            <Card key={facility.name} className="bg-card/50 border-gold/20 gold-glow">
              <CardContent className="p-8 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-full bg-gold/10">
                    <facility.icon className="h-10 w-10 text-gold" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gold mb-3">{facility.name}</h3>
                <p className="text-sm text-muted-foreground">{facility.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
