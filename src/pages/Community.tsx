
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import CommunityHeader from '@/components/community/CommunityHeader';
import CreatePostCard from '@/components/post/CreatePostCard';
import PostCard, { Post } from '@/components/post/PostCard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Mock data for the community
const mockCommunity = {
  name: 'programming',
  description: 'A community for discussing programming languages, tools, and best practices.',
  memberCount: 4500000,
  onlineCount: 12500,
};

// Mock data for posts
const mockPosts: Post[] = [
  {
    id: '101',
    title: 'I built a tool that automatically refactors your code to follow best practices',
    content: 'After months of work, I\'m excited to share my open-source project that helps analyze and refactor code automatically. It supports JavaScript, Python, and Ruby currently. Check it out and let me know what you think!',
    subreddit: 'programming',
    author: 'codewizard',
    timestamp: '3 hours ago',
    voteScore: 1342,
    commentCount: 187,
    isText: true,
  },
  {
    id: '102',
    title: 'What\'s your favorite underrated programming language?',
    content: 'We all know about Python, JavaScript, and Java, but what about the less popular languages that you think deserve more attention? For me, it\'s Elixir - great concurrency model and built on the robust Erlang VM.',
    subreddit: 'programming',
    author: 'language_enthusiast',
    timestamp: '7 hours ago',
    voteScore: 876,
    commentCount: 342,
    isText: true,
  },
  {
    id: '103',
    title: 'Interesting visualization of sorting algorithms',
    content: '',
    subreddit: 'programming',
    author: 'algo_lover',
    timestamp: '10 hours ago',
    voteScore: 2156,
    commentCount: 94,
    isLink: true,
    linkUrl: 'https://example.com/sorting-visualized',
  },
  {
    id: '104',
    title: 'The dark side of programming: my burnout story and how I recovered',
    content: 'After 10 years of non-stop coding, I hit a wall. I couldn\'t bring myself to open an IDE. Here\'s how I recognized the symptoms, what I did to recover, and how I found joy in programming again.',
    subreddit: 'programming',
    author: 'recovered_dev',
    timestamp: '1 day ago',
    voteScore: 3421,
    commentCount: 456,
    isText: true,
  },
];

const Community = () => {
  const { communityName } = useParams();
  
  // In a real app, you would fetch the community data based on the communityName parameter
  
  return (
    <MainLayout>
      <CommunityHeader 
        name={mockCommunity.name}
        description={mockCommunity.description}
        memberCount={mockCommunity.memberCount}
        onlineCount={mockCommunity.onlineCount}
      />
      
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <CreatePostCard />
            
            {mockPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="w-full lg:w-80">
            <Card className="mb-4">
              <CardHeader className="py-3 px-4 font-medium">About Community</CardHeader>
              <CardContent className="px-4 py-2">
                <p className="text-sm mb-3">{mockCommunity.description}</p>
                
                <div className="flex items-center text-sm mb-3">
                  <div className="flex-1">
                    <p className="font-bold">{mockCommunity.memberCount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Members</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                      {mockCommunity.onlineCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500">Created Jan 25, 2008</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-3 px-4 font-medium">r/{mockCommunity.name} Rules</CardHeader>
              <CardContent className="px-0 py-0">
                <ol className="list-decimal list-inside text-sm">
                  <li className="py-2 px-4 border-b border-gray-200">Content must be related to programming</li>
                  <li className="py-2 px-4 border-b border-gray-200">No low effort posts or comments</li>
                  <li className="py-2 px-4 border-b border-gray-200">Be respectful and constructive</li>
                  <li className="py-2 px-4 border-b border-gray-200">No self-promotion without community engagement</li>
                  <li className="py-2 px-4">Follow general Reeddit rules</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Community;
