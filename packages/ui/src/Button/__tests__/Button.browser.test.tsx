import { CSSProperties } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';

import { Button } from '..';
import { Icon } from '../../Icon';

afterEach(cleanup);

describe('Edge Cases', () => {
  it('gives the icon of a small square button its full size', () => {
    const result = render(
      <Button square aria-label='Close' style={{ '--button-height': '24px' } as CSSProperties}>
        <Icon size='sm'><svg data-testid='icon' /></Icon>
      </Button>,
    );
    const rect = result.getByTestId('icon').getBoundingClientRect();
    expect(rect.width).toBe(16);
    expect(rect.height).toBe(16);
  });

  it('stays square in a row too narrow for it', () => {
    const result = render(
      <div style={{ display: 'flex', width: 60 }}>
        <input style={{ flex: 1, minWidth: 0, width: 200 }} />
        <Button square aria-label='Open calendar' size='lg'><Icon><svg /></Icon></Button>
      </div>,
    );
    const rect = result.getByRole('button', { name: 'Open calendar' }).getBoundingClientRect();
    expect(rect.width).toBe(rect.height);
  });
});
