
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { MessageSquare, Share } from 'lucide-react';
import VoteControls from './VoteControls';
import PostContent from './PostContent';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: string;
  } | string; // Support both formats for backward compatibility
  subreddit: string;
  timestamp: string;
  voteScore: number;
  commentCount: number;
  imageUrl?: string;
  videoUrl?: string;
  linkUrl?: string;
  isText?: boolean;
  isLink?: boolean;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  // Handle both author object and string formats
  const authorName = typeof post.author === 'string' ? post.author : post.author.username;
  
  // Mock vote handling for now
  const handleVote = (direction: 'up' | 'down') => {
    console.log('Vote:', direction, 'on post:', post.id);
  };
  
  return (
    <Card className="post-card overflow-hidden mb-4 bg-card border-border">
      <div className="flex">
        <VoteControls 
          score={post.voteScore} 
          voteStatus={null} 
          onVote={handleVote} 
        />
        
        <div className="flex-1 p-4">
          <div className="flex items-center text-xs text-muted-foreground mb-2">
            <Link to={`/r/${post.subreddit}`} className="font-medium text-foreground hover:underline mr-1">
              r/{post.subreddit}
            </Link>
            <span className="mx-1">•</span>
            Posted by{" "}
            <Link to={`/user/${authorName}`} className="hover:underline mx-1 text-muted-foreground">
              u/{authorName}
            </Link>
            <span className="mx-1">•</span>
            <span>{post.timestamp}</span>
          </div>
          
          <Link to={`/post/${post.id}`}>
            <h3 className="text-lg font-semibold mb-2 text-foreground hover:text-primary cursor-pointer">
              {post.title}
            </h3>
          </Link>
          
          <PostContent post={post} />
          
          <div className="flex items-center mt-3 text-xs text-muted-foreground">
            <Link 
              to={`/post/${post.id}`}
              className="flex items-center hover:bg-accent hover:text-accent-foreground rounded p-1 -ml-1"
            >
              <MessageSquare size={16} className="mr-1" />
              {post.commentCount} Comments
            </Link>
            
            <button className="flex items-center hover:bg-accent hover:text-accent-foreground rounded p-1 ml-2">
              <Share size={16} className="mr-1" />
              Share
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
