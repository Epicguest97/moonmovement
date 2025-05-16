
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Flame, TrendingUp, Clock } from 'lucide-react';
import PostCard, { Post } from '@/components/post/PostCard';
import CommunityHeader from '@/components/community/CommunityHeader';
import { subreddits } from '@/data/subredditData';
import CommunityCard from '@/components/community/CommunityCard';

// Mock data for posts filtered by community
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

const Community = () => {
  const { communityName } = useParams<{ communityName: string }>();
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);
  
  const subreddit = subreddits[communityName || ''] || null;
  
  useEffect(() => {
    if (communityName) {
      // Filter posts for this community
      const filteredPosts = mockPosts.filter(post => 
        post.subreddit.toLowerCase() === communityName.toLowerCase()
      );
      
      // Apply sorting
      let sortedPosts = [...filteredPosts];
      
      switch (sortBy) {
        case 'new':
          // Sort by newest first
          sortedPosts = sortedPosts.sort((a, b) => {
            const aTime = a.timestamp.includes('hour') ? 
              parseInt(a.timestamp) : 
              parseInt(a.timestamp) * 24;
            const bTime = b.timestamp.includes('hour') ? 
              parseInt(b.timestamp) : 
              parseInt(b.timestamp) * 24;
            return aTime - bTime;
          });
          break;
        case 'top':
          // Sort by vote score
          sortedPosts = sortedPosts.sort((a, b) => b.voteScore - a.voteScore);
          break;
        case 'hot':
        default:
          // Hot algorithm
          sortedPosts = sortedPosts.sort((a, b) => {
            const aTime = a.timestamp.includes('hour') ? 
              parseInt(a.timestamp) : 
              parseInt(a.timestamp) * 24;
            const bTime = b.timestamp.includes('hour') ? 
              parseInt(b.timestamp) : 
              parseInt(b.timestamp) * 24;
            
            const aHot = a.voteScore / Math.pow(aTime + 2, 1.5);
            const bHot = b.voteScore / Math.pow(bTime + 2, 1.5);
            
            return bHot - aHot;
          });
      }
      
      setCommunityPosts(sortedPosts);
    }
  }, [communityName, sortBy]);
  
  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
  };
  
  if (!subreddit) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto p-4">
          <div className="bg-white p-10 rounded-md border border-gray-200 text-center">
            <h2 className="text-2xl font-bold mb-2">Community Not Found</h2>
            <p className="text-gray-600">
              Sorry, the community r/{communityName} doesn't exist or has been banned.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <CommunityHeader 
        subreddit={subreddit}
        isSubscribed={isSubscribed}
        onToggleSubscribe={toggleSubscription}
      />
      
      <div className="container mx-auto px-4 mt-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:flex-grow">
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
            
            {communityPosts.length > 0 ? (
              communityPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="bg-white p-8 border border-gray-200 rounded-md text-center">
                <p className="text-gray-500">No posts in this community yet.</p>
              </div>
            )}
          </div>
          
          <div className="w-full lg:w-80">
            <CommunityCard subreddit={subreddit} isSubscribed={isSubscribed} onToggleSubscribe={toggleSubscription} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Community;
