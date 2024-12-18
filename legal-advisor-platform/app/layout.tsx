import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import { LanguageProvider } from './components/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LegalMind AI',
  description: 'AI-powered legal advisor platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}

