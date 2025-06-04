import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
  const { isLoggedIn } = useAuth();
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [membershipLoading, setMembershipLoading] = useState(false);

  useEffect(() => {
    const fetchCommunity = async () => {
      if (!communityName) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // First attempt: try to fetch specific community by name
        const response = await fetch(`https://moonmovement.onrender.com/api/community/name/${communityName}`);
        
        // If the specific endpoint doesn't exist, fall back to fetching all communities
        if (response.ok) {
          const communityData = await response.json();
          setCommunity(communityData);
        } else {
          // Fallback: fetch all communities and filter
          const allCommunitiesResponse = await fetch('https://moonmovement.onrender.com/api/community');
          if (!allCommunitiesResponse.ok) {
            throw new Error('Failed to fetch communities');
          }
          
          const communities = await allCommunitiesResponse.json();
          const foundCommunity = communities.find((c: Community) => c.name === communityName);
          
          if (foundCommunity) {
            setCommunity(foundCommunity);
          } else {
            setError('Community not found');
          }
        }
        
        // Check membership if user is logged in
        if (isLoggedIn && community?.id) {
          const token = localStorage.getItem('token');
          const membershipResponse = await fetch(`https://moonmovement.onrender.com/api/community/${community.id}/membership`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (membershipResponse.ok) {
            const membershipData = await membershipResponse.json();
            setIsMember(membershipData.isMember);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch community');
        console.error('Error fetching community:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [communityName, isLoggedIn]);

  const handleJoinLeave = async () => {
    if (!isLoggedIn || !community) return;
    
    setMembershipLoading(true);
    try {
      const token = localStorage.getItem('token');
      const endpoint = isMember ? 'leave' : 'join';
      const method = isMember ? 'DELETE' : 'POST';
      
      const response = await fetch(`https://moonmovement.onrender.com/api/community/${community.id}/${endpoint}`, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setIsMember(!isMember);
        // Update member count locally
        setCommunity(prev => prev ? {
          ...prev,
          memberCount: prev.memberCount + (isMember ? -1 : 1)
        } : null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update membership');
      }
    } catch (err) {
      console.error('Error updating membership:', err);
      setError(err instanceof Error ? err.message : 'Failed to update membership');
    } finally {
      setMembershipLoading(false);
    }
  };

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
          {isLoggedIn ? (
            <Button 
              onClick={handleJoinLeave}
              disabled={membershipLoading}
              className={isMember 
                ? "bg-gray-600 hover:bg-gray-700 text-white" 
                : "bg-sidebar-primary hover:bg-sidebar-primary/90 text-white"
              }
            >
              {membershipLoading ? 'Loading...' : (isMember ? 'Leave Community' : 'Join Community')}
            </Button>
          ) : (
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-white"
            >
              Login to Join
            </Button>
          )}
          
          {isLoggedIn ? (
            <Button variant="outline" className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
              Create Post
            </Button>
          ) : (
            <Button 
              onClick={() => window.location.href = '/auth'}
              variant="outline" 
              className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
            >
              Login to Post
            </Button>
          )}
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
