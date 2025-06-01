
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImageIcon, LinkIcon } from 'lucide-react';

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
        
        <div className="flex ml-2">
          <Link to="/submit?type=image">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <ImageIcon size={20} />
            </Button>
          </Link>
          
          <Link to="/submit?type=link">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <LinkIcon size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CreatePostCard;
