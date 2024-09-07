import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Page from '../app/page'

vi.mock('@clerk/nextjs', () => {
  const mockedFunctions = {
    auth: () =>
      new Promise((resolve) =>
        resolve({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' })
      ),
    ClerkProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
        fullName: 'Charles Harris',
      },
    }),
  }

  return mockedFunctions
})

vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'inter' }),
  }
})

it('#1 When user enters home page, then user see a home page', async () => {
    // WHEN
  render(await Page())

    // THEN
  expect(screen.getByText('Improve your wellbeing by focusing on reasons to be grateful and satisfied!')).toBeTruthy()
})
