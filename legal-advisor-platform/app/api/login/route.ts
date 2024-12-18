import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // This is a mock authentication.
  // In a real application, you would validate against your database and use proper authentication methods.
  if (email === 'user@example.com' && password === 'password') {
    // In a real application, you would set a secure HTTP-only cookie here
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
  }
}

