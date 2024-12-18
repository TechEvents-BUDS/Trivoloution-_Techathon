import { useLanguage } from '../components/LanguageContext'

export default function ContactPage() {
  const { language } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {language === 'en' ? 'Contact Us' : 'ہم سے رابطہ کریں'}
      </h1>
      <p>
        {language === 'en' 
          ? 'Get in touch with us for any inquiries or support.'
          : 'کسی بھی استفسار یا مدد کے لیے ہم سے رابطہ کریں۔'
        }
      </p>
    </div>
  )
}

