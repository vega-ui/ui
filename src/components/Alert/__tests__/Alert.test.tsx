import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Alert } from '../Alert.tsx';

const TEXT = 'Hello, World!';
const TITLE = 'Hello from title!';

describe('Alert', () => {
  it('render', () => {
    render(<Alert variant='info' title={TITLE}>{TEXT}</Alert>)
    expect(screen.getByText(TITLE)).toBeDefined()
    expect(screen.getByText(TEXT)).toBeDefined()
  })
})