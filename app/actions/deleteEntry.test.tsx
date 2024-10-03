import { describe, expect, vi, it, beforeEach } from 'vitest'
import deleteEntry from './deleteEntry'
import connectMongo from '@/utils/connect-mongo'
import JournalEntry from '@/models/JournalEntry'
import * as authModule from '@/utils/auth'
import { revalidatePath } from 'next/cache'
import type { UserApiGet } from '@/types/user'

vi.mock('@/utils/connect-mongo', () => ({
  default: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('deleteEntry action', () => {
  const mockUser = { _id: 'user123' } as UserApiGet
  const mockEntryId = 'entry123'

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(connectMongo).mockResolvedValue(undefined)
    vi.spyOn(JournalEntry, 'findOneAndDelete').mockResolvedValue({
      _id: mockEntryId,
    })
  })

  it('#1 Should connect to MongoDB, delete the entry, and revalidate the path', async () => {
    vi.spyOn(authModule, 'getUserByClerkId').mockResolvedValue(mockUser)

    await deleteEntry(mockEntryId)

    expect(connectMongo).toHaveBeenCalled()
    expect(authModule.getUserByClerkId).toHaveBeenCalled()
    expect(JournalEntry.findOneAndDelete).toHaveBeenCalledWith({
      _id: mockEntryId,
      userId: mockUser._id,
    })
    expect(revalidatePath).toHaveBeenCalledWith('/journal')
  })

  it('#2 When user is not found, then throw an error', async () => {
    // @ts-expect-error
    vi.spyOn(authModule, 'getUserByClerkId').mockResolvedValue(null)

    await expect(deleteEntry(mockEntryId)).rejects.toThrow('User.id is missing')
  })

  it('#3 When entry is not found, then throw an error', async () => {
    vi.spyOn(authModule, 'getUserByClerkId').mockResolvedValue(mockUser)
    vi.spyOn(JournalEntry, 'findOneAndDelete').mockResolvedValue(null)

    await expect(deleteEntry(mockEntryId)).rejects.toThrow(
      'Journal entry not found or unauthorized',
    )
  })
})
