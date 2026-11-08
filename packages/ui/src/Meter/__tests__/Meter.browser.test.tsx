import { ComponentProps, FC } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Meter } from '../Meter';
import { MeterTrack } from '../components';

afterEach(cleanup);

const TESTID_METER = 'meter';

const DEFAULT_VALUE = 0.5;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 1;

const MeterTest: FC<ComponentProps<typeof Meter>> = (props) => {
  const { value, ...rest } = props;
  return <Meter data-testid={TESTID_METER} value={value} {...rest} />;
};

const getMeter = (r: RenderResult) => r.getByTestId(TESTID_METER);

const getFill = (props: ComponentProps<typeof Meter>) => {
  const r = render(
    <Meter data-testid={TESTID_METER} style={{ width: 200 }} {...props}>
      <MeterTrack data-testid='track' />
    </Meter>
  );
  return r.getByTestId('track').getBoundingClientRect().width / getMeter(r).getBoundingClientRect().width;
};

describe('Meter', () => {
  describe('Critical User Paths', () => {
    it('preserves user styles', async () => {
      const r = render(<MeterTest value={DEFAULT_VALUE} style={{ marginTop: '10px' }} />);
      
      const root = getMeter(r);
      
      await expect.element(root).toHaveStyle('margin-top: 10px');
      await expect.element(root).toHaveStyle(`--meter-value: ${DEFAULT_VALUE}`);
    });
  });
  
  describe('Edge Cases', () => {
    it('fills relative to min and max', () => {
      expect(getFill({ value: 15, min: 10, max: 20 })).toBeCloseTo(0.5);
    });

    it('clamps the fill to max', () => {
      expect(getFill({ value: 30, min: 10, max: 20 })).toBeCloseTo(1);
    });

    it('clamps the fill to min', () => {
      expect(getFill({ value: 0, min: 10, max: 20 })).toBeCloseTo(0);
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
    });
  });
});
