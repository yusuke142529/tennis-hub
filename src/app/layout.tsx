// src/app/layout.tsx

import './globals.css'
import NavBar from '@/components/NavBar'
import { ReactNode } from 'react'
import { ClientProviders } from '@/components/ClientProviders'

export const metadata = {
  title: 'Tennis HUB',
  description: 'A community platform for tennis enthusiasts to improve skills, share knowledge, and grow the tennis culture.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <header aria-label="Global Navigation">
            <NavBar />
          </header>
          <main aria-label="Main Content">
            {children}
          </main>
          {/* 将来的にフッターを追加可能 */}
        </ClientProviders>
      </body>
    </html>
  )
}