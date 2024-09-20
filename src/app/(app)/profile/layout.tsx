import { ReactNode } from 'react'

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <div className="">{children}</div>
}
