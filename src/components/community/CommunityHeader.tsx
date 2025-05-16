
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, BellOff } from 'lucide-react';

interface CommunityHeaderProps {
  name: string;
  description: string;
  memberCount: number;
  onlineCount: number;
  bannerUrl?: string;
  iconUrl?: string;
}

const CommunityHeader = ({
  name,
  description,
  memberCount,
  onlineCount,
  bannerUrl,
  iconUrl
}: CommunityHeaderProps) => {
  const [isJoined, setIsJoined] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<'all' | 'some' | 'none'>('none');
  
  const formatMemberCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}m`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };
  
  const toggleJoin = () => {
    setIsJoined(!isJoined);
  };
  
  const toggleNotification = () => {
    const newStatus = notificationStatus === 'none' ? 'all' : 'none';
    setNotificationStatus(newStatus);
  };
  
  return (
    <div className="mb-4">
      {/* Banner */}
      <div 
        className="h-20 md:h-32 bg-gradient-to-r from-reddit-primary to-reddit-secondary" 
        style={bannerUrl ? { backgroundImage: `url(${bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      />
      
      {/* Community info */}
      <div className="bg-white px-3 pt-3 pb-1 border-b border-gray-200">
        <div className="container mx-auto">
          <div className="flex items-end mb-3 relative">
            {/* Community icon */}
            <div className="rounded-full bg-white border-4 border-white -mt-6 mr-3 relative z-10">
              <div className="rounded-full bg-reddit-primary text-white w-16 h-16 flex items-center justify-center overflow-hidden">
                {iconUrl ? (
                  <img src={iconUrl} alt={`${name} icon`} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold">r/</span>
                )}
              </div>
            </div>
            
            {/* Community title and metrics */}
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold flex items-center">
                r/{name}
              </h1>
              <p className="text-sm text-gray-500">r/{name}</p>
            </div>
            
            {/* Action buttons */}
            <div className="flex space-x-2">
              <Button 
                className={isJoined ? "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100" : "bg-reddit-primary hover:bg-reddit-hover text-white"}
                size="sm"
                onClick={toggleJoin}
              >
                {isJoined ? 'Joined' : 'Join'}
              </Button>
              
              {isJoined && (
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-gray-300"
                  onClick={toggleNotification}
                >
                  {notificationStatus === 'none' ? <Bell size={16} /> : <BellOff size={16} />}
                </Button>
              )}
            </div>
          </div>
          
          {/* Stats bar */}
          <div className="flex items-center text-sm mb-3">
            <div className="flex items-center mr-4">
              <span className="font-medium mr-1">{formatMemberCount(memberCount)}</span>
              <span className="text-gray-500">Members</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
              <span className="font-medium mr-1">{formatMemberCount(onlineCount)}</span>
              <span className="text-gray-500">Online</span>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-sm mb-3">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
