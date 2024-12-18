'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '../components/LanguageContext'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function TryNow() {
  const [caseType, setCaseType] = useState('')
  const [caseFacts, setCaseFacts] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguage()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await fetch('http://localhost:5000/api/case-assistance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ case_type: caseType, case_facts: caseFacts }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Received empty response from server')
      }
      localStorage.setItem('caseAssistanceResult', JSON.stringify(data))
      router.push('/results')
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {language === 'en' ? 'Try LegalMind AI' : 'لیگل مائنڈ اے آئی آزمائیں'}
      </h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Case Details' : 'کیس کی تفصیلات'}</CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'Provide information about your case to get AI-powered assistance'
              : 'اے آئی پاور امداد حاصل کرنے کے لیے اپنے کیس کے بارے میں معلومات فراہم کریں'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="caseType" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {language === 'en' ? 'Case Type' : 'کیس کی قسم'}
              </label>
              <Select onValueChange={setCaseType} required>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Select case type' : 'کیس کی قسم منتخب کریں'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civil">{language === 'en' ? 'Civil' : 'سول'}</SelectItem>
                  <SelectItem value="criminal">{language === 'en' ? 'Criminal' : 'فوجداری'}</SelectItem>
                  <SelectItem value="family">{language === 'en' ? 'Family' : 'خاندانی'}</SelectItem>
                  <SelectItem value="property">{language === 'en' ? 'Property' : 'جائیداد'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="caseFacts" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {language === 'en' ? 'Case Facts' : 'کیس کے حقائق'}
              </label>
              <Textarea
                id="caseFacts"
                value={caseFacts}
                onChange={(e) => setCaseFacts(e.target.value)}
                placeholder={language === 'en' ? 'Describe your case...' : 'اپنے کیس کی وضاحت کریں...'}
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {language === 'en' ? 'Get Assistance' : 'امداد حاصل کریں'}
            </Button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p>{language === 'en' ? 'Error:' : 'خرابی:'} {error}</p>
            </div>
          )}
        </CardContent>
        
      </Card>
    </div>
  )
}

