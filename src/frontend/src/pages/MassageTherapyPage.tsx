import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { Sparkles, Phone } from 'lucide-react';
import { getTelLink, getDisplayNumber } from '@/constants/contact';

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
    description: 'Cold therapy for muscle recovery and inflammation',
    duration: '15 mins',
  },
  {
    name: 'Combo Packages',
    description: 'Customized therapy combinations for optimal results',
    duration: 'Varies',
  },
];

export default function MassageTherapyPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/bg-spa-candles.dim_1920x1080.png)' }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-luxury font-bold heading-luxury mb-4">
              Massage & Therapy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Rejuvenate your body and mind with our premium massage and therapy services
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service) => (
              <Card key={service.name} className="bg-card/80 backdrop-blur border-gold/20 hover:border-gold/40 transition-all">
                <CardHeader>
                  <CardTitle className="text-gold flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{service.description}</p>
                  <p className="text-sm text-gold font-semibold">Duration: {service.duration}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-card/80 backdrop-blur border-gold/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-luxury font-bold text-gold mb-4">
                  Book Your Session Today
                </h2>
                <p className="text-muted-foreground mb-6">
                  Experience the ultimate relaxation and recovery. Call us to schedule your appointment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href={getTelLink('massage')}>
                    <Button className="bg-gold hover:bg-gold-dark text-black font-semibold">
                      <Phone className="mr-2 h-5 w-5" />
                      Call {getDisplayNumber('massage')}
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    className="border-gold/50 text-gold hover:bg-gold/10"
                    onClick={() => navigate({ to: '/inquiry' })}
                  >
                    Send Inquiry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
