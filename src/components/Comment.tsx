import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Comment as CommentType } from '../services/hnApi';
import { formatTimeAgo } from '../utils/timeUtils';
import { createMarkup } from '../utils/htmlUtils';
import { CommentTree } from './CommentTree';
import './Comment.css';

interface CommentProps {
  comment: CommentType;
  level?: number;
}

export function Comment({ comment, level = 0 }: CommentProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (comment.deleted || comment.dead) {
    return (
      <div className="comment deleted" style={{ paddingLeft: `${level * 1.5}rem` }}>
        [deleted]
      </div>
    );
  }

  if (!comment.text) {
    return null;
  }

  return (
    <div className="comment" style={{ paddingLeft: `${level * 1.5}rem` }}>
      <div className="comment-header">
        <button
          className="comment-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '▶' : '▼'}
        </button>
        <Link to={`/user/${comment.by}`} className="comment-by">{comment.by}</Link>
        <span className="comment-time">{formatTimeAgo(comment.time)}</span>
      </div>
      {!collapsed && (
        <>
          <div
            className="comment-text"
            dangerouslySetInnerHTML={createMarkup(comment.text)}
          />
          {comment.kids && comment.kids.length > 0 && (
            <CommentTree commentIds={comment.kids} level={level + 1} />
          )}
        </>
      )}
    </div>
  );
}

