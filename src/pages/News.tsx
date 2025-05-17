
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NewsList from '@/components/news/NewsList';

const News = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <NewsList />
      </div>
    </MainLayout>
  );
};

export default News;
