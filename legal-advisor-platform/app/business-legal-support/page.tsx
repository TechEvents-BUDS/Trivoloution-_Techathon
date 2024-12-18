import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const legalResources = [
  {
    title: "Contract Templates",
    description: "Access a variety of customizable contract templates for your business needs.",
    link: "/resources/contracts"
  },
  {
    title: "Regulatory Compliance Guide",
    description: "Stay up-to-date with the latest regulatory requirements for businesses in Pakistan.",
    link: "/resources/compliance"
  },
  {
    title: "Intellectual Property Protection",
    description: "Learn how to protect your business's intellectual property and trademarks.",
    link: "/resources/ip-protection"
  },
  {
    title: "Employment Law Handbook",
    description: "A comprehensive guide to employment laws and best practices for businesses.",
    link: "/resources/employment-law"
  },
  {
    title: "Tax Law Updates",
    description: "Get the latest updates on tax laws and regulations affecting businesses in Pakistan.",
    link: "/resources/tax-updates"
  },
  {
    title: "Dispute Resolution Strategies",
    description: "Explore various strategies for resolving business disputes efficiently.",
    link: "/resources/dispute-resolution"
  }
]

export default function BusinessLegalSupport() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Business Legal Support</h1>
      <p className="text-lg mb-8">
        Access a wide range of legal resources tailored for businesses operating in Pakistan. 
        Our AI-powered platform provides up-to-date information, templates, and guides to help 
        you navigate the complex legal landscape of running a business.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {legalResources.map((resource, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{resource.description}</p>
              <Button asChild>
                <Link href={resource.link}>Access Resource</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

