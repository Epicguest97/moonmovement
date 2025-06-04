
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Calendar, Edit, Save, X } from 'lucide-react';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
}

interface Community {
  id: number;
  name: string;
  description: string;
  memberCount: number;
}

interface Post {
  id: number;
  title: string;
  content: string;
  subreddit: string;
  createdAt: string;
  votes: { type: number }[];
  comments: any[];
}

const Profile = () => {
  const { user, isLoggedIn } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<Community[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        // Set basic profile from auth context
        setProfile({
          id: user.id || 1,
          username: user.username,
          email: user.email,
          bio: 'Welcome to my profile!',
          createdAt: new Date().toISOString()
        });

        // Fetch joined communities
        const token = localStorage.getItem('token');
        if (token) {
          const communitiesResponse = await fetch('https://moonmovement.onrender.com/api/community', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (communitiesResponse.ok) {
            const communities = await communitiesResponse.json();
            setJoinedCommunities(communities.slice(0, 3)); // Show first 3 for demo
          }
        }

        // Fetch user posts
        const postsResponse = await fetch('https://moonmovement.onrender.com/api/posts');
        if (postsResponse.ok) {
          const posts = await postsResponse.json();
          const filteredPosts = posts.filter((post: any) => post.author.username === user.username);
          setUserPosts(filteredPosts);
        }

      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isLoggedIn, user]);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedBio('');
    } else {
      setEditedBio(profile?.bio || '');
    }
    setIsEditing(!isEditing);
  };

  const handleSaveBio = () => {
    if (profile) {
      setProfile({ ...profile, bio: editedBio });
    }
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateKarma = (posts: Post[]) => {
    return posts.reduce((total, post) => {
      const postKarma = post.votes.reduce((sum, vote) => sum + vote.type, 0);
      return total + postKarma;
    }, 0);
  };

  if (!isLoggedIn) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="bg-sidebar border-sidebar-border">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-sidebar-foreground">Please Log In</h2>
              <p className="text-gray-300 mb-4">You need to be logged in to view your profile.</p>
              <Button 
                onClick={() => window.location.href = '/auth'}
                className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-white"
              >
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sidebar-foreground">Loading profile...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="bg-sidebar border-sidebar-border">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-sidebar-foreground">Profile Not Found</h2>
              <p className="text-gray-300">Unable to load your profile.</p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-6 bg-sidebar border-sidebar-border">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="bg-sidebar-primary text-white text-2xl">
                  {profile.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-sidebar-foreground">{profile.username}</h1>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditToggle}
                    className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    {isEditing ? <X size={16} /> : <Edit size={16} />}
                    <span className="ml-2">{isEditing ? 'Cancel' : 'Edit'}</span>
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 text-gray-300 mb-4">
                  <div className="flex items-center gap-1">
                    <Mail size={16} />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>Joined {formatDate(profile.createdAt)}</span>
                  </div>
                </div>
                
                {isEditing ? (
                  <div className="flex gap-2">
                    <Textarea
                      value={editedBio}
                      onChange={(e) => setEditedBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
                      rows={3}
                    />
                    <Button
                      onClick={handleSaveBio}
                      size="sm"
                      className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-white"
                    >
                      <Save size={16} />
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-300">{profile.bio}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-sidebar border-sidebar-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-sidebar-foreground">{userPosts.length}</div>
              <div className="text-gray-300">Posts</div>
            </CardContent>
          </Card>
          
          <Card className="bg-sidebar border-sidebar-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-sidebar-foreground">{calculateKarma(userPosts)}</div>
              <div className="text-gray-300">Karma</div>
            </CardContent>
          </Card>
          
          <Card className="bg-sidebar border-sidebar-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-sidebar-foreground">{joinedCommunities.length}</div>
              <div className="text-gray-300">Communities</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="space-y-4">
          <TabsList className="bg-sidebar border border-sidebar-border">
            <TabsTrigger value="posts" className="data-[state=active]:bg-sidebar-accent text-sidebar-foreground">
              Posts
            </TabsTrigger>
            <TabsTrigger value="communities" className="data-[state=active]:bg-sidebar-accent text-sidebar-foreground">
              Communities
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            <Card className="bg-sidebar border-sidebar-border">
              <CardHeader>
                <CardTitle className="text-sidebar-foreground">Your Posts</CardTitle>
              </CardHeader>
              <CardContent>
                {userPosts.length > 0 ? (
                  <div className="space-y-4">
                    {userPosts.map((post) => (
                      <div key={post.id} className="border-b border-sidebar-border pb-4 last:border-b-0">
                        <h3 className="font-semibold text-sidebar-foreground mb-2">{post.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                          <Badge variant="outline" className="border-sidebar-border text-gray-300">
                            r/{post.subreddit}
                          </Badge>
                          <span>{formatDate(post.createdAt)}</span>
                          <span>{post.votes.reduce((sum, vote) => sum + vote.type, 0)} karma</span>
                          <span>{post.comments.length} comments</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>You haven't posted anything yet.</p>
                    <Button 
                      onClick={() => window.location.href = '/submit'}
                      className="mt-4 bg-sidebar-primary hover:bg-sidebar-primary/90 text-white"
                    >
                      Create Your First Post
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="communities">
            <Card className="bg-sidebar border-sidebar-border">
              <CardHeader>
                <CardTitle className="text-sidebar-foreground">Joined Communities</CardTitle>
              </CardHeader>
              <CardContent>
                {joinedCommunities.length > 0 ? (
                  <div className="grid gap-4">
                    {joinedCommunities.map((community) => (
                      <div key={community.id} className="flex items-center justify-between p-4 border border-sidebar-border rounded-lg">
                        <div>
                          <h3 className="font-semibold text-sidebar-foreground">r/{community.name}</h3>
                          <p className="text-gray-300 text-sm">{community.description}</p>
                          <p className="text-gray-400 text-xs">{community.memberCount} members</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = `/r/${community.name}`}
                          className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
                        >
                          Visit
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>You haven't joined any communities yet.</p>
                    <Button 
                      onClick={() => window.location.href = '/communities'}
                      className="mt-4 bg-sidebar-primary hover:bg-sidebar-primary/90 text-white"
                    >
                      Browse Communities
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
