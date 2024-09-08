import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Page from '@/app/page'

vi.mock('@clerk/nextjs', () => ({
  auth: () =>
    new Promise((resolve) =>
      resolve({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' }),
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
}))

vi.mock('next/font/google', () => ({
  Inter: () => ({ className: 'inter' }),
}))

describe('Home Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('#1 When user enters home page, then user sees the home page', () => {
    // WHEN
    render(<Page />)

    // THEN
    expect(
      screen.getByText(
        'Improve your wellbeing by focusing on reasons to be grateful and satisfied!',
      ),
    ).toBeTruthy()
  })

  it('#2 Given user is signed in and on the home page, When user clicks the link, user is redirected to the journal page', () => {
    // GIVEN
    render(<Page />)

    const link = screen.getByRole('link', { name: 'Get started' })

    // WHEN
    fireEvent.click(link)

    // THEN
    expect(link).toBeTruthy()
    expect(link).toHaveAttribute('href', '/journal')
  })
})
