
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';

const HomepageEditorPage = () => {
  const [settingsId, setSettingsId] = useState(null);
  const [formData, setFormData] = useState({
    website_title: '',
    website_description: '',
    highlights: [],
    quick_links: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const records = await pb.collection('homepage_settings').getList(1, 1, { $autoCancel: false });
        if (records.items.length > 0) {
          const record = records.items[0];
          setSettingsId(record.id);
          setFormData({
            website_title: record.website_title || '',
            website_description: record.website_description || '',
            highlights: record.highlights || [],
            quick_links: record.quick_links || []
          });
        }
      } catch (error) {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (settingsId) {
        await pb.collection('homepage_settings').update(settingsId, formData, { $autoCancel: false });
      } else {
        const record = await pb.collection('homepage_settings').create(formData, { $autoCancel: false });
        setSettingsId(record.id);
      }
      toast.success('Homepage settings saved');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-secondary font-medium text-lg">Loading editor...</div>;

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Homepage Editor</h1>
          <p className="text-secondary mt-1 text-lg">Manage homepage content and layout.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-[hsl(var(--primary-dark))] text-primary-foreground h-12 px-6 text-base">
          <Save className="w-5 h-5 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/30 border-b border-border pb-4">
          <CardTitle className="text-xl font-bold">Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-3">
            <Label className="font-semibold text-foreground">Website Title</Label>
            <Input 
              value={formData.website_title} 
              onChange={e => setFormData({...formData, website_title: e.target.value})} 
              className="h-12 focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-3">
            <Label className="font-semibold text-foreground">Website Description</Label>
            <Textarea 
              value={formData.website_description} 
              onChange={e => setFormData({...formData, website_description: e.target.value})} 
              rows={4}
              className="focus-visible:ring-primary resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/30 border-b border-border pb-4">
          <CardTitle className="text-xl font-bold">Highlights (JSON)</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Textarea 
            value={JSON.stringify(formData.highlights, null, 2)} 
            onChange={e => {
              try {
                setFormData({...formData, highlights: JSON.parse(e.target.value)});
              } catch (err) {
                // Ignore parse errors while typing
              }
            }} 
            rows={12}
            className="font-mono text-sm focus-visible:ring-primary bg-muted/10"
          />
          <p className="text-sm font-medium text-secondary mt-3">Edit the JSON array directly for highlights.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomepageEditorPage;
