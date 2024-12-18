import { useLanguage } from '../components/LanguageContext'

export default function AnalyzeDocumentsPage() {
  const { language } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {language === 'en' ? 'Analyze Documents' : 'دستاویزات کا تجزیہ کریں'}
      </h1>
      {/* Add document analysis form or component here */}
    </div>
  )
}

