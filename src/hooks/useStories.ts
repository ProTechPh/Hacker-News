import { useEffect, useState } from 'react';
import {
  getTopStories,
  getNewStories,
  getBestStories,
  getAskStories,
  getShowStories,
  getJobStories,
} from '../services/hnApi';

export type StoryType = 'top' | 'new' | 'best' | 'ask' | 'show' | 'jobs';

export function useStories(type: StoryType) {
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      setError(null);
      try {
        let ids: number[];
        switch (type) {
          case 'top':
            ids = await getTopStories();
            break;
          case 'new':
            ids = await getNewStories();
            break;
          case 'best':
            ids = await getBestStories();
            break;
          case 'ask':
            ids = await getAskStories();
            break;
          case 'show':
            ids = await getShowStories();
            break;
          case 'jobs':
            ids = await getJobStories();
            break;
          default:
            ids = await getTopStories();
        }
        setStoryIds(ids);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stories');
        console.error('Error fetching stories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [type]);

  return { storyIds, loading, error };
}

