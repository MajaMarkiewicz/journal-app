import type { Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'Your journal',
  description:
    'Sum up your day focusing on reasons to be grateful and satisfied.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col overflow-hidden">
          <header className="h-[60px] w-full bg-white border-b border-black/10 fixed top-0 left-0 z-10">
            <div className="h-full w-full px-6 flex items-center justify-end">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>

          <main className="flex-grow mt-[60px]">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
