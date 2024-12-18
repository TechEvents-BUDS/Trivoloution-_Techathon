import Image from 'next/image'

const testimonials = [
  {
    name: 'Sarah Ahmed',
    role: 'Small Business Owner',
    content: 'LegalMind AI helped me understand my legal options and find the right lawyer for my business dispute. Highly recommended!',
    avatar: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Ali Hassan',
    role: 'Lawyer',
    content: 'As a lawyer, I find the case comparison feature incredibly useful. It saves me hours of research and provides valuable insights.',
    avatar: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Fatima Khan',
    role: 'Individual User',
    content: 'The multilingual support is a game-changer. I was able to navigate complex legal terms in Urdu, making the process much easier for me.',
    avatar: '/placeholder.svg?height=100&width=100',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

