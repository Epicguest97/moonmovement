
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Eye } from 'lucide-react';

interface Community {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  onlineCount: number;
  bannerImage?: string;
  icon?: string;
  createdAt: string;
}

const Community = () => {
  const { communityName } = useParams<{ communityName: string }>();
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunity = async () => {
      if (!communityName) return;
      
      try {
        setLoading(true);
        const response = await fetch('https://moonmovement.onrender.com/api/community');
        if (!response.ok) {
          throw new Error('Failed to fetch communities');
        }
        const communities = await response.json();
        const foundCommunity = communities.find((c: Community) => c.name === communityName);
        
        if (foundCommunity) {
          setCommunity(foundCommunity);
        } else {
          setError('Community not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch community');
        console.error('Error fetching community:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [communityName]);

  const formatMemberCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sidebar-foreground">Loading community...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !community) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-400">{error || 'Community not found'}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Community Header */}
        <Card className="mb-6 bg-sidebar border-sidebar-border">
          {/* Banner */}
          <div 
            className="h-32 bg-gradient-to-r from-sidebar-primary to-sidebar-primary/80 rounded-t-lg"
            style={community.bannerImage ? { 
              backgroundImage: `url(${community.bannerImage})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            } : {}}
          />
          
          <CardContent className="relative pt-8 pb-4">
            {/* Community Icon */}
            <div className="absolute -top-8 left-6">
              <div className="w-16 h-16 bg-sidebar-primary text-white rounded-full flex items-center justify-center border-4 border-sidebar">
                {community.icon ? (
                  <img src={community.icon} alt={community.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold">r/</span>
                )}
              </div>
            </div>

            <div className="ml-20">
              <h1 className="text-3xl font-bold text-sidebar-foreground mb-2">r/{community.name}</h1>
              <p className="text-gray-300 mb-4">{community.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{formatMemberCount(community.memberCount)} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>{community.onlineCount} online</span>
                </div>
                <div>
                  <span>Created {new Date(community.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Actions */}
        <div className="flex gap-4 mb-6">
          <Button className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-white">
            Join Community
          </Button>
          <Button variant="outline" className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
            Create Post
          </Button>
        </div>

        {/* Community Content */}
        <Card className="bg-sidebar border-sidebar-border">
          <CardHeader>
            <h2 className="text-xl font-semibold text-sidebar-foreground">Posts</h2>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-400">
              <p>No posts yet in this community.</p>
              <p className="text-sm mt-2">Be the first to create a post!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Community;
