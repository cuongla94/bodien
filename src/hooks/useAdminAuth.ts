import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AdminLinks } from 'config/admin-config';

const ADMIN_KEY = 'bodien-admin-auth';
const EXPIRY = 72 * 60 * 60 * 1000;

export const useAdminAuth = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authData = localStorage.getItem(ADMIN_KEY);
    if (authData) {
      try {
        const { token, timestamp } = JSON.parse(authData);
        const isValid = token === 'access-granted' && Date.now() - timestamp < EXPIRY;
        if (isValid) {
          setAuthenticated(true);
        } else {
          localStorage.removeItem(ADMIN_KEY);
        }
      } catch {
        localStorage.removeItem(ADMIN_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = (password: string) => {
    if (password === process.env.NEXT_PUBLIC_BODIEN_ADMIN_PASS) {
      localStorage.setItem(ADMIN_KEY, JSON.stringify({ token: 'access-granted', timestamp: Date.now() }));
      setAuthenticated(true);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_KEY);
    setAuthenticated(false);
    router.push(`${AdminLinks.adminDashboard}`);
  };

  return {
    authenticated,
    loading,
    login,
    logout,
  };
};
