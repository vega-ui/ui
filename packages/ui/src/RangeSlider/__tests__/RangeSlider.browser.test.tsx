import { ComponentProps, FC, FormEvent, PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { RangeSlider } from '../RangeSlider';
import { RangeSliderHiddenInput, RangeSliderProgress, RangeSliderThumb } from '../components';

afterEach(cleanup);

const TESTID_ROOT = 'range-slider';
const TESTID_PROGRESS = 'progress';

const TESTID_THUMB_0 = 'thumb-0';
const TESTID_THUMB_1 = 'thumb-1';

const TESTID_INPUT_0 = 'input-0';
const TESTID_INPUT_1 = 'input-1';

const FORM_TESTID = 'form';
const SUBMIT_TESTID = 'submit';

const NAME_0 = 'rangeMin';
const NAME_1 = 'rangeMax';

const MIN = 0;
const MAX = 100;

const DEFAULT_VALUE: [number, number] = [20, 80];

const RangeSliderTest: FC<PropsWithChildren<ComponentProps<typeof RangeSlider>>> = (props) => {
  const { children, ...rest } = props;
  
  return (
    <RangeSlider data-testid={TESTID_ROOT} min={MIN} max={MAX} {...rest}>
      {children ?? (
        <>
          <RangeSliderProgress data-testid={TESTID_PROGRESS} />
          <RangeSliderThumb data-testid={TESTID_THUMB_0} index={0}>
            <RangeSliderHiddenInput data-testid={TESTID_INPUT_0} name={NAME_0} />
          </RangeSliderThumb>
          <RangeSliderThumb data-testid={TESTID_THUMB_1} index={1}>
            <RangeSliderHiddenInput data-testid={TESTID_INPUT_1} name={NAME_1} />
          </RangeSliderThumb>
        </>
      )}
    </RangeSlider>
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

const getRoot = (r: RenderResult) => r.getByTestId(TESTID_ROOT);
const getProgress = (r: RenderResult) => r.getByTestId(TESTID_PROGRESS);

const getThumb0 = (r: RenderResult) => r.getByTestId(TESTID_THUMB_0);
const getThumb1 = (r: RenderResult) => r.getByTestId(TESTID_THUMB_1);

const getInput0 = (r: RenderResult) => r.getByTestId(TESTID_INPUT_0) as HTMLInputElement;
const getInput1 = (r: RenderResult) => r.getByTestId(TESTID_INPUT_1) as HTMLInputElement;

describe('RangeSlider', () => {
  describe('Critical User Paths', () => {
    describe('uncontrolled', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<RangeSliderTest defaultValue={DEFAULT_VALUE} />);
      });
      
      it('renders root', async () => {
        await expect.element(getRoot(r)).toBeInTheDocument();
      });
      
      it('renders progress', async () => {
        await expect.element(getProgress(r)).toBeInTheDocument();
      });
      
      it('renders thumb 0', async () => {
        await expect.element(getThumb0(r)).toBeInTheDocument();
      });
      
      it('renders thumb 1', async () => {
        await expect.element(getThumb1(r)).toBeInTheDocument();
      });
      
      it('renders hidden input 0', async () => {
        await expect.element(getInput0(r)).toBeInTheDocument();
      });
      
      it('renders hidden input 1', async () => {
        await expect.element(getInput1(r)).toBeInTheDocument();
      });
      
      it('syncs hidden input 0 value from defaultValue', async () => {
        await expect.element(getInput0(r)).toHaveValue(String(DEFAULT_VALUE[0]));
      });
      
      it('syncs hidden input 1 value from defaultValue', async () => {
        await expect.element(getInput1(r)).toHaveValue(String(DEFAULT_VALUE[1]));
      });
      
      it('passes min/max to hidden inputs (based on opposite thumb)', async () => {
        await expect.element(getInput0(r)).toHaveAttribute('min', String(MIN));
        await expect.element(getInput0(r)).toHaveAttribute('max', String(DEFAULT_VALUE[1]));
        
        await expect.element(getInput1(r)).toHaveAttribute('min', String(DEFAULT_VALUE[0]));
        await expect.element(getInput1(r)).toHaveAttribute('max', String(MAX));
      });
      
      it('passes step to hidden inputs', async () => {
        const STEP = 10;
        
        r.rerender(<RangeSliderTest defaultValue={DEFAULT_VALUE} step={STEP} />);
        
        await expect.element(getInput0(r)).toHaveAttribute('step', String(STEP));
        await expect.element(getInput1(r)).toHaveAttribute('step', String(STEP));
      });
      
      it('passes disabled to hidden inputs', async () => {
        r.rerender(<RangeSliderTest defaultValue={DEFAULT_VALUE} disabled />);
        
        await expect.element(getInput0(r)).toBeDisabled();
        await expect.element(getInput1(r)).toBeDisabled();
      });
      
      it('calls onChangeValue on ArrowRight (thumb 0)', async () => {
        const STEP = 10;
        const onChangeValue = vi.fn();
        
        r.rerender(
          <RangeSliderTest defaultValue={DEFAULT_VALUE} step={STEP} onChangeValue={onChangeValue} />
        );
        
        const t0 = getThumb0(r);
        t0.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        expect(onChangeValue).toHaveBeenCalledTimes(1);
      });
      
      it('updates hidden input 0 after ArrowRight (thumb 0)', async () => {
        const STEP = 10;
        
        r.rerender(<RangeSliderTest defaultValue={DEFAULT_VALUE} step={STEP} />);
        
        const t0 = getThumb0(r);
        t0.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getInput0(r)).toHaveValue('30');
      });
      
      it('keeps hidden input 1 unchanged after ArrowRight (thumb 0)', async () => {
        const STEP = 10;
        
        r.rerender(<RangeSliderTest defaultValue={DEFAULT_VALUE} step={STEP} />);
        
        const t0 = getThumb0(r);
        t0.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getInput1(r)).toHaveValue(String(DEFAULT_VALUE[1]));
      });
      
      it('updates hidden input 1 after ArrowLeft (thumb 1)', async () => {
        const STEP = 10;
        
        r.rerender(<RangeSliderTest defaultValue={DEFAULT_VALUE} step={STEP} />);
        
        const t1 = getThumb1(r);
        t1.focus();
        
        await userEvent.keyboard('{ArrowLeft}');
        await expect.element(getInput1(r)).toHaveValue('70');
      });
      
      it('keeps hidden input 0 unchanged after ArrowLeft (thumb 1)', async () => {
        const STEP = 10;
        
        r.rerender(<RangeSliderTest defaultValue={DEFAULT_VALUE} step={STEP} />);
        
        const t1 = getThumb1(r);
        t1.focus();
        
        await userEvent.keyboard('{ArrowLeft}');
        await expect.element(getInput0(r)).toHaveValue(String(DEFAULT_VALUE[0]));
      });
      
      it('sets left thumb to min on Home', async () => {
        const t0 = getThumb0(r);
        t0.focus();
        
        await userEvent.keyboard('{Home}');
        await expect.element(getInput0(r)).toHaveValue(String(MIN));
      });
      
      it('sets right thumb to max on End', async () => {
        const t1 = getThumb1(r);
        t1.focus();
        
        await userEvent.keyboard('{End}');
        await expect.element(getInput1(r)).toHaveValue(String(MAX));
      });
    });
    
    describe('controlled', () => {
      const STEP = 10;
      
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<RangeSliderTest value={[10, 90]} step={STEP} />);
      });
      
      it('renders root', async () => {
        await expect.element(getRoot(r)).toBeInTheDocument();
      });
      
      it('syncs hidden input 0 value from value', async () => {
        await expect.element(getInput0(r)).toHaveValue('10');
      });
      
      it('syncs hidden input 1 value from value', async () => {
        await expect.element(getInput1(r)).toHaveValue('90');
      })
      
      it('passes min/max to hidden inputs (based on controlled value)', async () => {
        await expect.element(getInput0(r)).toHaveAttribute('min', String(MIN));
        await expect.element(getInput0(r)).toHaveAttribute('max', String(90));
        
        await expect.element(getInput1(r)).toHaveAttribute('min', String(10));
        await expect.element(getInput1(r)).toHaveAttribute('max', String(MAX));
      });
      
      it('calls onChangeValue when ArrowRight pressed on thumb 0', async () => {
        const onChangeValue = vi.fn();
        
        r.rerender(<RangeSliderTest value={[10, 90]} step={STEP} onChangeValue={onChangeValue} />);
        
        const t0 = getThumb0(r);
        t0.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        expect(onChangeValue).toHaveBeenCalledTimes(1);
      });
      
      it('calls onChangeValue with next value when ArrowRight pressed on thumb 0', async () => {
        const onChangeValue = vi.fn();
        
        r.rerender(<RangeSliderTest value={[10, 90]} step={STEP} onChangeValue={onChangeValue} />);
        
        const t0 = getThumb0(r);
        t0.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        expect(onChangeValue).toHaveBeenCalledWith([20, 90]);
      });
      
      it('does not update hidden input 0 without external value update (ArrowRight thumb 0)', async () => {
        const onChangeValue = vi.fn();
        
        r.rerender(<RangeSliderTest value={[10, 90]} step={STEP} onChangeValue={onChangeValue} />);
        
        const t0 = getThumb0(r);
        t0.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getInput0(r)).toHaveValue('10');
      });
      
      it('updates hidden input 0 only after external value update (rerender)', async () => {
        const onChangeValue = vi.fn();
        
        r.rerender(<RangeSliderTest value={[10, 90]} step={STEP} onChangeValue={onChangeValue} />);
        
        const t0 = getThumb0(r);
        t0.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        r.rerender(<RangeSliderTest value={[20, 90]} step={STEP} onChangeValue={onChangeValue} />);
        
        await expect.element(getInput0(r)).toHaveValue('20');
      });
      
      it('calls onChangeValue when ArrowLeft pressed on thumb 1', async () => {
        const onChangeValue = vi.fn();
        
        r.rerender(<RangeSliderTest value={[10, 90]} step={STEP} onChangeValue={onChangeValue} />);
        
        const t1 = getThumb1(r);
        t1.focus();
        
        await userEvent.keyboard('{ArrowLeft}');
        expect(onChangeValue).toHaveBeenCalledTimes(1);
      });
      
      it('calls onChangeValue with next value when ArrowLeft pressed on thumb 1', async () => {
        const onChangeValue = vi.fn();
        
        r.rerender(<RangeSliderTest value={[10, 90]} step={STEP} onChangeValue={onChangeValue} />);
        
        const t1 = getThumb1(r);
        t1.focus();
        
        await userEvent.keyboard('{ArrowLeft}');
        expect(onChangeValue).toHaveBeenCalledWith([10, 80]);
      });
      
      it('supports Home/End in controlled mode (calls onChangeValue)', async () => {
        const onChangeValue = vi.fn();
        
        r.rerender(<RangeSliderTest value={[10, 90]} step={STEP} onChangeValue={onChangeValue} />);
        
        const t0 = getThumb0(r);
        t0.focus();
        
        await userEvent.keyboard('{Home}');
        expect(onChangeValue).toHaveBeenCalledWith([MIN, 90]);
        
        onChangeValue.mockClear();
        
        const t1 = getThumb1(r);
        t1.focus();
        
        await userEvent.keyboard('{End}');
        expect(onChangeValue).toHaveBeenCalledWith([10, MAX]);
      });
    });
  });
  
  describe('Error handling', () => {
    it('does not call onChangeValue when disabled (thumb 0 ArrowRight)', async () => {
      const STEP = 10;
      const onChangeValue = vi.fn();
      
      const r = render(
        <RangeSliderTest defaultValue={DEFAULT_VALUE} step={STEP} disabled onChangeValue={onChangeValue} />
      );
      
      const t0 = getThumb0(r);
      t0.focus();
      
      await userEvent.keyboard('{ArrowRight}');
      expect(onChangeValue).not.toHaveBeenCalled();
    });
    
    it('does not update hidden input 0 when disabled (thumb 0 ArrowRight)', async () => {
      const STEP = 10;
      const r = render(<RangeSliderTest defaultValue={DEFAULT_VALUE} step={STEP} disabled />);
      
      const t0 = getThumb0(r);
      t0.focus();
      
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(getInput0(r)).toHaveValue(String(DEFAULT_VALUE[0]));
    });
    
    it('does not update hidden input 1 when disabled (thumb 1 ArrowLeft)', async () => {
      const STEP = 10;
      const r = render(<RangeSliderTest defaultValue={DEFAULT_VALUE} step={STEP} disabled />);
      
      const t1 = getThumb1(r);
      t1.focus();
      
      await userEvent.keyboard('{ArrowLeft}');
      await expect.element(getInput1(r)).toHaveValue(String(DEFAULT_VALUE[1]));
    });
  });
  
  describe('Edge Cases', () => {
    it('submits values via form (name/value pairs)', async () => {
      let submitted: Record<string, string> | null = null;
      
      const r = render(
        <FormTest onSubmit={(d) => (submitted = d)}>
          <RangeSliderTest defaultValue={[30, 70]} />
        </FormTest>
      );
      
      await userEvent.click(r.getByTestId(SUBMIT_TESTID));
      
      expect(submitted).toEqual({
        [NAME_0]: '30',
        [NAME_1]: '70',
      });
    });
    
    it('enforces minRange for left thumb when stepping towards right', async () => {
      const STEP = 10;
      const r = render(<RangeSliderTest defaultValue={[40, 60]} step={STEP} minRange={30} />);
      
      const t0 = getThumb0(r);
      t0.focus();
      
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(getInput0(r)).toHaveValue('30');
    });
    
    it('keeps right thumb unchanged when left is clamped by minRange', async () => {
      const STEP = 10;
      const r = render(<RangeSliderTest defaultValue={[40, 60]} step={STEP} minRange={30} />);
      
      const t0 = getThumb0(r);
      t0.focus();
      
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(getInput1(r)).toHaveValue('60');
    });
    
    it('enforces minRange for right thumb when stepping towards left', async () => {
      const STEP = 10;
      const r = render(<RangeSliderTest defaultValue={[40, 60]} step={STEP} minRange={30} />);
      
      const t1 = getThumb1(r);
      t1.focus();
      
      await userEvent.keyboard('{ArrowLeft}');
      await expect.element(getInput1(r)).toHaveValue('70');
    });
    
    it('keeps left thumb unchanged when right is clamped by minRange', async () => {
      const STEP = 10;
      const r = render(<RangeSliderTest defaultValue={[40, 60]} step={STEP} minRange={30} />);
      
      const t1 = getThumb1(r);
      t1.focus();
      
      await userEvent.keyboard('{ArrowLeft}');
      await expect.element(getInput0(r)).toHaveValue('40');
    });
    
    it('supports step="any" (thumb 0 uses step=1 on ArrowRight)', async () => {
      const r = render(<RangeSliderTest defaultValue={DEFAULT_VALUE} step='any' />);
      
      const t0 = getThumb0(r);
      t0.focus();
      
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(getInput0(r)).toHaveValue('21');
    });
    
    it('supports step="any" (thumb 1 uses step=1 on ArrowLeft)', async () => {
      const r = render(<RangeSliderTest defaultValue={DEFAULT_VALUE} step='any' />);
      
      const t1 = getThumb1(r);
      t1.focus();
      
      await userEvent.keyboard('{ArrowLeft}');
      await expect.element(getInput1(r)).toHaveValue('79');
    });
    
    it('prevents crossing: left thumb ArrowRight blocked when would exceed right', async () => {
      const STEP = 10;
      const r = render(<RangeSliderTest defaultValue={[20, 30]} step={STEP} />);
      
      const t0 = getThumb0(r);
      t0.focus();
      
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(getInput0(r)).toHaveValue('30');
      
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(getInput0(r)).toHaveValue('30');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<RangeSliderTest defaultValue={DEFAULT_VALUE} />);
      });
      
      it('exposes two sliders', async () => {
        const sliders = r.getAllByRole('slider');
        expect(sliders).toHaveLength(2);
      });
      
      it('thumb 0 is a slider', async () => {
        await expect.element(getThumb0(r)).toHaveRole('slider');
      });
      
      it('thumb 1 is a slider', async () => {
        await expect.element(getThumb1(r)).toHaveRole('slider');
      });
    });
    
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<RangeSliderTest defaultValue={[20, 80]} minRange={15} />);
      });
      
      it('sets aria-valuemin for thumb 0 to global min', async () => {
        await expect.element(getThumb0(r)).toHaveAttribute('aria-valuemin', String(MIN));
      });
      
      it('sets aria-valuemax for thumb 0 to right - minRange', async () => {
        await expect.element(getThumb0(r)).toHaveAttribute('aria-valuemax', String(80 - 15));
      });
      
      it('sets aria-valuemin for thumb 1 to left + minRange', async () => {
        await expect.element(getThumb1(r)).toHaveAttribute('aria-valuemin', String(20 + 15));
      });
      
      it('sets aria-valuemax for thumb 1 to global max', async () => {
        await expect.element(getThumb1(r)).toHaveAttribute('aria-valuemax', String(MAX));
      });
    });
    
    describe('keyboard', () => {
      it('ArrowRight increments left thumb by step', async () => {
        const STEP = 10;
        const r = render(<RangeSliderTest defaultValue={DEFAULT_VALUE} step={STEP} />);
        
        const t0 = getThumb0(r);
        t0.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getInput0(r)).toHaveValue('30');
      });
      
      it('ArrowLeft decrements right thumb by step', async () => {
        const STEP = 10;
        const r = render(<RangeSliderTest defaultValue={DEFAULT_VALUE} step={STEP} />);
        
        const t1 = getThumb1(r);
        t1.focus();
        
        await userEvent.keyboard('{ArrowLeft}');
        await expect.element(getInput1(r)).toHaveValue('70');
      });
      
      it('Home sets left thumb to min', async () => {
        const r = render(<RangeSliderTest defaultValue={DEFAULT_VALUE} />);
        
        const t0 = getThumb0(r);
        t0.focus();
        
        await userEvent.keyboard('{Home}');
        await expect.element(getInput0(r)).toHaveValue(String(MIN));
      });
      
      it('End sets right thumb to max', async () => {
        const r = render(<RangeSliderTest defaultValue={DEFAULT_VALUE} />);
        
        const t1 = getThumb1(r);
        t1.focus();
        
        await userEvent.keyboard('{End}');
        await expect.element(getInput1(r)).toHaveValue(String(MAX));
      });
    });
  });
});