import { useEffect, useState } from 'react';
import type { Comment as CommentType } from '../services/hnApi';
import { getItem } from '../services/hnApi';
import { Comment } from './Comment';
import './CommentTree.css';

interface CommentTreeProps {
  commentIds: number[];
  level?: number;
}

export function CommentTree({ commentIds, level = 0 }: CommentTreeProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      try {
        const commentPromises = commentIds.map((id) => getItem(id));
        const results = await Promise.all(commentPromises);
        const validComments = results.filter(
          (item): item is CommentType =>
            item !== null && item.type === 'comment'
        ) as CommentType[];
        setComments(validComments);
      } catch (err) {
        console.error('Error loading comments:', err);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [commentIds]);

  if (loading) {
    return (
      <div className="comment-tree-loading" style={{ paddingLeft: `${level * 1.5}rem` }}>
        Loading comments...
      </div>
    );
  }

  return (
    <div className="comment-tree">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} level={level} />
      ))}
    </div>
  );
}

