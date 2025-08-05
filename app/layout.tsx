import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Titanium Studio - Simulateur de Séance | Studio d\'Enregistrement Professionnel',
  description: 'Simulez et réservez votre séance d\'enregistrement chez Titanium Studio. Mixage professionnel, mastering, et production musicale de haute qualité.',
  keywords: 'studio enregistrement, mixage, mastering, production musicale, titanium studio, réservation studio',
  authors: [{ name: 'Titanium Studio' }],
  creator: 'Titanium Studio',
  publisher: 'Titanium Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Titanium Studio - Simulateur de Séance',
    description: 'Calculez le coût de votre projet musical et réservez votre séance en ligne',
    url: 'https://titanium-studio.com',
    siteName: 'Titanium Studio',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Titanium Studio - Studio d\'Enregistrement Professionnel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Titanium Studio - Simulateur de Séance',
    description: 'Calculez le coût de votre projet musical et réservez votre séance',
    images: ['/twitter-image.jpg'],
    creator: '@titaniumstudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
          
          /* Preload animation */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          body {
            animation: fadeIn 0.3s ease-in;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
          
          ::-webkit-scrollbar-track {
            background: #000;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #dc2626;
            border-radius: 5px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #991b1b;
          }
          
          /* Selection color */
          ::selection {
            background-color: #dc2626;
            color: #ffffff;
          }
          
          ::-moz-selection {
            background-color: #dc2626;
            color: #ffffff;
          }
        `}</style>
        
        {/* Préconnexion aux domaines externes pour améliorer les performances */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Meta tags supplémentaires pour le SEO */}
        <meta name="theme-color" content="#dc2626" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      
      <body className="antialiased bg-black text-white min-h-screen">
        {/* Indicateur de studio en ligne */}
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent z-50" />
        
        {/* Contenu principal */}
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  )
}