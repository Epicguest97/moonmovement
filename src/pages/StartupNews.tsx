
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StartupNewsList from '@/components/startup/StartupNewsList';

const StartupNews = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Startup News</h1>
          <p className="text-gray-400">Latest news and updates from the startup world</p>
        </div>
        <StartupNewsList />
      </div>
    </MainLayout>
  );
};

export default StartupNews;
