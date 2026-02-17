import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Upload } from 'lucide-react';
import { useSubmitAdmission } from '@/hooks/useAdmissions';
import { ExternalBlob } from '@/backend';
import { toast } from 'sonner';

interface AdmissionFormData {
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  aadhaar: string;
  heightCm: string;
  weightKg: string;
  medicalHistory: string;
  packageSelected: string;
  paymentMode: string;
}

interface OnlineAdmissionFormProps {
  onSuccess: () => void;
}

export default function OnlineAdmissionForm({ onSuccess }: OnlineAdmissionFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<AdmissionFormData>();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const submitAdmission = useSubmitAdmission();

  const packageSelected = watch('packageSelected');
  const paymentMode = watch('paymentMode');

  const onSubmit = async (data: AdmissionFormData) => {
    if (!photoFile) {
      toast.error('Please upload a photo');
      return;
    }

    try {
      const photoBytes = new Uint8Array(await photoFile.arrayBuffer());
      const photoBlob = ExternalBlob.fromBytes(photoBytes).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      await submitAdmission.mutateAsync({
        name: data.name,
        aadhaar: data.aadhaar,
        heightCm: parseFloat(data.heightCm),
        weightKg: parseFloat(data.weightKg),
        medicalHistory: data.medicalHistory,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
        },
        packageSelected: data.packageSelected,
        paymentMode: data.paymentMode,
        photo: photoBlob,
      });

      toast.success('Admission submitted successfully!');
      onSuccess();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit admission. Please try again.');
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Photo size must be less than 5MB');
        return;
      }
      setPhotoFile(file);
    }
  };

  return (
    <Card className="bg-card/50 border-gold/20">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-gold">Full Name *</Label>
            <Input
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="mt-2 bg-background/50 border-gold/20"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="street" className="text-gold">Street Address *</Label>
              <Input
                id="street"
                {...register('street', { required: 'Street is required' })}
                className="mt-2 bg-background/50 border-gold/20"
                placeholder="Street address"
              />
              {errors.street && <p className="text-destructive text-sm mt-1">{errors.street.message}</p>}
            </div>
            <div>
              <Label htmlFor="city" className="text-gold">City *</Label>
              <Input
                id="city"
                {...register('city', { required: 'City is required' })}
                className="mt-2 bg-background/50 border-gold/20"
                placeholder="City"
              />
              {errors.city && <p className="text-destructive text-sm mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <Label htmlFor="state" className="text-gold">State *</Label>
              <Input
                id="state"
                {...register('state', { required: 'State is required' })}
                className="mt-2 bg-background/50 border-gold/20"
                placeholder="State"
              />
              {errors.state && <p className="text-destructive text-sm mt-1">{errors.state.message}</p>}
            </div>
            <div>
              <Label htmlFor="postalCode" className="text-gold">Postal Code *</Label>
              <Input
                id="postalCode"
                {...register('postalCode', { required: 'Postal code is required' })}
                className="mt-2 bg-background/50 border-gold/20"
                placeholder="Postal code"
              />
              {errors.postalCode && <p className="text-destructive text-sm mt-1">{errors.postalCode.message}</p>}
            </div>
          </div>

          {/* Aadhaar */}
          <div>
            <Label htmlFor="aadhaar" className="text-gold">Aadhaar Number *</Label>
            <Input
              id="aadhaar"
              {...register('aadhaar', { 
                required: 'Aadhaar is required',
                pattern: { value: /^\d{12}$/, message: 'Aadhaar must be 12 digits' }
              })}
              className="mt-2 bg-background/50 border-gold/20"
              placeholder="Enter 12-digit Aadhaar number"
              maxLength={12}
            />
            {errors.aadhaar && <p className="text-destructive text-sm mt-1">{errors.aadhaar.message}</p>}
          </div>

          {/* Height & Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="heightCm" className="text-gold">Height (cm) *</Label>
              <Input
                id="heightCm"
                type="number"
                step="0.1"
                {...register('heightCm', { required: 'Height is required' })}
                className="mt-2 bg-background/50 border-gold/20"
                placeholder="e.g., 175"
              />
              {errors.heightCm && <p className="text-destructive text-sm mt-1">{errors.heightCm.message}</p>}
            </div>
            <div>
              <Label htmlFor="weightKg" className="text-gold">Weight (kg) *</Label>
              <Input
                id="weightKg"
                type="number"
                step="0.1"
                {...register('weightKg', { required: 'Weight is required' })}
                className="mt-2 bg-background/50 border-gold/20"
                placeholder="e.g., 70"
              />
              {errors.weightKg && <p className="text-destructive text-sm mt-1">{errors.weightKg.message}</p>}
            </div>
          </div>

          {/* Medical History */}
          <div>
            <Label htmlFor="medicalHistory" className="text-gold">Medical History</Label>
            <Textarea
              id="medicalHistory"
              {...register('medicalHistory')}
              className="mt-2 bg-background/50 border-gold/20"
              placeholder="Any medical conditions, injuries, or allergies we should know about"
              rows={3}
            />
          </div>

          {/* Package Selection */}
          <div>
            <Label htmlFor="packageSelected" className="text-gold">Select Package *</Label>
            <Select onValueChange={(value) => setValue('packageSelected', value)} value={packageSelected}>
              <SelectTrigger className="mt-2 bg-background/50 border-gold/20">
                <SelectValue placeholder="Choose a membership package" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basic">Basic - ₹2,999/month</SelectItem>
                <SelectItem value="Premium">Premium - ₹4,999/month</SelectItem>
                <SelectItem value="Elite">Elite - ₹7,999/month</SelectItem>
                <SelectItem value="Couple Basic">Couple Basic - ₹5,499/month</SelectItem>
                <SelectItem value="Couple Premium">Couple Premium - ₹8,999/month</SelectItem>
              </SelectContent>
            </Select>
            {errors.packageSelected && <p className="text-destructive text-sm mt-1">{errors.packageSelected.message}</p>}
          </div>

          {/* Photo Upload */}
          <div>
            <Label htmlFor="photo" className="text-gold">Upload Photo *</Label>
            <div className="mt-2">
              <label htmlFor="photo" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gold/30 rounded-lg cursor-pointer hover:border-gold/50 transition-colors bg-background/50">
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gold mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {photoFile ? photoFile.name : 'Click to upload photo (max 5MB)'}
                  </p>
                </div>
              </label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-2">
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gold h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Uploading: {uploadProgress}%</p>
              </div>
            )}
          </div>

          {/* Payment Mode */}
          <div>
            <Label htmlFor="paymentMode" className="text-gold">Payment Mode *</Label>
            <Select onValueChange={(value) => setValue('paymentMode', value)} value={paymentMode}>
              <SelectTrigger className="mt-2 bg-background/50 border-gold/20">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
            {errors.paymentMode && <p className="text-destructive text-sm mt-1">{errors.paymentMode.message}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gold hover:bg-gold-dark text-black font-semibold text-lg py-6"
            disabled={submitAdmission.isPending}
          >
            {submitAdmission.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
