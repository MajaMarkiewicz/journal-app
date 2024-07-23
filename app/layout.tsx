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
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
