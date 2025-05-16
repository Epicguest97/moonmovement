
import React from 'react';
import Comment from './CommentItem';

export interface CommentType {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  voteScore: number;
  replies?: CommentType[];
}

interface CommentListProps {
  comments: CommentType[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="mt-4">
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
