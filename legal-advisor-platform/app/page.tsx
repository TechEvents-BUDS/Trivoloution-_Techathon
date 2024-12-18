import Hero from './components/Hero'
import Features from './components/Features'
import DetailedFeatures from './components/DetailedFeatures'
import Testimonials from './components/Testimonials'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      <Features />
      <DetailedFeatures />
      <Testimonials />
    </main>
  )
}

