'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const mockLawyers = [
  { id: 1, name: "Aisha Khan", specialization: "Family Law", experience: 10 },
  { id: 2, name: "Muhammad Ali", specialization: "Corporate Law", experience: 15 },
  { id: 3, name: "Fatima Ahmed", specialization: "Criminal Law", experience: 8 },
]

export default function FindLawyer() {
  const [specialization, setSpecialization] = useState('')
  const [location, setLocation] = useState('')
  const [lawyers, setLawyers] = useState<typeof mockLawyers | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the specialization and location to your backend
    // and receive a list of lawyers. This is a mock implementation.
    setLawyers(mockLawyers)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Find a Lawyer</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search for Lawyers</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Select onValueChange={setSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">Family Law</SelectItem>
                  <SelectItem value="corporate">Corporate Law</SelectItem>
                  <SelectItem value="criminal">Criminal Law</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city or region"
              />
            </div>
            <Button type="submit">Search Lawyers</Button>
          </form>
        </CardContent>
      </Card>
      {lawyers && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recommended Lawyers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer) => (
              <Card key={lawyer.id}>
                <CardHeader>
                  <CardTitle>{lawyer.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Specialization: {lawyer.specialization}</p>
                  <p>Experience: {lawyer.experience} years</p>
                  <Button className="mt-4">Contact Lawyer</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

