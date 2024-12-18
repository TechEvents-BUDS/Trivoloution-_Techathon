'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useLanguage } from '../components/LanguageContext'

interface Lawyer {
  'Lawyer Name': string
  Specialization: string
  Phone: string
  'Email Link': string
}

interface Case {
  case_name: string
  decision_type: string
  decision_direction: string
}

interface CaseAssistanceResult {
  lawyers: Lawyer[]
  cases: Case[]
  recommendations: string
}

export default function Results() {
  const [result, setResult] = useState<CaseAssistanceResult | null>(null)
  const { language } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    const storedResult = localStorage.getItem('caseAssistanceResult')
    if (storedResult) {
      setResult(JSON.parse(storedResult))
    } else {
      router.push('/try-now')
    }
  }, [router])

  if (!result) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {language === 'en' ? 'Case Assistance Results' : 'کیس کی امداد کے نتائج'}
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Matching Lawyers' : 'مماثل وکلاء'}</CardTitle>
        </CardHeader>
        <CardContent>
          {result.lawyers.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr>
                  <th>{language === 'en' ? 'Name' : 'نام'}</th>
                  <th>{language === 'en' ? 'Specialization' : 'تخصص'}</th>
                  <th>{language === 'en' ? 'Phone' : 'فون'}</th>
                  <th>{language === 'en' ? 'Email' : 'ای میل'}</th>
                </tr>
              </thead>
              <tbody>
                {result.lawyers.map((lawyer, index) => (
                  <tr key={index}>
                    <td>{lawyer['Lawyer Name']}</td>
                    <td>{lawyer.Specialization}</td>
                    <td>{lawyer.Phone}</td>
                    <td>{lawyer['Email Link']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>{language === 'en' ? 'No matching lawyers found.' : 'کوئی مماثل وکیل نہیں ملا۔'}</p>
          )}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Similar Cases' : 'مماثل کیسز'}</CardTitle>
        </CardHeader>
        <CardContent>
          {result.cases.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr>
                  <th>{language === 'en' ? 'Case Name' : 'کیس کا نام'}</th>
                  <th>{language === 'en' ? 'Decision Type' : 'فیصلے کی قسم'}</th>
                  <th>{language === 'en' ? 'Decision Direction' : 'فیصلے کی سمت'}</th>
                </tr>
              </thead>
              <tbody>
                {result.cases.map((case_, index) => (
                  <tr key={index}>
                    <td>{case_.case_name}</td>
                    <td>{case_.decision_type}</td>
                    <td>{case_.decision_direction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>{language === 'en' ? 'No similar cases found.' : 'کوئی مماثل کیس نہیں ملا۔'}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'AI Recommendations' : 'اے آئی کی سفارشات'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{result.recommendations}</p>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Button onClick={() => router.push('/try-now')}>
          {language === 'en' ? 'Try Another Case' : 'ایک اور کیس آزمائیں'}
        </Button>
      </div>
    </div>
  )
}

