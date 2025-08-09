'use client'

import { SessionProvider } from 'next-auth/react'
import { Suspense } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </SessionProvider>
  )
}
