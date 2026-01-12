import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { cleanup, render, type RenderResult, waitFor } from '@testing-library/react';

import { Button } from '../Button';

afterEach(cleanup);

const BUTTON_TEXT = 'Button';
const TITLE_TEXT = 't';

const ButtonTest = (props: ComponentProps<typeof Button>) => {
  const { children, ...rest } = props;
  return <Button {...rest}>{children ?? BUTTON_TEXT}</Button>;
};

const getButton = (r: RenderResult) => r.getByRole('button', { name: BUTTON_TEXT });

describe('Button', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<ButtonTest />);
    });
    
    it('renders root and children', async () => {
      await expect.element(getButton(r)).toBeInTheDocument();
      await expect.element(r.getByText(BUTTON_TEXT)).toBeInTheDocument();
    });
    
    it('is clickable by default', async () => {
      const onClick = vi.fn();
      
      r.rerender(<ButtonTest onClick={onClick} />);
      await userEvent.click(getButton(r));
      expect(onClick).toHaveBeenCalledTimes(1)
    });
    
    it('applies default props to root', async () => {
      const btn = getButton(r);
      
      await expect.element(btn).toHaveAttribute('type', 'button');
      await expect.element(btn).toHaveAttribute('data-size', 'md');
    });
    
    it('applies size prop', async () => {
      const SIZE = 'size';
      
      r.rerender(<ButtonTest size={SIZE} />);
      await expect.element(getButton(r)).toHaveAttribute('data-size', SIZE);
    });
    
    it('applies fullWidth prop', async () => {
      r.rerender(<ButtonTest fullWidth />);
      await expect.element(getButton(r)).toHaveAttribute('data-full-width', 'true');
    });
    
    it('forwards HTML attributes to ButtonBase', async () => {
      r.rerender(<ButtonTest title={TITLE_TEXT} />);
      await expect.element(getButton(r)).toHaveAttribute('title', TITLE_TEXT);
    });
  });
  
  describe('Error Handling', () => {
    it('supports type=submit', async () => {
      const r = render(<ButtonTest type='submit' />);
      await expect.element(getButton(r)).toHaveAttribute('type', 'submit');
    });
  });
  
  describe('Edge Cases', () => {
    it('renders without children (no crash)', async () => {
      const r = render(<Button />);
      await expect.element(r.getByRole('button')).toBeInTheDocument();
    });
    
    it('fullWidth=false sets data-full-width=false', async () => {
      const r = render(<ButtonTest fullWidth={false} />);
      
      await expect.element(getButton(r)).toHaveAttribute('data-full-width', 'false');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<ButtonTest />);
      });
      
      it('exposes button role', async () => {
        await expect.element(getButton(r)).toBeInTheDocument();
      });
    });
    
    describe('keyboard', () => {
      it('activates on Enter', async () => {
        const onClick = vi.fn();
        const r = render(<ButtonTest onClick={onClick} />);
        
        const button = getButton(r);
        button.focus();
        
        await userEvent.keyboard('{Enter}');
        await waitFor(() => {
          expect(onClick).toHaveBeenCalledTimes(1)
        })
      });
      
      it('activates on Space', async () => {
        const onClick = vi.fn();
        const r = render(<ButtonTest onClick={onClick} />);
        
        const btn = getButton(r);
        btn.focus();
        
        await userEvent.keyboard('[Space]');
        await waitFor(() => {
          expect(onClick).toHaveBeenCalledTimes(1)
        });
      });
      
      it('does not activate when disabled', async () => {
        const onClick = vi.fn();
        const r = render(<ButtonTest disabled onClick={onClick} />);
        
        const button = getButton(r);
        button.focus();
        
        await userEvent.keyboard('{Enter}');
        await userEvent.keyboard(' ');
        
        await waitFor(() => expect(onClick).not.toHaveBeenCalled());
      });
    });
  });
});