import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageIcon, Link2Icon, FileTextIcon } from 'lucide-react';

const Submit = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('type') === 'image' ? 'image' : 
                    searchParams.get('type') === 'link' ? 'link' : 'post';
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      subreddit: selectedCommunity,
      imageUrl,
      linkUrl,
      author: 'currentUser', // Replace with real user if available
    };
    try {
      await fetch('https://moonmovement.onrender.com/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      navigate('/');
    } catch (err) {
      alert('Failed to submit post');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-lg font-medium mb-4">Create a post</h1>
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-4">
            <div className="p-4 border-b border-gray-200">
              <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a community" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AskReddit">r/AskReddit</SelectItem>
                  <SelectItem value="programming">r/programming</SelectItem>
                  <SelectItem value="funny">r/funny</SelectItem>
                  <SelectItem value="news">r/news</SelectItem>
                  <SelectItem value="gaming">r/gaming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-4">
              <Tabs defaultValue={initialTab} className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="post" className="flex-1">
                    <FileTextIcon size={16} className="mr-2" />
                    Post
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex-1">
                    <ImageIcon size={16} className="mr-2" />
                    Image
                  </TabsTrigger>
                  <TabsTrigger value="link" className="flex-1">
                    <Link2Icon size={16} className="mr-2" />
                    Link
                  </TabsTrigger>
                </TabsList>
                
                <div className="mb-4">
                  <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-2"
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
                    className="min-h-[200px] resize-y"
                  />
                </TabsContent>
                
                <TabsContent value="image">
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center mb-4">
                    <ImageIcon size={48} className="mx-auto mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-600">Drag and drop images or</p>
                    <Button type="button" variant="outline" size="sm">
                      Upload
                    </Button>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                    />
                  </div>
                  <p className="text-sm text-gray-500">Or paste an image URL:</p>
                  <Input
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="mt-2"
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
                  />
                </TabsContent>
              </Tabs>
            </div>
          </Card>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-reddit-primary hover:bg-reddit-hover text-white"
              disabled={!title.trim() || !selectedCommunity}
            >
              Post
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Submit;
