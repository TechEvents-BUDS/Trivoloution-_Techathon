import { useLanguage } from '../components/LanguageContext'

export default function ChangeLanguagePage() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {language === 'en' ? 'Change Language' : 'زبان تبدیل کریں'}
      </h1>
      <button onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}>
        {language === 'en' ? 'Switch to Urdu' : 'انگریزی میں تبدیل کریں'}
      </button>
    </div>
  )
}

