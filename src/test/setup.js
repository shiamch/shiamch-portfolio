import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Remove rendered components after each test so tests don't affect each other.
afterEach(() => {
  cleanup()
})
