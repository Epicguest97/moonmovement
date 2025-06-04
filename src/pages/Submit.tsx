
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ImageIcon, Link2Icon, X } from 'lucide-react';

interface Community {
  id: number;
  name: string;
  description: string;
  memberCount: number;
}

const Submit = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const [communitiesLoading, setCommunitiesLoading] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
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

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

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
      imageUrl: imageUrl || undefined,
      linkUrl: linkUrl || undefined,
      tags,
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
            
            <div className="p-4 space-y-4">
              {/* Title */}
              <div>
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-gray-400"
                  maxLength={300}
                  required
                />
                <div className="text-xs text-gray-500 text-right mt-1">
                  {title.length}/300
                </div>
              </div>

              {/* Tags */}
              <div>
                <Input
                  placeholder="Add tags (press Enter to add)"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-gray-400"
                />
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-sidebar-accent text-sidebar-foreground">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-400"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <Textarea
                  placeholder="Text (optional)"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] resize-y bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-gray-400"
                />
              </div>

              {/* Image URL */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ImageIcon size={16} className="text-gray-400" />
                  <label className="text-sm text-gray-400">Image URL (optional)</label>
                </div>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-gray-400"
                  type="url"
                />
              </div>

              {/* Link URL */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Link2Icon size={16} className="text-gray-400" />
                  <label className="text-sm text-gray-400">Link URL (optional)</label>
                </div>
                <Input
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-gray-400"
                  type="url"
                />
              </div>
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
