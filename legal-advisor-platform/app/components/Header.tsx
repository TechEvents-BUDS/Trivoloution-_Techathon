'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Scale, Globe, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguage } from './LanguageContext'
import LanguageSelector from './LanguageSelector'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const { language } = useLanguage()

  useEffect(() => {
    // Check if user is logged in
    // This is a placeholder. In a real app, you'd check the authentication state
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token')
      setIsLoggedIn(!!token)
    }

    checkLoginStatus()
    window.addEventListener('storage', checkLoginStatus)

    return () => {
      window.removeEventListener('storage', checkLoginStatus)
    }
  }, [])

  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    router.push('/')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Scale className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">LegalMind AI</span>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            {language === 'en' ? 'Home' : 'ہوم'}
          </Link>
          <Link href="/features" className="text-gray-600 hover:text-blue-600">
            {language === 'en' ? 'Features' : 'خصوصیات'}
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600">
            {language === 'en' ? 'About Us' : 'ہمارے بارے میں'}
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600">
            {language === 'en' ? 'Contact Us' : 'رابطہ کریں'}
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span>Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => router.push('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push('/forgot-password')}>
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" onClick={() => router.push('/login')}>
                {language === 'en' ? 'Login' : 'لاگ ان'}
              </Button>
              <Button onClick={() => router.push('/signup')}>
                {language === 'en' ? 'Sign Up' : 'سائن اپ'}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

