
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare,
  Share,
  Bookmark,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface PostFooterProps {
  commentCount: number;
  postId: string;
}

const PostFooter = ({ commentCount, postId }: PostFooterProps) => {
  return (
    <div className="flex items-center text-xs text-gray-500 mt-2 relative z-20">
      <Link 
        to={`/post/${postId}`}
        className="flex items-center mr-4 hover:bg-gray-100 py-1 px-2 rounded"
      >
        <MessageSquare size={16} className="mr-1" />
        <span>
          {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
        </span>
      </Link>

      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center text-xs text-gray-500 mr-4 p-1 h-auto"
      >
        <Share size={16} className="mr-1" />
        <span>Share</span>
      </Button>

      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center text-xs text-gray-500 mr-4 p-1 h-auto"
      >
        <Bookmark size={16} className="mr-1" />
        <span>Save</span>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-xs text-gray-500 p-1 h-auto"
          >
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Hide</DropdownMenuItem>
          <DropdownMenuItem>Report</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Block Community</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PostFooter;
