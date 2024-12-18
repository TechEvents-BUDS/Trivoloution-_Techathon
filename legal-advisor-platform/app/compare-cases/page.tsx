import { useLanguage } from '../components/LanguageContext'

export default function CompareCasesPage() {
  const { language } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {language === 'en' ? 'Compare Cases' : 'کیسوں کا موازنہ کریں'}
      </h1>
      {/* Add case comparison form or component here */}
    </div>
  )
}

