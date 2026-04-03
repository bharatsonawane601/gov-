
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon, Video } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';

const GalleryCard = ({ item, onClick }) => {
  const imageUrl = item.image 
    ? pb.files.getUrl(item, item.image, { thumb: '400x300' })
    : null;

  const isVideo = item.type === 'video';

  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-primary hover:-translate-y-1 group border-border"
      onClick={() => onClick(item)}
    >
      <div className="aspect-square relative overflow-hidden bg-muted">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
        <div className="absolute top-3 right-3">
          <Badge className={`gap-1.5 shadow-sm ${isVideo ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'}`}>
            {isVideo ? <Video className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
            {isVideo ? 'Video' : 'Image'}
          </Badge>
        </div>
      </div>
      <div className="p-5 bg-card">
        <h3 className="font-bold leading-snug group-hover:text-primary transition-colors duration-200">{item.title}</h3>
        {item.category && (
          <p className="text-sm text-secondary mt-1.5 font-medium uppercase tracking-wide">{item.category}</p>
        )}
      </div>
    </Card>
  );
};

export default GalleryCard;
