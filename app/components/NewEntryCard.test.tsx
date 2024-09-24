import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NewEntryCard from './NewEntryCard'

describe('NewEntryCard Component', () => {
  it('Given component, then render correct text and a link redirected to journal/add', () => {
    // GIVEN
    render(<NewEntryCard />)

    // THEN
    expect(screen.getByText('New entry')).toBeInTheDocument()
    const linkElement = screen.getByRole('link', { name: 'New entry' })
    expect(linkElement).toHaveAttribute('href', 'journal/add')
  })
})
