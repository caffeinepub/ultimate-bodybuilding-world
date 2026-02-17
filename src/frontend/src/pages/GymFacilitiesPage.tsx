import FacilityIconCard from '@/components/facilities/FacilityIconCard';
import { Dumbbell, Heart, Zap, Users, Swords, Box, Shield, Flame, Music, IceCream, Wind } from 'lucide-react';

const facilities = [
  { name: 'Weight Training', icon: Dumbbell, description: 'State-of-the-art equipment for strength building' },
  { name: 'Cardio Zone', icon: Heart, description: 'Premium cardio machines for endurance' },
  { name: 'Crossfit Arena', icon: Zap, description: 'Dedicated space for high-intensity training' },
  { name: 'Functional Training', icon: Users, description: 'Dynamic functional fitness area' },
  { name: 'Kick Boxing', icon: Swords, description: 'Professional kickboxing training' },
  { name: 'Boxing', icon: Box, description: 'Traditional boxing with expert coaches' },
  { name: 'Karate', icon: Shield, description: 'Martial arts training for all levels' },
  { name: 'MMA', icon: Flame, description: 'Mixed martial arts training facility' },
  { name: 'Zumba', icon: Music, description: 'Fun and energetic dance fitness' },
  { name: 'Skating', icon: Zap, description: 'Indoor skating area' },
  { name: 'Steam Bath', icon: Wind, description: 'Relaxing steam therapy' },
  { name: 'Ice Bath Recovery', icon: IceCream, description: 'Cold therapy for muscle recovery' },
];

export default function GymFacilitiesPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-luxury font-bold heading-luxury mb-4">
            Gym Facilities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience world-class fitness facilities designed for champions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {facilities.map((facility) => (
            <FacilityIconCard
              key={facility.name}
              name={facility.name}
              icon={facility.icon}
              description={facility.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
