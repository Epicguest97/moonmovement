
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  imageUrl?: string;
  category: string;
}

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <Card className="mb-4 overflow-hidden bg-sidebar border-sidebar-border hover:border-sidebar-primary transition-all duration-200">
      <div className="flex flex-col md:flex-row">
        {news.imageUrl && (
          <div className="md:w-1/4">
            <img 
              src={news.imageUrl} 
              alt={news.title} 
              className="w-full h-48 md:h-full object-cover"
            />
          </div>
        )}
        
        <CardContent className={`flex-1 p-4 ${news.imageUrl ? 'md:w-3/4' : 'w-full'}`}>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <span className="bg-sidebar-accent text-sidebar-accent-foreground px-2 py-0.5 rounded text-xs">
              {news.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {news.publishedAt}
            </span>
            <span className="text-gray-500">{news.source}</span>
          </div>
          
          <h3 className="text-lg font-bold mb-2 text-white">{news.title}</h3>
          
          <p className="text-sm text-gray-300 mb-4 line-clamp-2">{news.summary}</p>
          
          <div className="flex items-center justify-between">
            <a 
              href={news.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-sidebar-primary hover:underline"
            >
              <LinkIcon size={12} />
              Read full story
            </a>
            
            <Button variant="outline" size="sm" className="text-xs border-sidebar-border bg-transparent text-sidebar-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              Share
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default NewsCard;
