import { useState } from 'react';
import InquiryForm from '@/components/forms/InquiryForm';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { getWhatsAppLink } from '@/constants/contact';

interface SubmittedData {
  name: string;
  phone: string;
  serviceInterested: string;
  message: string;
}

export default function InquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);
  const navigate = useNavigate();

  const handleSuccess = (data: SubmittedData) => {
    setSubmittedData(data);
    setSubmitted(true);
  };

  const generateWhatsAppLink = () => {
    if (!submittedData) return '#';
    
    const message = `Hello! I'm ${submittedData.name}.\n\nService Interested: ${submittedData.serviceInterested}\n\nMessage: ${submittedData.message}\n\nPhone: ${submittedData.phone}`;
    return getWhatsAppLink('massage', message);
  };

  if (submitted && submittedData) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-20 w-20 text-gold mx-auto mb-6" />
            <h1 className="text-4xl font-luxury font-bold text-gold mb-4">
              Inquiry Submitted Successfully!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your inquiry. You can also reach us directly via WhatsApp for faster response.
            </p>
            <div className="flex gap-4 justify-center">
              <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <Button className="bg-gold hover:bg-gold-dark text-black font-semibold">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Continue on WhatsApp
                </Button>
              </a>
              <Button
                onClick={() => navigate({ to: '/' })}
                variant="outline"
                className="border-gold/50 text-gold hover:bg-gold/10"
              >
                Back to Home
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
            Make an Inquiry
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <InquiryForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}
