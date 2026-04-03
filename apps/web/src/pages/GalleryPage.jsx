import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Image as ImageIcon } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import GalleryCard from '@/components/GalleryCard.jsx';
import GalleryModal from '@/components/GalleryModal.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useGallery } from '@/hooks/useGallery';
import { motion } from 'framer-motion';

const GalleryPage = () => {
  const { getGalleryList } = useGallery();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const result = await getGalleryList(1, 50, filter);
        setGallery(result.items);
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [filter, getGalleryList]);

  const handleItemClick = (item) => {
    const index = gallery.findIndex(g => g.id === item.id);
    setSelectedIndex(index);
    setSelectedItem(item);
  };

  const handlePrevious = () => {
    const newIndex = (selectedIndex - 1 + gallery.length) % gallery.length;
    setSelectedIndex(newIndex);
    setSelectedItem(gallery[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (selectedIndex + 1) % gallery.length;
    setSelectedIndex(newIndex);
    setSelectedItem(gallery[newIndex]);
  };

  return (
    <>
      <Helmet>
        <title>Gallery - Rushikesh Jaiswal </title>
        <meta name="description" content="Browse our photo and video gallery showcasing government events, initiatives, and public programs." />
      </Helmet>

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
                Media gallery
              </h1>
              <div className="w-24 h-1.5 bg-primary mx-auto mb-8 rounded-full" />
              <p className="text-xl leading-relaxed text-secondary">
                Visual documentation of our programs, events, and initiatives
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Button
                variant={filter === '' ? 'default' : 'outline'}
                onClick={() => setFilter('')}
                className={filter === '' ? 'bg-primary hover:bg-[hsl(var(--primary-dark))] text-primary-foreground' : 'hover:bg-primary hover:text-primary-foreground hover:border-primary'}
              >
                All Media
              </Button>
              <Button
                variant={filter === 'image' ? 'default' : 'outline'}
                onClick={() => setFilter('image')}
                className={filter === 'image' ? 'bg-primary hover:bg-[hsl(var(--primary-dark))] text-primary-foreground' : 'hover:bg-primary hover:text-primary-foreground hover:border-primary'}
              >
                Images
              </Button>
              <Button
                variant={filter === 'video' ? 'default' : 'outline'}
                onClick={() => setFilter('video')}
                className={filter === 'video' ? 'bg-primary hover:bg-[hsl(var(--primary-dark))] text-primary-foreground' : 'hover:bg-primary hover:text-primary-foreground hover:border-primary'}
              >
                Videos
              </Button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <Skeleton className="h-5 w-3/4" />
                  </div>
                ))}
              </div>
            ) : gallery.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {gallery.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <GalleryCard item={item} onClick={handleItemClick} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-muted rounded-2xl">
                <ImageIcon className="w-20 h-20 mx-auto mb-6 text-secondary" />
                <h2 className="text-3xl font-bold mb-4">No items found</h2>
                <p className="text-lg text-secondary mb-8">
                  {filter 
                    ? `No ${filter}s available in the gallery.`
                    : 'The gallery is currently empty.'}
                </p>
                {filter && (
                  <Button onClick={() => setFilter('')} className="bg-primary hover:bg-[hsl(var(--primary-dark))] text-primary-foreground">
                    Show all items
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <GalleryModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={gallery.length > 1}
        hasNext={gallery.length > 1}
      />

      <Footer />
    </>
  );
};

export default GalleryPage;