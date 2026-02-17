import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { Sparkles, Phone } from 'lucide-react';

const services = [
  {
    name: 'Signature Massages',
    description: 'Premium full-body massage therapy for complete relaxation',
    duration: '60-90 mins',
  },
  {
    name: 'Head & Foot Therapy',
    description: 'Specialized treatment for stress relief and circulation',
    duration: '45 mins',
  },
  {
    name: 'Dry Cupping',
    description: 'Traditional cupping therapy for muscle recovery',
    duration: '30 mins',
  },
  {
    name: 'Steam Therapy',
    description: 'Detoxifying steam sessions for wellness',
    duration: '20 mins',
  },
  {
    name: 'Ice Bath Therapy',
    description: 'Cold immersion therapy for athletic recovery',
    duration: '15 mins',
  },
  {
    name: 'Luxury Combo Packages',
    description: 'Customized wellness packages combining multiple therapies',
    duration: 'Varies',
  },
];

export default function MassageTherapyPage() {
  const navigate = useNavigate();

  return (
    <div className="relative py-20">
      {/* Spa Background Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/bg-spa-candles.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-luxury font-bold heading-luxury mb-4">
            Premium Massage & Therapy Lounge
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Rejuvenate your body and mind with our luxury spa services
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-dark text-black font-semibold"
              onClick={() => navigate({ to: '/inquiry' })}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Book Appointment
            </Button>
            <a href="tel:+918652320325">
              <Button size="lg" variant="outline" className="border-gold/50 text-gold hover:bg-gold/10">
                <Phone className="mr-2 h-5 w-5" />
                Call: +91 8652320325
              </Button>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card key={service.name} className="bg-card/70 backdrop-blur border-gold/20 gold-glow">
              <CardHeader>
                <CardTitle className="text-gold flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                <p className="text-xs text-gold font-semibold">Duration: {service.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
