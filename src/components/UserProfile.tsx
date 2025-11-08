import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { User, Story } from '../services/hnApi';
import { getItem, getUser } from '../services/hnApi';
import { formatTimeAgo } from '../utils/timeUtils';
import { createMarkup } from '../utils/htmlUtils';
import './UserProfile.css';

export function UserProfile() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingStories, setLoadingStories] = useState(false);
  const [storiesToShow, setStoriesToShow] = useState(10);

  useEffect(() => {
    const loadUser = async () => {
      if (!username) return;

      setLoading(true);
      setError(null);
      try {
        const userData = await getUser(username);
        if (userData) {
          setUser(userData);
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Failed to load user');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [username]);

  useEffect(() => {
    const loadStories = async () => {
      if (!user || !user.submitted || user.submitted.length === 0) return;

      setLoadingStories(true);
      try {
        const storyIds = user.submitted.slice(0, storiesToShow);
        const storyPromises = storyIds.map((id) => getItem(id));
        const results = await Promise.all(storyPromises);
        const validStories = results.filter(
          (item): item is Story => item !== null && item.type === 'story'
        ) as Story[];
        setStories(validStories);
      } catch (err) {
        console.error('Error loading stories:', err);
      } finally {
        setLoadingStories(false);
      }
    };

    loadStories();
  }, [user, storiesToShow]);

  if (loading) {
    return (
      <div className="user-profile">
        <div className="loading">Loading user...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="user-profile">
        <div className="error">{error || 'User not found'}</div>
        <Link to="/" className="back-link">
          ← Back to stories
        </Link>
      </div>
    );
  }

  const totalStories = user.submitted?.length || 0;
  const hasMore = storiesToShow < totalStories;

  return (
    <div className="user-profile">
      <div className="user-profile-header">
        <h1 className="user-profile-username">{user.id}</h1>
        <div className="user-profile-info">
          <div className="user-info-item">
            <span className="user-info-label">Karma:</span>
            <span className="user-info-value">{user.karma}</span>
          </div>
          <div className="user-info-item">
            <span className="user-info-label">Joined:</span>
            <span className="user-info-value">{formatTimeAgo(user.created)}</span>
          </div>
          {user.about && (
            <div className="user-about">
              <div
                className="user-about-text"
                dangerouslySetInnerHTML={createMarkup(user.about)}
              />
            </div>
          )}
        </div>
      </div>
      {user.submitted && user.submitted.length > 0 && (
        <div className="user-stories">
          <h2 className="user-stories-header">
            Submissions ({totalStories})
          </h2>
          {loadingStories ? (
            <div className="loading">Loading stories...</div>
          ) : (
            <>
              <div className="user-stories-list">
                {stories.map((story) => (
                  <div key={story.id} className="user-story-item">
                    <Link to={`/story/${story.id}`} className="user-story-title">
                      {story.title}
                    </Link>
                    <div className="user-story-meta">
                      <span>{story.score} points</span>
                      <span>{formatTimeAgo(story.time)}</span>
                      {story.descendants !== undefined && (
                        <Link to={`/story/${story.id}`} className="user-story-comments">
                          {story.descendants} {story.descendants === 1 ? 'comment' : 'comments'}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {hasMore && (
                <button
                  className="load-more-btn"
                  onClick={() => setStoriesToShow((prev) => prev + 10)}
                >
                  Load more
                </button>
              )}
            </>
          )}
        </div>
      )}
      <Link to="/" className="back-link">
        ← Back to stories
      </Link>
    </div>
  );
}

