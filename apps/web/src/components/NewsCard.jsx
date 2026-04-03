
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import pb from '@/lib/pocketbaseClient';

const NewsCard = ({ news }) => {
  const imageUrl = news.image 
    ? pb.files.getUrl(news, news.image, { thumb: '400x300' })
    : null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 border-border h-full flex flex-col group">
      {imageUrl && (
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={imageUrl} 
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            News
          </div>
        </div>
      )}
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-4 text-sm text-secondary mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{formatDate(news.date)}</span>
          </div>
          {news.author && (
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary" />
              <span>{news.author}</span>
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors duration-200">
          {news.title}
        </h3>
        {news.excerpt && (
          <p className="text-secondary leading-relaxed flex-1">
            {news.excerpt}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        <Link 
          to={`/news/${news.id}`}
          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-[hsl(var(--primary-dark))] hover:gap-3 transition-all duration-200"
        >
          Read full article
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
