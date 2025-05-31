
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CommentBoxProps {
  onSubmit?: (content: string) => void;
}

const CommentBox = ({ onSubmit }: CommentBoxProps) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (content.trim() && onSubmit) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <div className="bg-sidebar rounded-md border border-sidebar-border p-3 mt-4">
      <p className="text-sm font-medium mb-2 text-sidebar-foreground">Comment as <span className="text-sidebar-primary">username</span></p>
      
      <textarea 
        className="w-full p-3 border border-sidebar-border rounded resize-y min-h-[100px] focus:outline-none focus:ring-1 focus:ring-sidebar-primary focus:border-sidebar-primary bg-sidebar-accent text-sidebar-foreground placeholder:text-gray-400"
        placeholder="What are your thoughts?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
      
      {isFocused && (
        <div className="flex justify-end mt-2">
          <Button 
            variant="ghost" 
            onClick={() => {
              setIsFocused(false);
              setContent('');
            }}
            className="mr-2 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            Cancel
          </Button>
          <Button 
            className="bg-sidebar-primary hover:bg-green-600 text-sidebar-primary-foreground" 
            disabled={!content.trim()}
            onClick={handleSubmit}
          >
            Comment
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentBox;
