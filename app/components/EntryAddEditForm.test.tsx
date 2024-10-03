import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import EntryAddEditForm from './EntryAddEditForm' // Adjust import path as necessary
import { Category, type JournalEntryApiGet } from '@/types/journalEntry'

describe('EntryAddEditForm Component', () => {
  it('#1 Given component without entry, then render empty form with default category', () => {
    const mockAction = vi.fn()

    // GIVEN
    render(<EntryAddEditForm action={mockAction} text="Add Entry" />)

    // THEN
    expect(screen.getByLabelText('Title')).toHaveValue('')
    expect(screen.getByLabelText('Description')).toHaveValue('')
    expect(screen.getByLabelText('Category')).toHaveValue(Category.Journal)
    expect(screen.getByLabelText('Additional Category')).toHaveValue('')
  })

  it('#2 Given component with entry, then render form with provided values', () => {
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

    // GIVEN
    render(
      <EntryAddEditForm entry={mockEntry} action={mockAction} text="Done" />,
    )

    // THEN
    expect(screen.getByLabelText('Title')).toHaveValue(mockEntry.title)
    expect(screen.getByLabelText('Description')).toHaveValue(mockEntry.content)
    expect(screen.getByLabelText('Category')).toHaveValue(mockEntry.category)
    expect(screen.getByLabelText('Additional Category')).toHaveValue(
      mockEntry.additionalCategory,
    )
  })

  it('#3 Given component, when user fills the form and clicks submit, then submit form data correctly', async () => {
    const title = 'New Title'
    const content = 'New Content'
    const category = Category.Safety
    const additionalCategory = Category.Connection

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('category', category)
    formData.append('additionalCategory', additionalCategory)

    const mockAction = vi.fn().mockResolvedValue(undefined)

    // GIVEN
    render(<EntryAddEditForm action={mockAction} text="Submit" />)

    // WHEN
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: title },
      })
      fireEvent.change(screen.getByLabelText('Description'), {
        target: { value: content },
      })
      fireEvent.change(screen.getByLabelText('Category'), {
        target: { value: category },
      })
      fireEvent.change(screen.getByLabelText('Additional Category'), {
        target: { value: additionalCategory },
      })

      fireEvent.click(screen.getByTestId('submit-button'))
    })

    // THEN
    expect(mockAction).toHaveBeenCalledWith(formData)
  })

  it('#4 Given component, when form is submitted, then disable submit button and show loading state', async () => {
    const mockAction = vi
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 1000)),
      )

    // GIVEN
    render(<EntryAddEditForm action={mockAction} text="Submit" />)

    // WHEN
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Title'), {
        target: { value: 'Title' },
      })
      fireEvent.change(screen.getByLabelText('Description'), {
        target: { value: 'Content' },
      })

      fireEvent.click(screen.getByTestId('submit-button'))
    })

    // THEN
    expect(screen.getByTestId('submit-button')).toBeDisabled()
    expect(screen.getByText('Saving...')).toBeInTheDocument()
  })
})
