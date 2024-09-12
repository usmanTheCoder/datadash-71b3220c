'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setUser, logout } from '@/store/slices/authSlice'
import { useAuth } from '@/hooks/useAuth'
import Layout from '@/components/Layout'
import Spinner from '@/components/ui/Spinner'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'

const AuthPage: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, isLoading, error } = useSelector((state: RootState) => state.auth)
  const { isAuthenticated, login, handleLogout } = useAuth()

  const handleLogin = async () => {
    try {
      await login()
      dispatch(setUser({ name: 'John Doe', email: 'john@example.com' }))
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogoutClick = async () => {
    try {
      await handleLogout()
      dispatch(logout())
      router.push('/auth/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Alert type="error" message={error} />
        ) : isAuthenticated ? (
          <div className="flex flex-col items-center">
            <FaUserCircle className="text-6xl text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Welcome, {user.name}!</h2>
            <p className="text-gray-600 mb-6">{user.email}</p>
            <Button
              onClick={handleLogoutClick}
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
            >
              <FaSignOutAlt />
              Logout
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
          >
            Login
          </Button>
        )}
      </div>
    </Layout>
  )
}

export default AuthPage