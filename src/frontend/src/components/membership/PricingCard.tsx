import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
}

export default function PricingCard({ name, price, period, features, popular }: PricingCardProps) {
  const navigate = useNavigate();

  return (
    <Card className={`relative bg-card/50 border-gold/20 gold-glow ${popular ? 'ring-2 ring-gold' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </div>
      )}
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-luxury text-gold">{name}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold text-foreground">{price}</span>
          <span className="text-muted-foreground ml-2">{period}</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full bg-gold hover:bg-gold-dark text-black font-semibold"
          onClick={() => navigate({ to: '/admission' })}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}
