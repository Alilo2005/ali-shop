'use client'

import { SessionProvider } from 'next-auth/react'
import { Suspense } from 'react'
import { ThemeProvider } from '@/components/theme-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider defaultTheme="light" storageKey="ali-shop-theme">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </ThemeProvider>
    </SessionProvider>
  )
}
