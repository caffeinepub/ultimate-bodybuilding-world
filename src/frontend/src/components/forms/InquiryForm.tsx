import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useSubmitInquiry } from '@/hooks/useInquiries';
import { toast } from 'sonner';

interface InquiryFormData {
  name: string;
  phone: string;
  serviceInterested: string;
  message: string;
}

interface InquiryFormProps {
  onSuccess: (data: InquiryFormData) => void;
}

export default function InquiryForm({ onSuccess }: InquiryFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<InquiryFormData>();
  const submitInquiry = useSubmitInquiry();

  const serviceInterested = watch('serviceInterested');

  const onSubmit = async (data: InquiryFormData) => {
    try {
      await submitInquiry.mutateAsync(data);
      toast.success('Inquiry submitted successfully!');
      onSuccess(data);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    }
  };

  return (
    <Card className="bg-card/50 border-gold/20">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-gold">Your Name *</Label>
            <Input
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="mt-2 bg-background/50 border-gold/20"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-gold">Phone Number *</Label>
            <Input
              id="phone"
              {...register('phone', { 
                required: 'Phone is required',
                pattern: { value: /^[0-9]{10}$/, message: 'Phone must be 10 digits' }
              })}
              className="mt-2 bg-background/50 border-gold/20"
              placeholder="Enter 10-digit phone number"
              maxLength={10}
            />
            {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
          </div>

          {/* Service Interested */}
          <div>
            <Label htmlFor="serviceInterested" className="text-gold">Service Interested *</Label>
            <Select onValueChange={(value) => setValue('serviceInterested', value)} value={serviceInterested}>
              <SelectTrigger className="mt-2 bg-background/50 border-gold/20">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gym Membership">Gym Membership</SelectItem>
                <SelectItem value="Personal Training">Personal Training</SelectItem>
                <SelectItem value="MMA Training">MMA Training</SelectItem>
                <SelectItem value="Massage Therapy">Massage Therapy</SelectItem>
                <SelectItem value="Group Classes">Group Classes</SelectItem>
                <SelectItem value="Diet Consultation">Diet Consultation</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.serviceInterested && <p className="text-destructive text-sm mt-1">{errors.serviceInterested.message}</p>}
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="text-gold">Message *</Label>
            <Textarea
              id="message"
              {...register('message', { required: 'Message is required' })}
              className="mt-2 bg-background/50 border-gold/20"
              placeholder="Tell us more about your inquiry"
              rows={5}
            />
            {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gold hover:bg-gold-dark text-black font-semibold text-lg py-6"
            disabled={submitInquiry.isPending}
          >
            {submitInquiry.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Inquiry'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
