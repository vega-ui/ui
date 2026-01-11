import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Fieldset } from '../Fieldset';
import { FieldsetHeader, FieldsetLegend } from '../components';

afterEach(cleanup);

const TESTID_FIELDSET = 'fieldset'
const TESTID_HEADER = 'header'
const TESTID_LEGEND = 'legend'
const TESTID_CONTROL = 'control'

const LEGEND_TEXT = 'Personal information';
const APPEARANCE = 'transparent';

const FieldsetTest = (props?: Partial<ComponentProps<typeof Fieldset>>) => {
  return (
    <Fieldset {...props} data-testid={TESTID_FIELDSET}>
      <FieldsetHeader data-testid={TESTID_HEADER}>
        <FieldsetLegend data-testid={TESTID_LEGEND}>{LEGEND_TEXT}</FieldsetLegend>
      </FieldsetHeader>
      <input data-testid={TESTID_CONTROL} />
    </Fieldset>
  );
};

const getFieldset = (r: RenderResult) => r.getByTestId(TESTID_FIELDSET);
const getHeader = (r: RenderResult) => r.getByTestId(TESTID_HEADER);
const getLegend = (r: RenderResult) => r.getByTestId(TESTID_LEGEND);
const getControl = (r: RenderResult) => r.getByTestId(TESTID_CONTROL);

describe('Fieldset', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<FieldsetTest />);
    });
    
    it('renders fieldset element', async () => {
      await expect.element(getFieldset(r)).toBeInTheDocument();
      await expect.element(getFieldset(r)).toHaveRole('group');
    });
    
    it('renders header and legend', async () => {
      await expect.element(getHeader(r)).toBeInTheDocument();
      await expect.element(getLegend(r)).toBeInTheDocument();
      await expect.element(getLegend(r)).toHaveTextContent(LEGEND_TEXT);
    });
    
    it('renders form controls inside fieldset', async () => {
      await expect.element(getControl(r)).toBeInTheDocument();
    });
    
    it('applies default appearance', async () => {
      await expect.element(getFieldset(r)).toHaveAttribute('data-appearance', APPEARANCE);
    });
    
    it('supports custom appearance via props', async () => {
      r.rerender(<FieldsetTest appearance='outlined' />);
      await expect.element(getFieldset(r)).toHaveAttribute('data-appearance', 'outlined');
    });
  });
  
  describe('Edge Cases', () => {
    it('renders without header and legend', async () => {
      const r = render(
        <Fieldset data-testid={TESTID_FIELDSET}>
          <input data-testid={TESTID_CONTROL} />
        </Fieldset>
      );
      
      await expect.element(getFieldset(r)).toBeInTheDocument();
      await expect.element(getControl(r)).toBeInTheDocument();
    });
    
    it('renders empty fieldset', async () => {
      const r = render(<Fieldset data-testid={TESTID_FIELDSET} />);
      await expect.element(getFieldset(r)).toBeInTheDocument();
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<FieldsetTest />);
      });
      
      it('fieldset has group role', async () => {
        await expect.element(getFieldset(r)).toHaveRole('group');
      });
      
      it('legend is associated with fieldset', async () => {
        const legend = getLegend(r)
        expect(legend).toBeVisible()
        expect(legend).toHaveTextContent(LEGEND_TEXT)
      });
    });
  });
});