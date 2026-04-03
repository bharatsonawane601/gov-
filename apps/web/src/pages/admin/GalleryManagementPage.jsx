
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, Video } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';
import imageCompression from 'browser-image-compression';

const GalleryManagementPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'image',
    category: '',
    video_url: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const records = await pb.collection('gallery').getList(1, 50, {
        sort: '-created',
        $autoCancel: false
      });
      setItems(records.items);
    } catch (error) {
      toast.error('Failed to fetch gallery items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      
      if (imageFile && formData.type === 'image') {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        };
        const compressedFile = await imageCompression(imageFile, options);
        data.append('image', compressedFile);
      }

      await pb.collection('gallery').create(data, { $autoCancel: false });
      toast.success('Item added to gallery');
      setIsModalOpen(false);
      setFormData({ title: '', type: 'image', category: '', video_url: '' });
      setImageFile(null);
      fetchGallery();
    } catch (error) {
      toast.error('Failed to add item');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this gallery item?')) {
      try {
        await pb.collection('gallery').delete(id, { $autoCancel: false });
        toast.success('Item deleted');
        fetchGallery();
      } catch (error) {
        toast.error('Failed to delete item');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Gallery Management</h1>
          <p className="text-secondary mt-1 text-lg">Manage photos and videos.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-[hsl(var(--primary-dark))] text-primary-foreground">
          <Plus className="w-5 h-5 mr-2" />
          Add Media
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, i) => <div key={i} className="aspect-square bg-muted animate-pulse rounded-xl" />)}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
          <ImageIcon className="w-16 h-16 mx-auto text-secondary mb-6" />
          <h3 className="text-2xl font-bold mb-2">No media found</h3>
          <p className="text-secondary text-lg">Upload some photos or videos to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden group relative border-border shadow-sm hover:shadow-md transition-all">
              <div className="aspect-square bg-muted relative">
                {item.type === 'image' && item.image ? (
                  <img 
                    src={pb.files.getUrl(item, item.image, { thumb: '200x200' })} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">
                    <Video className="w-16 h-16 text-primary" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="destructive" size="icon" className="h-12 w-12 rounded-full" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-6 h-6" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4 bg-card">
                <p className="font-bold truncate text-base text-foreground">{item.title}</p>
                <p className="text-xs font-medium text-secondary uppercase tracking-wider mt-1.5">{item.type} • {item.category || 'Uncategorized'}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add Media to Gallery</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-3">
              <Label className="font-semibold">Type</Label>
              <Select value={formData.type} onValueChange={v => setFormData({...formData, type: v})}>
                <SelectTrigger className="h-12 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label className="font-semibold">Title</Label>
              <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="h-12 focus-visible:ring-primary" />
            </div>
            <div className="space-y-3">
              <Label className="font-semibold">Category</Label>
              <Input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Events, Infrastructure" className="h-12 focus-visible:ring-primary" />
            </div>
            
            {formData.type === 'image' ? (
              <div className="space-y-3">
                <Label className="font-semibold">Image File</Label>
                <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} required className="h-12 pt-2.5 focus-visible:ring-primary" />
              </div>
            ) : (
              <div className="space-y-3">
                <Label className="font-semibold">Video URL (YouTube/Vimeo)</Label>
                <Input value={formData.video_url} onChange={e => setFormData({...formData, video_url: e.target.value})} required placeholder="https://..." className="h-12 focus-visible:ring-primary" />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-6 border-t border-border">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-12 px-6">Cancel</Button>
              <Button type="submit" disabled={uploading} className="bg-primary hover:bg-[hsl(var(--primary-dark))] text-primary-foreground h-12 px-8">
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryManagementPage;
