import { StoryList } from '../components/StoryList';
import { useStories } from '../hooks/useStories';

export function JobStories() {
  const { storyIds, loading, error } = useStories('jobs');
  return <StoryList storyIds={storyIds} loading={loading} error={error} />;
}

