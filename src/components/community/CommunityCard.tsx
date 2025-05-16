
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Subreddit } from '@/data/subredditData';

interface CommunityCardProps {
  name: string;
  description: string;
  memberCount: number;
  imageUrl?: string;
  isJoined?: boolean;
  onToggleJoin?: () => void;
}

// Add an alternative prop interface that accepts a Subreddit object
interface CommunityCardWithSubredditProps {
  subreddit: Subreddit;
  isSubscribed?: boolean;
  onToggleSubscribe?: () => void;
}

// Union type that accepts either prop style
type Props = CommunityCardProps | CommunityCardWithSubredditProps;

// Type guard to check which prop style was used
const hasSubreddit = (props: Props): props is CommunityCardWithSubredditProps => {
  return 'subreddit' in props;
};

const CommunityCard = (props: Props) => {
  // Extract values from either prop style
  const name = hasSubreddit(props) ? props.subreddit.name : props.name;
  const description = hasSubreddit(props) ? props.subreddit.description : props.description;
  const memberCount = hasSubreddit(props) ? props.subreddit.memberCount : props.memberCount;
  const imageUrl = hasSubreddit(props) ? props.subreddit.bannerImage : props.imageUrl;
  const isJoined = hasSubreddit(props) ? props.isSubscribed : props.isJoined;
  
  const formatMemberCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}m`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const handleToggleJoin = () => {
    if (hasSubreddit(props) && props.onToggleSubscribe) {
      props.onToggleSubscribe();
    } else if (!hasSubreddit(props) && props.onToggleJoin) {
      props.onToggleJoin();
    }
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
        <Button 
          className={isJoined ? "w-full bg-white hover:bg-gray-100 text-gray-800 border border-gray-300" : "w-full bg-reddit-primary hover:bg-reddit-hover text-white"}
          onClick={handleToggleJoin}
        >
          {isJoined ? 'Joined' : 'Join'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
