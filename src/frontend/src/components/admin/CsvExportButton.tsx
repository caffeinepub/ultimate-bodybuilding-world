import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import type { OnlineAdmission, Inquiry } from '@/backend';
import { format } from 'date-fns';

interface CsvExportButtonProps {
  data: OnlineAdmission[] | Inquiry[];
  filename: string;
  type: 'admissions' | 'inquiries';
}

export default function CsvExportButton({ data, filename, type }: CsvExportButtonProps) {
  const exportToCsv = () => {
    if (data.length === 0) return;

    let csvContent = '';
    
    if (type === 'admissions') {
      const admissions = data as OnlineAdmission[];
      csvContent = 'ID,Name,Aadhaar,Height (cm),Weight (kg),Street,City,State,Postal Code,Package,Payment Mode,Medical History,Status,Date\n';
      
      admissions.forEach((admission) => {
        const row = [
          admission.id.toString(),
          `"${admission.name}"`,
          admission.aadhaar,
          admission.heightCm.toString(),
          admission.weightKg.toString(),
          `"${admission.address.street}"`,
          `"${admission.address.city}"`,
          `"${admission.address.state}"`,
          admission.address.postalCode,
          `"${admission.packageSelected}"`,
          `"${admission.paymentMode}"`,
          `"${admission.medicalHistory}"`,
          admission.status.__kind__,
          format(new Date(Number(admission.timestamp) / 1000000), 'yyyy-MM-dd HH:mm:ss'),
        ].join(',');
        csvContent += row + '\n';
      });
    } else {
      const inquiries = data as Inquiry[];
      csvContent = 'ID,Name,Phone,Service Interested,Message,Status,Date\n';
      
      inquiries.forEach((inquiry) => {
        const row = [
          inquiry.id.toString(),
          `"${inquiry.name}"`,
          inquiry.phone,
          `"${inquiry.serviceInterested}"`,
          `"${inquiry.message.replace(/"/g, '""')}"`,
          inquiry.status.__kind__,
          format(new Date(Number(inquiry.timestamp) / 1000000), 'yyyy-MM-dd HH:mm:ss'),
        ].join(',');
        csvContent += row + '\n';
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={exportToCsv}
      variant="outline"
      size="sm"
      className="border-gold/50 text-gold hover:bg-gold/10"
      disabled={data.length === 0}
    >
      <FileDown className="h-4 w-4 mr-2" />
      Export CSV
    </Button>
  );
}
