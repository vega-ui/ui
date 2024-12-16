import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import { IconButton } from '../IconButton.tsx';
import { Icon } from '../../Icon';

const sizes = ['small', 'medium', 'large'] as const;
const variants = ['primary', 'secondary'] as const;
const appearance = ['fill', 'outline', 'ghost', 'transparent'] as const;

describe('Icon Button', () => {
  it('render', () => {
    render(<IconButton><Icon name='globe' /></IconButton>)
    expect(screen.getByRole('button').children.item(0)?.tagName).toBe('svg')
  })

  it('render custom svg icon', () => {
    render(<IconButton><svg /></IconButton>)
    expect(screen.getByRole('button').children.item(0)?.tagName).toBe('svg')
  })

  sizes.forEach((size) => {
    it(`${size} size`, () => {
      render(<IconButton size={size} />)
      expect(screen.getByRole('button').getAttribute('data-size')).toBe(size)
    })
  })

  variants.forEach((variant) => {
    it(`${variant} variant`, () => {
      render(<IconButton variant={variant} />)
      expect(screen.getByRole('button').getAttribute('data-variant')).toBe(variant)
    })
  })

  appearance.forEach((appearance) => {
    it(`${appearance} appearance`, () => {
      render(<IconButton appearance={appearance} />)
      expect(screen.getByRole('button').getAttribute('data-appearance')).toBe(appearance)
    })
  })

  it('as link', async () => {
    const wrapper = render(<IconButton as='a' data-testid='link' name='globe' />)

    expect(wrapper.getByTestId('link').tagName).toBe('A')
  })

  it('click', async () => {
    const handleClick = vi.fn()
    const wrapper = render(<IconButton onClick={handleClick} />)

    wrapper.getByRole('button').click()
    expect(handleClick).toBeCalledTimes(1)
  })

  it('click on disabled', async () => {
    const handleClick = vi.fn()
    const wrapper = render(<IconButton disabled onClick={handleClick} />)

    wrapper.getByRole('button').click()
    expect(handleClick).toBeCalledTimes(0)
  })
})