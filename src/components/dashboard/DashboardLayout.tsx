import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {children}
    </div>
  );
};