
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: number;
  content: string;
  createdAt: string;
  sender: {
    id: number;
    username: string;
  };
  messageType: string;
  attachmentUrl?: string;
}

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
}

interface ChatWindowProps {
  room: ChatRoom;
  currentUserId?: number;
  onMessageSent: () => void;
}

const ChatWindow = ({ room, currentUserId, onMessageSent }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, [room.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`https://moonmovement.onrender.com/api/chat/rooms/${room.id}/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const messagesData = await response.json();
        setMessages(messagesData);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    try {
      setSending(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`https://moonmovement.onrender.com/api/chat/rooms/${room.id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: newMessage.trim(),
          messageType: 'text'
        })
      });

      if (response.ok) {
        const sentMessage = await response.json();
        setMessages(prev => [...prev, sentMessage]);
        setNewMessage('');
        onMessageSent();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getRoomName = () => {
    if (room.isGroup) {
      return room.name || 'Group Chat';
    }
    
    const otherUser = room.users.find(u => u.user.id !== currentUserId);
    return otherUser?.user.username || 'Unknown User';
  };

  const getOtherUserStatus = () => {
    if (room.isGroup) return null;
    
    const otherUser = room.users.find(u => u.user.id !== currentUserId);
    if (!otherUser) return null;
    
    if (otherUser.user.isOnline) {
      return 'Online';
    }
    
    return `Last seen ${formatDistanceToNow(new Date(otherUser.user.lastSeen), { addSuffix: true })}`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sidebar-foreground">{getRoomName()}</h3>
            {!room.isGroup && (
              <p className="text-sm text-gray-400">{getOtherUserStatus()}</p>
            )}
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical size={16} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="text-center text-gray-400">Loading messages...</div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender.id === currentUserId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender.id === currentUserId
                      ? 'bg-sidebar-primary text-white'
                      : 'bg-sidebar-accent text-sidebar-foreground'
                  }`}
                >
                  {message.sender.id !== currentUserId && (
                    <p className="text-xs text-gray-300 mb-1">{message.sender.username}</p>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender.id === currentUserId ? 'text-gray-200' : 'text-gray-500'
                  }`}>
                    {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-sidebar-border">
        <form onSubmit={sendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
            disabled={sending}
          />
          <Button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="bg-sidebar-primary hover:bg-sidebar-primary/80"
          >
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
