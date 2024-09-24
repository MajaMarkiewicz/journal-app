import { describe, test, expect, vi, beforeEach } from 'vitest'
import newUserPage from '@/app/new-user/page'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import User from '@/models/User'
import connectMongo from '@/utils/connect-mongo'

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

vi.mock('@clerk/nextjs/server', () => ({
  currentUser: vi.fn(),
}))

vi.mock('@/models/User', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    // @ts-expect-error
    ...actual,
    default: {
      // @ts-expect-error
      ...actual.default,
      exists: vi.fn(),
      create: vi.fn(),
    },
  }
})

vi.mock('@/utils/connect-mongo', () => ({
  default: vi.fn(),
}))

describe('newUserPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('Given user logged in Clerk but not in the database, when user enters the new-user page, then user is added to the database', async () => {
    const mockUser = {
      id: 'clerk-user-id',
      emailAddresses: [{ emailAddress: 'test@example.com' }],
    }
    // @ts-expect-error
    currentUser.mockResolvedValue(mockUser)
    // @ts-expect-error
    connectMongo.mockResolvedValue(true)
    // @ts-expect-error
    User.exists.mockResolvedValue(false)
    // @ts-expect-error
    User.create.mockResolvedValue(true)

    await newUserPage()

    expect(connectMongo).toHaveBeenCalled()
    expect(currentUser).toHaveBeenCalled()
    expect(User.exists).toHaveBeenCalledWith({ clerkId: 'clerk-user-id' })
    expect(User.create).toHaveBeenCalledWith({
      clerkId: 'clerk-user-id',
      email: 'test@example.com',
    })
    expect(redirect).toHaveBeenCalledWith('/journal')
  })
})
