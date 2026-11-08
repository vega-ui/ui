import { CSSProperties } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { IconButton } from '../IconButton';
import { Icon } from '../../Icon';

afterEach(cleanup);

const TESTID_ICON = 'icon';

const getIcon = (r: RenderResult) => r.getByTestId(TESTID_ICON);

describe('IconButton', () => {
  describe('Edge Cases', () => {
    it('gives a small button\'s icon its full size', async () => {
      const r = render(
        <IconButton aria-label='Close' style={{ '--icon-button-size': '24px' } as CSSProperties}>
          <Icon size='sm'><svg data-testid={TESTID_ICON} /></Icon>
        </IconButton>,
      );
      const rect = getIcon(r).getBoundingClientRect();
      expect(rect.width).toBe(16);
      expect(rect.height).toBe(16);
    });
  });
});
