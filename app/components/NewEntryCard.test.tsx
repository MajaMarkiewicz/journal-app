import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NewEntryCard from './NewEntryCard' // Adjust import path as necessary
import { vi } from 'vitest'

describe('NewEntryCard Component', () => {
  it('renders the component with the correct text', () => {
    // WHEN
    render(<NewEntryCard />)

    // THEN
    expect(screen.getByText('New entry')).toBeInTheDocument()
  })

  it('renders a Link with correct href attribute', () => {
    // WHEN
    render(<NewEntryCard />)

    // THEN
    const linkElement = screen.getByRole('link', { name: 'New entry' })
    expect(linkElement).toHaveAttribute('href', 'journal/add')
  })
})