'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchUserData, logout } from '@/store/slices/authSlice';
import Navbar from './Navbar';
import Footer from './Footer';
import Spinner from './ui/Spinner';
import Alert from './ui/Alert';
import { FaExclamationCircle } from 'react-icons/fa';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, isLoading, user, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserData());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      router.push('/auth/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  if (isLoading) {
    return <Spinner fullScreen />;
  }

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />
      {error && (
        <Alert type="error" icon={<FaExclamationCircle />}>
          {error}
        </Alert>
      )}
      <main className="flex-grow bg-gray-100">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;