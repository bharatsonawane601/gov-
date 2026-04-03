
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image as ImageIcon, MessageSquare, Plus, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import pb from '@/lib/pocketbaseClient';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ news: 0, gallery: 0, messages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [newsRes, galleryRes, messagesRes] = await Promise.all([
          pb.collection('news').getList(1, 1, { $autoCancel: false }),
          pb.collection('gallery').getList(1, 1, { $autoCancel: false }),
          pb.collection('contact_submissions').getList(1, 1, { filter: 'read = false', $autoCancel: false })
        ]);

        setStats({
          news: newsRes.totalItems,
          gallery: galleryRes.totalItems,
          messages: messagesRes.totalItems
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total News', value: stats.news, icon: FileText, color: 'text-primary', bg: 'bg-muted' },
    { title: 'Gallery Items', value: stats.gallery, icon: ImageIcon, color: 'text-primary', bg: 'bg-muted' },
    { title: 'Unread Messages', value: stats.messages, icon: MessageSquare, color: 'text-primary', bg: 'bg-muted' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-secondary mt-2 text-lg">Overview of your portal's content and activity.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {loading ? (
          Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
        ) : (
          statCards.map((stat, i) => (
            <Card key={i} className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-5">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-secondary">{stat.title}</p>
                  <h3 className="text-3xl font-extrabold mt-1 text-foreground">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border shadow-sm">
          <CardHeader className="bg-muted/50 border-b border-border pb-4">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 pt-6">
            <Button asChild variant="outline" className="justify-start h-14 text-base hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <Link to="/admin/news">
                <Plus className="w-5 h-5 mr-3" />
                Add New Article
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start h-14 text-base hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <Link to="/admin/gallery">
                <Plus className="w-5 h-5 mr-3" />
                Upload to Gallery
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start h-14 text-base hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <Link to="/admin/messages">
                <MessageSquare className="w-5 h-5 mr-3" />
                View Unread Messages
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="bg-muted/50 border-b border-border pb-4">
            <CardTitle className="text-xl">System Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 border border-border rounded-xl bg-card">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span className="font-semibold text-foreground">Database Connection</span>
                </div>
                <span className="text-sm font-bold text-green-600 bg-green-500/10 px-3 py-1 rounded-full">Online</span>
              </div>
              <div className="flex items-center justify-between p-5 border border-border rounded-xl bg-card">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span className="font-semibold text-foreground">Storage Service</span>
                </div>
                <span className="text-sm font-bold text-green-600 bg-green-500/10 px-3 py-1 rounded-full">Online</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
