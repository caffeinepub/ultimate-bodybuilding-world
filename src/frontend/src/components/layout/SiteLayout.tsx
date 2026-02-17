import { ReactNode } from 'react';
import HeaderNav from './HeaderNav';
import Footer from './Footer';

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col marble-bg">
      <HeaderNav />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
