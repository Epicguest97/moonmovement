
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
  Newspaper,
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
    <header className="sticky top-0 z-50 bg-sidebar border-b border-sidebar-border shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="bg-sidebar-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <span className="font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold hidden md:block text-white">reeddit</span>
          </Link>
          
          <div className="ml-2 md:ml-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 flex items-center gap-1 text-sm font-medium text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <Home size={20} />
                  <span className="hidden md:inline-block">Home</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-sidebar border-sidebar-border">
                <DropdownMenuLabel className="text-white">Your Communities</DropdownMenuLabel>
                {topCommunities.map(community => (
                  <DropdownMenuItem key={community.name} asChild>
                    <Link to={`/r/${community.name}`} className="flex justify-between w-full text-gray-300 hover:text-white">
                      <span>r/{community.name}</span>
                      <span className="text-xs text-gray-500">{community.members}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-sidebar-border" />
                <DropdownMenuLabel className="text-white">Feeds</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/news" className="text-gray-300 hover:text-white flex items-center">
                    <Newspaper size={16} className="mr-2" />
                    Startup News
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/?sort=top" className="text-gray-300 hover:text-white">Popular</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/?sort=new" className="text-gray-300 hover:text-white">All</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-sidebar-border" />
                <DropdownMenuItem asChild>
                  <Link to="/submit" className="flex items-center text-gray-300 hover:text-white">
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
              className="pl-10 bg-sidebar-accent border-sidebar-border focus:bg-sidebar text-white w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        
        {/* Actions */}
        <div className="flex items-center space-x-1">
          <Link to="/news" className="mr-2">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Newspaper size={16} className="mr-2" />
              News
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <Search size={20} />
          </Button>
          
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Bell size={20} />
              </Button>
              <Link to="/submit">
                <Button variant="ghost" size="icon" className="text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <Plus size={20} />
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ml-2 text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-sidebar border-sidebar-border">
                  <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/user/me" className="text-gray-300 hover:text-white">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="text-gray-300 hover:text-white">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-sidebar-border" />
                  <DropdownMenuItem onClick={toggleLogin} className="text-gray-300 hover:text-white">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex border-sidebar-border bg-transparent text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                onClick={toggleLogin}
              >
                Log In
              </Button>
              <Button 
                size="sm" 
                className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-white"
                onClick={toggleLogin}
              >
                Sign Up
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <Menu size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-sidebar border-sidebar-border">
                  <DropdownMenuItem onClick={toggleLogin} className="text-gray-300 hover:text-white">Log In</DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleLogin} className="text-gray-300 hover:text-white">Sign Up</DropdownMenuItem>
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
