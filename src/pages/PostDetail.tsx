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

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [voteStatus, setVoteStatus] = useState<'up' | 'down' | null>(null);
  const [voteScore, setVoteScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (postId) {
      console.log('Fetching post with ID:', postId);
      // Fetch the specific post by ID
      fetch(`https://moonmovement.onrender.com/api/posts/${postId}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Post not found');
          }
          return res.json();
        })
        .then(data => {
          console.log('PostDetail API Response:', data);
          const transformedPost = {
            ...data,
            id: data.id.toString(),
            voteScore: data.votes?.length || 0,
            commentCount: data.comments?.length || 0,
            timestamp: new Date(data.createdAt).toLocaleString(),
            subreddit: data.subreddit || 'general'
          };
          setPost(transformedPost);
          setVoteScore(transformedPost.voteScore);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch post:', error);
          setError(error.message);
          setLoading(false);
        });
      
      // Fetch comments for this specific post using the new endpoint
      fetch(`https://moonmovement.onrender.com/api/comments/post/${postId}`)
        .then(res => res.json())
        .then(data => {
          // Map backend comment fields to CommentType expected by frontend
          const postComments = data.map((c: any) => ({
            id: c.id.toString(),
            author: typeof c.author === 'string' ? c.author : c.author.username,
            content: c.content,
            timestamp: new Date(c.createdAt).toLocaleString(),
            voteScore: 0, // You can update this if you add votes to comments
            replies: [] // You can update this if you support nested comments
          }));
          setComments(postComments);
        })
        .catch((error) => {
          console.error('Failed to fetch comments:', error);
        });
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
  
  const handleCommentSubmit = async (commentText: string) => {
    if (!commentText.trim() || !post) return;
    const commentData = {
      content: commentText,
      author: 'currentUser', // Replace with real user if available
      postId: post.id,
    };
    try {
      const res = await fetch('https://moonmovement.onrender.com/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });
      const newComment = await res.json();
      setComments([newComment, ...comments]);
      setPost({ ...post, commentCount: post.commentCount + 1 });
    } catch (err) {
      alert('Failed to submit comment');
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto p-4">
          <div className="bg-sidebar p-10 rounded-md border border-sidebar-border text-center">
            <h2 className="text-2xl font-bold mb-2 text-white">Loading...</h2>
            <p className="text-gray-300">Fetching post details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (error || !post) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto p-4">
          <div className="bg-sidebar p-10 rounded-md border border-sidebar-border text-center">
            <h2 className="text-2xl font-bold mb-2 text-white">Post Not Found</h2>
            <p className="text-gray-300">
              {error || "The post you're looking for doesn't exist or has been removed."}
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
  const authorName = typeof post.author === 'string' ? post.author : post.author.username;
  
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-4">
        <Card className="overflow-hidden mb-4 bg-sidebar border-sidebar-border">
          <div className="flex">
            <VoteControls 
              score={voteScore} 
              voteStatus={voteStatus} 
              onVote={handleVote} 
            />
            
            <div className="flex-1 p-4">
              <div className="flex items-center text-xs text-gray-400 mb-2">
                <Link to={`/r/${post.subreddit}`} className="font-medium text-gray-200 hover:underline mr-1">
                  r/{post.subreddit}
                </Link>
                <span className="mx-1">•</span>
                Posted by{" "}
                <Link to={`/user/${authorName}`} className="hover:underline mx-1 text-gray-400">
                  u/{authorName}
                </Link>
                <span className="mx-1">•</span>
                <span>{post.timestamp}</span>
              </div>
              
              <h1 className="text-xl font-semibold mb-3 text-white">{post.title}</h1>
              
              <PostContent post={post} isDetailView={true} />
              
              <PostFooter 
                commentCount={post.commentCount} 
                postId={post.id} 
              />
            </div>
          </div>
        </Card>
        
        <div className="bg-sidebar rounded-md border border-sidebar-border p-4 mb-4">
          <CommentBox onSubmit={handleCommentSubmit} />
        </div>
        
        {comments.length > 0 ? (
          <div className="bg-sidebar rounded-md border border-sidebar-border p-4">
            <h3 className="font-medium mb-4 text-white">{comments.length} Comments</h3>
            <CommentList comments={comments} />
          </div>
        ) : (
          <div className="bg-sidebar rounded-md border border-sidebar-border p-6 text-center">
            <p className="text-gray-400">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PostDetail;
