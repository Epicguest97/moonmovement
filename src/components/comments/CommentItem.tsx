
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VoteControls from '../post/VoteControls';
import { CommentType } from './CommentList';
import { MessageSquare, Share, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface CommentProps {
  comment: CommentType;
  depth?: number;
}

const Comment = ({ comment, depth = 0 }: CommentProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [voteStatus, setVoteStatus] = useState<'up' | 'down' | null>(null);
  const [voteScore, setVoteScore] = useState(comment.voteScore);
  const maxDepth = 5;

  const handleVote = (direction: 'up' | 'down') => {
    if (voteStatus === direction) {
      // Remove vote
      setVoteStatus(null);
      setVoteScore(direction === 'up' ? voteScore - 1 : voteScore + 1);
    } else {
      // Change vote or add new vote
      const scoreDelta = voteStatus === null 
        ? (direction === 'up' ? 1 : -1) 
        : (direction === 'up' ? 2 : -2);
      setVoteStatus(direction);
      setVoteScore(voteScore + scoreDelta);
    }
  };

  return (
    <div 
      className="comment mt-2 pt-2"
      style={{ marginLeft: depth > 0 ? '16px' : '0' }}
    >
      <div className={`pl-2 border-l-2 ${depth % maxDepth === 0 ? 'border-primary' : 
                      depth % maxDepth === 1 ? 'border-blue-500' : 
                      depth % maxDepth === 2 ? 'border-green-500' : 
                      depth % maxDepth === 3 ? 'border-yellow-500' : 
                      'border-purple-500'}`}>
        <div className="flex items-center text-xs text-muted-foreground mb-1">
          <Link to={`/user/${comment.author}`} className="font-medium text-foreground hover:underline mr-1">
            u/{comment.author}
          </Link>
          <span className="mx-1">•</span>
          <span>{comment.timestamp}</span>
        </div>
        
        <div className="text-sm mb-2 text-foreground">{comment.content}</div>
        
        <div className="flex items-center text-xs text-muted-foreground">
          <div className="mr-2">
            <VoteControls 
              score={voteScore} 
              voteStatus={voteStatus} 
              onVote={handleVote} 
              vertical={false}
            />
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-xs text-muted-foreground p-1 h-auto hover:text-primary"
            onClick={() => setIsReplying(!isReplying)}
          >
            <MessageSquare size={14} className="mr-1" />
            <span>Reply</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-xs text-muted-foreground ml-1 p-1 h-auto hover:text-primary"
          >
            <Share size={14} className="mr-1" />
            <span>Share</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center text-xs text-muted-foreground ml-1 p-1 h-auto hover:text-primary"
              >
                <MoreHorizontal size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-card border-border">
              <DropdownMenuItem className="text-foreground hover:bg-accent">Save</DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:bg-accent">Report</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-foreground hover:bg-accent">Block User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {isReplying && (
          <div className="mt-2 mb-4">
            <textarea 
              className="w-full p-2 border border-border rounded resize-y min-h-[100px] bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="What are your thoughts?"
            />
            <div className="flex justify-end mt-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mr-2 text-foreground hover:bg-accent"
                onClick={() => setIsReplying(false)}
              >
                Cancel
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Reply
              </Button>
            </div>
          </div>
        )}
        
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">
            {comment.replies.map(reply => (
              <Comment key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
