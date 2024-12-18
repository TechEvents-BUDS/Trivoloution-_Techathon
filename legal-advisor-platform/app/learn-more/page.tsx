import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LearnMore() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Learn More About LegalMind AI</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg">
            At LegalMind AI, we're committed to democratizing access to legal insights and empowering individuals and businesses with AI-driven legal assistance. Our platform combines cutting-edge artificial intelligence with extensive legal databases to provide accurate predictions, tailored recommendations, and comprehensive case analyses.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-lg">
            <li>Input your case details into our secure platform.</li>
            <li>Our AI analyzes your information against thousands of similar cases.</li>
            <li>Receive a detailed prediction of your case outcome.</li>
            <li>Get personalized lawyer recommendations based on your case type and location.</li>
            <li>Compare your case with relevant historical cases for deeper insights.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Why Choose LegalMind AI?</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Accurate Predictions: Our AI model is trained on extensive legal data, providing highly accurate case outcome predictions.</li>
            <li>Time and Cost Efficient: Save hours of research and consultation fees with our instant insights.</li>
            <li>Tailored Recommendations: Get lawyer suggestions that match your specific case requirements.</li>
            <li>Comprehensive Analysis: Compare your case with similar historical cases for a thorough understanding.</li>
            <li>Multilingual Support: Access our platform in both English and Urdu, catering to a wider audience in Pakistan.</li>
          </ul>
        </section>
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/try-now">Try LegalMind AI Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

