import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Meter } from '../Meter';

afterEach(cleanup);

const TESTID_METER = 'meter';

const DEFAULT_VALUE = 0.5;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 1;

const VALUE_TEXT = '50% fuel';
const CUSTOM_CLASS = 'custom-class';

const CUSTOM_SIZE = 'lg' as const;
const CUSTOM_VARIANT = 'danger' as const;

const MeterTest: FC<ComponentProps<typeof Meter>> = (props) => {
  const { value, ...rest } = props;
  return <Meter data-testid={TESTID_METER} value={value} {...rest} />;
};

const getMeter = (r: RenderResult) => r.getByTestId(TESTID_METER);

describe('Meter', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<MeterTest value={DEFAULT_VALUE} />);
    });
    
    it('renders', async () => {
      await expect.element(getMeter(r)).toBeInTheDocument();
    });
    
    it('has meter role', async () => {
      await expect.element(getMeter(r)).toHaveRole('meter');
    });
    
    it('supports valueText', async () => {
      r.rerender(<MeterTest value={DEFAULT_VALUE} valueText={VALUE_TEXT} />);
      
      await expect.element(getMeter(r)).toHaveAttribute('aria-valuetext', VALUE_TEXT);
    });
    
    it('supports fullWidth', async () => {
      r.rerender(<MeterTest value={DEFAULT_VALUE} fullWidth />);
      
      await expect.element(getMeter(r)).toHaveAttribute('data-full-width', 'true');
    });
    
    it('supports size and variant', async () => {
      r.rerender(
        <MeterTest value={DEFAULT_VALUE} size={CUSTOM_SIZE} variant={CUSTOM_VARIANT} />,
      );
      
      const root = getMeter(r);
      
      await expect.element(root).toHaveAttribute('data-size', CUSTOM_SIZE);
      await expect.element(root).toHaveAttribute('data-variant', CUSTOM_VARIANT);
    });
    
    it('merges className', async () => {
      r.rerender(<MeterTest value={DEFAULT_VALUE} className={CUSTOM_CLASS} />);
      
      await expect.element(getMeter(r)).toHaveClass(CUSTOM_CLASS);
    });
    
    it('sets CSS variables for value and max', async () => {
      const customValue = 7;
      const customMax = 10;
      
      r.rerender(<MeterTest value={customValue} max={customMax} />);
      
      const root = getMeter(r);
      
      await expect.element(root).toHaveStyle(`--meter-value: ${customValue}`);
      await expect.element(root).toHaveStyle(`--meter-max: ${customMax}`);
    });
    
    it('preserves user styles', async () => {
      r.rerender(<MeterTest value={DEFAULT_VALUE} style={{ marginTop: '10px' }} />);
      
      const root = getMeter(r);
      
      await expect.element(root).toHaveStyle('margin-top: 10px');
      await expect.element(root).toHaveStyle(`--meter-value: ${DEFAULT_VALUE}`);
    });
  });
  
  describe('Edge Cases', () => {
    it('supports negative values', async () => {
      const r = render(<MeterTest value={-10} min={-100} max={100} />);
      await expect.element(getMeter(r)).toHaveAttribute('aria-valuenow', '-10');
    });
    
    it('supports values greater than max', async () => {
      const r = render(<MeterTest value={999} min={0} max={10} />);
      await expect.element(getMeter(r)).toHaveAttribute('aria-valuenow', '999');
    });
    
    it('supports min greater than max', async () => {
      const r = render(<MeterTest value={5} min={10} max={1} />);
      
      const root = getMeter(r);
      
      await expect.element(root).toHaveAttribute('aria-valuemin', '10');
      await expect.element(root).toHaveAttribute('aria-valuemax', '1');
      await expect.element(root).toHaveAttribute('aria-valuenow', '5');
    });
  });
  
  describe('Accessibility', () => {
    describe('aria', () => {
      it('sets default aria attributes', async () => {
        const r = render(<MeterTest value={DEFAULT_VALUE} />);
        
        const root = getMeter(r);
        
        await expect.element(root).toHaveAttribute('aria-valuenow', String(DEFAULT_VALUE));
        await expect.element(root).toHaveAttribute('aria-valuemin', String(DEFAULT_MIN));
        await expect.element(root).toHaveAttribute('aria-valuemax', String(DEFAULT_MAX));
      });
      
      it('supports aria-valuetext', async () => {
        const r = render(<MeterTest value={DEFAULT_VALUE} valueText={VALUE_TEXT} />);
        await expect.element(getMeter(r)).toHaveAttribute('aria-valuetext', VALUE_TEXT);
      });
      
      it('reflects custom min/max/value in aria attributes', async () => {
        const r = render(<MeterTest value={0.25} min={0} max={2} />);
        
        const root = getMeter(r);
        
        await expect.element(root).toHaveAttribute('aria-valuenow', '0.25');
        await expect.element(root).toHaveAttribute('aria-valuemin', '0');
        await expect.element(root).toHaveAttribute('aria-valuemax', '2');
      });
    });
    
    describe('roles', () => {
      it('has meter role', async () => {
        const r = render(<MeterTest value={DEFAULT_VALUE} />);
        await expect.element(getMeter(r)).toHaveRole('meter');
      });
    });
  });
});