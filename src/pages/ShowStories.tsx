import { StoryList } from '../components/StoryList';
import { useStories } from '../hooks/useStories';

export function ShowStories() {
  const { storyIds, loading, error } = useStories('show');
  return <StoryList storyIds={storyIds} loading={loading} error={error} />;
}

