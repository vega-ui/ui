import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Link } from '../Link.tsx';

describe('Text', () => {
  it('render default link element', () => {
    render(<Link>Hello</Link>)
    expect(screen.getByRole('link')).toBeDefined()
  })

  it('has href', () => {
    render(<Link href='https://github.com/adara-cs/ui-kit-web'>Hello</Link>)
    expect(screen.getByRole('link').getAttribute('href')).toBe('https://github.com/adara-cs/ui-kit-web')
  })
})