
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Bell, 
  Home, 
  Search, 
  Plus, 
  ChevronDown, 
  Menu,
  User,
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Communities for dropdown
  const topCommunities = [
    { name: 'programming', members: '4.2m' },
    { name: 'AskReddit', members: '42.1m' },
    { name: 'movies', members: '31.4m' },
    { name: 'science', members: '28.9m' },
    { name: 'cats', members: '5.3m' },
    { name: 'pcmasterrace', members: '7.1m' },
    { name: 'cscareerquestions', members: '960k' },
    { name: 'travel', members: '8.5m' },
    { name: 'natureisbeautiful', members: '3.7m' },
    { name: 'Baking', members: '2.4m' },
  ];

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Use query parameter for search
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Toggle login state (just for demo)
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="bg-reddit-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <span className="font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold hidden md:block">reeddit</span>
          </Link>
          
          <div className="ml-2 md:ml-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 flex items-center gap-1 text-sm font-medium">
                  <Home size={20} />
                  <span className="hidden md:inline-block">Home</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Your Communities</DropdownMenuLabel>
                {topCommunities.map(community => (
                  <DropdownMenuItem key={community.name} asChild>
                    <Link to={`/r/${community.name}`} className="flex justify-between w-full">
                      <span>r/{community.name}</span>
                      <span className="text-xs text-gray-500">{community.members}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Feeds</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/?sort=top">Popular</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/?sort=new">All</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/submit" className="flex items-center">
                    <Plus size={16} className="mr-2" />
                    Create Post
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search Reeddit" 
              className="pl-10 bg-gray-100 border-gray-200 focus:bg-white w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        
        {/* Actions */}
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search size={20} />
          </Button>
          
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <Link to="/submit">
                <Button variant="ghost" size="icon">
                  <Plus size={20} />
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ml-2">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/user/me">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleLogin}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex"
                onClick={toggleLogin}
              >
                Log In
              </Button>
              <Button 
                size="sm" 
                className="bg-reddit-primary hover:bg-reddit-hover text-white"
                onClick={toggleLogin}
              >
                Sign Up
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={toggleLogin}>Log In</DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleLogin}>Sign Up</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
