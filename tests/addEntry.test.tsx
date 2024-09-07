import { describe, it, expect, vi, beforeEach } from 'vitest'
import addEntry from '../app/actions/addEntry'
import connectMongo from '../utils/connect-mongo'
import JournalEntry from '../models/JournalEntry'
import { getUserByClerkId } from '../utils/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

vi.mock('../utils/connect-mongo', () => ({
  default: vi.fn(),
}))

vi.mock('../models/JournalEntry', () => ({
  default: vi.fn(),
}))

vi.mock('../utils/auth', () => ({
  getUserByClerkId: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

describe('addEntry', () => {
  const mockUser = { _id: 'user123' }

  const mockFormData = new FormData()
  mockFormData.append('title', 'Test Title')
  mockFormData.append('content', 'Test Content')
  mockFormData.append('category', 'work')
  mockFormData.append('additionalCategory', 'personal')

  beforeEach(() => {
    vi.resetAllMocks()
    vi.mocked(connectMongo).mockResolvedValueOnce(undefined)
    vi.mocked(getUserByClerkId).mockResolvedValue(mockUser)
    vi.mocked(JournalEntry).mockImplementation((entryData) => ({
      save: vi.fn().mockResolvedValueOnce(entryData),
    }))
  })

  it('#1 should call connectMongo, save the entry, revalidate and redirect', async () => {
    await addEntry(mockFormData)

    expect(connectMongo).toHaveBeenCalled()
    expect(getUserByClerkId).toHaveBeenCalled()
    expect(JournalEntry).toHaveBeenCalledWith({
      userId: mockUser._id,
      title: 'Test Title',
      content: 'Test Content',
      category: 'work',
      additionalCategory: 'personal',
    })
    expect(revalidatePath).toHaveBeenCalledWith('/')
    expect(redirect).toHaveBeenCalledWith('/journal')
  })

  it('#2 should throw an error if the user is not found', async () => {
    vi.mocked(getUserByClerkId).mockResolvedValueOnce(null)

    await expect(addEntry(mockFormData)).rejects.toThrowError('User.id is missing')

    expect(connectMongo).toHaveBeenCalled()
    expect(JournalEntry).not.toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
    expect(redirect).not.toHaveBeenCalled()
  })

  it('#3 should throw an error if the JournalEntry save fails', async () => {
    vi.mocked(JournalEntry).mockImplementationOnce(() => ({
      save: vi.fn().mockRejectedValueOnce(new Error('Save failed')),
    }))

    await expect(addEntry(mockFormData)).rejects.toThrowError('Save failed')

    expect(connectMongo).toHaveBeenCalled()
    expect(JournalEntry).toHaveBeenCalled()
    expect(revalidatePath).not.toHaveBeenCalled()
    expect(redirect).not.toHaveBeenCalled()
  })
})
