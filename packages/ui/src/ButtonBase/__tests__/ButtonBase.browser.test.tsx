import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { cleanup, render } from '@testing-library/react';

import { ButtonBase } from '../ButtonBase';

afterEach(cleanup);

const BUTTON_TEXT = 'Button';
const LINK_TEXT = 'Link';
const CLASS_NAME = 'custom';

describe('ButtonBase', () => {
  describe('Critical User Paths', () => {
    it('renders a native button with children', async () => {
      const r = render(<ButtonBase>{BUTTON_TEXT}</ButtonBase>);
      const button = r.getByRole('button', { name: BUTTON_TEXT });

      expect(button.tagName).toBe('BUTTON');
      await expect.element(button).not.toHaveAttribute('type');
    });

    it('applies default variant and appearance', async () => {
      const r = render(<ButtonBase>{BUTTON_TEXT}</ButtonBase>);
      const button = r.getByRole('button');

      await expect.element(button).toHaveAttribute('data-variant', 'primary');
      await expect.element(button).toHaveAttribute('data-appearance', 'fill');
    });

    it('applies variant and appearance props', async () => {
      const r = render(<ButtonBase variant='secondary' appearance='outline'>{BUTTON_TEXT}</ButtonBase>);
      const button = r.getByRole('button');

      await expect.element(button).toHaveAttribute('data-variant', 'secondary');
      await expect.element(button).toHaveAttribute('data-appearance', 'outline');
    });

    it('calls onClick', async () => {
      const onClick = vi.fn();
      const r = render(<ButtonBase onClick={onClick}>{BUTTON_TEXT}</ButtonBase>);

      await userEvent.click(r.getByRole('button'));

      expect(onClick).toHaveBeenCalledOnce();
    });

    it('merges className and forwards attributes', async () => {
      const r = render(<ButtonBase className={CLASS_NAME} type='submit' title='t'>{BUTTON_TEXT}</ButtonBase>);
      const button = r.getByRole('button');

      expect(button.classList).toContain(CLASS_NAME);
      expect(button.classList.length).toBeGreaterThan(1);
      await expect.element(button).toHaveAttribute('type', 'submit');
      await expect.element(button).toHaveAttribute('title', 't');
    });

    it('forwards ref to the button', () => {
      const ref = createRef<HTMLButtonElement>();
      const r = render(<ButtonBase ref={ref}>{BUTTON_TEXT}</ButtonBase>);

      expect(ref.current).toBe(r.getByRole('button'));
    });
  });

  describe('Edge Cases', () => {
    it('renders its child with asChild', async () => {
      const r = render(
        <ButtonBase asChild className={CLASS_NAME} variant='secondary'>
          <a href='#link'>{LINK_TEXT}</a>
        </ButtonBase>
      );
      const link = r.getByRole('link', { name: LINK_TEXT });

      expect(r.queryByRole('button')).toBeNull();
      expect(link.classList).toContain(CLASS_NAME);
      await expect.element(link).toHaveAttribute('data-variant', 'secondary');
    });

    it('does not set disabled on the asChild element', async () => {
      const r = render(
        <ButtonBase asChild disabled>
          <a href='#link'>{LINK_TEXT}</a>
        </ButtonBase>
      );

      await expect.element(r.getByRole('link')).not.toHaveAttribute('disabled');
    });
  });

  describe('Accessibility', () => {
    it('disables the native button', async () => {
      const onClick = vi.fn();
      const r = render(<ButtonBase disabled onClick={onClick}>{BUTTON_TEXT}</ButtonBase>);
      const button = r.getByRole('button');

      await expect.element(button).toBeDisabled();
      await userEvent.click(button, { force: true });
      expect(onClick).not.toHaveBeenCalled();
    });

    it('is focusable', async () => {
      const r = render(<ButtonBase>{BUTTON_TEXT}</ButtonBase>);
      const button = r.getByRole('button');

      button.focus();

      await expect.element(button).toHaveFocus();
    });
  });
});
