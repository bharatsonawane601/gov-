
import React, { useState, useEffect } from 'react';
import { Shield, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';

const AdminUsersManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const records = await pb.collection('admin_users').getList(1, 50, { $autoCancel: false });
      setUsers(records.items);
    } catch (error) {
      toast.error('Failed to fetch admin users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Users</h1>
          <p className="text-secondary mt-1 text-lg">Manage portal administrators.</p>
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="font-bold text-foreground">Name</TableHead>
                  <TableHead className="font-bold text-foreground">Email</TableHead>
                  <TableHead className="font-bold text-foreground">Role</TableHead>
                  <TableHead className="font-bold text-foreground">Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-12 text-secondary font-medium">Loading...</TableCell></TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/30">
                      <TableCell className="font-bold text-foreground">{user.name}</TableCell>
                      <TableCell className="text-secondary font-medium">{user.email}</TableCell>
                      <TableCell className="capitalize">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
                          {user.role || 'Admin'}
                        </span>
                      </TableCell>
                      <TableCell className="text-secondary">{user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}</TableCell>
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

export default AdminUsersManagementPage;
