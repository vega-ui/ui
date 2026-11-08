import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Progress } from '../Progress';
import { ProgressTrack } from '../components';

afterEach(cleanup);

const TESTID_PROGRESS = 'progress';
const TESTID_TRACK = 'track';

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;

const VALUE = 40;
const VALUE_TEXT = '40% complete';

const ProgressTest: FC<ComponentProps<typeof Progress>> = (props) => {
  return (
    <Progress data-testid={TESTID_PROGRESS} {...props}>
      <ProgressTrack data-testid={TESTID_TRACK} />
    </Progress>
  );
};

const getProgress = (r: RenderResult) => r.getByTestId(TESTID_PROGRESS);

describe('Progress', () => {
  describe('Critical User Paths', () => {
    it('supports custom min/max', async () => {
      const r = render(<ProgressTest min={10} max={200} value={VALUE} />);
      const el = getProgress(r);

      await expect.element(el).toHaveAttribute('aria-valuemin', '10');
      await expect.element(el).toHaveAttribute('aria-valuemax', '200');
    });
  });

  describe('Edge Cases', () => {
    it('sets aria-valuenow to 0 when value=0', async () => {
      const r = render(<ProgressTest value={0} />);
      await expect.element(getProgress(r)).toHaveAttribute('aria-valuenow', '0');
    });

    it('sets CSS custom properties via style attribute (string check)', async () => {
      const r = render(<ProgressTest max={250} value={10} />);
      const el = getProgress(r);

      await expect.element(el).toHaveAttribute('style');
      expect(el.getAttribute('style')).toContain('--progress-max: 250');
      expect(el.getAttribute('style')).toContain('--progress-value: 10');
    });
  });

  describe('Accessibility', () => {
    describe('roles', () => {
      it('exposes progressbar role', async () => {
        const r = render(<ProgressTest />);
        await expect.element(getProgress(r)).toHaveRole('progressbar');
      });
    });

    describe('aria', () => {
      let r: RenderResult;

      beforeEach(() => {
        r = render(<ProgressTest value={VALUE} valueText={VALUE_TEXT} />);
      });

      it('sets default aria range attributes', async () => {
        const el = getProgress(r);

        await expect.element(el).toHaveAttribute('aria-valuemin', String(DEFAULT_MIN));
        await expect.element(el).toHaveAttribute('aria-valuemax', String(DEFAULT_MAX));
      });

      it('sets aria-valuetext when valueText provided', async () => {
        await expect.element(getProgress(r)).toHaveAttribute('aria-valuetext', VALUE_TEXT);
      });
    });
  });
});
