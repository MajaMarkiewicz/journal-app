import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import EntryAddEditForm from './EntryAddEditForm' // Adjust import path as necessary
import { Category, type JournalEntryApiGet } from '@/types/journalEntry'

describe('EntryAddEditForm Component', () => {
  it('#1 renders form with default values when no entry is provided', () => {
    const mockAction = vi.fn()

    render(<EntryAddEditForm action={mockAction} text="Add Entry" />)

    expect(screen.getByLabelText('Title')).toHaveValue('')
    expect(screen.getByLabelText('Description')).toHaveValue('')
    expect(screen.getByLabelText('Category')).toHaveValue(Category.Journal)
    expect(screen.getByLabelText('Additional Category')).toHaveValue('')
  })

  it('#2 renders form with provided entry values', () => {
    const mockEntry: JournalEntryApiGet = {
      _id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'user1',
      title: 'Test Title',
      category: Category.Gratitude,
      additionalCategory: Category.Connection,
      content: 'Test Content',
    }
    const mockAction = vi.fn()

    render(
      <EntryAddEditForm
        entry={mockEntry}
        action={mockAction}
        text="Edit Entry"
      />,
    )

    expect(screen.getByLabelText('Title')).toHaveValue(mockEntry.title)
    expect(screen.getByLabelText('Description')).toHaveValue(mockEntry.content)
    expect(screen.getByLabelText('Category')).toHaveValue(mockEntry.category)
    expect(screen.getByLabelText('Additional Category')).toHaveValue(
      mockEntry.additionalCategory,
    )
  })

  it('#3 submits form data correctly', async () => {
    const mockAction = vi.fn().mockResolvedValue(undefined)
    render(<EntryAddEditForm action={mockAction} text="Submit" />)

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'New Title' },
    })
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'New Content' },
    })
    fireEvent.change(screen.getByLabelText('Category'), {
      target: { value: 'Safety' },
    })
    fireEvent.change(screen.getByLabelText('Additional Category'), {
      target: { value: 'Connection' },
    })

    fireEvent.click(screen.getByTestId('submit-button'))

    const formData = new FormData()
    formData.append('title', 'New Title')
    formData.append('content', 'New Content')
    formData.append('category', 'Safety')
    formData.append('additionalCategory', 'Connection')

    expect(mockAction).toHaveBeenCalledWith(formData)
  })
  it('#4 disables submit button and shows loading state when submitting', async () => {
    const mockAction = vi
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 1000)),
      )
    render(<EntryAddEditForm action={mockAction} text="Submit" />)

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Title' },
    })
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Content' },
    })

    fireEvent.click(screen.getByTestId('submit-button'))

    expect(screen.getByText('Saving...')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeDisabled()
  })
})
