import { StoryList } from '../components/StoryList';
import { useStories } from '../hooks/useStories';

export function TopStories() {
  const { storyIds, loading, error } = useStories('top');
  return <StoryList storyIds={storyIds} loading={loading} error={error} />;
}

