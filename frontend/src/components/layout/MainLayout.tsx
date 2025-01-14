import React from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (path: string) => void;
  userRole: "user" | "admin" | "ustad" | null; // Terima userRole sebagai props
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, currentPage, onNavigate, userRole }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} userRole={userRole} />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
};
