
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageIcon, Link2Icon, FileTextIcon } from 'lucide-react';

interface Community {
  id: number;
  name: string;
  description: string;
  memberCount: number;
}

const Submit = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('type') === 'image' ? 'image' : 
                    searchParams.get('type') === 'link' ? 'link' : 'post';
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const [communitiesLoading, setCommunitiesLoading] = useState(true);
  const navigate = useNavigate();

  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) {
      navigate('/auth');
    }
  }, [username, navigate]);

  // Fetch communities on component mount
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setCommunitiesLoading(true);
        const response = await fetch('https://moonmovement.onrender.com/api/community');
        
        if (response.ok) {
          const data = await response.json();
          setCommunities(data);
        } else {
          console.error('Failed to fetch communities');
        }
      } catch (error) {
        console.error('Error fetching communities:', error);
      } finally {
        setCommunitiesLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      alert('You must be signed in to create a post.');
      navigate('/auth');
      return;
    }

    if (!selectedCommunity) {
      alert('Please select a community.');
      return;
    }

    setLoading(true);
    
    const postData = {
      title,
      content,
      subreddit: selectedCommunity,
      imageUrl,
      linkUrl,
      author: username,
    };

    try {
      const response = await fetch('https://moonmovement.onrender.com/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        navigate('/');
      } else {
        alert('Failed to submit post');
      }
    } catch (err) {
      console.error('Error submitting post:', err);
      alert('Failed to submit post');
    } finally {
      setLoading(false);
    }
  };

  if (!username) return null;

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-lg font-medium mb-4 text-sidebar-foreground">Create a post</h1>
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-4 bg-sidebar border-sidebar-border">
            <div className="p-4 border-b border-sidebar-border">
              <Select 
                value={selectedCommunity} 
                onValueChange={setSelectedCommunity}
                disabled={communitiesLoading}
              >
                <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                  <SelectValue placeholder={communitiesLoading ? "Loading communities..." : "Choose a community"} />
                </SelectTrigger>
                <SelectContent className="bg-sidebar border-sidebar-border">
                  {communities.map((community) => (
                    <SelectItem 
                      key={community.id} 
                      value={community.name}
                      className="text-sidebar-foreground hover:bg-sidebar-accent"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>r/{community.name}</span>
                        <span className="text-xs text-gray-400 ml-2">
                          {community.memberCount} members
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-4">
              <Tabs defaultValue={initialTab} className="w-full">
                <TabsList className="w-full mb-4 bg-sidebar-accent">
                  <TabsTrigger value="post" className="flex-1 data-[state=active]:bg-sidebar text-sidebar-foreground">
                    <FileTextIcon size={16} className="mr-2" />
                    Post
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex-1 data-[state=active]:bg-sidebar text-sidebar-foreground">
                    <ImageIcon size={16} className="mr-2" />
                    Image
                  </TabsTrigger>
                  <TabsTrigger value="link" className="flex-1 data-[state=active]:bg-sidebar text-sidebar-foreground">
                    <Link2Icon size={16} className="mr-2" />
                    Link
                  </TabsTrigger>
                </TabsList>
                
                <div className="mb-4">
                  <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-2 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-gray-400"
                    maxLength={300}
                    required
                  />
                  <div className="text-xs text-gray-500 text-right">
                    {title.length}/300
                  </div>
                </div>
                
                <TabsContent value="post">
                  <Textarea
                    placeholder="Text (optional)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px] resize-y bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-gray-400"
                  />
                </TabsContent>
                
                <TabsContent value="image">
                  <div className="border-2 border-dashed border-sidebar-border rounded-md p-4 text-center mb-4">
                    <ImageIcon size={48} className="mx-auto mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-400">Drag and drop images or</p>
                    <Button type="button" variant="outline" size="sm" className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
                      Upload
                    </Button>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                    />
                  </div>
                  <p className="text-sm text-gray-400">Or paste an image URL:</p>
                  <Input
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="mt-2 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-gray-400"
                    type="url"
                  />
                </TabsContent>
                
                <TabsContent value="link">
                  <Input
                    placeholder="URL"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    type="url"
                    required={initialTab === 'link'}
                    className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-gray-400"
                  />
                </TabsContent>
              </Tabs>
            </div>
          </Card>
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/')}
              className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-white"
              disabled={!title.trim() || !selectedCommunity || loading}
            >
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Submit;
