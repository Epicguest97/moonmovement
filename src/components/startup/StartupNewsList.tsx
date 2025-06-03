import React, { useState, useEffect } from 'react';
import StartupNewsCard, { StartupNewsItem } from './StartupNewsCard';
import { Button } from '@/components/ui/button';

const StartupNewsList = () => {
  const [news, setNews] = useState<StartupNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStartupNews = async () => {
      try {
        setLoading(true);
        // Changed endpoint to /api/news
        const response = await fetch('https://moonmovement.onrender.com/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch startup news');
        }
        const newsData = await response.json();
        setNews(newsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch startup news');
        console.error('Error fetching startup news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStartupNews();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-300">Loading startup news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">Error: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4 bg-sidebar-primary hover:bg-sidebar-primary/90">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {news.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-300">No startup news articles found.</p>
        </div>
      ) : (
        news.map(newsItem => (
          <StartupNewsCard key={newsItem.id} news={newsItem} />
        ))
      )}
    </div>
  );
};

export default StartupNewsList;
