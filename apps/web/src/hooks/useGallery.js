
import { useState, useCallback } from 'react';
import pb from '@/lib/pocketbaseClient';

export const useGallery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getGalleryList = useCallback(async (page = 1, perPage = 50, typeFilter = '') => {
    setLoading(true);
    setError(null);
    try {
      const filter = typeFilter ? `type = "${typeFilter}"` : '';
      
      const result = await pb.collection('gallery').getList(page, perPage, {
        filter,
        sort: '-created',
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
    getGalleryList
  };
};
