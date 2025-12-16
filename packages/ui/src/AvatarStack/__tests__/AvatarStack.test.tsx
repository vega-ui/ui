import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { AvatarStack } from '../AvatarStack.tsx';
import { AvatarFallback, AvatarImage } from '../../Avatar';
import { AvatarStackItem } from '../components';

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
    <AvatarStack>
      {avatars.map((avatar, index) => (
        <AvatarStackItem key={index}>
          <AvatarFallback>{avatar.length === 2 ? avatar : 'BC'}</AvatarFallback>
          {avatar.startsWith('http') && <AvatarImage src={avatar} />}
        </AvatarStackItem>
      ))}
    </AvatarStack>,
  );
}

describe('AvatarStack', () => {
  it('renders children (Default)', () => {
    renderDefault();
    
    expect(screen.getAllByText('BC').length).toBeGreaterThan(0);
    expect(screen.getByText('LA')).toBeInTheDocument();
    expect(screen.getByText('AK')).toBeInTheDocument();
    
    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toBeGreaterThan(0);
  });
});
