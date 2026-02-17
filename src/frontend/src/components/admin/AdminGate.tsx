import { ReactNode } from 'react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useIsCallerAdmin } from '@/hooks/useAdmissions';
import { Button } from '@/components/ui/button';
import { Shield, Loader2 } from 'lucide-react';
import LoginButton from '@/components/auth/LoginButton';

interface AdminGateProps {
  children: ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();

  if (isInitializing || isCheckingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-gold animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <Shield className="h-20 w-20 text-gold mx-auto mb-6" />
          <h1 className="text-3xl font-luxury font-bold text-gold mb-4">Admin Access Required</h1>
          <p className="text-muted-foreground mb-8">
            Please log in to access the admin dashboard.
          </p>
          <LoginButton />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <Shield className="h-20 w-20 text-destructive mx-auto mb-6" />
          <h1 className="text-3xl font-luxury font-bold text-destructive mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-8">
            You do not have permission to access this area. Only administrators can view this page.
          </p>
          <LoginButton />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
