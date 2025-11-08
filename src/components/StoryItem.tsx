import { Link } from 'react-router-dom';
import type { Story } from '../services/hnApi';
import { formatTimeAgo } from '../utils/timeUtils';
import './StoryItem.css';

interface StoryItemProps {
  story: Story;
  index: number;
}

export function StoryItem({ story, index }: StoryItemProps) {
  const hasUrl = story.url && story.url !== '';
  const commentsCount = story.descendants || 0;

  return (
    <div className="story-item">
      <div className="story-index">{index + 1}.</div>
      <div className="story-content">
        <div className="story-header">
          {hasUrl ? (
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="story-title"
            >
              {story.title}
            </a>
          ) : (
            <Link to={`/story/${story.id}`} className="story-title">
              {story.title}
            </Link>
          )}
          {hasUrl && (
            <span className="story-domain">
              ({new URL(story.url!).hostname.replace('www.', '')})
            </span>
          )}
        </div>
        <div className="story-meta">
          <span className="story-score">{story.score} points</span>
          <span className="story-by">
            by <Link to={`/user/${story.by}`} className="story-author">{story.by}</Link>
          </span>
          <span className="story-time">{formatTimeAgo(story.time)}</span>
          <span className="story-separator">|</span>
          <Link to={`/story/${story.id}`} className="story-comments">
            {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
          </Link>
        </div>
      </div>
    </div>
  );
}

