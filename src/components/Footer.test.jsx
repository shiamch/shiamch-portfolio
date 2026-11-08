import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('shows the current year in the copyright line', () => {
    render(<Footer />)

    const year = new Date().getFullYear()
    expect(screen.getByText(`© ${year} Shiam Chowdhury`)).toBeInTheDocument()
  })
})
