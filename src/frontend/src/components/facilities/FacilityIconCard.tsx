import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FacilityIconCardProps {
  name: string;
  icon: LucideIcon;
  description: string;
}

export default function FacilityIconCard({ name, icon: Icon, description }: FacilityIconCardProps) {
  return (
    <Card className="bg-card/50 border-gold/20 gold-glow cursor-pointer group">
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="p-4 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors">
            <Icon className="h-8 w-8 text-gold" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gold mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
