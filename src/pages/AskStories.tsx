import { StoryList } from '../components/StoryList';
import { useStories } from '../hooks/useStories';

export function AskStories() {
  const { storyIds, loading, error } = useStories('ask');
  return <StoryList storyIds={storyIds} loading={loading} error={error} />;
}

