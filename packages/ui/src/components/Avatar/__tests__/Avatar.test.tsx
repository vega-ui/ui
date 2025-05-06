import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Avatar } from '../Avatar.tsx';
import { AvatarFallback, AvatarIcon, AvatarImage } from '../components';
import { SupportIcon } from '@vega-ui/icons';

const INITIALS = 'BC';
const IMAGE_SRC = 'https://images.unsplash.com/photo-1578979879663-4ba6a968a50a?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

describe('Avatar', () => {
  it('render', () => {
    render(
      <Avatar>
        <AvatarFallback>{INITIALS}</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText(INITIALS)).toBeDefined()
  })

  it('image', () => {
    render(
      <Avatar>
        <AvatarFallback>{INITIALS}</AvatarFallback>
        <AvatarImage src={IMAGE_SRC} />
      </Avatar>
    )

    const image: HTMLImageElement = screen.getByRole('img')

    expect(image.src).toBe(IMAGE_SRC)
  })

  it('icon', () => {
    render(
      <Avatar>
        <AvatarIcon data-testid='icon'><SupportIcon /></AvatarIcon>
      </Avatar>
    )

    const icon: HTMLImageElement = screen.getByTestId('icon')

    expect(icon).toBeDefined()
  })
})