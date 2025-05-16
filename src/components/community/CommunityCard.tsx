
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CommunityCardProps {
  name: string;
  description: string;
  memberCount: number;
  imageUrl?: string;
}

const CommunityCard = ({ name, description, memberCount, imageUrl }: CommunityCardProps) => {
  const formatMemberCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}m`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <Card className="overflow-hidden mb-4 hover:shadow-md transition-shadow duration-200">
      <div 
        className="h-20 bg-gradient-to-r from-reddit-primary to-reddit-secondary" 
        style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      />
      
      <CardContent className="relative pt-8 pb-2">
        {/* Community icon */}
        <div className="absolute -top-6 left-4 rounded-full bg-white border-4 border-white">
          <div className="rounded-full bg-reddit-primary text-white w-12 h-12 flex items-center justify-center overflow-hidden">
            <span className="text-lg font-bold">r/</span>
          </div>
        </div>
        
        <Link to={`/r/${name}`}>
          <h3 className="font-bold text-lg mb-1">r/{name}</h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-2">
          {formatMemberCount(memberCount)} members
        </p>
        
        <p className="text-sm line-clamp-2">{description}</p>
      </CardContent>
      
      <CardFooter className="p-3 pt-0">
        <Button className="w-full bg-reddit-primary hover:bg-reddit-hover text-white">
          Join
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
