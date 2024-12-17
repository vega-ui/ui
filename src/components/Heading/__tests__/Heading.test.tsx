import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Heading } from '../Heading.tsx';

describe('Text', () => {
  it('render default heading element', () => {
    render(<Heading>Hello</Heading>)
    expect(screen.getByText('Hello')).toBeDefined()
    expect(screen.getByText('Hello').tagName).toBe('H1')
  })

  it('font-weight', () => {
    render(<Heading fontWeight={500}>Hello</Heading>)
    expect(screen.getByText('Hello').dataset.fontweight).toBe('500')
  })

  it('render as h2', () => {
    render(<Heading as='h2'>Hello</Heading>)
    expect(screen.getByText('Hello').tagName).toBe('H2')
  })

  it('render as h3', () => {
    render(<Heading as='h3'>Hello</Heading>)
    expect(screen.getByText('Hello').tagName).toBe('H3')
  })

  it('render as h4', () => {
    render(<Heading as='h4'>Hello</Heading>)
    expect(screen.getByText('Hello').tagName).toBe('H4')
  })

  it('render as h5', () => {
    render(<Heading as='h5'>Hello</Heading>)
    expect(screen.getByText('Hello').tagName).toBe('H5')
  })

  it('render as h6', () => {
    render(<Heading as='h6'>Hello</Heading>)
    expect(screen.getByText('Hello').tagName).toBe('H6')
  })
})