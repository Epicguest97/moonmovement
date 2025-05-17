
import React from 'react';
import NewsCard, { NewsItem } from './NewsCard';
import { Button } from '@/components/ui/button';

// Mock data for startup news
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'AI Startup Raises $50M to Revolutionize Healthcare Diagnostics',
    summary: 'MediAI has secured $50 million in Series B funding led by Sequoia Capital to expand its AI-powered diagnostic platform that can detect early signs of diseases from medical images.',
    source: 'TechCrunch',
    url: 'https://example.com/news/1',
    publishedAt: 'May 15, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop',
    category: 'Funding'
  },
  {
    id: '2',
    title: 'Climate Tech Startup Launches Innovative Carbon Capture Solution',
    summary: 'EcoCapture unveils a breakthrough technology that can capture carbon dioxide directly from the atmosphere at 30% lower cost than existing solutions.',
    source: 'Bloomberg Green',
    url: 'https://example.com/news/2',
    publishedAt: 'May 14, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=500&h=300&fit=crop',
    category: 'CleanTech'
  },
  {
    id: '3',
    title: 'Fintech Unicorn Expands to Southeast Asian Markets',
    summary: 'Digital banking platform MoneyWise, valued at $2.5 billion, announces expansion to Indonesia, Vietnam, and Thailand following successful operations in Singapore.',
    source: 'Financial Times',
    url: 'https://example.com/news/3',
    publishedAt: 'May 13, 2025',
    category: 'Expansion'
  },
  {
    id: '4',
    title: 'Web3 Startup Secures $30M to Build Decentralized Social Network',
    summary: 'Blockchain-based social media platform SocialChain has raised $30M in seed funding to create a user-owned network that gives control back to content creators.',
    source: 'CoinDesk',
    url: 'https://example.com/news/4',
    publishedAt: 'May 12, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=300&fit=crop',
    category: 'Web3'
  },
  {
    id: '5',
    title: 'Food Delivery Robotics Company Announces IPO Plans',
    summary: 'DeliverBot, which operates a fleet of autonomous delivery robots in 12 major cities, has filed for an initial public offering, seeking a $1.2B valuation.',
    source: 'Wall Street Journal',
    url: 'https://example.com/news/5',
    publishedAt: 'May 11, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&h=300&fit=crop',
    category: 'IPO'
  }
];

const NewsList = () => {
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
      
      {mockNews.map(news => (
        <NewsCard key={news.id} news={news} />
      ))}
      
      <div className="flex justify-center mt-6">
        <Button className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground">
          Load More News
        </Button>
      </div>
    </div>
  );
};

export default NewsList;
