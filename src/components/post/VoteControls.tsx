
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoteControlsProps {
  score: number;
  voteStatus: 'up' | 'down' | null;
  onVote: (direction: 'up' | 'down') => void;
  vertical?: boolean;
}

const VoteControls = ({ 
  score, 
  voteStatus,
  onVote,
  vertical = true
}: VoteControlsProps) => {
  // Format score for display
  const formatScore = (score: number): string => {
    if (score >= 1000) {
      return `${(score / 1000).toFixed(1)}k`;
    }
    return score.toString();
  };

  return (
    <div className={cn(
      "flex items-center", 
      vertical ? "flex-col py-2 px-2 bg-gray-50" : "flex-row space-x-2"
    )}>
      <button 
        className={cn(
          "vote-button flex items-center justify-center w-6 h-6 rounded-sm",
          voteStatus === 'up' ? "text-reddit-primary" : "text-gray-400 hover:text-gray-800"
        )}
        onClick={() => onVote('up')}
        aria-label="Upvote"
      >
        <ArrowUp size={18} />
      </button>
      
      <span className={cn(
        "font-medium text-xs py-1",
        voteStatus === 'up' ? "text-reddit-primary" : 
        voteStatus === 'down' ? "text-blue-600" : "text-gray-800"
      )}>
        {formatScore(score)}
      </span>
      
      <button 
        className={cn(
          "vote-button flex items-center justify-center w-6 h-6 rounded-sm",
          voteStatus === 'down' ? "text-blue-600" : "text-gray-400 hover:text-gray-800"
        )}
        onClick={() => onVote('down')}
        aria-label="Downvote"
      >
        <ArrowDown size={18} />
      </button>
    </div>
  );
};

export default VoteControls;
