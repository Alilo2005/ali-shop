import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ChatbotSimple } from '@/components/chatbot/chatbot-simple'
import { ToastProvider } from '@/components/toast-provider'
import { FloatingActionButtons } from '@/components/ui/floating-action-buttons'
import { NotificationSystem } from '@/components/ui/notification-system'
import { LoadingScreen } from '@/components/ui/loading-screen'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { ParticleBackground } from '@/components/ui/particle-background'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { SoundProvider } from '@/components/ui/sound-provider'

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Modern eCommerce - Premium Shopping Experience',
  description: 'Discover premium products with AI-powered recommendations, secure checkout, and exceptional customer service.',
  keywords: ['ecommerce', 'shopping', 'online store', 'premium products'],
  authors: [{ name: 'Modern eCommerce Team' }],
  creator: 'Modern eCommerce',
  publisher: 'Modern eCommerce',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Modern eCommerce - Premium Shopping Experience',
    description: 'Discover premium products with AI-powered recommendations, secure checkout, and exceptional customer service.',
    siteName: 'Modern eCommerce',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern eCommerce - Premium Shopping Experience',
    description: 'Discover premium products with AI-powered recommendations, secure checkout, and exceptional customer service.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('ali-shop-theme');
                const initialTheme = theme || 'light';
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(initialTheme);
                console.log('Initial theme applied:', initialTheme);
              } catch (e) {
                document.documentElement.classList.add('light');
                console.log('Theme script error, defaulting to light');
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <LoadingScreen />
        <CustomCursor />
        <ParticleBackground />
        <ScrollProgress />
        <Providers>
          <div className="flex min-h-screen flex-col relative">
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </div>
          <ChatbotSimple />
          <ToastProvider />
          <FloatingActionButtons />
          <NotificationSystem />
          <SoundProvider />
        </Providers>
      </body>
    </html>
  );
}
