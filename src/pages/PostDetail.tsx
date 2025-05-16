
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PostCard, { Post } from '@/components/post/PostCard';
import CommentBox from '@/components/comments/CommentBox';
import CommentList, { CommentType } from '@/components/comments/CommentList';
import { Card } from '@/components/ui/card';

// Mock data for the post
const mockPost: Post = {
  id: '1',
  title: 'What\'s the most beautiful place you\'ve ever visited?',
  content: 'I went to the Swiss Alps last summer and I was absolutely blown away by the scenery. The mountains, the lakes, the charming villages - it was like something from a fairy tale. What places have taken your breath away?',
  subreddit: 'AskReddit',
  author: 'traveler123',
  timestamp: '5 hours ago',
  voteScore: 4321,
  commentCount: 932,
  isText: true,
};

// Mock data for comments
const mockComments: CommentType[] = [
  {
    id: '1',
    author: 'mountainclimber',
    content: 'The Grand Canyon at sunrise. There\'s something magical about the way the light catches the different rock layers and creates this incredible depth of color. Nothing else like it.',
    timestamp: '4 hours ago',
    voteScore: 532,
    replies: [
      {
        id: '1-1',
        author: 'traveler123',
        content: 'That\'s on my bucket list! Did you hike down into the canyon?',
        timestamp: '3 hours ago',
        voteScore: 87,
        replies: [
          {
            id: '1-1-1',
            author: 'mountainclimber',
            content: 'Yes! I did the Bright Angel Trail down to Indian Garden. It\'s tough but absolutely worth it.',
            timestamp: '3 hours ago',
            voteScore: 46,
          }
        ]
      }
    ]
  },
  {
    id: '2',
    author: 'islandhopper',
    content: 'Bora Bora. The water is so crystal clear and turquoise it looks photoshopped even when you\'re there in person.',
    timestamp: '3 hours ago',
    voteScore: 321,
    replies: [
      {
        id: '2-1',
        author: 'scubadiver',
        content: 'The snorkeling there is incredible too! Did you get to see the stingrays?',
        timestamp: '2 hours ago',
        voteScore: 28,
      }
    ]
  },
  {
    id: '3',
    author: 'cityexplorer',
    content: 'Kyoto, Japan during cherry blossom season. The blend of natural beauty with the historical temples and shrines creates such a magical atmosphere.',
    timestamp: '2 hours ago',
    voteScore: 215,
  },
  {
    id: '4',
    author: 'desertlover',
    content: 'Antelope Canyon in Arizona. Those winding slot canyons with the light beams coming through... absolutely surreal.',
    timestamp: '1 hour ago',
    voteScore: 97,
  },
];

const PostDetail = () => {
  const { postId } = useParams();
  
  useEffect(() => {
    // Scrolls the window to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  
  if (!mockPost) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto text-center py-10">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p className="mt-2">The post you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="text-reddit-primary hover:underline mt-4 inline-block">
            Back to Home
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <PostCard post={mockPost} isCompact={false} />
        </div>
        
        <Card className="p-0 overflow-hidden">
          <CommentBox />
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm">
            <span className="font-medium">Comments</span> ({mockPost.commentCount})
          </div>
          <div className="p-4">
            <CommentList comments={mockComments} />
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PostDetail;
