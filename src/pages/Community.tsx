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

const Community = () => {
  const { communityName } = useParams<{ communityName: string }>();
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);
  
  const subreddit = subreddits[communityName || ''] || null;
  
  useEffect(() => {
    if (communityName) {
      fetch('https://moonmovement.onrender.com/api/posts')
        .then(res => res.json())
        .then(data => {
          const filtered = data.filter((post: Post) => post.subreddit.toLowerCase() === communityName.toLowerCase());
          setCommunityPosts(filtered);
        })
        .catch(() => setCommunityPosts([]));
    }
  }, [communityName]);
  
  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
  };
  
  if (!subreddit) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto p-4">
          <div className="bg-sidebar p-10 rounded-md border border-sidebar-border text-center">
            <h2 className="text-2xl font-bold mb-2 text-white">Community Not Found</h2>
            <p className="text-gray-300">
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
            <div className="bg-sidebar border border-sidebar-border rounded-md mb-4">
              <div className="flex p-2">
                <Button 
                  variant={sortBy === 'hot' ? 'default' : 'ghost'} 
                  size="sm" 
                  className={sortBy === 'hot' ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}
                  onClick={() => setSortBy('hot')}
                >
                  <Flame size={16} className="mr-1" />
                  Hot
                </Button>
                <Button 
                  variant={sortBy === 'new' ? 'default' : 'ghost'} 
                  size="sm" 
                  className={sortBy === 'new' ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}
                  onClick={() => setSortBy('new')}
                >
                  <Clock size={16} className="mr-1" />
                  New
                </Button>
                <Button 
                  variant={sortBy === 'top' ? 'default' : 'ghost'} 
                  size="sm" 
                  className={sortBy === 'top' ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}
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
              <div className="bg-sidebar p-8 border border-sidebar-border rounded-md text-center">
                <p className="text-gray-300">No posts in this community yet.</p>
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
