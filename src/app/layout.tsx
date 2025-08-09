import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ChatbotSimple } from '@/components/chatbot/chatbot-simple'
import { ToastProvider } from '@/components/toast-provider'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { AnimatedBackground } from '@/components/ui/animated-background'

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
                // Always default to light theme, ignore system preference
                const theme = localStorage.getItem('ali-shop-theme') || 'light';
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(theme);
                document.documentElement.style.colorScheme = theme;
                console.log('Initial theme applied:', theme);
              } catch (e) {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                document.documentElement.style.colorScheme = 'light';
                console.log('Theme script error, defaulting to light');
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ScrollProgress />
        <AnimatedBackground />
        <Providers>
          <div className="flex min-h-screen flex-col relative">
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </div>
          <ChatbotSimple />
          <ToastProvider />
        </Providers>
      </body>
    </html>
  );
}
