import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Label } from '../Label';

afterEach(cleanup);

const TESTID_LABEL = 'label';

const TEXT = 'Email';
const FOR_ID = 'email';

const SIZE = 'size';
const FONT_WEIGHT = 'font-weight';

const LabelTest = (props: ComponentProps<typeof Label>) => {
  const { children, ...rest } = props;
  
  return (
    <Label data-testid={TESTID_LABEL} {...rest}>
      {children ?? TEXT}
    </Label>
  );
};

const getLabel = (r: RenderResult) => r.getByTestId(TESTID_LABEL);

describe('Label', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<LabelTest />);
    });
    
    it('renders', async () => {
      await expect.element(getLabel(r)).toBeInTheDocument();
    });
    
    it('renders text content', async () => {
      await expect.element(getLabel(r)).toHaveTextContent(TEXT);
    });
    
    it('applies default props', async () => {
      const el = getLabel(r);
      
      await expect.element(el).toHaveAttribute('data-size', '3');
      await expect.element(el).toHaveAttribute('data-font-weight', '500');
    });
    
    it('supports size prop', async () => {
      r.rerender(<LabelTest size='sm' />);
      await expect.element(getLabel(r)).toHaveAttribute(`data-${SIZE}`, '2');
      
      r.rerender(<LabelTest size='lg' />);
      await expect.element(getLabel(r)).toHaveAttribute(`data-${SIZE}`, '4');
    });
    
    it('supports fontWeight prop', async () => {
      const fw = 700;
      
      r.rerender(<LabelTest fontWeight={fw} />);
      await expect.element(getLabel(r)).toHaveAttribute(`data-${FONT_WEIGHT}`, String(fw));
    });
    
    it('forwards htmlFor to native label', async () => {
      r.rerender(<LabelTest htmlFor={FOR_ID} />);
      await expect.element(getLabel(r)).toHaveAttribute('for', FOR_ID);
    });
    
    it('merges className', async () => {
      const cn = 'custom-class';
      r.rerender(<LabelTest className={cn} />);
      await expect.element(getLabel(r)).toHaveClass(cn);
    });
  });
  
  describe('Edge Cases', () => {
    it('omits for attribute when htmlFor is undefined', async () => {
      const r = render(<LabelTest htmlFor={undefined} />);
      await expect.element(getLabel(r)).not.toHaveAttribute('for');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      it('exposes label', async () => {
        const r = render(<LabelTest />);
        expect(getLabel(r).tagName.toLowerCase()).toBe('label')
      });
    });
    
    describe('aria', () => {
      it('forwards aria-* attributes to label', async () => {
        const r = render(<LabelTest aria-label='Email label' />);
        await expect.element(getLabel(r)).toHaveAttribute('aria-label', 'Email label');
      });
    });
  });
});