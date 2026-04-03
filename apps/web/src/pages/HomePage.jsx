import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Users, Building2, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSlider from '@/components/HeroSlider.jsx';
import NewsCard from '@/components/NewsCard.jsx';
import HighlightCard from '@/components/HighlightCard.jsx';
import { useNews } from '@/hooks/useNews';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { getNewsList } = useNews();
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroSlides = [
    {
      image: 'https://horizons-cdn.hostinger.com/6b96f1df-e64c-4f6c-b75d-1c7ff03fb2fb/a53829877bc6ae6cbe39512163116437.jpg',
      alt: 'Official government photo showing senior government official greeting dignitaries at outdoor event',
      title: 'Building a stronger nation together',
      description: 'Committed to transparency, accountability, and public service excellence'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/6b96f1df-e64c-4f6c-b75d-1c7ff03fb2fb/64c8e8fb4d0f30f584f83d33e88551d1.jpg',
      alt: 'Official government photo showing officials reviewing documents at airport',
      title: 'Empowering citizens through digital governance',
      description: 'Innovative solutions for modern administrative challenges'
    }
  ];

  const highlights = [
    {
      number: '01',
      title: 'Digital transformation initiative',
      description: 'Modernizing government services through technology adoption and digital infrastructure development across all departments.'
    },
    {
      number: '02',
      title: 'Citizen engagement programs',
      description: 'Creating platforms for direct communication between government and citizens to ensure responsive governance.'
    },
    {
      number: '03',
      title: 'Sustainable development goals',
      description: 'Implementing comprehensive strategies for environmental protection and sustainable economic growth.'
    },
    {
      number: '04',
      title: 'Public welfare schemes',
      description: 'Expanding social security programs and healthcare access to improve quality of life for all citizens.'
    }
  ];

  const quickLinks = [
    { icon: FileText, title: 'Official documents', path: '/news' },
    { icon: Users, title: 'Public services', path: '/contact' },
    { icon: Building2, title: 'Departments', path: '/about' },
    { icon: Award, title: 'Achievements', path: '/gallery' }
  ];

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const result = await getNewsList(1, 3);
        setLatestNews(result.items);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, [getNewsList]);

  return (
    <>
      <Helmet>
        <title>Rushikesh Jaiswal</title>
        <meta name="description" content="Official Rushikesh Jaiswal  providing news, services, and information for citizens. Stay updated with latest announcements and access public services." />
      </Helmet>

      <Header />

      <main>
        <HeroSlider slides={heroSlides} />

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Latest news and updates
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
              <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
                Stay informed with the latest announcements, policies, and initiatives
              </p>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-video w-full rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : latestNews.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {latestNews.map((news, index) => (
                    <motion.div
                      key={news.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <NewsCard news={news} />
                    </motion.div>
                  ))}
                </div>
                <div className="text-center">
                  <Button asChild size="lg" className="bg-primary hover:bg-[hsl(var(--primary-dark))] text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                    <Link to="/news" className="gap-2">
                      View all news
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-muted rounded-2xl">
                <FileText className="w-16 h-16 mx-auto mb-4 text-secondary" />
                <h3 className="text-xl font-bold mb-2">No news available</h3>
                <p className="text-secondary">Check back later for updates</p>
              </div>
            )}
          </div>
        </section>

        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Key initiatives and highlights
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
              <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
                Our commitment to progress and public welfare
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <HighlightCard {...highlight} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Quick access
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
              <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
                Navigate to important sections and services
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="block p-8 bg-card rounded-2xl border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group text-center"
                  >
                    <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                      <link.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{link.title}</h3>
                    <div className="flex items-center justify-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-200">
                      <span>Access</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;