
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const HighlightCard = ({ number, title, description }) => {
  return (
    <Card className="bg-primary text-primary-foreground border-none transition-all duration-300 hover:shadow-lg hover:bg-[hsl(var(--primary-dark))] hover:-translate-y-1 h-full group">
      <CardContent className="p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div 
            className="text-6xl font-extrabold text-primary-foreground/20 leading-none group-hover:text-primary-foreground/30 transition-colors duration-300"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {number}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3 leading-snug">
              {title}
            </h3>
            <p className="text-primary-foreground/90 leading-relaxed text-lg">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HighlightCard;
