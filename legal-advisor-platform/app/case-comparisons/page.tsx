'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const mockSimilarCases = [
  { id: 1, title: "Smith v. Johnson", outcome: "Favorable", similarity: 85 },
  { id: 2, title: "Ahmed v. Pakistan Railways", outcome: "Unfavorable", similarity: 72 },
  { id: 3, title: "Malik Family Dispute", outcome: "Settled", similarity: 68 },
]

export default function CaseComparisons() {
  const [caseDetails, setCaseDetails] = useState('')
  const [similarCases, setSimilarCases] = useState<typeof mockSimilarCases | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the case details to your backend
    // and receive a list of similar cases. This is a mock implementation.
    setSimilarCases(mockSimilarCases)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Case Comparisons</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Enter Your Case Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="caseDetails">Case Details</Label>
              <Textarea
                id="caseDetails"
                value={caseDetails}
                onChange={(e) => setCaseDetails(e.target.value)}
                placeholder="Provide a brief description of your case..."
                className="mt-1"
                rows={5}
              />
            </div>
            <Button type="submit">Find Similar Cases</Button>
          </form>
        </CardContent>
      </Card>
      {similarCases && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Similar Cases</h2>
          <div className="space-y-4">
            {similarCases.map((case_) => (
              <Card key={case_.id}>
                <CardHeader>
                  <CardTitle>{case_.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Outcome: {case_.outcome}</p>
                  <p>Similarity: {case_.similarity}%</p>
                  <Button className="mt-4">View Full Case Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

