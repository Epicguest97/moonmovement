
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CreatePostCard from '@/components/post/CreatePostCard';
import PostCard, { Post } from '@/components/post/PostCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FireIcon, TrendingUp, Clock } from 'lucide-react';

// Mock data for posts
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'What\'s the most beautiful place you\'ve ever visited?',
    content: 'I went to the Swiss Alps last summer and I was absolutely blown away by the scenery. The mountains, the lakes, the charming villages - it was like something from a fairy tale. What places have taken your breath away?',
    subreddit: 'AskReddit',
    author: 'traveler123',
    timestamp: '5 hours ago',
    voteScore: 4321,
    commentCount: 932,
  },
  {
    id: '2',
    title: 'This cake I made for my daughter\'s birthday',
    content: '',
    subreddit: 'Baking',
    author: 'bakingmom',
    timestamp: '7 hours ago',
    voteScore: 2156,
    commentCount: 87,
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=350&fit=crop',
    isText: false,
  },
  {
    id: '3',
    title: 'Anyone else excited for the new Spider-Man movie?',
    content: 'The trailers look amazing and I can\'t wait to see what they do with the multiverse concept. What are your predictions?',
    subreddit: 'movies',
    author: 'filmfan',
    timestamp: '12 hours ago',
    voteScore: 943,
    commentCount: 431,
    isText: true,
  },
  {
    id: '4',
    title: 'Check out this fascinating article on quantum computing',
    content: '',
    subreddit: 'science',
    author: 'quantumleap',
    timestamp: '1 day ago',
    voteScore: 1572,
    commentCount: 265,
    isLink: true,
    linkUrl: 'https://example.com/quantum-computing-breakthrough',
  },
  {
    id: '5',
    title: 'My cat sits like a human and judges me',
    content: '',
    subreddit: 'cats',
    author: 'catlover',
    timestamp: '1 day ago',
    voteScore: 8721,
    commentCount: 324,
    imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&h=350&fit=crop',
    isText: false,
  },
];

const Index = () => {
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot');
  
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <CreatePostCard />
        
        <Tabs defaultValue="posts" className="mb-4">
          <TabsList className="bg-white border border-gray-200 rounded-md p-1 h-auto">
            <TabsTrigger 
              value="posts"
              className="data-[state=active]:bg-gray-100 py-2 h-auto"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger 
              value="trending"
              className="data-[state=active]:bg-gray-100 py-2 h-auto"
            >
              Trending
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            <div className="bg-white border border-gray-200 rounded-md mb-4">
              <div className="flex p-2">
                <Button 
                  variant={sortBy === 'hot' ? 'default' : 'ghost'} 
                  size="sm" 
                  className={sortBy === 'hot' ? 'bg-gray-100 text-gray-900' : ''}
                  onClick={() => setSortBy('hot')}
                >
                  <FireIcon size={16} className="mr-1" />
                  Hot
                </Button>
                <Button 
                  variant={sortBy === 'new' ? 'default' : 'ghost'} 
                  size="sm" 
                  className={sortBy === 'new' ? 'bg-gray-100 text-gray-900' : ''}
                  onClick={() => setSortBy('new')}
                >
                  <Clock size={16} className="mr-1" />
                  New
                </Button>
                <Button 
                  variant={sortBy === 'top' ? 'default' : 'ghost'} 
                  size="sm" 
                  className={sortBy === 'top' ? 'bg-gray-100 text-gray-900' : ''}
                  onClick={() => setSortBy('top')}
                >
                  <TrendingUp size={16} className="mr-1" />
                  Top
                </Button>
              </div>
            </div>
            
            {mockPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>
          
          <TabsContent value="trending">
            <div className="bg-white p-4 border border-gray-200 rounded-md">
              <p className="text-center text-gray-500">Trending content will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Index;
