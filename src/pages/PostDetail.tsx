
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
  
  useEffect(() => {
    if (postId) {
      fetch('https://moonmovement.onrender.com/api/posts')
        .then(res => res.json())
        .then(data => {
          console.log('PostDetail API Response:', data);
          const foundPost = data.find((p: any) => p.id.toString() === postId);
          if (foundPost) {
            const transformedPost = {
              ...foundPost,
              id: foundPost.id.toString(),
              voteScore: foundPost.votes?.length || 0,
              commentCount: foundPost.comments?.length || 0,
              timestamp: new Date(foundPost.createdAt).toLocaleString(),
              subreddit: foundPost.subreddit || 'general'
            };
            setPost(transformedPost);
            setVoteScore(transformedPost.voteScore);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch post:', error);
        });
      
      fetch('https://moonmovement.onrender.com/api/comments')
        .then(res => res.json())
        .then(data => {
          // If you want to filter comments by postId, you need to store postId in each comment
          setComments(data.filter((c: any) => c.postId === postId));
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
  
  if (!post) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto p-4">
          <div className="bg-sidebar p-10 rounded-md border border-sidebar-border text-center">
            <h2 className="text-2xl font-bold mb-2 text-white">Post Not Found</h2>
            <p className="text-gray-300">
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
