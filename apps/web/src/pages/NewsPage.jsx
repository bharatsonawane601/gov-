
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileText } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import NewsCard from '@/components/NewsCard.jsx';
import SearchBar from '@/components/SearchBar.jsx';
import SEOHead from '@/components/SEOHead.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useNewsSearch } from '@/hooks/useNewsSearch';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const NewsPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchNews, results, totalCount, loading } = useNewsSearch();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const perPage = 9;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchNews(searchQuery, page, perPage);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, page, searchNews]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <>
      <SEOHead 
        title={t('news.title')} 
        description={t('news.subtitle')}
      />

      <Header />

      <main>
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground" style={{ letterSpacing: '-0.02em' }}>
                {t('news.title')}
              </h1>
              <div className="w-24 h-1.5 bg-primary mx-auto mb-8 rounded-full" />
              <p className="text-xl leading-relaxed text-secondary mb-10">
                {t('news.subtitle')}
              </p>
              <div className="max-w-xl mx-auto bg-background rounded-lg shadow-sm p-2">
                <SearchBar 
                  onSearch={handleSearch}
                  placeholder={t('common.search')}
                />
              </div>
              {searchQuery && !loading && (
                <p className="mt-4 text-sm text-secondary font-medium">
                  {t('news.resultsFound', { count: totalCount })}
                </p>
              )}
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-video w-full rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {results.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <NewsCard news={item} />
                    </motion.div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      {t('common.previous')}
                    </Button>
                    <span className="px-4 font-medium text-secondary">
                      {page} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    >
                      {t('common.next')}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24 bg-muted rounded-2xl">
                <FileText className="w-20 h-20 mx-auto mb-6 text-secondary" />
                <h2 className="text-3xl font-bold mb-4">{t('common.noResults')}</h2>
                {searchQuery && (
                  <Button onClick={() => handleSearch('')} className="bg-primary text-primary-foreground mt-4">
                    Clear search
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default NewsPage;
