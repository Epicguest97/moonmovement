import React, { useState, useEffect } from 'react';
import NewsCard, { NewsItem } from './NewsCard';
import { Button } from '@/components/ui/button';

const NewsList = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://moonmovement.onrender.com/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const newsData = await response.json();
        // Make sure newsData is an array before setting it
        if (Array.isArray(newsData)) {
          setNews(newsData);
        } else {
          console.error('Expected an array of news items but got:', newsData);
          setError('Received invalid data format');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Startup News</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-300">Loading news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Startup News</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-red-400">Error: {error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-sidebar-primary hover:bg-sidebar-primary/90"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Ensure news is an array before rendering
  const newsItems = Array.isArray(news) ? news : [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Startup News</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="text-xs bg-transparent border-sidebar-border text-gray-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            Latest
          </Button>
          <Button variant="outline" className="text-xs bg-transparent border-sidebar-border text-gray-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            Trending
          </Button>
          <Button variant="outline" className="text-xs bg-transparent border-sidebar-border text-gray-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            Funding
          </Button>
        </div>
      </div>
      
      {newsItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-300">No news articles found.</p>
        </div>
      ) : (
        <>
          {newsItems.map(newsItem => (
            <NewsCard key={newsItem.id} news={newsItem} />
          ))}
          
          <div className="flex justify-center mt-6">
            <Button className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground">
              Load More News
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsList;
