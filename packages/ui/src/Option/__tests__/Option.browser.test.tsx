import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';

import { Option } from '../Option';

afterEach(cleanup);

const LABEL = 'Option label';

describe('Option', () => {
  describe('Edge Cases', () => {
    it('does not call onClick when disabled', async () => {
      const onClick = vi.fn();
      const disabled = render(<Option disabled onClick={onClick}>{LABEL}</Option>);

      disabled.getByRole('option', { name: LABEL, hidden: true }).click();

      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
