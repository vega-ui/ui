import { ComponentProps, FC } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
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
    it('merges style prop with meter css variables', async () => {
      const r = render(<MeterStackTest style={{ opacity: 0.5 }} />);
      const el = getMeter(r);
      
      await expect.element(el).toHaveStyle('opacity: 0.5');
      await expect.element(el).toHaveStyle(`--meter-stack-value: ${DEFAULT_VALUE}`);
      await expect.element(el).toHaveStyle(`--meter-stack-max: ${DEFAULT_MAX}`);
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
