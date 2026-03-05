// rebuild sentinel comment to bust shared chunk hash
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Jose Herrera — Python & Cloud Engineer',
  description:
    'Portfolio of Jose Miguel Herrera Gutierrez — Systems Engineering student at UTP, Freelance Full-Stack Developer, Python enthusiast transitioning into Cloud & Data Engineering.',
  keywords: [
    'Jose Herrera',
    'Python Developer',
    'Cloud Engineer',
    'Data Engineer',
    'AWS',
    'Azure',
    'Next.js',
    'React',
    'Pereira Colombia',
    'UTP',
  ],
  authors: [{ name: 'Jose Miguel Herrera Gutierrez' }],
  creator: 'Jose Miguel Herrera Gutierrez',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Jose Herrera — Python & Cloud Engineer',
    description: 'Freelance Full-Stack Developer & aspiring Cloud/Data Engineer from Pereira, Colombia.',
    siteName: 'Jose Herrera Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jose Herrera — Python & Cloud Engineer',
    description: 'Freelance Full-Stack Developer & aspiring Cloud/Data Engineer.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
