import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import NewsCard from '@/components/NewsCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useNews } from '@/hooks/useNews';
import pb from '@/lib/pocketbaseClient';
import { motion } from 'framer-motion';

const NewsDetailPage = () => {
  const { id } = useParams();
  const { getNewsById, getNewsList } = useNews();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      try {
        const newsItem = await getNewsById(id);
        setNews(newsItem);

        const related = await getNewsList(1, 3);
        setRelatedNews(related.items.filter(item => item.id !== id).slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id, getNewsById, getNewsList]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const imageUrl = news?.image 
    ? pb.files.getUrl(news, news.image)
    : null;

  if (loading) {
    return (
      <>
        <Header />
        <main className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-10 w-32 mb-10" />
              <Skeleton className="h-16 w-3/4 mb-6" />
              <Skeleton className="h-6 w-1/2 mb-10" />
              <Skeleton className="aspect-video w-full mb-10 rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!news) {
    return (
      <>
        <Header />
        <main className="py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-6">News not found</h1>
            <Button asChild className="bg-primary hover:bg-[hsl(var(--primary-dark))] text-primary-foreground">
              <Link to="/news">Back to news</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${news.title} - Rushikesh Jaiswal `}</title>
        <meta name="description" content={news.excerpt || news.title} />
      </Helmet>

      <Header />

      <main className="py-24 bg-background">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button asChild variant="ghost" className="mb-10 gap-2 hover:text-primary hover:bg-muted">
                <Link to="/news">
                  <ArrowLeft className="w-4 h-4" />
                  Back to news
                </Link>
              </Button>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                {news.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-secondary mb-10 font-medium">
                <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{formatDate(news.date)}</span>
                </div>
                {news.author && (
                  <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                    <User className="w-5 h-5 text-primary" />
                    <span>{news.author}</span>
                  </div>
                )}
              </div>

              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt={news.title}
                  className="w-full rounded-2xl shadow-xl mb-12"
                />
              )}

              {news.excerpt && (
                <div className="text-2xl text-foreground font-medium mb-12 leading-relaxed border-l-4 border-primary pl-8 py-2 bg-muted/50 rounded-r-xl">
                  {news.excerpt}
                </div>
              )}

              <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-[hsl(var(--primary-dark))]">
                <div className="text-foreground leading-relaxed whitespace-pre-wrap text-lg">
                  {news.content}
                </div>
              </div>
            </motion.div>
          </div>
        </article>

        {relatedNews.length > 0 && (
          <section className="mt-24 py-24 bg-muted">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Related news
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {relatedNews.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <NewsCard news={item} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default NewsDetailPage;