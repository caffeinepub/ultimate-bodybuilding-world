import { Link } from '@tanstack/react-router';
import { SiFacebook, SiInstagram, SiX, SiGoogle } from 'react-icons/si';
import { Heart, Phone, MapPin } from 'lucide-react';
import { getTelLink, getDisplayNumber } from '@/constants/contact';
import { GOOGLE_BUSINESS_PROFILE } from '@/constants/googleBusinessProfile';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'ultimate-bodybuilding-world');

  return (
    <footer className="border-t border-gold/20 bg-card/50 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-luxury font-bold text-gold mb-4">Ultimate Bodybuilding World</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Kalyan's Biggest & Most Premium 24x7 Fitness Arena
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <SiFacebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/ultimatebodybuildingworld?igsh=MXdpZTg1eG5rcTZuaQ==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-gold transition-colors"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                <SiX className="h-5 w-5" />
              </a>
              <a 
                href={GOOGLE_BUSINESS_PROFILE.url}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-gold transition-colors"
                title={GOOGLE_BUSINESS_PROFILE.label}
              >
                <SiGoogle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/gym-facilities" className="text-muted-foreground hover:text-gold transition-colors">Gym Facilities</Link></li>
              <li><Link to="/massage-therapy" className="text-muted-foreground hover:text-gold transition-colors">Massage & Therapy</Link></li>
              <li><Link to="/membership" className="text-muted-foreground hover:text-gold transition-colors">Membership Plans</Link></li>
              <li><Link to="/gallery" className="text-muted-foreground hover:text-gold transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-muted-foreground">24x7 Gym Access</span></li>
              <li><span className="text-muted-foreground">MMA & Boxing Training</span></li>
              <li><span className="text-muted-foreground">Massage Therapy</span></li>
              <li><span className="text-muted-foreground">Healthy Restaurant</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Opp. Mayur Vihar Building, Birla College Road, Kalyan (W) 421301</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                <a href={getTelLink('massage')} className="text-muted-foreground hover:text-gold transition-colors">
                  {getDisplayNumber('massage')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Ultimate Bodybuilding World. All rights reserved.
          </p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 text-gold fill-gold" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
