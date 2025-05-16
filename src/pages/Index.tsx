
import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CreatePostCard from '@/components/post/CreatePostCard';
import PostCard, { Post } from '@/components/post/PostCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flame, TrendingUp, Clock } from 'lucide-react';

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
  {
    id: '6',
    title: 'Just finished building my dream gaming PC',
    content: 'After months of saving, I finally built my dream gaming setup! RTX 4090, i9-13900K, 64GB RAM, and a custom water cooling loop. The performance is insane!',
    subreddit: 'pcmasterrace',
    author: 'techgeek',
    timestamp: '3 hours ago',
    voteScore: 3472,
    commentCount: 215,
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=350&fit=crop',
    isText: true,
  },
  {
    id: '7',
    title: 'Found this incredible secluded beach in Thailand',
    content: '',
    subreddit: 'travel',
    author: 'wanderlust',
    timestamp: '2 days ago',
    voteScore: 6821,
    commentCount: 412,
    imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&h=350&fit=crop',
    isText: false,
  },
  {
    id: '8',
    title: 'How to prepare for a software engineering interview?',
    content: 'I have an interview at a FAANG company next month. Any advice on how to prepare for the coding challenges and system design questions?',
    subreddit: 'cscareerquestions',
    author: 'newgrad2023',
    timestamp: '8 hours ago',
    voteScore: 342,
    commentCount: 89,
    isText: true,
  },
  {
    id: '9',
    title: 'Latest research on renewable energy solutions',
    content: 'A new study shows promising results for efficient solar panel technology',
    subreddit: 'science',
    author: 'greentech',
    timestamp: '4 hours ago',
    voteScore: 754,
    commentCount: 67,
    isLink: true,
    linkUrl: 'https://example.com/renewable-energy-research',
  },
  {
    id: '10',
    title: 'Mountain view from my camping trip last weekend',
    content: '',
    subreddit: 'natureisbeautiful',
    author: 'outdoorsy',
    timestamp: '1 day ago',
    voteScore: 5291,
    commentCount: 104,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=350&fit=crop',
    isText: false,
  },
];

// Get unique subreddits for trending
const subreddits = Array.from(new Set(mockPosts.map(post => post.subreddit)));

const Index = () => {
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filter and sort posts
  const sortedPosts = useMemo(() => {
    let filtered = [...mockPosts];
    
    // Apply search filter if there's a query
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subreddit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'new':
        // Sort by newest first (using timestamp as proxy)
        return filtered.sort((a, b) => {
          // Extract hours/days from timestamp strings
          const aTime = a.timestamp.includes('hour') ? 
            parseInt(a.timestamp) : 
            parseInt(a.timestamp) * 24; // Convert days to hours
          const bTime = b.timestamp.includes('hour') ? 
            parseInt(b.timestamp) : 
            parseInt(b.timestamp) * 24; // Convert days to hours
          
          return aTime - bTime; // Lower hours = newer
        });
      case 'top':
        // Sort by vote score descending
        return filtered.sort((a, b) => b.voteScore - a.voteScore);
      case 'hot':
      default:
        // Hot is a combination of recency and score
        return filtered.sort((a, b) => {
          // Extract hours from timestamp as a recency factor
          const aTime = a.timestamp.includes('hour') ? 
            parseInt(a.timestamp) : 
            parseInt(a.timestamp) * 24; // Convert days to hours
          const bTime = b.timestamp.includes('hour') ? 
            parseInt(b.timestamp) : 
            parseInt(b.timestamp) * 24; // Convert days to hours
          
          // Hot score formula: (votes / hours^1.5)
          const aHot = a.voteScore / Math.pow(aTime + 2, 1.5);
          const bHot = b.voteScore / Math.pow(bTime + 2, 1.5);
          
          return bHot - aHot;
        });
    }
  }, [sortBy, searchQuery, mockPosts]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
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
                  <Flame size={16} className="mr-1" />
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
            
            {sortedPosts.length > 0 ? (
              sortedPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="bg-white p-8 border border-gray-200 rounded-md text-center">
                <p className="text-gray-500">No posts match your search.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="trending">
            <div className="bg-white border border-gray-200 rounded-md">
              <h3 className="text-lg font-medium p-4 border-b">Trending Communities</h3>
              <div className="p-2">
                {subreddits.slice(0, 5).map((subreddit, index) => (
                  <div key={subreddit} className="p-2 hover:bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-reddit-primary text-white rounded-full flex items-center justify-center mr-3">
                        <span className="font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <a href={`/r/${subreddit}`} className="font-medium hover:underline">
                          r/{subreddit}
                        </a>
                        <p className="text-xs text-gray-500">
                          {Math.floor(Math.random() * 1000) + 100} members online
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Index;
