import { useLanguage } from '../components/LanguageContext'

export default function TryPredictionPage() {
  const { language } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {language === 'en' ? 'Try Prediction' : 'پیش گوئی آزمائیں'}
      </h1>
      {/* Add prediction form or component here */}
    </div>
  )
}

