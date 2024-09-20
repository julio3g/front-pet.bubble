import { userGet } from '@/actions/user-get'
import { UserContextProvider } from '@/context/user-context'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans as PlusJakartaSans } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const jakarta = PlusJakartaSans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pet Bubble',
  description: 'Onde lares encontram patinhas',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const { data } = await userGet()
  return (
    <html lang="pt-BR">
      <body className={`${jakarta.className} bg-slate-50 antialiased`}>
        <UserContextProvider user={data}>{children}</UserContextProvider>
        {/* {children} */}
      </body>
    </html>
  )
}
