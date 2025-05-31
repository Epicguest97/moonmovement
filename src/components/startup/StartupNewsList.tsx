
import React from 'react';
import StartupNewsCard from './StartupNewsCard';

export interface StartupNewsItem {
  id: string;
  title: string;
  summary: string;
  company: string;
  funding?: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
  url: string;
  tags: string[];
}

const mockStartupNews: StartupNewsItem[] = [
  {
    id: '1',
    title: 'TechCorp Raises $50M Series B to Revolutionize AI Development',
    summary: 'The San Francisco-based startup plans to use the funding to expand its AI platform and hire 200 new engineers.',
    company: 'TechCorp',
    funding: '$50M Series B',
    category: 'Artificial Intelligence',
    publishedAt: '2 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop',
    url: 'https://example.com/techcorp-funding',
    tags: ['AI', 'Series B', 'Funding']
  },
  {
    id: '2',
    title: 'FinanceFlow Acquires PaymentPro for $120M',
    summary: 'The acquisition will strengthen FinanceFlow\'s position in the digital payments market.',
    company: 'FinanceFlow',
    funding: '$120M Acquisition',
    category: 'Fintech',
    publishedAt: '4 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
    url: 'https://example.com/financeflow-acquisition',
    tags: ['Fintech', 'Acquisition', 'Payments']
  },
  {
    id: '3',
    title: 'HealthTech Startup MediCore Secures $25M Series A',
    summary: 'MediCore\'s AI-powered diagnostic platform has shown promising results in clinical trials.',
    company: 'MediCore',
    funding: '$25M Series A',
    category: 'Healthcare',
    publishedAt: '6 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
    url: 'https://example.com/medicore-funding',
    tags: ['Healthcare', 'AI', 'Series A']
  },
  {
    id: '4',
    title: 'CleanEnergy Solutions Closes $75M Round Led by Green Ventures',
    summary: 'The funding will accelerate the development of next-generation solar panel technology.',
    company: 'CleanEnergy Solutions',
    funding: '$75M Series C',
    category: 'CleanTech',
    publishedAt: '8 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop',
    url: 'https://example.com/cleanenergy-funding',
    tags: ['CleanTech', 'Series C', 'Solar']
  },
  {
    id: '5',
    title: 'FoodDelivery Startup QuickBite Expands to 50 New Cities',
    summary: 'QuickBite\'s 15-minute delivery promise has gained traction among urban consumers.',
    company: 'QuickBite',
    category: 'Food & Delivery',
    publishedAt: '10 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
    url: 'https://example.com/quickbite-expansion',
    tags: ['Food Delivery', 'Expansion', 'Urban']
  }
];

const StartupNewsList = () => {
  return (
    <div className="space-y-4">
      {mockStartupNews.map((news) => (
        <StartupNewsCard key={news.id} news={news} />
      ))}
    </div>
  );
};

export default StartupNewsList;
