import { useLanguage } from '../components/LanguageContext'

export default function FindALawyerPage() {
  const { language } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {language === 'en' ? 'Find a Lawyer' : 'وکیل تلاش کریں'}
      </h1>
      {/* Add lawyer search form or component here */}
    </div>
  )
}

