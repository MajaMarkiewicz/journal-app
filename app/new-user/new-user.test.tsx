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

vi.mock('@/utils/connect-mongo', () => ({
  default: vi.fn(),
}))

describe('newUserPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('Given user logged in Clerk but not in the database, when user enters the new-user page, then user is added to the database', async () => {
    // GIVEN
    const mockUser = {
      id: 'clerk-user-id',
      emailAddresses: [{ emailAddress: 'test@example.com' }],
    }

    // @ts-expect-error
    currentUser.mockResolvedValue(mockUser)
    // @ts-expect-error
    const userExistsSpy = vi.spyOn(User, 'exists').mockResolvedValue(false)
    // @ts-expect-error
    const userCreateSpy = vi.spyOn(User, 'create').mockResolvedValue(true)

    // WHEN
    await newUserPage()

    // THEN
    expect(connectMongo).toHaveBeenCalled()
    expect(currentUser).toHaveBeenCalled()
    expect(userExistsSpy).toHaveBeenCalledWith({ clerkId: 'clerk-user-id' })
    expect(userCreateSpy).toHaveBeenCalledWith({
      clerkId: 'clerk-user-id',
      email: 'test@example.com',
    })
    expect(redirect).toHaveBeenCalledWith('/journal')
  })
})
