
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Sidebar = () => {
  const topCommunities = [
    { name: 'programming', members: 4500000 },
    { name: 'funny', members: 38000000 },
    { name: 'AskReddit', members: 40000000 },
    { name: 'gaming', members: 35000000 },
    { name: 'science', members: 28000000 },
  ];

  return (
    <div className="space-y-4 sticky top-20">
      {/* Top Communities */}
      <Card>
        <CardHeader className="bg-reddit-primary text-white py-3 px-4 rounded-t-md font-medium">
          Top Communities
        </CardHeader>
        <CardContent className="px-0 pt-2 pb-0">
          <ul>
            {topCommunities.map((community, index) => (
              <li key={community.name}>
                <Link 
                  to={`/r/${community.name}`}
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  <span className="mr-4 text-sm font-medium text-gray-500">{index + 1}</span>
                  <div className="mr-3 bg-reddit-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
                    r/
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">r/{community.name}</p>
                    <p className="text-xs text-gray-500">{(community.members / 1000000).toFixed(1)}M members</p>
                  </div>
                </Link>
                {index < topCommunities.length - 1 && <Separator />}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="px-4 py-3">
          <Button className="w-full bg-reddit-primary hover:bg-reddit-hover text-white">
            View All Communities
          </Button>
        </CardFooter>
      </Card>

      {/* About */}
      <Card>
        <CardHeader className="py-3 px-4 font-medium">
          About Reeddit
        </CardHeader>
        <CardContent className="px-4 py-2 text-sm">
          <p className="mb-2">Your front page for what's new and trending online!</p>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <div className="flex items-center mr-4">
              <span className="font-semibold mr-1">16.5M</span>
              users
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-1">100K</span>
              online
            </div>
          </div>
          <p className="text-xs text-gray-500">Created Jun 23, 2023</p>
        </CardContent>
        <Separator />
        <CardFooter className="flex flex-col items-stretch gap-2 px-4 py-3">
          <Button className="w-full bg-reddit-primary hover:bg-reddit-hover text-white">
            Create Post
          </Button>
          <Button variant="outline" className="w-full border-reddit-primary text-reddit-primary hover:bg-reddit-primary/10">
            Create Community
          </Button>
        </CardFooter>
      </Card>

      {/* Footer Links */}
      <div className="text-xs text-gray-500 px-2">
        <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">
          <Link to="/help" className="hover:underline">Help</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/careers" className="hover:underline">Careers</Link>
          <Link to="/press" className="hover:underline">Press</Link>
          <Link to="/advertise" className="hover:underline">Advertise</Link>
          <Link to="/blog" className="hover:underline">Blog</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <Link to="/content-policy" className="hover:underline">Content Policy</Link>
        </div>
        <p>© 2023 Reeddit, Inc. All rights reserved</p>
      </div>
    </div>
  );
};

export default Sidebar;
