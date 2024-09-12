'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { registerUser, clearAuthError } from '@/store/slices/authSlice';
import { validateEmail, validatePassword } from '@/utils/validation';
import { Button, Input, Spinner, Alert } from '@/components/ui';
import { RootState } from '@/store';

const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      setNameError('');
      setEmailError(error.email || '');
      setPasswordError(error.password || '');
      setConfirmPasswordError(error.confirmPassword || '');
    } else {
      setNameError('');
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');
    }
  }, [error]);

  const handleRegister = async () => {
    if (!name) {
      setNameError('Name is required');
      return;
    }

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
      );
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    dispatch(registerUser({ name, email, password }));
  };

  const handleInputFocus = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.focus();
  };

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <Alert type="error" message={error.message} />}
        <div className="mb-4">
          <Input
            type="text"
            label="Name"
            icon={<FaUser />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
            onFocus={() => handleInputFocus(emailInputRef)}
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            label="Email"
            icon={<FaEnvelope />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            ref={emailInputRef}
            onFocus={() => handleInputFocus(passwordInputRef)}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            label="Password"
            icon={<FaLock />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            ref={passwordInputRef}
          />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            label="Confirm Password"
            icon={<FaLock />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPasswordError}
          />
        </div>
        <div className="flex justify-center">
          <Button type="button" onClick={handleRegister} disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Register'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;