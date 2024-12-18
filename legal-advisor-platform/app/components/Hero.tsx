import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from './LanguageContext'

export default function Hero() {
  const { language } = useLanguage()
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {language === 'en' 
            ? 'Your AI Legal Advisor: Predict, Analyze, and Succeed'
            : 'آپ کا اے آئی قانونی مشیر: پیش گوئی، تجزیہ، اور کامیابی'}
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          {language === 'en'
            ? 'Harness the power of AI to predict case outcomes, find the right lawyer, and compare your case with relevant historical data. Our platform simplifies legal research and decision-making for individuals, businesses, and legal professionals in Pakistan.'
            : 'کیس کے نتائج کی پیش گوئی، صحیح وکیل تلاش کرنے، اور اپنے کیس کا متعلقہ تاریخی ڈیٹا سے موازنہ کرنے کے لیے اے آئی کی طاقت کا استعمال کریں۔ ہمارا پلیٹ فارم پاکستان میں افراد، کاروباری اداروں، اور قانونی پیشہ ور افراد کے لیے قانونی تحقیق اور فیصلہ سازی کو آسان بناتا ہے۔'}
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/try-now">
              {language === 'en' ? 'Try Now for Free' : 'مفت آزمائیں'}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
            <Link href="/learn-more">
              {language === 'en' ? 'Learn More' : 'مزید جانیں'}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

