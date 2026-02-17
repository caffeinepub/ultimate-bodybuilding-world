import { Link2, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCopyPageLink } from '@/hooks/useCopyPageLink';

interface CopyLinkButtonProps {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showLabel?: boolean;
}

export default function CopyLinkButton({ 
  variant = 'ghost', 
  size = 'sm',
  className = '',
  showLabel = true
}: CopyLinkButtonProps) {
  const { copyLink, status } = useCopyPageLink();

  const getIcon = () => {
    if (status === 'success') return <Check className="h-4 w-4" />;
    if (status === 'error') return <AlertCircle className="h-4 w-4" />;
    return <Link2 className="h-4 w-4" />;
  };

  const getLabel = () => {
    if (status === 'success') return 'Link copied';
    if (status === 'error') return 'Could not copy link';
    return 'Copy Link';
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={copyLink}
      className={`${className} ${status === 'success' ? 'text-green-500' : status === 'error' ? 'text-red-500' : 'text-gold'}`}
      disabled={status !== 'idle'}
    >
      {getIcon()}
      {showLabel && <span className="ml-2">{getLabel()}</span>}
    </Button>
  );
}
