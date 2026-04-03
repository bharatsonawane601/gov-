import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'Government Building, Parliament Street, New Delhi - 110001'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 11 2301 2345'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@govportal.gov.in'
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await pb.collection('contact_submissions').create(formData, { $autoCancel: false });
      toast.success('Message sent successfully');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Rushikesh Jaiswal </title>
        <meta name="description" content="Get in touch with us. Send your queries, feedback, or requests through our contact form or reach us directly via phone or email." />
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
                Contact us
              </h1>
              <div className="w-24 h-1.5 bg-primary mx-auto mb-8 rounded-full" />
              <p className="text-xl leading-relaxed text-secondary">
                We are here to assist you with your queries and feedback
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-border hover:border-primary hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
                        <info.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                      <p className="text-secondary leading-relaxed text-lg">
                        {info.content}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border-border shadow-xl">
                <CardContent className="p-10">
                  <h2 className="text-3xl font-bold mb-8 text-center">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-foreground font-semibold">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="text-foreground placeholder:text-secondary/50 focus-visible:ring-primary border-border h-12"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-foreground font-semibold">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="text-foreground placeholder:text-secondary/50 focus-visible:ring-primary border-border h-12"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-foreground font-semibold">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="text-foreground placeholder:text-secondary/50 focus-visible:ring-primary border-border resize-none"
                        placeholder="How can we help you today?"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="w-full gap-2 bg-primary hover:bg-[hsl(var(--primary-dark))] text-primary-foreground h-14 text-lg rounded-xl"
                    >
                      {loading ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;