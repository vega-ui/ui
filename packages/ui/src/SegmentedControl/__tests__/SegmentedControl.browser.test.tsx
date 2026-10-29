import { ComponentProps, FC, FormEvent, PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { SegmentedControl } from '../SegmentedControl';
import {
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '../components';

afterEach(cleanup);

const TESTID_ROOT = 'segmented-control';
const TESTID_INDICATOR = 'indicator';

const TESTID_ITEM_0 = 'item-0';
const TESTID_ITEM_1 = 'item-1';
const TESTID_ITEM_2 = 'item-2';

const TESTID_INPUT_0 = 'input-0';
const TESTID_INPUT_1 = 'input-1';
const TESTID_INPUT_2 = 'input-2';

const FORM_TESTID = 'form';
const SUBMIT_TESTID = 'submit';

const NAME = 'segmented';

const VALUE_0 = 'left';
const VALUE_1 = 'middle';
const VALUE_2 = 'right';

const SIZE = 'md';
const VARIANT = 'secondary';

const SegmentedControlTest: FC<
  Omit<ComponentProps<typeof SegmentedControl>, 'name'> & { name?: string }
> = ({ name = NAME, children, ...props }) => {
  return (
    <SegmentedControl
      data-testid={TESTID_ROOT}
      size={SIZE}
      variant={VARIANT}
      name={name}
      {...props}
    >
      {children ?? (
        <>
          <SegmentedControlIndicator data-testid={TESTID_INDICATOR} />
          
          <SegmentedControlItem data-testid={TESTID_ITEM_0} value={VALUE_0}>
            {VALUE_0}
            <SegmentedControlItemInput data-testid={TESTID_INPUT_0} />
          </SegmentedControlItem>
          
          <SegmentedControlItem data-testid={TESTID_ITEM_1} value={VALUE_1}>
            {VALUE_1}
            <SegmentedControlItemInput data-testid={TESTID_INPUT_1} />
          </SegmentedControlItem>
          
          <SegmentedControlItem data-testid={TESTID_ITEM_2} value={VALUE_2}>
            {VALUE_2}
            <SegmentedControlItemInput data-testid={TESTID_INPUT_2} />
          </SegmentedControlItem>
        </>
      )}
    </SegmentedControl>
  );
};

const FormTest: FC<PropsWithChildren<{ onSubmit: (data: Record<string, string>) => void }>> = ({ onSubmit, children }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fd.forEach((v, k) => {
      data[k] = String(v);
    });
    
    onSubmit(data);
  };
  
  return (
    <form data-testid={FORM_TESTID} onSubmit={handleSubmit}>
      {children}
      <button data-testid={SUBMIT_TESTID} type='submit'>
        Submit
      </button>
    </form>
  );
};

const getRoot = (r: RenderResult) => r.getByTestId(TESTID_ROOT) as HTMLDivElement;
const getIndicator = (r: RenderResult) => r.getByTestId(TESTID_INDICATOR) as HTMLDivElement;

const getItem0 = (r: RenderResult) => r.getByTestId(TESTID_ITEM_0) as HTMLLabelElement;
const getItem1 = (r: RenderResult) => r.getByTestId(TESTID_ITEM_1) as HTMLLabelElement;
const getItem2 = (r: RenderResult) => r.getByTestId(TESTID_ITEM_2) as HTMLLabelElement;

const getInput0 = (r: RenderResult) => r.getByTestId(TESTID_INPUT_0) as HTMLInputElement;
const getInput1 = (r: RenderResult) => r.getByTestId(TESTID_INPUT_1) as HTMLInputElement;
const getInput2 = (r: RenderResult) => r.getByTestId(TESTID_INPUT_2) as HTMLInputElement;

const getSubmit = (r: RenderResult) => r.getByTestId(SUBMIT_TESTID) as HTMLButtonElement;

const expectIndicatorOver = async (indicator: HTMLElement, item: HTMLElement) => {
  await expect.poll(() => {
    const i = indicator.getBoundingClientRect();
    const t = item.getBoundingClientRect();
    
    return [Math.round(i.left - t.left), Math.round(i.width - t.width)];
  }).toEqual([0, 0]);
};

describe('SegmentedControl', () => {
  describe('Critical User Paths', () => {
    describe('uncontrolled', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SegmentedControlTest defaultValue={VALUE_0} />);
      });
      
      it('renders root', async () => {
        await expect.element(getRoot(r)).toBeInTheDocument();
      });
      
      it('renders indicator', async () => {
        await expect.element(getIndicator(r)).toBeInTheDocument();
      });
      
      it('renders hidden radio inputs', async () => {
        await expect.element(getInput0(r)).toBeInTheDocument();
        await expect.element(getInput1(r)).toBeInTheDocument();
        await expect.element(getInput2(r)).toBeInTheDocument();
        
        await expect.element(getInput0(r)).toHaveAttribute('type', 'radio');
        await expect.element(getInput1(r)).toHaveAttribute('type', 'radio');
        await expect.element(getInput2(r)).toHaveAttribute('type', 'radio');
      });
      
      it('applies group name to all radios', async () => {
        await expect.element(getInput0(r)).toHaveAttribute('name', NAME);
        await expect.element(getInput1(r)).toHaveAttribute('name', NAME);
        await expect.element(getInput2(r)).toHaveAttribute('name', NAME);
      });
      
      it('selects defaultValue', async () => {
        await expect.element(getInput0(r)).toBeChecked();
        await expect.element(getInput1(r)).not.toBeChecked();
        await expect.element(getInput2(r)).not.toBeChecked();
        
        await expectIndicatorOver(getIndicator(r), getItem0(r));
      });
      
      it('changes selection by clicking a segment (label)', async () => {
        await userEvent.click(getItem1(r));
        
        await expect.element(getInput0(r)).not.toBeChecked();
        await expect.element(getInput1(r)).toBeChecked();
        await expect.element(getInput2(r)).not.toBeChecked();
        
        await expectIndicatorOver(getIndicator(r), getItem1(r));
      });
      
      it('updates disabled state to indicator and items via data attributes', async () => {
        r.rerender(<SegmentedControlTest defaultValue={VALUE_0} disabled />);
        
        await expect.element(getIndicator(r)).toHaveAttribute('data-disabled', 'true');
        
        await expect.element(getItem0(r)).toHaveAttribute('data-disabled', 'true');
        await expect.element(getItem1(r)).toHaveAttribute('data-disabled', 'true');
        await expect.element(getItem2(r)).toHaveAttribute('data-disabled', 'true');
        
        await expect.element(getInput0(r)).toBeDisabled();
        await expect.element(getInput1(r)).toBeDisabled();
        await expect.element(getInput2(r)).toBeDisabled();
      });
      
      it('exposes variant and size via data attributes', async () => {
        await expect.element(getRoot(r)).toHaveAttribute('data-size', SIZE);
        await expect.element(getRoot(r)).toHaveAttribute('data-variant', VARIANT);
        
        await expect.element(getIndicator(r)).toHaveAttribute('data-size', SIZE);
        await expect.element(getIndicator(r)).toHaveAttribute('data-variant', VARIANT);
        
        await expect.element(getItem0(r)).toHaveAttribute('data-size', SIZE);
        await expect.element(getItem0(r)).toHaveAttribute('data-variant', VARIANT);
      });
    });
    
    describe('controlled', () => {
      let r: RenderResult;
      
      const onChange = vi.fn();
      
      beforeEach(() => {
        onChange.mockClear();
        r = render(<SegmentedControlTest value={VALUE_0} onChange={onChange} />);
      });
      
      it('reflects controlled value', async () => {
        await expect.element(getInput0(r)).toBeChecked();
        await expect.element(getInput1(r)).not.toBeChecked();
      });
      
      it('fires onChange when user selects another segment', async () => {
        await userEvent.click(getItem2(r));
        expect(onChange).toHaveBeenCalledTimes(1);
        
        const [e] = onChange.mock.calls[0] as [Event];
        expect((e.target as HTMLInputElement).value).toBe(VALUE_2);
      });
      
      it('does not change selection until parent updates value', async () => {
        await userEvent.click(getItem1(r));
        
        await expect.element(getInput0(r)).toBeChecked();
        await expect.element(getInput1(r)).not.toBeChecked();
        await expectIndicatorOver(getIndicator(r), getItem0(r));
        
        r.rerender(<SegmentedControlTest value={VALUE_1} onChange={onChange} />);
        await expect.element(getInput0(r)).not.toBeChecked();
        await expect.element(getInput1(r)).toBeChecked();
        await expectIndicatorOver(getIndicator(r), getItem1(r));
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('submits selected value via native form behavior (FormTest)', async () => {
      let submitted: Record<string, string> | null = null;
      
      const r = render(
        <FormTest onSubmit={(d) => (submitted = d)}>
          <SegmentedControlTest />
        </FormTest>
      );
      
      await userEvent.click(getItem2(r));
      await userEvent.click(getSubmit(r));
      
      expect(submitted).toEqual({
        [NAME]: VALUE_2,
      });
    });
    
    it('restores defaultValue on native form reset (uncontrolled)', async () => {
      let submitted: Record<string, string> | null = null;

      const r = render(
        <FormTest onSubmit={(d) => (submitted = d)}>
          <SegmentedControlTest defaultValue={VALUE_0} />
        </FormTest>
      );

      await userEvent.click(getItem2(r));
      (r.getByTestId(FORM_TESTID) as HTMLFormElement).reset();

      await expect.element(getInput0(r)).toBeChecked();
      await expect.element(getInput2(r)).not.toBeChecked();

      await expectIndicatorOver(getIndicator(r), getItem0(r));

      await userEvent.click(getSubmit(r));
      expect(submitted).toEqual({
        [NAME]: VALUE_0,
      });
    });

    it('supports empty defaultValue (no selection)', async () => {
      const r = render(<SegmentedControlTest defaultValue='' />);
      
      await expect.element(getInput0(r)).not.toBeChecked();
      await expect.element(getInput1(r)).not.toBeChecked();
      await expect.element(getInput2(r)).not.toBeChecked();
      
      await expect.element(getIndicator(r)).not.toBeVisible();
    });
    
    it('follows a programmatic selection that fires no events (uncontrolled)', async () => {
      const r = render(<SegmentedControlTest defaultValue={VALUE_0} />);
      
      getInput2(r).checked = true;
      
      await expectIndicatorOver(getIndicator(r), getItem2(r));
    });
    
    it('keeps indicators of several controls on a page independent', async () => {
      const r = render(
        <>
          <SegmentedControlTest defaultValue={VALUE_0} />
          <SegmentedControl name='other'>
            <SegmentedControlIndicator data-testid='other-indicator' />
            <SegmentedControlItem value={VALUE_0}>
              {VALUE_0}
              <SegmentedControlItemInput />
            </SegmentedControlItem>
            <SegmentedControlItem data-testid='other-item' value={VALUE_1}>
              {VALUE_1}
              <SegmentedControlItemInput />
            </SegmentedControlItem>
          </SegmentedControl>
        </>
      );
      
      await userEvent.click(r.getByTestId('other-item'));
      
      await expectIndicatorOver(getIndicator(r), getItem0(r));
      await expectIndicatorOver(r.getByTestId('other-indicator'), r.getByTestId('other-item'));
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SegmentedControlTest defaultValue={VALUE_1} />);
      });
      
      it('exposes native radio semantics (role=radio)', async () => {
        await expect.element(getInput0(r)).toHaveRole('radio');
        await expect.element(getInput1(r)).toHaveRole('radio');
        await expect.element(getInput2(r)).toHaveRole('radio');
      });
      
      it('reflects checked state for assistive tech', async () => {
        await expect.element(getInput1(r)).toBeChecked();
        await expect.element(getInput0(r)).not.toBeChecked();
      });
    });
    
    describe('keyboard', () => {
      it('supports tab focus and arrow navigation for radios', async () => {
        const r = render(<SegmentedControlTest defaultValue={VALUE_0} />);
        
        getInput0(r).focus()
        await expect.element(getInput0(r)).toHaveFocus();
        
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getInput1(r)).toBeChecked();
        
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getInput2(r)).toBeChecked();
        
        await userEvent.keyboard('{ArrowLeft}');
        await expect.element(getInput1(r)).toBeChecked();
      });
    });
  });
});