
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                <DropdownMenuItem>r/programming</DropdownMenuItem>
                <DropdownMenuItem>r/reactjs</DropdownMenuItem>
                <DropdownMenuItem>r/webdev</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Feeds</DropdownMenuLabel>
                <DropdownMenuItem>Home</DropdownMenuItem>
                <DropdownMenuItem>Popular</DropdownMenuItem>
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Plus size={16} className="mr-2" />
                  Create Community
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search Reeddit" 
              className="pl-10 bg-gray-100 border-gray-200 focus:bg-white w-full"
            />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search size={20} className="md:hidden" />
          </Button>
          
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Plus size={20} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ml-2">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Log In
              </Button>
              <Button size="sm" className="bg-reddit-primary hover:bg-reddit-hover text-white">
                Sign Up
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Log In</DropdownMenuItem>
                  <DropdownMenuItem>Sign Up</DropdownMenuItem>
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
