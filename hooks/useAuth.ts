import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, register, AuthState } from '@/store/slices/authSlice';
import { toast } from 'react-toastify';
import { AuthService } from '@/services/auth';

const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user, error } = useSelector((state: { auth: AuthState }) => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      setIsLoading(true);
      try {
        const authUser = await AuthService.getAuthUser();
        if (authUser) {
          dispatch(login(authUser));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        console.error('Error checking auth state:', err);
        dispatch(logout());
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await AuthService.login(email, password);
      dispatch(login(user));
      router.push('/dashboard');
    } catch (err) {
      console.error('Error logging in:', err);
      dispatch(logout());
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const user = await AuthService.register(email, password, name);
      dispatch(register(user));
      router.push('/dashboard');
    } catch (err) {
      console.error('Error registering:', err);
      dispatch(logout());
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      dispatch(logout());
      router.push('/auth/login');
    } catch (err) {
      console.error('Error logging out:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isAuthenticated, user, isLoading, handleLogin, handleRegister, handleLogout };
};

export default useAuth;