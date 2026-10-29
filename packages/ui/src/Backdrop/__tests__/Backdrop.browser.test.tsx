import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Backdrop } from '../Backdrop';
import '../../../../tokens/src/index.css';

afterEach(cleanup);

const TESTID_BACKDROP = 'backdrop';
const TESTID_CHILD = 'child';
const CLASS_NAME = 'custom';

const getBackdrop = (r: RenderResult) => r.getByTestId(TESTID_BACKDROP);
const getOverlayOpacity = (r: RenderResult) => getComputedStyle(getBackdrop(r), '::after').opacity;

describe('Backdrop', () => {
  describe('Critical User Paths', () => {
    it('renders children', async () => {
      const r = render(<Backdrop data-testid={TESTID_BACKDROP}><div data-testid={TESTID_CHILD} /></Backdrop>);

      await expect.element(r.getByTestId(TESTID_CHILD)).toBeInTheDocument();
    });

    it('is blurred and hidden by default', async () => {
      const r = render(<Backdrop data-testid={TESTID_BACKDROP} />);

      await expect.element(getBackdrop(r)).toHaveAttribute('data-blurred', 'true');
      await expect.element(getBackdrop(r)).toHaveAttribute('data-visible', 'false');
      expect(getOverlayOpacity(r)).toBe('0');
    });

    it('shows the overlay when visible', async () => {
      const r = render(<Backdrop data-testid={TESTID_BACKDROP} visible />);

      await expect.element(getBackdrop(r)).toHaveAttribute('data-visible', 'true');
      expect(getOverlayOpacity(r)).toBe('1');
    });

    it('applies blurred prop', async () => {
      const r = render(<Backdrop data-testid={TESTID_BACKDROP} blurred={false} />);

      await expect.element(getBackdrop(r)).toHaveAttribute('data-blurred', 'false');
    });

    it('merges className and forwards attributes', async () => {
      const r = render(<Backdrop data-testid={TESTID_BACKDROP} className={CLASS_NAME} title='t' />);

      expect(getBackdrop(r).classList).toContain(CLASS_NAME);
      expect(getBackdrop(r).classList.length).toBeGreaterThan(1);
      await expect.element(getBackdrop(r)).toHaveAttribute('title', 't');
    });
  });

  describe('Edge Cases', () => {
    it('locks page scroll by default and unlocks on unmount', () => {
      const r = render(<Backdrop data-testid={TESTID_BACKDROP} />);

      expect(getComputedStyle(document.body).overflow).toBe('hidden');

      r.unmount();

      expect(getComputedStyle(document.body).overflow).not.toBe('hidden');
    });

    it('does not lock page scroll with lockScroll false', () => {
      render(<Backdrop data-testid={TESTID_BACKDROP} lockScroll={false} />);

      expect(getComputedStyle(document.body).overflow).not.toBe('hidden');
    });

    it('sits on the overlay layer', () => {
      const r = render(<Backdrop data-testid={TESTID_BACKDROP} />);
      const zIndex = getComputedStyle(document.documentElement).getPropertyValue('--z-index-overlay').trim();

      expect(zIndex).not.toBe('');
      expect(getComputedStyle(getBackdrop(r)).zIndex).toBe(zIndex);
    });
  });
});
