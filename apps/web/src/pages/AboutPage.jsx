import React from 'react';
import { Helmet } from 'react-helmet';
import { Award, Users, Target, TrendingUp } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const milestones = [
    {
      year: '2020',
      title: 'Digital governance initiative launched',
      description: 'Introduced comprehensive digital transformation program across all government departments.'
    },
    {
      year: '2021',
      title: 'Citizen portal established',
      description: 'Created unified platform for public services and citizen engagement.'
    },
    {
      year: '2022',
      title: 'Transparency reforms implemented',
      description: 'Enhanced accountability measures and public information disclosure systems.'
    },
    {
      year: '2023',
      title: 'Sustainable development programs',
      description: 'Launched major initiatives for environmental protection and green infrastructure.'
    },
    {
      year: '2024',
      title: 'Healthcare expansion',
      description: 'Expanded public healthcare access and modernized medical facilities nationwide.'
    },
    {
      year: '2025',
      title: 'Education reform',
      description: 'Implemented comprehensive education system upgrades and skill development programs.'
    }
  ];

  const stats = [
    { icon: Users, value: '2.4M', label: 'Citizens served' },
    { icon: Award, value: '147', label: 'Programs launched' },
    { icon: Target, value: '89%', label: 'Satisfaction rate' },
    { icon: TrendingUp, value: '34%', label: 'Efficiency increase' }
  ];

  return (
    <>
      <Helmet>
        <title>About - Rushikesh Jaiswal</title>
        <meta name="description" content="Learn about our mission, vision, and commitment to serving the nation through transparent and efficient governance." />
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
                About our mission
              </h1>
              <div className="w-24 h-1.5 bg-primary mx-auto mb-8 rounded-full" />
              <p className="text-xl leading-relaxed text-secondary">
                Dedicated to serving the nation with transparency, efficiency, and unwavering commitment to public welfare
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-muted rounded-3xl -z-10 transform rotate-3" />
                <img 
                  src="https://ik.imagekit.io/t4sam8ydot/8C994CFC-F664-4C59-9363-55642FB12BE5_1_201_a.jpeg" 
                  alt="Government official at work"
                  className="w-full rounded-2xl shadow-xl relative z-10"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Leadership profile
                </h2>
                <div className="w-16 h-1 bg-primary mb-8 rounded-full" />
                <div className="space-y-6 text-secondary leading-relaxed text-lg">
                  <p>
                    Our leadership brings decades of public service experience and a deep commitment to democratic values and institutional excellence.
                  </p>
                  <p>
                    With a focus on modernization and citizen-centric governance, we strive to build a more responsive, transparent, and efficient administration that serves all citizens equally.
                  </p>
                  <p>
                    Through collaborative efforts with various stakeholders, we continue to implement progressive policies that address contemporary challenges while preserving our core values.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center border-none shadow-lg bg-muted hover:-translate-y-2 transition-transform duration-300">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 mx-auto bg-background rounded-full flex items-center justify-center mb-6 shadow-sm">
                        <stat.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-4xl font-extrabold mb-2 text-foreground" style={{ fontVariantNumeric: 'tabular-nums' }}>
                        {stat.value}
                      </div>
                      <div className="text-sm font-bold uppercase tracking-wider text-secondary">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Key milestones and achievements
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-muted rounded-full" />
                  
                  <div className="space-y-12">
                    {milestones.map((milestone, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative pl-24"
                      >
                        <div className="absolute left-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-md border-4 border-background z-10">
                          {milestone.year}
                        </div>
                        <Card className="border-border hover:border-primary transition-colors duration-300 shadow-sm">
                          <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-3">
                              {milestone.title}
                            </h3>
                            <p className="text-secondary leading-relaxed text-lg">
                              {milestone.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;