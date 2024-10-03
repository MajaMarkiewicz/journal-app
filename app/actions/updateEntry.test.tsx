import { describe, expect, vi, it, beforeEach } from 'vitest'
import updateEntry from './updateEntry'
import connectMongo from '@/utils/connect-mongo'
import JournalEntry from '@/models/JournalEntry'
import * as authModule from '@/utils/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { UserApiGet } from '@/types/user'
import { Category } from '@/types/journalEntry'

vi.mock('@/utils/connect-mongo', () => ({
  default: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

const mockedUser: UserApiGet = {
  _id: 'mocked-user-id',
  clerkId: 'mocked-clerk-id',
  email: 'mocked-email@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('updateEntry action', () => {
  const mockEntryId = 'entry-id'

  const title = 'Updated Title'
  const description = 'Updated content'
  const category = Category.Satisfaction
  const additionalCategory = Category.Connection
  const date = new Date().toISOString().split('T')[0]

  const mockFormData = new FormData()
  mockFormData.append('date', date)
  mockFormData.append('title', title)
  mockFormData.append('content', description)
  mockFormData.append('category', category)
  mockFormData.append('additionalCategory', additionalCategory)

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(connectMongo).mockResolvedValue(undefined)
    vi.spyOn(JournalEntry, 'findById').mockResolvedValue({ id: mockEntryId })
    vi.spyOn(JournalEntry, 'findByIdAndUpdate').mockResolvedValue(undefined)
  })

  it('#1 Should connect MongoDB, update the entry, revalidate and redirect', async () => {
    vi.spyOn(authModule, 'getUserByClerkId').mockResolvedValue(mockedUser)
    await updateEntry(mockEntryId, mockFormData)

    expect(connectMongo).toHaveBeenCalled()
    expect(authModule.getUserByClerkId).toHaveBeenCalled()
    expect(JournalEntry.findById).toHaveBeenCalledWith(mockEntryId)
    expect(JournalEntry.findByIdAndUpdate).toHaveBeenCalledWith(mockEntryId, {
      userId: mockedUser._id,
      date: new Date(date),
      title,
      content: description,
      category,
      additionalCategory,
    })
    expect(revalidatePath).toHaveBeenCalledWith('/')
    expect(redirect).toHaveBeenCalledWith('/journal')
  })

  it('#2 When user is not found, then throw an error', async () => {
    // WHEN
    // @ts-expect-error
    vi.spyOn(authModule, 'getUserByClerkId').mockResolvedValue(null)

    // THEN
    await expect(updateEntry(mockEntryId, mockFormData)).rejects.toThrow(
      'User.id is missing',
    )
  })

  it('#3 Given user logged in, When the entry is not found, then throw an error', async () => {
    // GIVEN
    vi.spyOn(authModule, 'getUserByClerkId').mockResolvedValue(mockedUser)

    // WHEN
    vi.spyOn(JournalEntry, 'findById').mockResolvedValue(null)

    // THEN
    await expect(updateEntry(mockEntryId, mockFormData)).rejects.toThrow(
      'Property not found',
    )
  })
})
