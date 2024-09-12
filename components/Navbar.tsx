'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { RootState } from '@/store';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold mr-4">
          DataDash
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link href="/dashboard/visualizations" className="hover:text-gray-300">
            Visualizations
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        {user ? (
          <div className="flex items-center md:space-x-4">
            <div className="hidden md:block">
              <span className="mr-2">Welcome, {user.username}</span>
              <FaUserCircle className="inline-block" />
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center hover:text-gray-300"
            >
              <AiOutlineLogout className="mr-2" />
              <span className="hidden md:inline-block">Logout</span>
            </button>
          </div>
        ) : (
          <Link href="/auth/login" className="hover:text-gray-300">
            Login
          </Link>
        )}
        <button onClick={toggleMenu} className="md:hidden ml-4">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 py-4 px-6 flex flex-col space-y-4">
          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link href="/dashboard/visualizations" className="hover:text-gray-300">
            Visualizations
          </Link>
          {user && (
            <button onClick={handleLogout} className="flex items-center hover:text-gray-300">
              <AiOutlineLogout className="mr-2" />
              <span>Logout</span>
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;