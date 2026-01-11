import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { MeterStack } from '../MeterStack';
import { MeterStackSegment } from '../components';

afterEach(cleanup);

const TESTID_METER = 'meter';
const TESTID_SEGMENT_1 = 'segment-1';
const TESTID_SEGMENT_2 = 'segment-2';

const DEFAULT_VALUE = 0.6;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 1;

const SEGMENT_1_VALUE = 0.2;
const SEGMENT_2_VALUE = 0.4;

const MeterStackTest: FC<Partial<ComponentProps<typeof MeterStack>>> = ({
 children,
  value = DEFAULT_VALUE,
 ...props
}) => {
  return (
    <MeterStack
      data-testid={TESTID_METER}
      value={value}
      min={DEFAULT_MIN}
      max={DEFAULT_MAX}
      {...props}
    >
      {children ?? (
        <>
          <MeterStackSegment data-testid={TESTID_SEGMENT_1} value={SEGMENT_1_VALUE} />
          <MeterStackSegment data-testid={TESTID_SEGMENT_2} value={SEGMENT_2_VALUE} />
        </>
      )}
    </MeterStack>
  );
};

const getMeter = (r: RenderResult) => r.getByTestId(TESTID_METER);
const getSegment1 = (r: RenderResult) => r.getByTestId(TESTID_SEGMENT_1);
const getSegment2 = (r: RenderResult) => r.getByTestId(TESTID_SEGMENT_2);

describe('MeterStack', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<MeterStackTest />);
    });
    
    it('renders root and children', async () => {
      await expect.element(getMeter(r)).toBeInTheDocument();
      await expect.element(getSegment1(r)).toBeInTheDocument();
      await expect.element(getSegment2(r)).toBeInTheDocument();
    });
    
    it('applies data-size (default)', async () => {
      await expect.element(getMeter(r)).toHaveAttribute('data-size', 'md');
    });
    
    it('supports size prop', async () => {
      r.rerender(<MeterStackTest size='sm' />);
      await expect.element(getMeter(r)).toHaveAttribute('data-size', 'sm');
      
      r.rerender(<MeterStackTest size='lg' />);
      await expect.element(getMeter(r)).toHaveAttribute('data-size', 'lg');
    });
    
    it('sets data-full-width when fullWidth=true', async () => {
      r.rerender(<MeterStackTest fullWidth />);
      await expect.element(getMeter(r)).toHaveAttribute('data-full-width', 'true');
    });
    
    it('does not set data-full-width when fullWidth is not provided', async () => {
      await expect.element(getMeter(r)).not.toHaveAttribute('data-full-width');
    });
    
    it('exposes meter css variables for value/max in style attribute', async () => {
      const el = getMeter(r);
      
      await expect.element(el).toHaveStyle(`--meter-stack-value: ${DEFAULT_VALUE}`);
      await expect.element(el).toHaveStyle(`--meter-stack-max: ${DEFAULT_MAX}`);
    });
    
    it('merges style prop with meter css variables', async () => {
      r.rerender(<MeterStackTest style={{ opacity: 0.5 }} />);
      const el = getMeter(r);
      
      await expect.element(el).toHaveStyle('opacity: 0.5');
      await expect.element(el).toHaveStyle(`--meter-stack-value: ${DEFAULT_VALUE}`);
      await expect.element(el).toHaveStyle(`--meter-stack-max: ${DEFAULT_MAX}`);
    });
    
    it('passes through html attributes', async () => {
      r.rerender(<MeterStackTest aria-label='Quota meter' />);
      await expect.element(getMeter(r)).toHaveAttribute('aria-label', 'Quota meter');
    });
  });
  
  describe('Edge Cases', () => {
    it('supports empty children', async () => {
      const r = render(<MeterStackTest>{null}</MeterStackTest>);
      await expect.element(getMeter(r)).toBeInTheDocument();
    });
    
    it('works with extreme min/max/value values (css vars + aria)', async () => {
      const min = -100;
      const max = 1000;
      const value = 999;
      
      const r = render(
        <MeterStackTest min={min} max={max} value={value}>
          <MeterStackSegment data-testid={TESTID_SEGMENT_1} value={value} />
        </MeterStackTest>
      );
      
      const meter = getMeter(r);
      const seg = getSegment1(r);
      
      await expect.element(meter).toHaveStyle(`--meter-stack-value: ${value}`);
      await expect.element(meter).toHaveStyle(`--meter-stack-max: ${max}`);
      
      await expect.element(seg).toHaveAttribute('aria-valuemin', String(min));
      await expect.element(seg).toHaveAttribute('aria-valuemax', String(max));
      await expect.element(seg).toHaveAttribute('aria-valuenow', String(value));
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      it('segments expose role=meter', async () => {
        const r = render(<MeterStackTest />);
        await expect.element(getSegment1(r)).toHaveRole('meter');
        await expect.element(getSegment2(r)).toHaveRole('meter');
      });
    });
    
    describe('aria', () => {
      it('segments set aria-valuemin/aria-valuemax from MeterStack context', async () => {
        const min = 10;
        const max = 90;
        
        const r = render(
          <MeterStackTest min={min} max={max}>
            <MeterStackSegment data-testid={TESTID_SEGMENT_1} value={SEGMENT_1_VALUE} />
            <MeterStackSegment data-testid={TESTID_SEGMENT_2} value={SEGMENT_2_VALUE} />
          </MeterStackTest>
        );
        
        await expect.element(getSegment1(r)).toHaveAttribute('aria-valuemin', String(min));
        await expect.element(getSegment1(r)).toHaveAttribute('aria-valuemax', String(max));
        
        await expect.element(getSegment2(r)).toHaveAttribute('aria-valuemin', String(min));
        await expect.element(getSegment2(r)).toHaveAttribute('aria-valuemax', String(max));
      });
      
      it('segments set aria-valuenow from their value', async () => {
        const r = render(<MeterStackTest />);
        await expect.element(getSegment1(r)).toHaveAttribute('aria-valuenow', String(SEGMENT_1_VALUE));
        await expect.element(getSegment2(r)).toHaveAttribute('aria-valuenow', String(SEGMENT_2_VALUE));
      });
    });
  });
});