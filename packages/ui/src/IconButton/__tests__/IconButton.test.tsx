import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import { IconButton } from '../IconButton';
import { GlobeIcon } from '@vega-ui/icons';
import { Icon } from '../../Icon';

const sizes = ['sm', 'md', 'lg'] as const;
const variants = ['primary', 'secondary'] as const;
const appearance = ['fill', 'outline', 'ghost', 'transparent'] as const;

describe('Icon Button', () => {
  it('render', () => {
    render(<IconButton><Icon><GlobeIcon /></Icon></IconButton>)
    expect(screen.getByRole('button').children.item(0)?.tagName).toBe('svg')
  })

  it('render custom svg icon', () => {
    render(<IconButton><svg /></IconButton>)
    expect(screen.getByRole('button').children.item(0)?.tagName).toBe('svg')
  })

  sizes.forEach((size) => {
    it(`${size} size`, () => {
      render(<IconButton size={size}><Icon><GlobeIcon /></Icon></IconButton>)
      expect(screen.getByRole('button').getAttribute('data-size')).toBe(size)
    })
  })

  variants.forEach((variant) => {
    it(`${variant} variant`, () => {
      render(<IconButton variant={variant}><Icon><GlobeIcon /></Icon></IconButton>)
      expect(screen.getByRole('button').getAttribute('data-variant')).toBe(variant)
    })
  })

  appearance.forEach((appearance) => {
    it(`${appearance} appearance`, () => {
      render(<IconButton appearance={appearance}><Icon><GlobeIcon /></Icon></IconButton>)
      expect(screen.getByRole('button').getAttribute('data-appearance')).toBe(appearance)
    })
  })

  it('as link', async () => {
    const wrapper = render(
      <IconButton asChild data-testid='link'>
         <a href='#'>
           <Icon><GlobeIcon /></Icon>
         </a>
      </IconButton>
    )

    expect(wrapper.getByTestId('link').tagName).toBe('A')
  })

  it('click', async () => {
    const handleClick = vi.fn()
    const wrapper = render(<IconButton onClick={handleClick}><Icon><GlobeIcon /></Icon></IconButton>)

    wrapper.getByRole('button').click()
    expect(handleClick).toBeCalledTimes(1)
  })

  it('click on disabled', async () => {
    const handleClick = vi.fn()
    const wrapper = render(<IconButton disabled onClick={handleClick}><Icon><GlobeIcon /></Icon></IconButton>)

    wrapper.getByRole('button').click()
    expect(handleClick).toBeCalledTimes(0)
  })
})