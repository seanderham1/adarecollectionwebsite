import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Eye, EyeOff, Mail } from 'lucide-react';
import { AccessRequestForm } from './access-request-form';

interface ComingSoonProps {
  children: React.ReactNode;
}

// TEMPORARY: Easy to remove - just set ENABLE_COMING_SOON to false
const ENABLE_COMING_SOON = true;
const ADMIN_PASSWORD = 'access123';
const SESSION_KEY = 'adare_admin_access';

export function ComingSoon({ children }: ComingSoonProps) {
  // TEMPORARY: Easy removal - if disabled, just render children
  if (!ENABLE_COMING_SOON) {
    return <>{children}</>;
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showAccessRequest, setShowAccessRequest] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const hasAccess = sessionStorage.getItem(SESSION_KEY) === 'true';
    setIsAuthenticated(hasAccess);
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_KEY, 'true');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_KEY);
    setPassword('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
      </div>
    );
  }

  if (showAccessRequest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <AccessRequestForm onBack={() => setShowAccessRequest(false)} />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div>
        {children}
        {/* Logout button - positioned in bottom right */}
        <button
          onClick={handleLogout}
          className="fixed bottom-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
          title="Logout from admin access"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#192a4b' }}>
            <img 
              src="/images/navbar/adarecollectionlogo.png" 
              alt="The Adare Collection Logo" 
              className="w-12 h-12 object-contain"
              style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(85%) saturate(7500%) hue-rotate(45deg) brightness(105%) contrast(105%)' }}
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-serif text-gray-800">
              The Adare Collection
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Luxury Golf Properties at Adare Manor
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">Coming Soon</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We're putting the finishing touches on our new website showcasing 
              the finest luxury properties at Adare Manor. Our collection of 
              exclusive golf properties will be available soon.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              <span>Admin Access Required</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Enter Admin Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full border-0 border-b border-gray-200 rounded-none bg-transparent px-0 py-4 text-base font-medium placeholder:text-gray-400 placeholder:font-normal focus:border-gray-700 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-md">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full border border-gray-700 bg-gray-700 text-white px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-transparent hover:!text-gray-700 transition-all duration-200"
            >
              Access Site
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <Button 
            onClick={() => setShowAccessRequest(true)}
            variant="outline"
            className="w-full border border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            <Mail className="w-4 h-4 mr-2" />
            Request Access
          </Button>

          <div className="text-center text-xs text-gray-500 pt-4 border-t">
            <p>© 2025 The Adare Collection. All rights reserved.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
