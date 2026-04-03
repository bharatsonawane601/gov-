
import { useState, useCallback } from 'react';
import pb from '@/lib/pocketbaseClient';

export const useNewsSearch = () => {
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchNews = useCallback(async (query, page = 1, perPage = 10) => {
    setLoading(true);
    try {
      const filter = query ? `title ~ "${query}" || content ~ "${query}" || author ~ "${query}"` : '';
      const records = await pb.collection('news').getList(page, perPage, {
        filter,
        sort: '-date',
        $autoCancel: false
      });
      setResults(records.items);
      setTotalCount(records.totalItems);
      return records;
    } catch (error) {
      console.error('Search error:', error);
      return { items: [], totalItems: 0, totalPages: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, totalCount, loading, searchNews };
};
