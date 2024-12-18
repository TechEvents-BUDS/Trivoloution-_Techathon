import { useLanguage } from '../components/LanguageContext'

export default function BusinessServicesPage() {
  const { language } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {language === 'en' ? 'Business Services' : 'کاروباری خدمات'}
      </h1>
      {/* Add business services information or components here */}
    </div>
  )
}

