import PricingCard from '@/components/membership/PricingCard';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '₹2,999',
    period: 'per month',
    features: [
      'Gym Access',
      'Cardio Zone',
      'Locker Facility',
      'Basic Training Support',
    ],
    popular: false,
  },
  {
    name: 'Premium',
    price: '₹4,999',
    period: 'per month',
    features: [
      'All Basic Features',
      'Crossfit Arena',
      'Group Classes',
      'Personal Trainer (2 sessions/week)',
      'Steam Bath Access',
    ],
    popular: true,
  },
  {
    name: 'Elite',
    price: '₹7,999',
    period: 'per month',
    features: [
      'All Premium Features',
      'MMA & Boxing Training',
      'Unlimited Personal Training',
      'Massage Therapy (2 sessions/month)',
      'Diet Consultation',
      'Ice Bath Recovery',
    ],
    popular: false,
  },
];

const couplePackages = [
  {
    name: 'Couple Basic',
    price: '₹5,499',
    period: 'per month',
    features: ['2 Basic Memberships', '10% Discount', 'Shared Locker'],
  },
  {
    name: 'Couple Premium',
    price: '₹8,999',
    period: 'per month',
    features: ['2 Premium Memberships', '15% Discount', 'Priority Booking'],
  },
];

const groupSessions = [
  'Zumba Classes',
  'Crossfit Group Training',
  'Yoga Sessions',
  'Kickboxing Workshops',
];

export default function MembershipPlansPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Individual Plans */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-luxury font-bold heading-luxury mb-4">
            Membership Plans
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>

        {/* Couple Packages */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-luxury font-bold text-gold text-center mb-12">
            Couple Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {couplePackages.map((pkg) => (
              <PricingCard key={pkg.name} {...pkg} popular={false} />
            ))}
          </div>
        </div>

        {/* Group Sessions */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-luxury font-bold text-gold text-center mb-12">
            Group Sessions
          </h2>
          <div className="max-w-2xl mx-auto bg-card/50 border border-gold/20 rounded-lg p-8">
            <ul className="space-y-4">
              {groupSessions.map((session) => (
                <li key={session} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-gold flex-shrink-0" />
                  <span className="text-foreground">{session}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steam Session Benefits */}
        <div>
          <h2 className="text-3xl md:text-4xl font-luxury font-bold text-gold text-center mb-12">
            Steam Session Benefits
          </h2>
          <div className="max-w-3xl mx-auto bg-card/50 border border-gold/20 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gold mb-1">Detoxification</h3>
                  <p className="text-sm text-muted-foreground">Eliminate toxins through sweating</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gold mb-1">Muscle Recovery</h3>
                  <p className="text-sm text-muted-foreground">Reduce soreness and tension</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gold mb-1">Improved Circulation</h3>
                  <p className="text-sm text-muted-foreground">Boost blood flow and oxygen delivery</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gold mb-1">Stress Relief</h3>
                  <p className="text-sm text-muted-foreground">Relax mind and body</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
