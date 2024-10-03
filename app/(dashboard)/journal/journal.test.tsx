import { describe, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import JournalPage from '@/app/(dashboard)/journal/page'
import * as authModule from '@/utils/auth'
import * as connectMongoModule from '@/utils/connect-mongo'
import JournalEntry from '@/models/JournalEntry'
import { Category } from '@/types/journalEntry'
import type { UserApiGet } from '@/types/user'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}))

const mockedUser: UserApiGet = {
  _id: 'mocked-user-id',
  clerkId: 'mocked-clerk-id',
  email: 'mocked-email@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('Journal Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('#1 Given user has entries, when user enters journal page, then entries are displayed', async () => {
    // GIVEN
    const mockedEntries = [
      {
        _id: 'entry1',
        title: 'First Entry',
        category: Category.Gratitude,
        content: 'I am grateful for...',
        userId: 'mocked-user-id',
      },
      {
        _id: 'entry2',
        title: 'Second Entry',
        category: Category.Satisfaction,
        additionalCategory: Category.Journal,
        userId: 'mocked-user-id',
      },
    ]

    vi.spyOn(connectMongoModule, 'default').mockResolvedValue(undefined)
    vi.spyOn(authModule, 'getUserByClerkId').mockResolvedValue(mockedUser)
    vi.spyOn(JournalEntry, 'find').mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockedEntries),
      // biome-ignore lint/suspicious/noExplicitAny: it is a mock not a real function
    } as any)

    // WHEN
    render(await JournalPage())

    // THEN
    expect(screen.getByText(mockedEntries[0].title)).toBeInTheDocument()
    expect(screen.getByText(mockedEntries[0].category)).toBeInTheDocument()
    expect(
      screen.getByText(mockedEntries[0].content as string),
    ).toBeInTheDocument()
    expect(screen.getByText(mockedEntries[1].title)).toBeInTheDocument()
    expect(screen.getByText(mockedEntries[1].category)).toBeInTheDocument()
    expect(
      screen.getByText(mockedEntries[1].additionalCategory as string),
    ).toBeInTheDocument()
    expect(screen.getAllByTestId('delete-button')[0]).toBeInTheDocument()
    expect(screen.getAllByTestId('edit-button')[0]).toBeInTheDocument()
  })

  it('#2 When user enters journal page, then add new entry functionality is available', async () => {
    vi.spyOn(authModule, 'getUserByClerkId').mockResolvedValue(mockedUser)
    vi.spyOn(connectMongoModule, 'default').mockResolvedValue(undefined)
    vi.spyOn(JournalEntry, 'find').mockReturnValue({
      lean: vi.fn().mockResolvedValue([]),
      // biome-ignore lint/suspicious/noExplicitAny: it is a mock not a real function
    } as any)

    // WHEN
    render(await JournalPage())

    // THEN
    expect(screen.getByTestId('add-entry')).toBeInTheDocument()
  })
})
