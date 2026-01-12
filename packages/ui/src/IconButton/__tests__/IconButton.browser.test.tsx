import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { IconButton } from '../IconButton';
import { Icon } from '../../Icon';

afterEach(cleanup);

const TESTID_BUTTON = 'icon-button';
const TESTID_ICON = 'icon';

const IconButtonTest: FC<ComponentProps<typeof IconButton>> = (props) => {
  return (
    <IconButton data-testid={TESTID_BUTTON} {...props}>
      <Icon>
        <svg data-testid={TESTID_ICON} />
      </Icon>
    </IconButton>
  );
};

const getButton = (r: RenderResult) => r.getByTestId(TESTID_BUTTON);
const getIcon = (r: RenderResult) => r.getByTestId(TESTID_ICON);

describe('IconButton', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<IconButtonTest />);
    });
    
    it('renders button', async () => {
      await expect.element(getButton(r)).toBeInTheDocument();
    });
    
    it('renders Icon inside', async () => {
      await expect.element(getIcon(r)).toBeInTheDocument();
    });
    
    it('has role button', async () => {
      await expect.element(getButton(r)).toHaveRole('button');
    });
    
    it('is clickable by default', async () => {
      const onClick = vi.fn();
      r.rerender(<IconButtonTest onClick={onClick} />);
      await userEvent.click(getButton(r));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
    
    it('applies default size', async () => {
      await expect.element(getButton(r)).toHaveAttribute('data-size', 'md');
    });
    
    it('supports size prop', async () => {
      r.rerender(<IconButtonTest size='lg' />);
      await expect.element(getButton(r)).toHaveAttribute('data-size', 'lg');
    });
    
    it('supports disabled state', async () => {
      r.rerender(<IconButtonTest disabled />);
      await expect.element(getButton(r)).toBeDisabled();
    });
    
    it('forwards type prop', async () => {
      r.rerender(<IconButtonTest type='submit' />);
      await expect.element(getButton(r)).toHaveAttribute('type', 'submit');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      it('exposes button role', async () => {
        const r = render(<IconButtonTest />);
        await expect.element(getButton(r)).toHaveRole('button');
      });
    });
    
    describe('aria', () => {
      it('forwards aria-label', async () => {
        const r = render(<IconButtonTest aria-label='Open globe' />);
        await expect.element(getButton(r)).toHaveAttribute('aria-label', 'Open globe');
      });
    });
    
    describe('keyboard', () => {
      it('activates on Enter', async () => {
        const onClick = vi.fn();
        const r = render(<IconButtonTest onClick={onClick} />);
        getButton(r).focus();
        await userEvent.keyboard('{Enter}');
        expect(onClick).toHaveBeenCalledTimes(1);
      });
      
      it('activates on Space', async () => {
        const onClick = vi.fn();
        const r = render(<IconButtonTest onClick={onClick} />);
        getButton(r).focus();
        await userEvent.keyboard(' ');
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });
    
    describe('focus', () => {
      it('receives focus', async () => {
        const r = render(<IconButtonTest />);
        getButton(r).focus();
        await expect.element(getButton(r)).toHaveFocus();
      });
    });
  });
});