
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Cake, Mail, MapPin } from 'lucide-react';
import PostCard, { Post } from '@/components/post/PostCard';

// Mock user data
const mockUsers: Record<string, {
  username: string;
  displayName: string;
  karma: number;
  cakeDay: string;
  bio?: string;
  location?: string;
  email?: string;
  avatarColor: string;
  bannerColor: string;
}> = {
  'traveler123': {
    username: 'traveler123',
    displayName: 'World Traveler',
    karma: 12567,
    cakeDay: 'March 12, 2019',
    bio: 'Exploring the world one country at a time. Always looking for new adventures!',
    location: 'Currently: Japan',
    email: 'traveler@example.com',
    avatarColor: 'bg-blue-500',
    bannerColor: 'bg-blue-100'
  },
  'bakingmom': {
    username: 'bakingmom',
    displayName: 'BakingMom',
    karma: 8743,
    cakeDay: 'June 24, 2020',
    bio: 'Home baker specializing in birthday cakes and special occasions.',
    avatarColor: 'bg-pink-500',
    bannerColor: 'bg-pink-100'
  },
  'filmfan': {
    username: 'filmfan',
    displayName: 'Movie Enthusiast',
    karma: 9254,
    cakeDay: 'January 3, 2018',
    bio: 'Film critic and movie lover. I watch everything from blockbusters to indie films.',
    location: 'Los Angeles, CA',
    avatarColor: 'bg-purple-500',
    bannerColor: 'bg-purple-100'
  },
  'quantumleap': {
    username: 'quantumleap',
    displayName: 'Quantum Physicist',
    karma: 15896,
    cakeDay: 'November 15, 2016',
    bio: 'PhD in Quantum Physics. I enjoy sharing the latest scientific breakthroughs.',
    location: 'Cambridge, UK',
    email: 'quantum@example.com',
    avatarColor: 'bg-green-500',
    bannerColor: 'bg-green-100'
  },
  'catlover': {
    username: 'catlover',
    displayName: 'Cat Enthusiast',
    karma: 23417,
    cakeDay: 'April 1, 2017',
    bio: 'Proud cat parent of 3 felines. I post cat photos daily!',
    avatarColor: 'bg-orange-500',
    bannerColor: 'bg-orange-100'
  },
  'me': {
    username: 'me',
    displayName: 'Current User',
    karma: 4782,
    cakeDay: 'May 16, 2022',
    bio: 'Just browsing and posting on reeddit!',
    location: 'Internet',
    email: 'me@example.com',
    avatarColor: 'bg-reddit-primary',
    bannerColor: 'bg-gray-100'
  }
};

// Mock data for posts
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'What\'s the most beautiful place you\'ve ever visited?',
    content: 'I went to the Swiss Alps last summer and I was absolutely blown away by the scenery. The mountains, the lakes, the charming villages - it was like something from a fairy tale. What places have taken your breath away?',
    subreddit: 'AskReddit',
    author: 'traveler123',
    timestamp: '5 hours ago',
    voteScore: 4321,
    commentCount: 932,
  },
  {
    id: '2',
    title: 'This cake I made for my daughter\'s birthday',
    content: '',
    subreddit: 'Baking',
    author: 'bakingmom',
    timestamp: '7 hours ago',
    voteScore: 2156,
    commentCount: 87,
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=350&fit=crop',
    isText: false,
  },
  {
    id: '3',
    title: 'Anyone else excited for the new Spider-Man movie?',
    content: 'The trailers look amazing and I can\'t wait to see what they do with the multiverse concept. What are your predictions?',
    subreddit: 'movies',
    author: 'filmfan',
    timestamp: '12 hours ago',
    voteScore: 943,
    commentCount: 431,
    isText: true,
  },
  {
    id: '4',
    title: 'Check out this fascinating article on quantum computing',
    content: '',
    subreddit: 'science',
    author: 'quantumleap',
    timestamp: '1 day ago',
    voteScore: 1572,
    commentCount: 265,
    isLink: true,
    linkUrl: 'https://example.com/quantum-computing-breakthrough',
  },
  {
    id: '5',
    title: 'My cat sits like a human and judges me',
    content: '',
    subreddit: 'cats',
    author: 'catlover',
    timestamp: '1 day ago',
    voteScore: 8721,
    commentCount: 324,
    imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&h=350&fit=crop',
    isText: false,
  },
];

