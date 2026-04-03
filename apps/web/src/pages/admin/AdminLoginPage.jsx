
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password, rememberMe);
      toast.success('Logged in successfully');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md shadow-xl border-2 border-primary/20 bg-card">
        <CardHeader className="space-y-3 text-center pb-8 pt-8">
          <img 
            src="https://horizons-cdn.hostinger.com/6b96f1df-e64c-4f6c-b75d-1c7ff03fb2fb/ed9e93412bd98f41926b88277e201668.png" 
            alt="Government Logo" 
            className="h-20 w-auto mx-auto mb-4 object-contain" 
          />
          <CardTitle className="text-3xl font-bold text-foreground">Admin Portal</CardTitle>
          <CardDescription className="text-secondary text-base">Sign in to manage the Government Portal</CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-foreground font-semibold">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@government.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-foreground focus-visible:ring-primary h-12"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-foreground font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-foreground focus-visible:ring-primary h-12"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="remember" className="text-sm font-medium cursor-pointer text-foreground">
                Remember me
              </Label>
            </div>
            <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-[hsl(var(--primary-dark))] text-primary-foreground" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
