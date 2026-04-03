
import React, { useState, useEffect } from 'react';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';

const MessagesManagementPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const records = await pb.collection('contact_submissions').getList(1, 50, {
        sort: '-created',
        $autoCancel: false
      });
      setMessages(records.items);
    } catch (error) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleReadStatus = async (id, currentStatus) => {
    try {
      await pb.collection('contact_submissions').update(id, { read: !currentStatus }, { $autoCancel: false });
      fetchMessages();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message permanently?')) {
      try {
        await pb.collection('contact_submissions').delete(id, { $autoCancel: false });
        toast.success('Message deleted');
        fetchMessages();
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Messages</h1>
        <p className="text-secondary mt-1 text-lg">View and manage contact form submissions.</p>
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="font-bold text-foreground w-16">Status</TableHead>
                  <TableHead className="font-bold text-foreground">Date</TableHead>
                  <TableHead className="font-bold text-foreground">Sender</TableHead>
                  <TableHead className="font-bold text-foreground">Message</TableHead>
                  <TableHead className="text-right font-bold text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-12 text-secondary font-medium">Loading...</TableCell></TableRow>
                ) : messages.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-12 text-secondary font-medium">No messages found.</TableCell></TableRow>
                ) : (
                  messages.map((msg) => (
                    <TableRow key={msg.id} className={`hover:bg-muted/30 ${msg.read ? 'opacity-70' : 'font-semibold bg-primary/5'}`}>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => toggleReadStatus(msg.id, msg.read)} className="hover:bg-muted">
                          {msg.read ? <MailOpen className="w-5 h-5 text-secondary" /> : <Mail className="w-5 h-5 text-primary" />}
                        </Button>
                      </TableCell>
                      <TableCell className="text-secondary">{new Date(msg.created).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="text-foreground">{msg.name}</div>
                        <div className="text-sm text-secondary font-medium mt-0.5">{msg.email}</div>
                      </TableCell>
                      <TableCell className="max-w-md truncate text-foreground">{msg.message}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(msg.id)}>
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
    </div>
  );
};

export default MessagesManagementPage;
