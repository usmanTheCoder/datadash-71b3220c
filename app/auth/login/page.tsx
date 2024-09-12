'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { login } from '@/store/slices/authSlice'
import { validateEmail, validatePassword } from '@/utils/validation'
import { Button, Input, Alert, Spinner } from '@/components/ui'
import { loginUser } from '@/services/auth'

const LoginPage: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long.')
      return
    }

    setIsLoading(true)

    try {
      const response = await loginUser(email, password)
      dispatch(login(response.data))
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid email or password.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <Alert type="error" message={error} />}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <div className="flex items-center bg-gray-200 rounded-md p-2">
              <FaUserAlt className="text-gray-500 mr-2" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center bg-gray-200 rounded-md p-2">
              <FaLock className="text-gray-500 mr-2" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Login'}
          </Button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => router.push('/auth/register')}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginPage