import { useEffect, useState } from 'react';
import type { Story } from '../services/hnApi';
import { getItem } from '../services/hnApi';
import { StoryItem } from './StoryItem';
import { STORIES_PER_PAGE } from '../utils/constants';
import './StoryList.css';

interface StoryListProps {
  storyIds: number[];
  loading: boolean;
  error: string | null;
}

export function StoryList({ storyIds, loading, error }: StoryListProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(1);
  const [loadingStories, setLoadingStories] = useState(false);

  useEffect(() => {
    setStories([]);
    setPage(1);
  }, [storyIds]);

  useEffect(() => {
    if (storyIds.length === 0) return;

    const loadStories = async () => {
      setLoadingStories(true);
      const startIndex = (page - 1) * STORIES_PER_PAGE;
      const endIndex = startIndex + STORIES_PER_PAGE;
      const pageIds = storyIds.slice(startIndex, endIndex);

      try {
        const storyPromises = pageIds.map((id) => getItem(id));
        const results = await Promise.all(storyPromises);
        const validStories = results.filter(
          (item): item is Story => item !== null && item.type === 'story'
        ) as Story[];

        if (page === 1) {
          setStories(validStories);
        } else {
          setStories((prev) => [...prev, ...validStories]);
        }
      } catch (err) {
        console.error('Error loading stories:', err);
      } finally {
        setLoadingStories(false);
      }
    };

    loadStories();
  }, [storyIds, page]);

  const hasMore = page * STORIES_PER_PAGE < storyIds.length;

  const loadMore = () => {
    if (!loadingStories && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="story-list">
        <div className="loading">Loading stories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="story-list">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (stories.length === 0 && !loadingStories) {
    return (
      <div className="story-list">
        <div className="empty">No stories found.</div>
      </div>
    );
  }

  return (
    <div className="story-list">
      {stories.map((story, index) => (
        <StoryItem key={story.id} story={story} index={index} />
      ))}
      {loadingStories && (
        <div className="loading-more">Loading more stories...</div>
      )}
      {hasMore && !loadingStories && (
        <button className="load-more-btn" onClick={loadMore}>
          More
        </button>
      )}
    </div>
  );
}

