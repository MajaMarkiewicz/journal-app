import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EntryCard from '@/app/components/EntryCard'
import { Category, type JournalEntryApiGet } from '@/types/journalEntry'

describe('EntryCard Component', () => {
  it('Given entry card with filled entry, then entry content correctly', () => {
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
    expect(
      screen.getByText(`Main category: ${mockEntry.category}`),
    ).toBeInTheDocument()
    expect(
      screen.getByText(`Additional category: ${mockEntry.additionalCategory}`),
    ).toBeInTheDocument()
    expect(screen.getByText(mockEntry.title)).toBeInTheDocument()
    expect(screen.getByText(mockEntry.content as string)).toBeInTheDocument()
  })

  it('Given entry card with entry without additional category, then entry content correctly', () => {
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
    expect(
      screen.getByText(`Main category: ${mockEntry.category}`),
    ).toBeInTheDocument()
    expect(screen.queryByText('Additional category:')).toBeNull()
    expect(screen.getByText(mockEntry.title)).toBeInTheDocument()
    expect(screen.getByText(mockEntry.content as string)).toBeInTheDocument()
  })
})
