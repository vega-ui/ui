import { FC, ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { TextArea } from '../TextArea';

afterEach(cleanup);

const TESTID = 'textarea';

const SIZE_MD = 'md';
const SIZE_LG = 'lg';

const VALUE = 'Hello world';
const PLACEHOLDER = 'Type here';

const TextAreaTest: FC<ComponentProps<typeof TextArea>> = (props) => (
  <TextArea data-testid={TESTID} {...props} />
);

const getTextarea = (r: RenderResult) =>
  r.getByTestId(TESTID) as HTMLTextAreaElement;

describe('TextArea', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<TextAreaTest />);
    });
    
    describe('rendering', () => {
      it('renders textarea element', async () => {
        const textarea = getTextarea(r);
        await expect.element(textarea).toBeInTheDocument();
        await expect.element(textarea).toHaveRole('textbox');
      });
      
      it('supports placeholder', async () => {
        r.rerender(<TextAreaTest placeholder={PLACEHOLDER} />);
        const textarea = getTextarea(r);
        await expect.element(textarea).toHaveAttribute('placeholder', PLACEHOLDER);
      });
    });
    
    describe('input', () => {
      it('allows typing text', async () => {
        const textarea = getTextarea(r);
        await userEvent.type(textarea, VALUE);
        await expect.element(textarea).toHaveValue(VALUE);
      });
      
      it('supports controlled value', async () => {
        r.rerender(<TextAreaTest value={VALUE} />);
        const textarea = getTextarea(r);
        await expect.element(textarea).toHaveValue(VALUE);
      });
      
      it('accepts numeric value', async () => {
        r.rerender(<TextAreaTest value={123} />);
        const textarea = getTextarea(r);
        await expect.element(textarea).toHaveValue('123');
      });
    });
    
    describe('states', () => {
      it('supports disabled state', async () => {
        r.rerender(<TextAreaTest disabled />);
        const textarea = getTextarea(r);
        await expect.element(textarea).toBeDisabled();
      });
      
      it('applies size data-attribute', async () => {
        r.rerender(<TextAreaTest size={SIZE_LG} />);
        const textarea = getTextarea(r);
        await expect.element(textarea).toHaveAttribute('data-size', SIZE_LG);
      });
      
      it('applies error state', async () => {
        r.rerender(<TextAreaTest error />);
        const textarea = getTextarea(r);
        await expect.element(textarea).toHaveAttribute('data-error', 'true');
      });
      
      it('applies fullWidth state', async () => {
        r.rerender(<TextAreaTest fullWidth />);
        const textarea = getTextarea(r);
        await expect.element(textarea).toHaveAttribute('data-full-width', 'true');
      });
      
      it('does not set boolean data attributes when props are undefined', async () => {
        const textarea = getTextarea(r);
        await expect.element(textarea).not.toHaveAttribute('data-error', 'true');
        await expect.element(textarea).not.toHaveAttribute('data-full-width', 'true');
        await expect.element(textarea).toHaveAttribute('data-size', SIZE_MD);
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('renders empty value without crashing', async () => {
      const r = render(<TextAreaTest value='' />);
      const textarea = getTextarea(r);
      await expect.element(textarea).toHaveValue('');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      it('has textbox role', async () => {
        const r = render(<TextAreaTest />);
        const textarea = getTextarea(r);
        await expect.element(textarea).toHaveRole('textbox');
      });
    });
  });
});