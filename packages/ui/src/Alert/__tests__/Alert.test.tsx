import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Alert } from '../Alert';
import { AlertContent, AlertIcon, AlertMain, AlertTitle } from '../components';

const TEXT = 'Hello, World!';
const TITLE = 'Hello from title!';

describe('Alert', () => {
  it('render', () => {
    render(
      <Alert variant='info'>
        <AlertIcon />
        <AlertMain>
          <AlertTitle>{TITLE}</AlertTitle>
          <AlertContent>{TEXT}</AlertContent>
        </AlertMain>
      </Alert>
    )
    expect(screen.getByText(TITLE)).toBeDefined()
    expect(screen.getByText(TEXT)).toBeDefined()
  })
})