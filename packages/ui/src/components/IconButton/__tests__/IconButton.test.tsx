import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import { IconButton } from '../IconButton.tsx';
import { GlobeIcon } from '@vega-ui/icons';

const sizes = ['small', 'medium', 'large'] as const;
const variants = ['primary', 'secondary'] as const;
const appearance = ['fill', 'outline', 'ghost', 'transparent'] as const;

describe('Icon Button', () => {
  it('render', () => {
    render(<IconButton><GlobeIcon /></IconButton>)
    expect(screen.getByRole('button').children.item(0)?.tagName).toBe('svg')
  })

  it('render custom svg icon', () => {
    render(<IconButton><svg /></IconButton>)
    expect(screen.getByRole('button').children.item(0)?.tagName).toBe('svg')
  })

  sizes.forEach((size) => {
    it(`${size} size`, () => {
      render(<IconButton size={size}><GlobeIcon /></IconButton>)
      expect(screen.getByRole('button').getAttribute('data-size')).toBe(size)
    })
  })

  variants.forEach((variant) => {
    it(`${variant} variant`, () => {
      render(<IconButton variant={variant}><GlobeIcon /></IconButton>)
      expect(screen.getByRole('button').getAttribute('data-variant')).toBe(variant)
    })
  })

  appearance.forEach((appearance) => {
    it(`${appearance} appearance`, () => {
      render(<IconButton appearance={appearance}><GlobeIcon /></IconButton>)
      expect(screen.getByRole('button').getAttribute('data-appearance')).toBe(appearance)
    })
  })

  it('as link', async () => {
    const wrapper = render(
      <IconButton asChild data-testid='link'>
         <a href='#'>
           <GlobeIcon />
         </a>
      </IconButton>
    )

    expect(wrapper.getByTestId('link').tagName).toBe('A')
  })

  it('click', async () => {
    const handleClick = vi.fn()
    const wrapper = render(<IconButton onClick={handleClick}><GlobeIcon /></IconButton>)

    wrapper.getByRole('button').click()
    expect(handleClick).toBeCalledTimes(1)
  })

  it('click on disabled', async () => {
    const handleClick = vi.fn()
    const wrapper = render(<IconButton disabled onClick={handleClick}><GlobeIcon /></IconButton>)

    wrapper.getByRole('button').click()
    expect(handleClick).toBeCalledTimes(0)
  })
})