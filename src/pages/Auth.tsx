import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  
  // Check URL parameter on component mount
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center mb-4">
            <div className="bg-sidebar-primary text-white rounded-full w-12 h-12 flex items-center justify-center mr-2">
              <span className="font-bold text-2xl">M</span>
            </div>
            <span className="text-3xl font-bold text-white">moonmovement</span>
          </Link>
        </div>
        
        {isLogin ? (
          <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default Auth;
