import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

// Declare Google type
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
        }
      }
    }
  }
}

const LoginForm = ({ onSwitchToSignup }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Initialize Google Sign-In
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '123456789-example.apps.googleusercontent.com', // Replace with your actual Google Client ID
        callback: handleGoogleResponse
      });
      
      // Render the button
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton")!,
        { theme: "outline", size: "large", width: 250 }
      );
    }
  }, []);

  const handleGoogleResponse = async (response: any) => {
    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('https://moonmovement.onrender.com/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenId: response.credential })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Google login failed');
      
      login(data.user, data.token);
      navigate('/home');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('https://moonmovement.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      login(data.user, data.token);
      navigate('/home');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-sidebar border-sidebar-border">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
        <CardDescription className="text-gray-400">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-sidebar-accent border-sidebar-border text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-sidebar-accent border-sidebar-border text-white"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
          
          <Button 
            type="submit" 
            className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-sidebar-border"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-sidebar px-2 text-gray-400">Or continue with</span>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div id="googleSignInButton"></div>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-sidebar-primary hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
