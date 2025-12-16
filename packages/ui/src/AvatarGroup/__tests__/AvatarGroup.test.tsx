import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';

import { AvatarGroup } from '../AvatarGroup';
import { Avatar, AvatarFallback, AvatarImage } from '../../Avatar';
import {
  AvatarGroupCount,
  AvatarGroupPopover,
  AvatarGroupPopoverContent,
  AvatarGroupPopoverTrigger,
  AvatarGroupPopoverTriggerIcon,
  AvatarGroupStack,
  AvatarGroupStackItem,
} from '../components';

const avatars = [
  'https://images.unsplash.com/photo-1578979879663-4ba6a968a50a?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'BC',
  'LA',
  'https://images.unsplash.com/photo-1569913486515-b74bf7751574?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2967&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1599566147214-ce487862ea4f?q=80&w=3647&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1636041246170-9278569b9c36?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'AK',
  'https://images.unsplash.com/photo-1689193505855-4728db981696?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1603771550805-abcf98e420e7?q=80&w=3652&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=3315&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const renderDefault = () => {
  return render(
    <AvatarGroup>
      {avatars.map((avatar, index) => (
        <AvatarGroupStackItem key={index}>
          <AvatarFallback>{avatar.length === 2 ? avatar : 'BC'}</AvatarFallback>
          {avatar.startsWith('http') && <AvatarImage src={avatar} />}
        </AvatarGroupStackItem>
      ))}
    </AvatarGroup>,
  );
}

const renderLimit = () => {
  return render(
    <AvatarGroup>
      <AvatarGroupStack>
        {avatars.map((avatar, index) => (
          <AvatarGroupStackItem key={index}>
            <AvatarFallback>{avatar.length === 2 ? avatar : 'BC'}</AvatarFallback>
            {avatar.startsWith('http') && <AvatarImage src={avatar} />}
          </AvatarGroupStackItem>
        ))}
      </AvatarGroupStack>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>,
  );
}

const renderWithPopover = () => {
  return render(
    <AvatarGroup>
      <AvatarGroupStack>
        {avatars.slice(0, 4).map((avatar, index) => (
          <AvatarGroupStackItem key={index}>
            <AvatarFallback>{avatar.length === 2 ? avatar : 'BC'}</AvatarFallback>
            {avatar.startsWith('http') && <AvatarImage src={avatar} />}
          </AvatarGroupStackItem>
        ))}
      </AvatarGroupStack>
      
      <AvatarGroupPopover>
        <AvatarGroupPopoverTrigger>
          <AvatarGroupCount>+7</AvatarGroupCount>
          <AvatarGroupPopoverTriggerIcon />
        </AvatarGroupPopoverTrigger>
        
        <AvatarGroupPopoverContent>
          {avatars.slice(4).map((src, index) => (
            <Avatar key={index}>
              <AvatarImage src={src} />
            </Avatar>
          ))}
        </AvatarGroupPopoverContent>
      </AvatarGroupPopover>
    </AvatarGroup>,
  );
}

describe('AvatarGroup', () => {
  it('renders children (Default)', () => {
    renderDefault();
    
    expect(screen.getAllByText('BC').length).toBeGreaterThan(0);
    expect(screen.getByText('LA')).toBeInTheDocument();
    expect(screen.getByText('AK')).toBeInTheDocument();
    
    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toBeGreaterThan(0);
  });
  
  it('renders overflow count (Limit)', () => {
    renderLimit();
    expect(screen.getByText('+3')).toBeInTheDocument();
  });
  
  it('opens popover on trigger click and updates trigger icon state (WithPopover)', async () => {
    const { container } = renderWithPopover();
    
    const trigger = screen.getByRole('button');
    const icon = container.querySelector('[data-open]');
    expect(icon).toBeTruthy();
    
    expect(icon?.getAttribute('data-open')).toMatch(/^(false|0|)$/);
    
    fireEvent.click(trigger);
    
    // icon state should reflect open popover
    expect(icon?.getAttribute('data-open')).toMatch(/^(true|1)$/);
    
    // content should be present; try to assert it contains some of the overflow avatars images
    const allImgs = screen.getAllByRole('img');
    expect(allImgs.length).toBeGreaterThan(0);
  });
  
  it('closes popover on second trigger click (WithPopover)', async () => {
    const { container } = renderWithPopover();
    
    const trigger = screen.getByRole('button');
    const icon = container.querySelector('[data-open]');
    expect(icon).toBeTruthy();
    
    fireEvent.click(trigger);
    expect(icon?.getAttribute('data-open')).toMatch(/^(true|1)$/);
    
    fireEvent.click(trigger);
    expect(icon?.getAttribute('data-open')).toMatch(/^(false|0|)$/);
  });
  
  it('keeps trigger content visible (count + icon)', async () => {
    const { container } = renderWithPopover();
    
    const trigger = screen.getByRole('button');
    expect(within(trigger).getByText('+7')).toBeInTheDocument();
    
    const icon = container.querySelector('[data-open]');
    expect(icon).toBeTruthy();
    
    fireEvent.click(trigger);
    expect(within(trigger).getByText('+7')).toBeInTheDocument();
  });
});
