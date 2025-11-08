import { useEffect, useState } from 'react';
import type { Story } from '../services/hnApi';
import { getItem } from '../services/hnApi';

export function useStory(id: number | null) {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchStory = async () => {
      setLoading(true);
      setError(null);
      try {
        const item = await getItem(id);
        if (item && item.type === 'story') {
          setStory(item as Story);
        } else {
          setError('Story not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load story');
        console.error('Error fetching story:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  return { story, loading, error };
}

