
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';

const NewsManagementPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const filter = search ? `title ~ "${search}"` : '';
      const records = await pb.collection('news').getList(1, 50, {
        filter,
        sort: '-date',
        $autoCancel: false
      });
      setNews(records.items);
    } catch (error) {
      toast.error('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchNews(), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleOpenModal = (newsItem = null) => {
    if (newsItem) {
      setEditingNews(newsItem);
      setFormData({
        title: newsItem.title,
        content: newsItem.content,
        excerpt: newsItem.excerpt || '',
        author: newsItem.author || '',
        date: newsItem.date.split(' ')[0]
      });
    } else {
      setEditingNews(null);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        author: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (imageFile) data.append('image', imageFile);

      if (editingNews) {
        await pb.collection('news').update(editingNews.id, data, { $autoCancel: false });
        toast.success('News updated successfully');
      } else {
        await pb.collection('news').create(data, { $autoCancel: false });
        toast.success('News created successfully');
      }
      setIsModalOpen(false);
      fetchNews();
    } catch (error) {
      toast.error('Failed to save news');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await pb.collection('news').delete(id, { $autoCancel: false });
        toast.success('News deleted successfully');
        fetchNews();
      } catch (error) {
        toast.error('Failed to delete news');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">News Management</h1>
          <p className="text-secondary mt-1 text-lg">Manage articles and announcements.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-[hsl(var(--primary-dark))] text-primary-foreground">
          <Plus className="w-5 h-5 mr-2" />
          Add News
        </Button>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4 bg-muted/30 border-b border-border">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12 focus-visible:ring-primary"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="font-bold text-foreground">Title</TableHead>
                  <TableHead className="font-bold text-foreground">Date</TableHead>
                  <TableHead className="font-bold text-foreground">Author</TableHead>
                  <TableHead className="text-right font-bold text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-secondary font-medium">Loading...</TableCell>
                  </TableRow>
                ) : news.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-secondary font-medium">No articles found.</TableCell>
                  </TableRow>
                ) : (
                  news.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/30">
                      <TableCell className="font-semibold text-foreground">{item.title}</TableCell>
                      <TableCell className="text-secondary">{new Date(item.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-secondary">{item.author || '-'}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-muted" onClick={() => handleOpenModal(item)}>
                          <Edit className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{editingNews ? 'Edit News Article' : 'Add News Article'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-3">
              <Label htmlFor="title" className="font-semibold">Title</Label>
              <Input id="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="focus-visible:ring-primary h-12" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="date" className="font-semibold">Date</Label>
                <Input id="date" type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required className="focus-visible:ring-primary h-12" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="author" className="font-semibold">Author</Label>
                <Input id="author" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="focus-visible:ring-primary h-12" />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="excerpt" className="font-semibold">Excerpt</Label>
              <Textarea id="excerpt" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} rows={3} className="focus-visible:ring-primary resize-none" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="content" className="font-semibold">Content</Label>
              <Textarea id="content" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={8} required className="focus-visible:ring-primary resize-none" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="image" className="font-semibold">Image</Label>
              <Input id="image" type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="focus-visible:ring-primary h-12 pt-2.5" />
              {editingNews?.image && !imageFile && (
                <p className="text-sm text-secondary mt-2 font-medium">Current image will be kept if no new file is selected.</p>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-6 border-t border-border">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-12 px-6">Cancel</Button>
              <Button type="submit" className="bg-primary hover:bg-[hsl(var(--primary-dark))] text-primary-foreground h-12 px-8">Save Article</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsManagementPage;
