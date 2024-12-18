import { useLanguage } from '../components/LanguageContext'

export default function AboutPage() {
  const { language } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {language === 'en' ? 'About Us' : 'ہمارے بارے میں'}
      </h1>
      <p>
        {language === 'en' 
          ? 'LegalMind AI is an innovative platform that leverages artificial intelligence to provide legal insights and assistance.'
          : 'لیگل مائنڈ اے آئی ایک جدید پلیٹ فارم ہے جو قانونی بصیرت اور مدد فراہم کرنے کے لیے مصنوعی ذہانت کا استعمال کرتا ہے۔'
        }
      </p>
    </div>
  )
}

