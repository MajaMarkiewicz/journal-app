import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: "Your journal",
  description: "Sum up your day focusing on reasons to be grateful and satisfied.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="h-screen w-screen">
            <div>
              <header className="h-[60px] border-b border-black/10">
                <div className="h-full w-full px-6 flex items-center justify-end">
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </header>
            </div>
            <div>
              { children }
            </div>            
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

// @todo style - improve the layout and make it responsive