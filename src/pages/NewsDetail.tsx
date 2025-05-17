
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { mockNews } from '@/components/news/NewsList';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Link as LinkIcon, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewsDetail = () => {
  const { newsId } = useParams<{ newsId: string }>();
  const newsItem = mockNews.find(news => news.id === newsId);

  if (!newsItem) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-4">News article not found</h2>
          <p className="text-gray-300">The news article you're looking for doesn't exist or has been removed.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-4 overflow-hidden bg-sidebar border-sidebar-border">
          {newsItem.imageUrl && (
            <div className="w-full h-64 md:h-96">
              <img 
                src={newsItem.imageUrl} 
                alt={newsItem.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
              <span className="bg-sidebar-accent text-sidebar-accent-foreground px-2 py-0.5 rounded text-xs">
                {newsItem.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {newsItem.publishedAt}
              </span>
              <span className="text-gray-500">{newsItem.source}</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-white">{newsItem.title}</h1>
            
            <p className="text-lg text-gray-300 mb-6 italic">{newsItem.summary}</p>
            
            <div className="prose prose-invert max-w-none" 
                 dangerouslySetInnerHTML={{ __html: newsItem.content || '' }}>
            </div>
            
            <div className="flex items-center justify-between mt-8 border-t border-sidebar-border pt-4">
              <a 
                href={newsItem.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sidebar-primary hover:underline"
              >
                <LinkIcon size={16} />
                Read the original article
              </a>
              
              <Button variant="outline" className="border-sidebar-border bg-transparent text-sidebar-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Share size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Related News</h3>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {mockNews
              .filter(news => news.id !== newsId)
              .slice(0, 3)
              .map(news => (
                <Card key={news.id} className="min-w-[300px] max-w-[300px] bg-sidebar border-sidebar-border">
                  {news.imageUrl && (
                    <div className="h-40">
                      <img 
                        src={news.imageUrl} 
                        alt={news.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <h4 className="font-bold text-white mb-2 line-clamp-2">{news.title}</h4>
                    <p className="text-xs text-gray-400">{news.publishedAt}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewsDetail;
