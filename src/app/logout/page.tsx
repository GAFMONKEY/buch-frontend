// src/app/logout/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const LogoutPage = () => {
    const router = useRouter();
    const { setIsAuthenticated } = useAuth();

    useEffect(() => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
        router.replace('/');
    }, [router, setIsAuthenticated]);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
};

export default LogoutPage;
