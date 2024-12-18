'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function DocumentAnalysis() {
  const [file, setFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    // In a real application, you would upload the file to your backend
    // and receive an analysis. This is a mock implementation.
    setAnalysis(`Document analysis complete. Key findings:
    - Document type: Legal contract
    - Main parties involved: Party A and Party B
    - Key clauses: Non-disclosure agreement, intellectual property rights
    - Potential risks: Ambiguous termination clause on page 3`)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Document Analysis</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload Legal Document</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="document">Select Document</Label>
              <Input
                id="document"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="mt-1"
              />
            </div>
            <Button type="submit" disabled={!file}>Analyze Document</Button>
          </form>
        </CardContent>
      </Card>
      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap">{analysis}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

