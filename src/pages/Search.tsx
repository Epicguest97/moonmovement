
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search as SearchIcon, User, MessageSquare, Users } from 'lucide-react';

interface SearchUser {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  _count: {
    posts: number;
    comments: number;
    communityMemberships: number;
  };
}

interface SearchPost {
  id: number;
  title: string;
  content: string;
  subreddit: string;
  author: {
    username: string;
  };
  createdAt: string;
  _count: {
    votes: number;
    comments: number;
  };
}

interface SearchCommunity {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  onlineCount: number;
  createdAt: string;
}

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [posts, setPosts] = useState<SearchPost[]>([]);
  const [communities, setCommunities] = useState<SearchCommunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      // Search users
      const usersResponse = await fetch(`https://moonmovement.onrender.com/api/search/users?q=${encodeURIComponent(searchQuery)}`);
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData);
      }

      // Search posts
      const postsResponse = await fetch(`https://moonmovement.onrender.com/api/search/posts?q=${encodeURIComponent(searchQuery)}`);
      if (postsResponse.ok) {
        const postsData = await postsResponse.json();
        setPosts(postsData);
      }

      // Search communities
      const communitiesResponse = await fetch(`https://moonmovement.onrender.com/api/search/communities?q=${encodeURIComponent(searchQuery)}`);
      if (communitiesResponse.ok) {
        const communitiesData = await communitiesResponse.json();
        setCommunities(communitiesData);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setQuery(queryParam);
      performSearch(queryParam);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      performSearch(query.trim());
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const totalResults = users.length + posts.length + communities.length;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Header */}
        <Card className="mb-6 bg-sidebar border-sidebar-border">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search users, posts, and communities..."
                  className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
                />
              </div>
              <Button type="submit" className="bg-sidebar-primary hover:bg-sidebar-primary/90">
                Search
              </Button>
            </form>
            
            {query && (
              <div className="mt-4 text-sm text-gray-300">
                {loading ? 'Searching...' : `Found ${totalResults} results for "${query}"`}
              </div>
            )}
          </CardContent>
        </Card>

        {query && !loading && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-sidebar border border-sidebar-border mb-6">
              <TabsTrigger value="all" className="data-[state=active]:bg-sidebar-accent text-sidebar-foreground">
                All ({totalResults})
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-sidebar-accent text-sidebar-foreground">
                Users ({users.length})
              </TabsTrigger>
              <TabsTrigger value="posts" className="data-[state=active]:bg-sidebar-accent text-sidebar-foreground">
                Posts ({posts.length})
              </TabsTrigger>
              <TabsTrigger value="communities" className="data-[state=active]:bg-sidebar-accent text-sidebar-foreground">
                Communities ({communities.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {/* Users Section */}
              {users.length > 0 && (
                <Card className="bg-sidebar border-sidebar-border">
                  <CardHeader>
                    <CardTitle className="text-sidebar-foreground flex items-center gap-2">
                      <User size={20} />
                      Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {users.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border border-sidebar-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-sidebar-primary text-white">
                              {user.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-sidebar-foreground">{user.username}</h3>
                            <div className="flex gap-4 text-sm text-gray-400">
                              <span>{user._count.posts} posts</span>
                              <span>{user._count.comments} comments</span>
                              <span>{user._count.communityMemberships} communities</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-sidebar-border text-sidebar-foreground">
                          View Profile
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Posts Section */}
              {posts.length > 0 && (
                <Card className="bg-sidebar border-sidebar-border">
                  <CardHeader>
                    <CardTitle className="text-sidebar-foreground flex items-center gap-2">
                      <MessageSquare size={20} />
                      Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {posts.slice(0, 3).map((post) => (
                      <div key={post.id} className="p-4 border border-sidebar-border rounded-lg">
                        <h3 className="font-semibold text-sidebar-foreground mb-2">{post.title}</h3>
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{post.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <Badge variant="outline" className="border-sidebar-border">
                            r/{post.subreddit}
                          </Badge>
                          <span>by {post.author.username}</span>
                          <span>{post._count.votes} votes</span>
                          <span>{post._count.comments} comments</span>
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Communities Section */}
              {communities.length > 0 && (
                <Card className="bg-sidebar border-sidebar-border">
                  <CardHeader>
                    <CardTitle className="text-sidebar-foreground flex items-center gap-2">
                      <Users size={20} />
                      Communities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {communities.slice(0, 3).map((community) => (
                      <div key={community.id} className="flex items-center justify-between p-4 border border-sidebar-border rounded-lg">
                        <div>
                          <h3 className="font-semibold text-sidebar-foreground">r/{community.name}</h3>
                          <p className="text-gray-300 text-sm">{community.description}</p>
                          <div className="flex gap-4 text-sm text-gray-400 mt-1">
                            <span>{community.memberCount} members</span>
                            <span>{community.onlineCount} online</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-sidebar-border text-sidebar-foreground">
                          Join
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="users">
              <Card className="bg-sidebar border-sidebar-border">
                <CardContent className="p-6">
                  {users.length > 0 ? (
                    <div className="space-y-4">
                      {users.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 border border-sidebar-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-sidebar-primary text-white">
                                {user.username.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-sidebar-foreground">{user.username}</h3>
                              <div className="flex gap-4 text-sm text-gray-400">
                                <span>{user._count.posts} posts</span>
                                <span>{user._count.comments} comments</span>
                                <span>{user._count.communityMemberships} communities</span>
                              </div>
                              <span className="text-xs text-gray-500">Joined {formatDate(user.createdAt)}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="border-sidebar-border text-sidebar-foreground">
                            View Profile
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      No users found matching your search.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="posts">
              <Card className="bg-sidebar border-sidebar-border">
                <CardContent className="p-6">
                  {posts.length > 0 ? (
                    <div className="space-y-4">
                      {posts.map((post) => (
                        <div key={post.id} className="p-4 border border-sidebar-border rounded-lg">
                          <h3 className="font-semibold text-sidebar-foreground mb-2">{post.title}</h3>
                          <p className="text-gray-300 text-sm mb-3">{post.content}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <Badge variant="outline" className="border-sidebar-border">
                              r/{post.subreddit}
                            </Badge>
                            <span>by {post.author.username}</span>
                            <span>{post._count.votes} votes</span>
                            <span>{post._count.comments} comments</span>
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      No posts found matching your search.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="communities">
              <Card className="bg-sidebar border-sidebar-border">
                <CardContent className="p-6">
                  {communities.length > 0 ? (
                    <div className="space-y-4">
                      {communities.map((community) => (
                        <div key={community.id} className="flex items-center justify-between p-4 border border-sidebar-border rounded-lg">
                          <div>
                            <h3 className="font-semibold text-sidebar-foreground">r/{community.name}</h3>
                            <p className="text-gray-300 text-sm">{community.description}</p>
                            <div className="flex gap-4 text-sm text-gray-400 mt-1">
                              <span>{community.memberCount} members</span>
                              <span>{community.onlineCount} online</span>
                              <span>Created {formatDate(community.createdAt)}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="border-sidebar-border text-sidebar-foreground">
                            Join
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      No communities found matching your search.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {query && !loading && totalResults === 0 && (
          <Card className="bg-sidebar border-sidebar-border">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2 text-sidebar-foreground">No results found</h3>
              <p className="text-gray-300">Try adjusting your search terms or browse popular content.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
