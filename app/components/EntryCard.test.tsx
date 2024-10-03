import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import EntryCard from '@/app/components/EntryCard'
import { Category, type JournalEntryApiGet } from '@/types/journalEntry'
import * as deleteEntryModule from '@/app/actions/deleteEntry'

const pushMock = vi.fn();
const refreshMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}))

const mockEntry = {
  userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
  createdAt: new Date('2024-01-01T00:00:00.000Z'),
  category: Category.Journal,
  additionalCategory: Category.Satisfaction,
  title: 'New Year Resolutions',
  content: 'Focus on personal growth and career development.',
  _id: 'entry_3',
} as JournalEntryApiGet

describe('EntryCard Component', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('#1 Given entry card with filled entry, then entry content has date, category, additional category, title and description', () => {
    // GIVEN
    render(<EntryCard entry={mockEntry} />)

    // THEN
    expect(
      screen.getByText(new Date(mockEntry.createdAt).toDateString()),
    ).toBeInTheDocument()
    expect(screen.getByText(mockEntry.category)).toBeInTheDocument()
    expect(
      screen.getByText(`${mockEntry.additionalCategory}`),
    ).toBeInTheDocument()
    expect(screen.getByText(mockEntry.title)).toBeInTheDocument()
    expect(screen.getByText(mockEntry.content as string)).toBeInTheDocument()
  })

  it('#2 Given entry card with entry without additional category, then entry content has date, category, title and description, but no additional category', () => {
    // GIVEN
    const mockEntryWithoutAdditionalCategory = {
      userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      category: Category.Journal,
      additionalCategory: undefined,
      title: 'New Year Resolutions',
      content: 'Focus on personal growth and career development.',
    } as JournalEntryApiGet

    render(<EntryCard entry={mockEntryWithoutAdditionalCategory} />)

    // THEN
    expect(
      screen.getByText(new Date(mockEntry.createdAt).toDateString()),
    ).toBeInTheDocument()
    expect(screen.getByText(mockEntry.category)).toBeInTheDocument()
    expect(screen.queryByTestId('additional-category')).toBeNull()
    expect(screen.getByText(mockEntry.title)).toBeInTheDocument()
    expect(screen.getByText(mockEntry.content as string)).toBeInTheDocument()
  })

  it('#3 Given entry card, when click on delete button, then entry is deleted from database', async () => {
    const deleteEntrySpy = vi.spyOn(deleteEntryModule, 'default').mockImplementation(async () => Promise.resolve())

    // GIVEN
    render(<EntryCard entry={mockEntry} />)

    // WHEN
    const deleteButton = screen.getByTestId('delete-button')
    await fireEvent.click(deleteButton)

    // THEN
    expect(deleteEntrySpy).toHaveBeenCalledWith(mockEntry._id)
  })

  it('$4 Given entry card, when click on edit button, then we are redirected to detail page with correct id', async () => {
    // GIVEN
    render(<EntryCard entry={mockEntry} />)

    // WHEN
    const editButton = screen.getByTestId('edit-button')
    await fireEvent.click(editButton)

    // THEN
    expect(pushMock).toHaveBeenCalledWith(`/journal/${mockEntry._id}`)
  })
})
