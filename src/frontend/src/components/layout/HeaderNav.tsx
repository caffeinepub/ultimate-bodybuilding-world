import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import CopyLinkButton from './CopyLinkButton';

export default function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Gym Facilities', path: '/gym-facilities' },
    { label: 'Massage & Therapy', path: '/massage-therapy' },
    { label: 'Restaurant & Coffee', path: '/restaurant-coffee' },
    { label: 'Membership', path: '/membership' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
            <img 
              src="/assets/generated/logo-ubw-wordmark.dim_1600x400.png" 
              alt="Ultimate Bodybuilding World" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-foreground/80 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <CopyLinkButton variant="ghost" size="sm" />
            <Button
              variant="outline"
              size="sm"
              className="border-gold/30 text-gold hover:bg-gold/10"
              onClick={() => navigate({ to: '/inquiry' })}
            >
              Enquiry
            </Button>
            <Button
              size="sm"
              className="bg-gold hover:bg-gold-dark text-black font-semibold"
              onClick={() => navigate({ to: '/admission' })}
            >
              Join Now
            </Button>
            <a href="tel:+919870481228" className="ml-2">
              <Button size="sm" variant="ghost" className="text-gold">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </a>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-gold" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background border-gold/20">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-lg font-medium text-foreground/80 hover:text-gold transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  <CopyLinkButton 
                    variant="outline" 
                    className="border-gold/30 hover:bg-gold/10 w-full" 
                  />
                  <Button
                    variant="outline"
                    className="border-gold/30 text-gold hover:bg-gold/10 w-full"
                    onClick={() => {
                      setIsOpen(false);
                      navigate({ to: '/inquiry' });
                    }}
                  >
                    Enquiry
                  </Button>
                  <Button
                    className="bg-gold hover:bg-gold-dark text-black font-semibold w-full"
                    onClick={() => {
                      setIsOpen(false);
                      navigate({ to: '/admission' });
                    }}
                  >
                    Join Now
                  </Button>
                  <a href="tel:+919870481228" className="w-full">
                    <Button variant="ghost" className="text-gold w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
