import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EduApp Marketplace - Interactive Educational Tools',
  description: 'Browse, use, and embed interactive educational apps created by educators. Perfect for presentations and classroom use.',
  keywords: 'education, interactive apps, classroom tools, teaching resources, educational technology',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
