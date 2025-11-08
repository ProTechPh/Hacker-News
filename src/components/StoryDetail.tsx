import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Story } from '../services/hnApi';
import { getItem } from '../services/hnApi';
import { formatTimeAgo } from '../utils/timeUtils';
import { createMarkup } from '../utils/htmlUtils';
import { CommentTree } from './CommentTree';
import './StoryDetail.css';

export function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStory = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);
      try {
        const item = await getItem(Number(id));
        if (item && item.type === 'story') {
          setStory(item as Story);
        } else {
          setError('Story not found');
        }
      } catch (err) {
        setError('Failed to load story');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, [id]);

  if (loading) {
    return (
      <div className="story-detail">
        <div className="loading">Loading story...</div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="story-detail">
        <div className="error">{error || 'Story not found'}</div>
        <Link to="/" className="back-link">
          ← Back to stories
        </Link>
      </div>
    );
  }

  const hasUrl = story.url && story.url !== '';
  const commentsCount = story.descendants || 0;

  return (
    <div className="story-detail">
      <div className="story-detail-header">
        <h1 className="story-detail-title">
          {hasUrl ? (
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {story.title}
            </a>
          ) : (
            story.title
          )}
        </h1>
        {hasUrl && (
          <div className="story-detail-url">
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {story.url}
            </a>
          </div>
        )}
        <div className="story-detail-meta">
          <span>{story.score} points</span>
          <span>
            by <Link to={`/user/${story.by}`} className="story-detail-author">{story.by}</Link>
          </span>
          <span>{formatTimeAgo(story.time)}</span>
          {commentsCount > 0 && <span>{commentsCount} comments</span>}
        </div>
        {story.text && (
          <div
            className="story-detail-text"
            dangerouslySetInnerHTML={createMarkup(story.text)}
          />
        )}
      </div>
      {story.kids && story.kids.length > 0 && (
        <div className="story-detail-comments">
          <h2 className="comments-header">Comments</h2>
          <CommentTree commentIds={story.kids} />
        </div>
      )}
      {(!story.kids || story.kids.length === 0) && (
        <div className="no-comments">No comments yet.</div>
      )}
      <Link to="/" className="back-link">
        ← Back to stories
      </Link>
    </div>
  );
}

