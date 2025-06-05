
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="container mx-auto flex flex-1 px-4 py-4 gap-4">
        <main className="flex-1">{children}</main>
        <div className="hidden lg:block w-80">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
