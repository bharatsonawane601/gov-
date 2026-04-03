
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';

const GalleryModal = ({ item, isOpen, onClose, onPrevious, onNext, hasPrevious, hasNext }) => {
  if (!item) return null;

  const imageUrl = item.image 
    ? pb.files.getUrl(item, item.image)
    : null;

  const isVideo = item.type === 'video';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 gap-0">
        <div className="relative bg-black">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
          >
            <X className="w-5 h-5" />
          </Button>

          {hasPrevious && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}

          {hasNext && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          )}

          <div className="flex items-center justify-center min-h-[400px] max-h-[80vh]">
            {isVideo && item.video_url ? (
              <iframe
                src={item.video_url}
                title={item.title}
                className="w-full aspect-video"
                allowFullScreen
              />
            ) : imageUrl ? (
              <img 
                src={imageUrl} 
                alt={item.title}
                className="max-w-full max-h-[80vh] object-contain"
              />
            ) : null}
          </div>

          <div className="bg-white p-6">
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            {item.category && (
              <p className="text-muted-foreground">{item.category}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModal;
