import { describe, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import JournalPage from '@/app/(dashboard)/journal/page'
import * as authModule from '@/utils/auth'
import * as connectMongoModule from '@/utils/connect-mongo'
import JournalEntry from '@/models/JournalEntry'
import { Category } from '@/types/journalEntry'
import type { UserApiGet } from '@/types/user'

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
        id: 'entry1',
        title: 'First Entry',
        category: Category.Gratitude,
        content: 'I am grateful for...',
      },
      {
        id: 'entry2',
        title: 'Second Entry',
        category: Category.Satisfaction,
        additionalCategory: Category.Journal,
      },
    ]

    vi.spyOn(connectMongoModule, 'default').mockResolvedValue(undefined)
    vi.spyOn(authModule, 'getUserByClerkId').mockResolvedValue(mockedUser)
    vi.spyOn(JournalEntry, 'find').mockResolvedValue(mockedEntries)

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
  })

  it('#2 When user enters journal page, then add new entry functionality is available', async () => {
    vi.spyOn(authModule, 'getUserByClerkId').mockResolvedValue(mockedUser)
    vi.spyOn(connectMongoModule, 'default').mockResolvedValue(undefined)
    vi.spyOn(JournalEntry, 'find').mockResolvedValue([])

    // WHEN
    render(await JournalPage())

    // THEN
    expect(screen.getByTestId('add-entry')).toBeInTheDocument()
  })
})

// test by e2e
it.todo(
  'Given user on journal, when clicks new entry, fills the form and clicks submit, then new entry is added to database, he is redirected to journal page, and change is visible on journal page',
)
it.todo(
  'Given user on journal page with entries, when clicks an entry, change sth in the form and clicks submit, then entry is updated in database and on journal page',
)

// not implemented yet
it.todo(
  'Given user on journal page with entries, when clicks an entry, then delete button is available',
)
