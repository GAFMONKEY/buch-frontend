'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: React.ComponentType) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        router.replace('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
