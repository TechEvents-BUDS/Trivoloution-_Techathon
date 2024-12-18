import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Case Predictions</CardTitle>
            <CardDescription>View your case outcome predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/predictions">View Predictions</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lawyer Recommendations</CardTitle>
            <CardDescription>Find the right lawyer for your case</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/recommendations">View Recommendations</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Case Comparisons</CardTitle>
            <CardDescription>Compare your case with similar ones</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/comparisons">View Comparisons</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

