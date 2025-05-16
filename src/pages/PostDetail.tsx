
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import VoteControls from '@/components/post/VoteControls';
import PostContent from '@/components/post/PostContent';
import PostFooter from '@/components/post/PostFooter';
import CommentBox from '@/components/comments/CommentBox';
import CommentList from '@/components/comments/CommentList';
import { Post } from '@/components/post/PostCard';
import { CommentType } from '@/components/comments/CommentList';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { subreddits } from '@/data/subredditData';

// Mock data for posts
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'What\'s the most beautiful place you\'ve ever visited?',
    content: 'I went to the Swiss Alps last summer and I was absolutely blown away by the scenery. The mountains, the lakes, the charming villages - it was like something from a fairy tale. What places have taken your breath away?',
    subreddit: 'AskReddit',
    author: 'traveler123',
    timestamp: '5 hours ago',
    voteScore: 4321,
    commentCount: 932,
  },
  {
    id: '2',
    title: 'This cake I made for my daughter\'s birthday',
    content: '',
    subreddit: 'Baking',
    author: 'bakingmom',
    timestamp: '7 hours ago',
    voteScore: 2156,
    commentCount: 87,
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=350&fit=crop',
    isText: false,
  },
  {
    id: '3',
    title: 'Anyone else excited for the new Spider-Man movie?',
    content: 'The trailers look amazing and I can\'t wait to see what they do with the multiverse concept. What are your predictions?',
    subreddit: 'movies',
    author: 'filmfan',
    timestamp: '12 hours ago',
    voteScore: 943,
    commentCount: 431,
    isText: true,
  },
  {
    id: '4',
    title: 'Check out this fascinating article on quantum computing',
    content: '',
    subreddit: 'science',
    author: 'quantumleap',
    timestamp: '1 day ago',
    voteScore: 1572,
    commentCount: 265,
    isLink: true,
    linkUrl: 'https://example.com/quantum-computing-breakthrough',
  },
  {
    id: '5',
    title: 'My cat sits like a human and judges me',
    content: '',
    subreddit: 'cats',
    author: 'catlover',
    timestamp: '1 day ago',
    voteScore: 8721,
    commentCount: 324,
    imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&h=350&fit=crop',
    isText: false,
  },
  {
    id: '6',
    title: 'Just finished building my dream gaming PC',
    content: 'After months of saving, I finally built my dream gaming setup! RTX 4090, i9-13900K, 64GB RAM, and a custom water cooling loop. The performance is insane!',
    subreddit: 'pcmasterrace',
    author: 'techgeek',
    timestamp: '3 hours ago',
    voteScore: 3472,
    commentCount: 215,
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=350&fit=crop',
    isText: true,
  },
  {
    id: '7',
    title: 'Found this incredible secluded beach in Thailand',
    content: '',
    subreddit: 'travel',
    author: 'wanderlust',
    timestamp: '2 days ago',
    voteScore: 6821,
    commentCount: 412,
    imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&h=350&fit=crop',
    isText: false,
  },
  {
    id: '8',
    title: 'How to prepare for a software engineering interview?',
    content: 'I have an interview at a FAANG company next month. Any advice on how to prepare for the coding challenges and system design questions?',
    subreddit: 'cscareerquestions',
    author: 'newgrad2023',
    timestamp: '8 hours ago',
    voteScore: 342,
    commentCount: 89,
    isText: true,
  },
  {
    id: '9',
    title: 'Latest research on renewable energy solutions',
    content: 'A new study shows promising results for efficient solar panel technology',
    subreddit: 'science',
    author: 'greentech',
    timestamp: '4 hours ago',
    voteScore: 754,
    commentCount: 67,
    isLink: true,
    linkUrl: 'https://example.com/renewable-energy-research',
  },
  {
    id: '10',
    title: 'Mountain view from my camping trip last weekend',
    content: '',
    subreddit: 'natureisbeautiful',
    author: 'outdoorsy',
    timestamp: '1 day ago',
    voteScore: 5291,
    commentCount: 104,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=350&fit=crop',
    isText: false,
  },
];

