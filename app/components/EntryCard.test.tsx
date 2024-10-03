import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EntryCard from '@/app/components/EntryCard'
import { Category, type JournalEntryApiGet } from '@/types/journalEntry'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}))

describe('EntryCard Component', () => {
  it('Given entry card with filled entry, then entry content has date, category, additional category, title and description', () => {
    // GIVEN
    const mockEntry = {
      userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      category: Category.Journal,
      additionalCategory: Category.Satisfaction,
      title: 'New Year Resolutions',
      content: 'Focus on personal growth and career development.',
    } as JournalEntryApiGet

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

  it('Given entry card with entry without additional category, then entry content has date, category, title and description, but no additional category', () => {
    // GIVEN
    const mockEntry = {
      userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      category: Category.Journal,
      additionalCategory: undefined,
      title: 'New Year Resolutions',
      content: 'Focus on personal growth and career development.',
    } as JournalEntryApiGet

    render(<EntryCard entry={mockEntry} />)

    // THEN
    expect(
      screen.getByText(new Date(mockEntry.createdAt).toDateString()),
    ).toBeInTheDocument()
    expect(screen.getByText(mockEntry.category)).toBeInTheDocument()
    expect(screen.queryByTestId('additional-category')).toBeNull()
    expect(screen.getByText(mockEntry.title)).toBeInTheDocument()
    expect(screen.getByText(mockEntry.content as string)).toBeInTheDocument()
  })
  it.todo('Given entry card, when click on delete button, then entry is deleted from database and page is refreshed', () => {
    
  })
  it.todo('Given entry card, when click on edit button, then we are redirected to detail page with correct id', () => {

  })
})
