import { Scale, UserCheck, Search, Globe } from 'lucide-react'
import { useLanguage } from './LanguageContext'

export default function Features() {
  const { language } = useLanguage()

  const features = [
    {
      icon: <Scale className="h-8 w-8 text-blue-600" />,
      title: language === 'en' ? 'Predict Case Outcome' : 'کیس کے نتیجے کی پیش گوئی',
      description: language === 'en' 
        ? 'Get AI-powered predictions on your case outcome based on historical data.'
        : 'تاریخی ڈیٹا کی بنیاد پر اپنے کیس کے نتیجے کی اے آئی پاور پیش گوئیاں حاصل کریں۔',
    },
    {
      icon: <UserCheck className="h-8 w-8 text-blue-600" />,
      title: language === 'en' ? 'Lawyer Recommendations' : 'وکیل کی سفارشات',
      description: language === 'en'
        ? 'Find the best lawyers suited for your case type and location.'
        : 'اپنے کیس کی قسم اور مقام کے لیے موزوں بہترین وکلاء تلاش کریں۔',
    },
    {
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: language === 'en' ? 'Relevant Case Comparisons' : 'متعلقہ کیس کا موازنہ',
      description: language === 'en'
        ? 'Compare your case with similar historical cases for better insights.'
        : 'بہتر بصیرت کے لیے اپنے کیس کا مماثل تاریخی کیسوں سے موازنہ کریں۔',
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: language === 'en' ? 'Multilingual Support' : 'کثیر لسانی سپورٹ',
      description: language === 'en'
        ? 'Access our platform in both English and Urdu for wider accessibility.'
        : 'وسیع تر رسائی کے لیے ہمارے پلیٹ فارم تک انگریزی اور اردو دونوں میں رسائی حاصل کریں۔',
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === 'en' ? 'Our Features' : 'ہماری خصوصیات'}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