// Mock comments data (more detailed for each post)
const mockComments: Record<string, CommentType[]> = {
  '1': [
    {
      id: '101',
      author: 'worldexplorer',
      content: 'Santorini, Greece. The white buildings against the deep blue sea is just breathtaking.',
      timestamp: '4 hours ago',
      voteScore: 421,
      replies: [
        {
          id: '1011',
          author: 'islandlover',
          content: 'I second this! The sunsets there are absolutely magical.',
          timestamp: '3 hours ago',
          voteScore: 156,
        },
        {
          id: '1012',
          author: 'traveler123',
          content: 'Santorini is definitely on my bucket list! Thanks for sharing.',
          timestamp: '2 hours ago',
          voteScore: 78,
        }
      ]
    },
    {
      id: '102',
      author: 'mountaineer',
      content: 'The Canadian Rockies, especially Banff National Park. The turquoise lakes surrounded by snow-capped mountains are unreal.',
      timestamp: '3 hours ago',
      voteScore: 385,
    },
    {
      id: '103',
      author: 'beachbum',
      content: 'Bora Bora. The water is so clear you can see straight to the bottom even when it\'s deep.',
      timestamp: '2 hours ago',
      voteScore: 299,
      replies: [
        {
          id: '1031',
          author: 'diver89',
          content: 'The snorkeling there is incredible too! So many colorful fish.',
          timestamp: '1 hour ago',
          voteScore: 86,
        }
      ]
    }
  ],
  '2': [
    {
      id: '201',
      author: 'cakefanatic',
      content: 'This looks incredible! Love the frosting details. How long did it take you to make?',
      timestamp: '6 hours ago',
      voteScore: 124,
      replies: [
        {
          id: '2011',
          author: 'bakingmom',
          content: 'Thank you! It took about 5 hours total, including cooling time between layers.',
          timestamp: '5 hours ago',
          voteScore: 73,
        }
      ]
    },
    {
      id: '202',
      author: 'sweetooth',
      content: 'Would you mind sharing the recipe? I\'d love to try making this!',
      timestamp: '4 hours ago',
      voteScore: 95,
    }
  ],
  '3': [
    {
      id: '301',
      author: 'marvelgeek',
      content: 'I can\'t wait! The last movie was mind-blowing with all the different Spider-Men.',
      timestamp: '10 hours ago',
      voteScore: 211,
    },
    {
      id: '302',
      author: 'comicbooklover',
      content: 'I\'m hoping they bring in Miles Morales for this one. Would be awesome to see him in live action.',
      timestamp: '8 hours ago',
      voteScore: 187,
      replies: [
        {
          id: '3021',
          author: 'filmfan',
          content: 'That would be amazing! I think they\'re building up to it.',
          timestamp: '7 hours ago',
          voteScore: 92,
        }
      ]
    }
  ],
  '4': [
    {
      id: '401',
      author: 'techwhiz',
      content: 'Fascinating article. Quantum computing is evolving faster than I expected.',
      timestamp: '20 hours ago',
      voteScore: 134,
    }
  ],
  '5': [
    {
      id: '501',
      author: 'dogperson',
      content: 'Cats judging us is universal. Mine gives me the same look when I eat junk food.',
      timestamp: '22 hours ago',
      voteScore: 543,
    },
    {
      id: '502',
      author: 'meowlover',
      content: 'That posture is hilarious! What\'s your cat\'s name?',
      timestamp: '20 hours ago',
      voteScore: 487,
      replies: [
        {
          id: '5021',
          author: 'catlover',
          content: 'His name is Sir Fluffington! He acts like royalty.',
          timestamp: '19 hours ago',
          voteScore: 276,
        }
      ]
    }
  ],
  '6': [
    {
      id: '601',
      author: 'buildapc',
      content: 'That\'s an absolute beast! What games are you running on it?',
      timestamp: '2 hours ago',
      voteScore: 98,
    }
  ],
  '7': [
    {
      id: '701',
      author: 'backpacker',
      content: 'Thailand has some of the most beautiful beaches in the world! Where exactly is this?',
      timestamp: '1 day ago',
      voteScore: 215,
    }
  ],
  '8': [
    {
      id: '801',
      author: 'seniordev',
      content: 'Practice LeetCode problems daily and start with easy ones before moving to medium and hard. For system design, read "Designing Data-Intensive Applications" and watch system design videos on YouTube.',
      timestamp: '7 hours ago',
      voteScore: 67,
    },
    {
      id: '802',
      author: 'codinginterview',
      content: 'Don\'t just memorize solutions. Understand the underlying patterns and principles. Also, explain your thought process verbally while solving problems.',
      timestamp: '6 hours ago',
      voteScore: 51,
    }
  ],
  '9': [
    {
      id: '901',
      author: 'solarenergy',
      content: 'This is promising! Solar efficiency has been a major barrier to wider adoption.',
      timestamp: '3 hours ago',
      voteScore: 34,
    }
  ],
  '10': [
    {
      id: '1001',
      author: 'hikingenthusiast',
      content: 'Absolutely stunning view! Where was this taken?',
      timestamp: '20 hours ago',
      voteScore: 187,
    }
  ]
};

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [voteStatus, setVoteStatus] = useState<'up' | 'down' | null>(null);
  const [voteScore, setVoteScore] = useState<number>(0);
  
  useEffect(() => {
    if (postId) {
      // Find the requested post
      const foundPost = mockPosts.find(p => p.id === postId);
      if (foundPost) {
        setPost(foundPost);
        setVoteScore(foundPost.voteScore);
        
        // Get comments for this post
        const postComments = mockComments[postId] || [];
        setComments(postComments);
      }
    }
  }, [postId]);
  
  const handleVote = (direction: 'up' | 'down') => {
    if (voteStatus === direction) {
      // Remove vote
      setVoteStatus(null);
      setVoteScore(direction === 'up' ? voteScore - 1 : voteScore + 1);
    } else {
      // Change vote or add new vote
      const scoreDelta = voteStatus === null 
        ? (direction === 'up' ? 1 : -1) 
        : (direction === 'up' ? 2 : -2);
      setVoteStatus(direction);
      setVoteScore(voteScore + scoreDelta);
    }
  };
  
  const handleCommentSubmit = (commentText: string) => {
    if (!commentText.trim() || !post) return;
    
    // Create new comment
    const newComment: CommentType = {
      id: `new-${Date.now()}`,
      author: 'currentUser',
      content: commentText,
      timestamp: 'Just now',
      voteScore: 1,
    };
    
    // Add to comments
    setComments([newComment, ...comments]);
    
    // Update comment count on post
    setPost({
      ...post,
      commentCount: post.commentCount + 1
    });
  };
  
  if (!post) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto p-4">
          <div className="bg-white p-10 rounded-md border border-gray-200 text-center">
            <h2 className="text-2xl font-bold mb-2">Post Not Found</h2>
            <p className="text-gray-600">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/" className="mt-4 inline-block">
              <Button>
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const subreddit = subreddits[post.subreddit] || null;
  
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-4">
        <Card className="overflow-hidden mb-4">
          <div className="flex">
            <VoteControls 
              score={voteScore} 
              voteStatus={voteStatus} 
              onVote={handleVote} 
            />
            
            <div className="flex-1 p-4">
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Link to={`/r/${post.subreddit}`} className="font-medium text-black hover:underline mr-1">
                  r/{post.subreddit}
                </Link>
                <span className="mx-1">•</span>
                Posted by{" "}
                <Link to={`/user/${post.author}`} className="hover:underline mx-1">
                  u/{post.author}
                </Link>
                <span className="mx-1">•</span>
                <span>{post.timestamp}</span>
              </div>
              
              <h1 className="text-xl font-semibold mb-3">{post.title}</h1>
              
              <PostContent post={post} isDetailView={true} />
              
              <PostFooter 
                commentCount={post.commentCount} 
                postId={post.id} 
              />
            </div>
          </div>
        </Card>
        
        <div className="bg-white rounded-md border border-gray-200 p-4 mb-4">
          <CommentBox onSubmit={handleCommentSubmit} />
        </div>
        
        {comments.length > 0 ? (
          <div className="bg-white rounded-md border border-gray-200 p-4">
            <h3 className="font-medium mb-4">{comments.length} Comments</h3>
            <CommentList comments={comments} />
          </div>
        ) : (
          <div className="bg-white rounded-md border border-gray-200 p-6 text-center">
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PostDetail;
