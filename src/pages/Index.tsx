
import React, { useState, useMemo, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CreatePostCard from '@/components/post/CreatePostCard';
import PostCard, { Post } from '@/components/post/PostCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flame, TrendingUp, Clock } from 'lucide-react';

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetch('https://moonmovement.onrender.com/api/posts')
      .then(res => res.json())
      .then(data => {
        console.log('API Response:', data);
        // Transform the data to match our expected format
        const transformedPosts = data.map((post: any) => ({
          ...post,
          id: post.id.toString(),
          voteScore: post.votes?.length || 0,
          commentCount: post.comments?.length || 0,
          timestamp: new Date(post.createdAt).toLocaleString(),
          subreddit: 'general' // Default subreddit if not provided
        }));
        setPosts(transformedPosts);
      })
      .catch((error) => {
        console.error('Failed to fetch posts:', error);
        setPosts([]);
      });
  }, []);

  // Get unique subreddits for trending
  const subreddits = useMemo(() => {
    const subs = posts.map(post => post.subreddit || 'general');
    return Array.from(new Set(subs));
  }, [posts]);

  // Filter and sort posts
  const sortedPosts = useMemo(() => {
    let filtered = [...posts];
    if (searchQuery) {
      filtered = filtered.filter(post => {
        const authorName = typeof post.author === 'string' ? post.author : post.author.username;
        return post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
               post.subreddit.toLowerCase().includes(searchQuery.toLowerCase()) ||
               authorName.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }
    switch (sortBy) {
      case 'new':
        return filtered.sort((a, b) => 0); // You can implement real sorting if you have timestamps
      case 'top':
        return filtered.sort((a, b) => b.voteScore - a.voteScore);
      case 'hot':
      default:
        return filtered;
    }
  }, [sortBy, searchQuery, posts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <CreatePostCard />
        
        <Tabs defaultValue="posts" className="mb-4">
          <TabsList className="bg-sidebar border border-sidebar-border rounded-md p-1 h-auto">
            <TabsTrigger 
              value="posts"
              className="data-[state=active]:bg-sidebar-accent text-sidebar-foreground py-2 h-auto"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger 
              value="trending"
              className="data-[state=active]:bg-sidebar-accent text-sidebar-foreground py-2 h-auto"
            >
              Trending
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            <div className="bg-sidebar border border-sidebar-border rounded-md mb-4">
              <div className="flex p-2">
                <Button 
                  variant={sortBy === 'hot' ? 'default' : 'ghost'} 
                  size="sm" 
                  className={sortBy === 'hot' ? 'bg-sidebar-accent text-sidebar-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}
                  onClick={() => setSortBy('hot')}
                >
                  <Flame size={16} className="mr-1" />
                  Hot
                </Button>
                <Button 
                  variant={sortBy === 'new' ? 'default' : 'ghost'} 
                  size="sm" 
                  className={sortBy === 'new' ? 'bg-sidebar-accent text-sidebar-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}
                  onClick={() => setSortBy('new')}
                >
                  <Clock size={16} className="mr-1" />
                  New
                </Button>
                <Button 
                  variant={sortBy === 'top' ? 'default' : 'ghost'} 
                  size="sm" 
                  className={sortBy === 'top' ? 'bg-sidebar-accent text-sidebar-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'}
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
              <div className="bg-sidebar p-8 border border-sidebar-border rounded-md text-center">
                <p className="text-gray-400">No posts match your search.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="trending">
            <div className="bg-sidebar border border-sidebar-border rounded-md">
              <h3 className="text-lg font-medium p-4 border-b border-sidebar-border text-sidebar-foreground">Trending Communities</h3>
              <div className="p-2">
                {subreddits.slice(0, 5).map((subreddit, index) => (
                  <div key={subreddit} className="p-2 hover:bg-sidebar-accent rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-sidebar-primary text-sidebar-primary-foreground rounded-full flex items-center justify-center mr-3">
                        <span className="font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <a href={`/r/${subreddit}`} className="font-medium hover:underline text-sidebar-foreground">
                          r/{subreddit}
                        </a>
                        <p className="text-xs text-gray-400">
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
