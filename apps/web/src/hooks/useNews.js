
import { useState, useCallback } from 'react';
import pb from '@/lib/pocketbaseClient';

export const useNews = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getNewsList = useCallback(async (page = 1, perPage = 20, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await pb.collection('news').getList(page, perPage, {
        sort: '-date',
        ...options,
        $autoCancel: false
      });
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getNewsById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const record = await pb.collection('news').getOne(id, { $autoCancel: false });
      return record;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchNews = useCallback(async (query, page = 1, perPage = 20) => {
    setLoading(true);
    setError(null);
    try {
      const filter = query 
        ? `title ~ "${query}" || content ~ "${query}" || excerpt ~ "${query}"`
        : '';
      
      const result = await pb.collection('news').getList(page, perPage, {
        filter,
        sort: '-date',
        $autoCancel: false
      });
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getNewsList,
    getNewsById,
    searchNews
  };
};
