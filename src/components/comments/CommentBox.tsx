
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
    <div className="bg-white rounded-md border border-gray-200 p-3 mt-4">
      <p className="text-sm font-medium mb-2">Comment as <span className="text-reddit-primary">username</span></p>
      
      <textarea 
        className="w-full p-3 border border-gray-300 rounded resize-y min-h-[100px] focus:outline-none focus:ring-1 focus:ring-reddit-primary focus:border-reddit-primary"
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
            className="mr-2"
          >
            Cancel
          </Button>
          <Button 
            className="bg-reddit-primary hover:bg-reddit-hover text-white" 
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