// Mock comments for display
const mockComments = [
  {
    id: '101',
    postId: '6',
    postTitle: 'What\'s your favorite video game of all time?',
    subreddit: 'gaming',
    content: 'The Witcher 3. Amazing story, characters, and world building.',
    timestamp: '2 days ago',
    voteScore: 134,
  },
  {
    id: '102',
    postId: '7',
    postTitle: 'Best programming language for beginners?',
    subreddit: 'programming',
    content: 'Python is the best for beginners because of its readable syntax and vast community support.',
    timestamp: '3 days ago',
    voteScore: 89,
  },
  {
    id: '103',
    postId: '8',
    postTitle: 'Tips for traveling on a budget?',
    subreddit: 'travel',
    content: 'Hostels and street food are your best friends! Also, travel during the off-season.',
    timestamp: '1 week ago',
    voteScore: 215,
  }
];

const UserProfile = () => {
  const { username = 'me' } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState<string>('posts');
  
  // Get user data or show not found
  const userData = mockUsers[username];
  
  // Filter posts by this user
  const userPosts = mockPosts.filter(post => post.author === username);
  
  if (!userData) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto p-4">
          <div className="bg-white p-10 rounded-md border border-gray-200 text-center">
            <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
            <p className="text-gray-600">
              The user u/{username} doesn't exist or has deleted their account.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className={`h-32 w-full ${userData.bannerColor}`}></div>
      
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative -mt-16 mb-4">
          <Avatar className="h-24 w-24 border-4 border-white">
            <AvatarFallback className={`text-2xl ${userData.avatarColor} text-white`}>
              {userData.displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{userData.displayName}</h1>
          <p className="text-sm text-gray-500">u/{userData.username}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="flex items-center text-sm text-gray-600">
              <Cake size={16} className="mr-1" />
              <span>Cake day: {userData.cakeDay}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 ml-4">
              <span>Karma: {userData.karma.toLocaleString()}</span>
            </div>
            
            {userData.location && (
              <div className="flex items-center text-sm text-gray-600 ml-4">
                <MapPin size={16} className="mr-1" />
                <span>{userData.location}</span>
              </div>
            )}
            
            {userData.email && (
              <div className="flex items-center text-sm text-gray-600 ml-4">
                <Mail size={16} className="mr-1" />
                <span>{userData.email}</span>
              </div>
            )}
          </div>
          
          {userData.bio && (
            <p className="mt-4 text-sm">{userData.bio}</p>
          )}
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="bg-white border border-gray-200 rounded-md p-1 h-auto">
            <TabsTrigger 
              value="posts"
              className="data-[state=active]:bg-gray-100 py-2 h-auto"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger 
              value="comments"
              className="data-[state=active]:bg-gray-100 py-2 h-auto"
            >
              Comments
            </TabsTrigger>
            <TabsTrigger 
              value="about"
              className="data-[state=active]:bg-gray-100 py-2 h-auto"
            >
              About
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="bg-white p-8 border border-gray-200 rounded-md text-center">
                <p className="text-gray-500">No posts yet.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="comments">
            {mockComments.map(comment => (
              <Card key={comment.id} className="mb-3">
                <CardContent className="p-4">
                  <div className="text-xs text-gray-500 mb-1">
                    <span className="font-medium text-black">{userData.username}</span> commented on{" "}
                    <a href={`/post/${comment.postId}`} className="text-blue-600 hover:underline">
                      {comment.postTitle}
                    </a>{" "}
                    in{" "}
                    <a href={`/r/${comment.subreddit}`} className="text-black hover:underline">
                      r/{comment.subreddit}
                    </a>
                    <span className="mx-1">•</span>
                    <span>{comment.timestamp}</span>
                  </div>
                  
                  <p className="text-sm">{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="about">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Trophy Case</h3>
                    <div className="flex gap-2 flex-wrap">
                      <div className="bg-yellow-100 border border-yellow-200 p-2 rounded-md text-sm">
                        1 Year Club
                      </div>
                      <div className="bg-blue-100 border border-blue-200 p-2 rounded-md text-sm">
                        Helpful Award
                      </div>
                      <div className="bg-green-100 border border-green-200 p-2 rounded-md text-sm">
                        Popular Post
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Account Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        <span className="text-sm">Joined {userData.cakeDay}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm">Total Karma: {userData.karma.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default UserProfile;
