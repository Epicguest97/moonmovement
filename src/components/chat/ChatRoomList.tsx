
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface ChatRoom {
  id: number;
  name?: string;
  isGroup: boolean;
  users: Array<{
    user: {
      id: number;
      username: string;
      isOnline: boolean;
      lastSeen: string;
    };
  }>;
  messages: Array<{
    id: number;
    content: string;
    createdAt: string;
    sender: {
      id: number;
      username: string;
    };
  }>;
  _count: {
    messages: number;
  };
}

interface ChatRoomListProps {
  rooms: ChatRoom[];
  selectedRoom: ChatRoom | null;
  onRoomSelect: (room: ChatRoom) => void;
  currentUserId?: number;
}

const ChatRoomList = ({ rooms, selectedRoom, onRoomSelect, currentUserId }: ChatRoomListProps) => {
  const getRoomName = (room: ChatRoom) => {
    if (room.isGroup) {
      return room.name || 'Group Chat';
    }
    
    const otherUser = room.users.find(u => u.user.id !== currentUserId);
    return otherUser?.user.username || 'Unknown User';
  };

  const getLastMessage = (room: ChatRoom) => {
    if (room.messages.length === 0) return 'No messages yet';
    
    const lastMessage = room.messages[0];
    const isOwnMessage = lastMessage.sender.id === currentUserId;
    const prefix = isOwnMessage ? 'You: ' : '';
    
    return `${prefix}${lastMessage.content}`;
  };

  const getLastMessageTime = (room: ChatRoom) => {
    if (room.messages.length === 0) return '';
    
    return formatDistanceToNow(new Date(room.messages[0].createdAt), { addSuffix: true });
  };

  const isUserOnline = (room: ChatRoom) => {
    if (room.isGroup) return false;
    
    const otherUser = room.users.find(u => u.user.id !== currentUserId);
    return otherUser?.user.isOnline || false;
  };

  return (
    <div className="space-y-1">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`p-3 cursor-pointer hover:bg-sidebar-accent transition-colors ${
            selectedRoom?.id === room.id ? 'bg-sidebar-accent' : ''
          }`}
          onClick={() => onRoomSelect(room)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="relative">
                <div className="w-10 h-10 bg-sidebar-primary rounded-full flex items-center justify-center text-white font-semibold">
                  {getRoomName(room).charAt(0).toUpperCase()}
                </div>
                {isUserOnline(room) && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar"></div>
                )}
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sidebar-foreground truncate">
                    {getRoomName(room)}
                  </p>
                  {room._count.messages > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-sidebar-primary text-white text-xs">
                      {room._count.messages}
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-gray-400 truncate">
                  {getLastMessage(room)}
                </p>
                
                {room.messages.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {getLastMessageTime(room)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {rooms.length === 0 && (
        <div className="p-4 text-center text-gray-400">
          <p>No chats yet</p>
          <p className="text-sm mt-1">Start a conversation with someone!</p>
        </div>
      )}
    </div>
  );
};

export default ChatRoomList;
