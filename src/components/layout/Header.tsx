import React, { useState, useEffect } from 'react';
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
  Building2,
  Map,
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

// Define a type for the Community
interface Community {
  id: number;
  name: string;
  memberCount: number;
  description?: string;
  bannerImage?: string;
  icon?: string;
  createdAt?: string;
  onlineCount?: number;
}

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  // Fetch communities on component mount
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://moonmovement.onrender.com/api/community');
        
        if (!response.ok) {
          throw new Error('Failed to fetch communities');
        }
        
        const data = await response.json();
        setCommunities(data);
      } catch (err) {
        console.error('Error fetching communities:', err);
        setError('Failed to load communities');
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // Format member count for display (e.g., 1000 -> 1k, 1000000 -> 1m)
  const formatMemberCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}m`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-sidebar border-b border-sidebar-border shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="bg-sidebar-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <span className="font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold hidden md:block text-white">moonmovemt</span>
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
              <DropdownMenuContent align="start" className="w-64 bg-sidebar border-sidebar-border">
                <DropdownMenuLabel className="text-white">Your Communities</DropdownMenuLabel>
                {loading ? (
                  <DropdownMenuItem disabled className="text-gray-400">Loading communities...</DropdownMenuItem>
                ) : error ? (
                  <DropdownMenuItem disabled className="text-gray-400">Error loading communities</DropdownMenuItem>
                ) : communities.length > 0 ? (
                  communities.slice(0, 10).map(community => (
                    <DropdownMenuItem key={community.id} asChild>
                      <Link 
                        to={`/r/${community.name}`} 
                        className="flex items-center justify-between w-full text-gray-300 hover:text-white py-1.5"
                      >
                        <span className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-sidebar-primary flex-shrink-0 flex items-center justify-center overflow-hidden mr-2">
                            {community.icon ? (
                              <img 
                                src={community.icon} 
                                alt={`${community.name} icon`} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-bold">r/</span>
                            )}
                          </div>
                          <span>r/{community.name}</span>
                        </span>
                        <span className="text-xs text-gray-500">{formatMemberCount(community.memberCount)}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled className="text-gray-400">No communities found</DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator className="bg-sidebar-border" />
                <DropdownMenuLabel className="text-white">Feeds</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center text-gray-300 hover:text-white">
                    <Home size={16} className="mr-2" />
                    <span>Home</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-sidebar-border" />
                <DropdownMenuLabel className="text-white">More</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to="/r/create" className="flex items-center text-gray-300 hover:text-white">
                    <Plus size={16} className="mr-2" />
                    <span>Create Community</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search users, posts, and communities"
              className="pl-9 bg-sidebar-accent border-sidebar-border text-sidebar-foreground focus:ring-sidebar-primary focus:border-sidebar-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        
        {/* Right section */}
        <div className="flex items-center space-x-1">
          {/* Add navigation links here */}
          <Link to="/search" className="mr-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Search size={16} className="mr-2" />
              Search
            </Button>
          </Link>

          <Link to="/news" className="mr-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Newspaper size={16} className="mr-2" />
              News
            </Button>
          </Link>
          
          <Link to="/unicorns-india" className="mr-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Building2 size={16} className="mr-2" />
              Unicorns
            </Button>
          </Link>
          
          <Link to="/districts" className="mr-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Map size={16} className="mr-2" />
              Districts
            </Button>
          </Link>
          
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={() => navigate('/search')}>
                <Search size={20} />
              </Button>
              
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
                  <Button variant="ghost" size="icon" className="text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-sidebar border-sidebar-border">
                  <DropdownMenuLabel className="text-sidebar-foreground">
                    {user?.username || 'User'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-sidebar-border" />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="text-gray-300 hover:text-white">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="text-gray-300 hover:text-white">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-sidebar-border" />
                  <DropdownMenuItem onClick={handleLogout} className="text-gray-300 hover:text-white cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/auth?mode=login">
                <Button variant="outline" size="sm" className="hidden md:flex border-sidebar-border bg-transparent text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  Log In
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button size="sm" className="bg-sidebar-primary hover:bg-sidebar-primary/90 text-white">
                  Sign Up
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <Menu size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-sidebar border-sidebar-border">
                  <DropdownMenuItem asChild>
                    <Link to="/search" className="text-gray-300 hover:text-white">Search</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/auth?mode=login" className="text-gray-300 hover:text-white">Log In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/auth?mode=signup" className="text-gray-300 hover:text-white">Sign Up</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
