import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Dumbbell, Sparkles, Coffee, Calendar } from 'lucide-react';
import HeroMedia from '@/components/home/HeroMedia';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroMedia />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-luxury font-bold mb-6 heading-luxury animate-fade-in">
            Ultimate Bodybuilding World
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gold font-semibold mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Train • Recover • Refuel • Relax
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Kalyan's Largest Fitness & Wellness Destination
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-dark text-black font-bold text-lg px-8 py-6 gold-glow"
              onClick={() => navigate({ to: '/membership' })}
            >
              <Dumbbell className="mr-2 h-5 w-5" />
              Join Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gold/50 text-gold hover:bg-gold/10 font-semibold text-lg px-8 py-6"
              onClick={() => navigate({ to: '/massage-therapy' })}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Book Massage
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gold/50 text-gold hover:bg-gold/10 font-semibold text-lg px-8 py-6"
              onClick={() => navigate({ to: '/inquiry' })}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Enquiry
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gold/50 text-gold hover:bg-gold/10 font-semibold text-lg px-8 py-6"
              onClick={() => navigate({ to: '/admission' })}
            >
              Online Admission
            </Button>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Content Section */}
      <section className="py-20 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-luxury font-bold text-gold mb-6">
              The Biggest Gym in Kalyan
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the ultimate fitness destination with our 24x7 gym in Kalyan. We offer world-class facilities including MMA training, professional massage therapy, healthy restaurant, and premium coffee lounge - all under one roof.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-card border border-gold/20 rounded-lg gold-glow">
                <Dumbbell className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gold mb-2">24x7 Fitness</h3>
                <p className="text-sm text-muted-foreground">Train anytime with our round-the-clock gym access</p>
              </div>
              <div className="p-6 bg-card border border-gold/20 rounded-lg gold-glow">
                <Sparkles className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gold mb-2">MMA Training</h3>
                <p className="text-sm text-muted-foreground">Professional MMA and boxing training in Kalyan</p>
              </div>
              <div className="p-6 bg-card border border-gold/20 rounded-lg gold-glow">
                <Coffee className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gold mb-2">Wellness Hub</h3>
                <p className="text-sm text-muted-foreground">Massage therapy and healthy dining options</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
