import { useEffect, useState } from 'react';
import type { User } from '../services/hnApi';
import { getUser } from '../services/hnApi';

export function useUser(username: string | null) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
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
        setError(err instanceof Error ? err.message : 'Failed to load user');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  return { user, loading, error };
}

