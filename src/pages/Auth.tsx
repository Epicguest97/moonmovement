
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center mb-4">
            <div className="bg-sidebar-primary text-white rounded-full w-12 h-12 flex items-center justify-center mr-2">
              <span className="font-bold text-2xl">R</span>
            </div>
            <span className="text-3xl font-bold text-white">reeddit</span>
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
