// src/app/logout/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const LogoutPage = () => {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    // Remove the access token
    localStorage.removeItem('access_token');

    // Update the authentication context
    setIsAuthenticated(false);

    // Redirect to the homepage
    router.replace('/');
  }, [router, setIsAuthenticated]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default LogoutPage;
