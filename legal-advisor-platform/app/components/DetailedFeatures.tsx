import { Scale, UserCheck, Search, Globe, FileText, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link';

const features = [
  {
    icon: <Scale className="h-12 w-12 text-blue-600" />,
    title: 'Case Outcome Prediction',
    description: 'Our AI analyzes your case details and compares them with historical data to provide an estimated chance of success.',
    action: 'Try Prediction',
    link: '/try-now'
  },
  {
    icon: <UserCheck className="h-12 w-12 text-blue-600" />,
    title: 'Lawyer Recommendations',
    description: 'Get personalized lawyer recommendations based on your case type, location, and specific needs.',
    action: 'Find a Lawyer',
    link: '/try-now'
  },
  {
    icon: <Search className="h-12 w-12 text-blue-600" />,
    title: 'Case Comparisons',
    description: 'Explore similar cases from our vast database to gain insights and build a stronger strategy.',
    action: 'Compare Cases',
    link: '/try-now'
  },
  {
    icon: <Globe className="h-12 w-12 text-blue-600" />,
    title: 'Multilingual Support',
    description: 'Access our platform in both English and Urdu, making legal information more accessible to all.',
    action: 'Change Language',
    link: '/try-now'
  },
  {
    icon: <FileText className="h-12 w-12 text-blue-600" />,
    title: 'Document Analysis',
    description: 'Upload your legal documents for AI-powered analysis and key information extraction.',
    action: 'Analyze Documents',
    link: '/try-now'
  },
  {
    icon: <Building className="h-12 w-12 text-blue-600" />,
    title: 'Business Legal Support',
    description: 'Tailored legal advice and resources for small businesses and startups.',
    action: 'Business Services',
    link: '/try-now'
  },
]

export default function DetailedFeatures() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Your Legal Needs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold ml-4">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Button asChild variant="outline" className="w-full">
                <Link href={feature.link}>
                  {feature.action}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

