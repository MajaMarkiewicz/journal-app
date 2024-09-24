import { describe, it, expect, vi, beforeEach } from 'vitest'
import addEntry from '@/app/actions/addEntry'
import connectMongo from '@/utils/connect-mongo'
import JournalEntry from '@/models/JournalEntry'
import { getUserByClerkId } from '@/utils/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { UserApiGet } from '@/types/user'
import { Category } from '@/types/journalEntry'

vi.mock('@/utils/connect-mongo', () => ({
  default: vi.fn(),
}))

vi.mock('@/models/JournalEntry', () => ({
  default: vi.fn(),
}))

vi.mock('@/utils/auth', () => ({
  getUserByClerkId: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

describe('addEntry action', () => {
  const mockUser = { _id: 'user123' }

  const title = 'Test Title'
  const description = 'Test Description'
  const category = Category.Satisfaction
  const additionalCategory = Category.Connection

  const mockFormData = new FormData()
  mockFormData.append('title', title)
  mockFormData.append('content', description)
  mockFormData.append('category', category)
  mockFormData.append('additionalCategory', additionalCategory)

  beforeEach(() => {
    vi.resetAllMocks()
    vi.mocked(connectMongo).mockResolvedValueOnce(undefined)
    vi.mocked(getUserByClerkId).mockResolvedValue(mockUser as UserApiGet)
    vi.mocked(JournalEntry).mockImplementation((entryData) => ({
      save: vi.fn().mockResolvedValueOnce(entryData),
    }))
  })

  it('#1 should connect MongoDB, save the entry, revalidate and redirect', async () => {
    await addEntry(mockFormData)

    expect(connectMongo).toHaveBeenCalled()
    expect(getUserByClerkId).toHaveBeenCalled()
    expect(JournalEntry).toHaveBeenCalledWith({
      userId: mockUser._id,
      title,
      content: description,
      category,
      additionalCategory,
    })
    expect(revalidatePath).toHaveBeenCalledWith('/')
    expect(redirect).toHaveBeenCalledWith('/journal')
  })

  it('#2 When the user is not found, then throw error', async () => {
    // WHEN
    // @ts-expect-error
    vi.mocked(getUserByClerkId).mockResolvedValueOnce(null)

    // THEN
    await expect(addEntry(mockFormData)).rejects.toThrowError(
      'User.id is missing',
    )

    expect(connectMongo).toHaveBeenCalled()
    expect(JournalEntry).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
    expect(redirect).not.toHaveBeenCalled()
  })
})
