
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';

const AdminSettingsPage = () => {
  const [settingsId, setSettingsId] = useState(null);
  const [formData, setFormData] = useState({
    contact_phone: '',
    contact_address: '',
    contact_email: '',
    social_facebook: '',
    social_twitter: '',
    social_instagram: '',
    social_linkedin: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const records = await pb.collection('homepage_settings').getList(1, 1, { $autoCancel: false });
        if (records.items.length > 0) {
          const record = records.items[0];
          setSettingsId(record.id);
          setFormData({
            contact_phone: record.contact_phone || '',
            contact_address: record.contact_address || '',
            contact_email: record.contact_email || '',
            social_facebook: record.social_facebook || '',
            social_twitter: record.social_twitter || '',
            social_instagram: record.social_instagram || '',
            social_linkedin: record.social_linkedin || ''
          });
        }
      } catch (error) {
        console.error(error);
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
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Global Settings</h1>
          <p className="text-secondary mt-1 text-lg">Manage contact info and social links.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-[hsl(var(--primary-dark))] text-primary-foreground h-12 px-6 text-base">
          <Save className="w-5 h-5 mr-2" />
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/30 border-b border-border pb-4">
          <CardTitle className="text-xl font-bold">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="font-semibold text-foreground">Email Address</Label>
              <Input value={formData.contact_email} onChange={e => setFormData({...formData, contact_email: e.target.value})} className="h-12 focus-visible:ring-primary" />
            </div>
            <div className="space-y-3">
              <Label className="font-semibold text-foreground">Phone Number</Label>
              <Input value={formData.contact_phone} onChange={e => setFormData({...formData, contact_phone: e.target.value})} className="h-12 focus-visible:ring-primary" />
            </div>
          </div>
          <div className="space-y-3">
            <Label className="font-semibold text-foreground">Physical Address</Label>
            <Input value={formData.contact_address} onChange={e => setFormData({...formData, contact_address: e.target.value})} className="h-12 focus-visible:ring-primary" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/30 border-b border-border pb-4">
          <CardTitle className="text-xl font-bold">Social Media Links</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="space-y-3">
            <Label className="font-semibold text-foreground">Facebook URL</Label>
            <Input value={formData.social_facebook} onChange={e => setFormData({...formData, social_facebook: e.target.value})} className="h-12 focus-visible:ring-primary" />
          </div>
          <div className="space-y-3">
            <Label className="font-semibold text-foreground">Twitter URL</Label>
            <Input value={formData.social_twitter} onChange={e => setFormData({...formData, social_twitter: e.target.value})} className="h-12 focus-visible:ring-primary" />
          </div>
          <div className="space-y-3">
            <Label className="font-semibold text-foreground">Instagram URL</Label>
            <Input value={formData.social_instagram} onChange={e => setFormData({...formData, social_instagram: e.target.value})} className="h-12 focus-visible:ring-primary" />
          </div>
          <div className="space-y-3">
            <Label className="font-semibold text-foreground">LinkedIn URL</Label>
            <Input value={formData.social_linkedin} onChange={e => setFormData({...formData, social_linkedin: e.target.value})} className="h-12 focus-visible:ring-primary" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettingsPage;
