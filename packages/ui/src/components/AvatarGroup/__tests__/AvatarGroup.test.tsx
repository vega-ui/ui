import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { AvatarGroup } from '../AvatarGroup.tsx';
import { AvatarFallback } from '../../Avatar';
import { AvatarGroupItem } from '../components';

const INITIALS = 'BC';

describe('AvatarGroup', () => {
  it('render', () => {
    render(
      <AvatarGroup>
        <AvatarGroupItem>
          <AvatarFallback>{INITIALS}</AvatarFallback>
        </AvatarGroupItem>
      </AvatarGroup>
    )
    expect(screen.getByText(INITIALS)).toBeDefined()
  })

  it('limit', () => {
    render(
      <AvatarGroup limit={2}>
        <AvatarGroupItem>
          <AvatarFallback>{INITIALS}</AvatarFallback>
        </AvatarGroupItem>
        <AvatarGroupItem>
          <AvatarFallback>{INITIALS}</AvatarFallback>
        </AvatarGroupItem>
        <AvatarGroupItem>
          <AvatarFallback>{INITIALS}</AvatarFallback>
        </AvatarGroupItem>
      </AvatarGroup>
    )

    const initials: HTMLElement[] = screen.getAllByText(INITIALS)

    expect(initials.length).toBe(2)
    expect(screen.getByText('+1')).toBeDefined()
  })
})