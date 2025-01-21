import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Button } from '../Button.tsx';

const TEXT = 'Hello, World!';
const sizes = ['small', 'medium', 'large'] as const;
const variants = ['primary', 'secondary'] as const;
const appearance = ['fill', 'outline', 'ghost', 'transparent'] as const;

describe('Button', () => {
  it('render', () => {
    render(<Button>{TEXT}</Button>)
    expect(screen.getByText(TEXT)).toBeDefined()
  })

  sizes.forEach((size) => {
    it(`${size} size`, () => {
      render(<Button size={size}>{TEXT}</Button>)
      expect(screen.getByText(TEXT).getAttribute('data-size')).toBe(size)
    })
  })

  variants.forEach((variant) => {
    it(`${variant} variant`, () => {
      render(<Button variant={variant}>{TEXT}</Button>)
      expect(screen.getByText(TEXT).getAttribute('data-variant')).toBe(variant)
    })
  })

  appearance.forEach((appearance) => {
    it(`${appearance} appearance`, () => {
      render(<Button appearance={appearance}>{TEXT}</Button>)
      expect(screen.getByText(TEXT).getAttribute('data-appearance')).toBe(appearance)
    })
  })

  it('as link', async () => {
    const wrapper = render(<Button as='a'>{TEXT}</Button>)

    wrapper.getByText(TEXT).click()
    expect(wrapper.getByText(TEXT).tagName).toBe('A')
  })

  it('click', async () => {
    const handleClick = vi.fn()
    const wrapper = render(<Button onClick={handleClick}>{TEXT}</Button>)

    wrapper.getByText(TEXT).click()
    expect(handleClick).toBeCalledTimes(1)
  })

  it('click on disabled', async () => {
    const handleClick = vi.fn()
    const wrapper = render(<Button disabled onClick={handleClick}>{TEXT}</Button>)

    wrapper.getByText(TEXT).click()
    expect(handleClick).toBeCalledTimes(0)
  })
})