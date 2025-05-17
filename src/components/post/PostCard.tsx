
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import VoteControls from './VoteControls';
import PostContent from './PostContent';
import PostFooter from './PostFooter';

export interface Post {
  id: string;
  title: string;
  content: string;
  subreddit: string;
  author: string;
  timestamp: string;
  voteScore: number;
  commentCount: number;
  imageUrl?: string;
  isText?: boolean;
  isLink?: boolean;
  linkUrl?: string;
}

interface PostCardProps {
  post: Post;
  isCompact?: boolean;
}

const PostCard = ({ post, isCompact = false }: PostCardProps) => {
  const [currentVoteScore, setCurrentVoteScore] = useState(post.voteScore);
  const [voteStatus, setVoteStatus] = useState<'up' | 'down' | null>(null);

  const handleVote = (direction: 'up' | 'down') => {
    if (voteStatus === direction) {
      // Remove vote
      setVoteStatus(null);
      setCurrentVoteScore(direction === 'up' ? currentVoteScore - 1 : currentVoteScore + 1);
    } else {
      // Change vote or add new vote
      const scoreDelta = voteStatus === null 
        ? (direction === 'up' ? 1 : -1) 
        : (direction === 'up' ? 2 : -2);
      setVoteStatus(direction);
      setCurrentVoteScore(currentVoteScore + scoreDelta);
    }
  };

  return (
    <Card className="post-card overflow-hidden mb-3 bg-sidebar border-sidebar-border hover:border-sidebar-primary hover:shadow">
      <div className="flex">
        <VoteControls 
          score={currentVoteScore} 
          voteStatus={voteStatus} 
          onVote={handleVote} 
        />
        
        <div className="flex-1 p-2">
          <div className="flex items-center text-xs text-gray-400 mb-1">
            <Link to={`/r/${post.subreddit}`} className="font-medium text-gray-200 hover:underline mr-1">
              r/{post.subreddit}
            </Link>
            <span className="mx-1">•</span>
            Posted by{" "}
            <Link to={`/user/${post.author}`} className="hover:underline mx-1 text-gray-400">
              u/{post.author}
            </Link>
            <span className="mx-1">•</span>
            <span>{post.timestamp}</span>
          </div>
          
          <Link to={`/post/${post.id}`}>
            <h2 className="text-lg font-medium mb-1 text-white hover:text-sidebar-primary">{post.title}</h2>
          </Link>
          
          <PostContent post={post} isCompact={isCompact} />
          
          <PostFooter 
            commentCount={post.commentCount} 
            postId={post.id} 
          />
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
