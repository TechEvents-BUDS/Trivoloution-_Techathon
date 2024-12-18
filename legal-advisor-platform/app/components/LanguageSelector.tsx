'use client'

import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'
import { useLanguage } from './LanguageContext'

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en')
  }

  return (
    <Button onClick={toggleLanguage} variant="ghost" className="flex items-center">
      <Globe className="h-5 w-5 mr-2" />
      <span>{language === 'en' ? 'EN' : 'UR'}</span>
    </Button>
  )
}

