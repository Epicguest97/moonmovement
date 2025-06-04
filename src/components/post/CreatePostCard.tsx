
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const CreatePostCard = () => {
  return (
    <Card className="mb-4 p-2 bg-card border-border">
      <div className="flex items-center">
        <Link to="/profile" className="mr-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-accent text-accent-foreground">U</AvatarFallback>
          </Avatar>
        </Link>
        
        <Link to="/submit" className="flex-1">
          <Input 
            placeholder="Create Post" 
            className="bg-accent hover:bg-accent/80 border-border cursor-pointer text-foreground placeholder:text-muted-foreground"
            readOnly
          />
        </Link>
      </div>
    </Card>
  );
};

export default CreatePostCard;
