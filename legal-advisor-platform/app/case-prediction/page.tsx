'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function CasePrediction() {
  const [caseDetails, setCaseDetails] = useState('')
  const [prediction, setPrediction] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the case details to your backend
    // and receive a prediction. This is a mock implementation.
    setPrediction(`Based on the provided details, our AI predicts a 75% chance of a favorable outcome for your case.`)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Case Prediction</h1>
      <Card>
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
            <Button type="submit">Get Prediction</Button>
          </form>
          {prediction && (
            <div className="mt-6 p-4 bg-blue-100 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Prediction Result:</h2>
              <p>{prediction}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

