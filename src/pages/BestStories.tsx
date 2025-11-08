import { StoryList } from '../components/StoryList';
import { useStories } from '../hooks/useStories';

export function BestStories() {
  const { storyIds, loading, error } = useStories('best');
  return <StoryList storyIds={storyIds} loading={loading} error={error} />;
}

