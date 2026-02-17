import { useState } from 'react';
import OnlineAdmissionForm from '@/components/forms/OnlineAdmissionForm';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

export default function OnlineAdmissionPage() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  if (submitted) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-20 w-20 text-gold mx-auto mb-6" />
            <h1 className="text-4xl font-luxury font-bold text-gold mb-4">
              Application Submitted Successfully!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your interest in Ultimate Bodybuilding World. Our team will review your application and contact you shortly.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate({ to: '/' })}
                variant="outline"
                className="border-gold/50 text-gold hover:bg-gold/10"
              >
                Back to Home
              </Button>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-gold hover:bg-gold-dark text-black font-semibold"
              >
                Submit Another
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-luxury font-bold heading-luxury mb-4">
            Online Admission
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join Kalyan's premier fitness destination. Fill out the form below to start your journey.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <OnlineAdmissionForm onSuccess={() => setSubmitted(true)} />
        </div>
      </div>
    </div>
  );
}
