
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
    <div className="bg-card rounded-md border border-border p-3 mt-4">
      <p className="text-sm font-medium mb-2 text-foreground">Comment as <span className="text-primary">username</span></p>
      
      <textarea 
        className="w-full p-3 border border-border rounded resize-y min-h-[100px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background text-foreground placeholder:text-muted-foreground"
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
            className="mr-2 text-foreground hover:bg-accent"
          >
            Cancel
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground" 
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
