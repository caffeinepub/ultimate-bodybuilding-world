import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Navigation, MessageCircle, ExternalLink } from 'lucide-react';
import { SiGoogle } from 'react-icons/si';
import { getTelLink, getWhatsAppLink, getDisplayNumber } from '@/constants/contact';
import { GOOGLE_BUSINESS_PROFILE } from '@/constants/googleBusinessProfile';

export default function ContactPage() {
  const address = 'Opp. Mayur Vihar Building, Birla College Road, Kalyan (W) 421301';
  
  const googleMapsEmbed = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}`;
  const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-luxury font-bold heading-luxury mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visit us or get in touch. We're here to help you start your fitness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-card/50 border-gold/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gold mb-2">Address</h3>
                    <p className="text-muted-foreground">{address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-gold/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-gold flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gold mb-3">Phone Number</h3>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Massage & Therapy:</p>
                      <a href={getTelLink('massage')} className="text-foreground hover:text-gold transition-colors">
                        {getDisplayNumber('massage')}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href={getTelLink('massage')} className="w-full">
                <Button className="w-full bg-gold hover:bg-gold-dark text-black font-semibold">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </a>
              <a href={getWhatsAppLink('massage')} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full border-gold/50 text-gold hover:bg-gold/10">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
              <a href={directionsLink} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full border-gold/50 text-gold hover:bg-gold/10">
                  <Navigation className="mr-2 h-5 w-5" />
                  Get Directions
                </Button>
              </a>
              <a href={GOOGLE_BUSINESS_PROFILE.url} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full border-gold/50 text-gold hover:bg-gold/10">
                  <SiGoogle className="mr-2 h-5 w-5" />
                  {GOOGLE_BUSINESS_PROFILE.label}
                </Button>
              </a>
            </div>
          </div>

          {/* Google Map */}
          <Card className="bg-card/50 border-gold/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="w-full h-[500px]">
                <iframe
                  src={googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ultimate Bodybuilding World Location"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
