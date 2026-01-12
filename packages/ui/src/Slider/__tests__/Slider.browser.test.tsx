import { ComponentProps, FC, FormEvent, PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Slider } from '../Slider';
import { SliderHiddenInput, SliderProgress, SliderThumb } from '../components';

afterEach(cleanup);

const TESTID_ROOT = 'slider';
const TESTID_PROGRESS = 'progress';
const TESTID_THUMB = 'thumb';
const TESTID_INPUT = 'input';

const FORM_TESTID = 'form';
const SUBMIT_TESTID = 'submit';

const NAME = 'sliderValue';

const MIN = 0;
const MAX = 100;

const DEFAULT_VALUE = 20;

const SliderTest: FC<PropsWithChildren<ComponentProps<typeof Slider>>> = (props) => {
  const { children, ...rest } = props;
  
  return (
    <Slider data-testid={TESTID_ROOT} min={MIN} max={MAX} {...rest}>
      {children ?? (
        <>
          <SliderProgress data-testid={TESTID_PROGRESS} />
          <SliderThumb data-testid={TESTID_THUMB}>
            <SliderHiddenInput data-testid={TESTID_INPUT} name={NAME} />
          </SliderThumb>
        </>
      )}
    </Slider>
  );
};

const FormTest: FC<PropsWithChildren<{ onSubmit: (data: Record<string, string>) => void }>> = ({
                                                                                                 onSubmit,
                                                                                                 children,
                                                                                               }) => {
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

const getThumb = (r: RenderResult) => r.getByTestId(TESTID_THUMB);
const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;

describe('Slider', () => {
  describe('Critical User Paths', () => {
    describe('uncontrolled', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SliderTest defaultValue={DEFAULT_VALUE} />);
      });
      
      it('renders root', async () => {
        await expect.element(getRoot(r)).toBeInTheDocument();
      });
      
      it('renders progress', async () => {
        await expect.element(getProgress(r)).toBeInTheDocument();
      });
      
      it('renders thumb', async () => {
        await expect.element(getThumb(r)).toBeInTheDocument();
      });
      
      it('renders hidden input', async () => {
        await expect.element(getInput(r)).toBeInTheDocument();
      });
      
      it('syncs hidden input value from defaultValue', async () => {
        await expect.element(getInput(r)).toHaveValue(String(DEFAULT_VALUE));
      });
      
      it('passes min/max to hidden input', async () => {
        await expect.element(getInput(r)).toHaveAttribute('min', String(MIN));
        await expect.element(getInput(r)).toHaveAttribute('max', String(MAX));
      });
      
      it('passes step to hidden input', async () => {
        const STEP = 10;
        
        r.rerender(<SliderTest defaultValue={DEFAULT_VALUE} step={STEP} />);
        
        await expect.element(getInput(r)).toHaveAttribute('step', String(STEP));
      });
      
      it('passes disabled to hidden input', async () => {
        r.rerender(<SliderTest defaultValue={DEFAULT_VALUE} disabled />);
        
        await expect.element(getInput(r)).toBeDisabled();
      });
      
      it('calls onChangeValue on ArrowRight', async () => {
        const STEP = 10;
        const onChangeValue = vi.fn();
        
        r.rerender(<SliderTest defaultValue={DEFAULT_VALUE} step={STEP} onChangeValue={onChangeValue} />);
        
        const thumb = getThumb(r);
        thumb.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        expect(onChangeValue).toHaveBeenCalledTimes(1);
      });
      
      it('updates hidden input after ArrowRight', async () => {
        const STEP = 10;
        
        r.rerender(<SliderTest defaultValue={DEFAULT_VALUE} step={STEP} />);
        
        const thumb = getThumb(r);
        thumb.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getInput(r)).toHaveValue(String(DEFAULT_VALUE + STEP));
      });
      
      it('updates hidden input after ArrowLeft', async () => {
        const STEP = 10;
        
        r.rerender(<SliderTest defaultValue={DEFAULT_VALUE} step={STEP} />);
        
        const thumb = getThumb(r);
        thumb.focus();
        
        await userEvent.keyboard('{ArrowLeft}');
        await expect.element(getInput(r)).toHaveValue(String(DEFAULT_VALUE - STEP));
      });
      
      it('sets thumb to min on Home', async () => {
        const thumb = getThumb(r);
        thumb.focus();
        
        await userEvent.keyboard('{Home}');
        await expect.element(getInput(r)).toHaveValue(String(MIN));
      });
      
      it('sets thumb to max on End', async () => {
        const thumb = getThumb(r);
        thumb.focus();
        
        await userEvent.keyboard('{End}');
        await expect.element(getInput(r)).toHaveValue(String(MAX));
      });
      
      it('updates hidden input on pointer drag (pointerDown -> pointerMove -> pointerUp)', async () => {
        const thumb = getThumb(r);
        
        fireEvent.pointerDown(thumb, { pointerId: 1, pointerType: 'touch', clientX: 0, clientY: 0 });
        fireEvent.pointerMove(thumb, { pointerId: 1, pointerType: 'touch', clientX: 999, clientY: 0 });
        fireEvent.pointerUp(thumb, { pointerId: 1, pointerType: 'touch', clientX: 999, clientY: 0 });
        
        await expect.element(getInput(r)).toHaveValue(String(MAX));
      });
    });
    
    describe('controlled', () => {
      const STEP = 10;
      
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SliderTest value={10} step={STEP} />);
      });
      
      it('renders root', async () => {
        await expect.element(getRoot(r)).toBeInTheDocument();
      });
      
      it('syncs hidden input value from value', async () => {
        await expect.element(getInput(r)).toHaveValue('10');
      });
      
      it('passes min/max to hidden input', async () => {
        await expect.element(getInput(r)).toHaveAttribute('min', String(MIN));
        await expect.element(getInput(r)).toHaveAttribute('max', String(MAX));
      });
      
      it('calls onChangeValue when ArrowRight pressed', async () => {
        const onChangeValue = vi.fn();
        
        r.rerender(<SliderTest value={10} step={STEP} onChangeValue={onChangeValue} />);
        
        const thumb = getThumb(r);
        thumb.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        expect(onChangeValue).toHaveBeenCalledTimes(1);
      });
      
      it('calls onChangeValue with next value when ArrowRight pressed', async () => {
        const onChangeValue = vi.fn();
        
        r.rerender(<SliderTest value={10} step={STEP} onChangeValue={onChangeValue} />);
        
        const thumb = getThumb(r);
        thumb.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        expect(onChangeValue).toHaveBeenCalledWith(20);
      });
      
      it('does not update hidden input without external value update (ArrowRight)', async () => {
        const onChangeValue = vi.fn();
        
        r.rerender(<SliderTest value={10} step={STEP} onChangeValue={onChangeValue} />);
        
        const thumb = getThumb(r);
        thumb.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getInput(r)).toHaveValue('10');
      });
      
      it('updates hidden input only after external value update (rerender)', async () => {
        const onChangeValue = vi.fn();
        
        r.rerender(<SliderTest value={10} step={STEP} onChangeValue={onChangeValue} />);
        
        const thumb = getThumb(r);
        thumb.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        r.rerender(<SliderTest value={20} step={STEP} onChangeValue={onChangeValue} />);
        
        await expect.element(getInput(r)).toHaveValue('20');
      });
      
      it('supports Home/End in controlled mode (calls onChangeValue)', async () => {
        const onChangeValue = vi.fn();
        
        r.rerender(<SliderTest value={10} step={STEP} onChangeValue={onChangeValue} />);
        
        const thumb = getThumb(r);
        thumb.focus();
        
        await userEvent.keyboard('{Home}');
        expect(onChangeValue).toHaveBeenCalledWith(MIN);
        
        onChangeValue.mockClear();
        
        await userEvent.keyboard('{End}');
        expect(onChangeValue).toHaveBeenCalledWith(MAX);
      });
    });
  });
  
  describe('Error handling', () => {
    it('does not call onChangeValue when disabled (ArrowRight)', async () => {
      const STEP = 10;
      const onChangeValue = vi.fn();
      
      const r = render(<SliderTest defaultValue={DEFAULT_VALUE} step={STEP} disabled onChangeValue={onChangeValue} />);
      
      const thumb = getThumb(r);
      thumb.focus();
      
      await userEvent.keyboard('{ArrowRight}');
      expect(onChangeValue).not.toHaveBeenCalled();
    });
    
    it('does not update hidden input when disabled (ArrowRight)', async () => {
      const STEP = 10;
      const r = render(<SliderTest defaultValue={DEFAULT_VALUE} step={STEP} disabled />);
      
      const thumb = getThumb(r);
      thumb.focus();
      
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(getInput(r)).toHaveValue(String(DEFAULT_VALUE));
    });
    
    it('does not update hidden input when disabled (pointer drag)', async () => {
      const r = render(<SliderTest defaultValue={DEFAULT_VALUE} disabled />);
      
      const thumb = getThumb(r);
      
      fireEvent.pointerDown(thumb, { pointerId: 1, pointerType: 'touch', clientX: 0, clientY: 0 });
      fireEvent.pointerMove(thumb, { pointerId: 1, pointerType: 'touch', clientX: 999, clientY: 0 });
      fireEvent.pointerUp(thumb, { pointerId: 1, pointerType: 'touch', clientX: 999, clientY: 0 });
      
      await expect.element(getInput(r)).toHaveValue(String(DEFAULT_VALUE));
    });
  });
  
  describe('Edge Cases', () => {
    it('submits value via form (name/value pair)', async () => {
      let submitted: Record<string, string> | null = null;
      
      const r = render(
        <FormTest onSubmit={(d) => (submitted = d)}>
          <SliderTest defaultValue={30} />
        </FormTest>
      );
      
      await userEvent.click(r.getByTestId(SUBMIT_TESTID));
      
      expect(submitted).toEqual({
        [NAME]: '30',
      });
    });
    
    it('supports step="any" (uses step=1 on ArrowRight)', async () => {
      const r = render(<SliderTest defaultValue={DEFAULT_VALUE} step='any' />);
      
      const thumb = getThumb(r);
      thumb.focus();
      
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(getInput(r)).toHaveValue(String(DEFAULT_VALUE + 1));
    });
    
    it('clamps at max on ArrowRight when already at max', async () => {
      const STEP = 10;
      const r = render(<SliderTest defaultValue={MAX} step={STEP} />);
      
      const thumb = getThumb(r);
      thumb.focus();
      
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(getInput(r)).toHaveValue(String(MAX));
    });
    
    it('clamps at min on ArrowLeft when already at min', async () => {
      const r = render(<SliderTest min={MIN} defaultValue={MIN} />);
      
      const thumb = getThumb(r);
      thumb.focus();
      
      await userEvent.keyboard('{ArrowLeft}');
      await expect.element(getInput(r)).toHaveValue(String(MIN));
    });
    
    it('uses computed defaultValue when defaultValue is not provided', async () => {
      const r = render(<SliderTest />);
      
      const expected = String(MIN + (MAX - MIN) / 2);
      await expect.element(getInput(r)).toHaveValue(expected);
    });
    
    it('uses min as computed defaultValue when max < min', async () => {
      const r = render(<SliderTest min={10} max={0} />);
      
      await expect.element(getInput(r)).toHaveValue('10');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SliderTest defaultValue={DEFAULT_VALUE} />);
      });
      
      it('exposes slider role', async () => {
        await expect.element(getThumb(r)).toHaveRole('slider');
      });
    });
    
    describe('keyboard', () => {
      it('ArrowRight increments by step', async () => {
        const STEP = 10;
        const r = render(<SliderTest defaultValue={DEFAULT_VALUE} step={STEP} />);
        
        const thumb = getThumb(r);
        thumb.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getInput(r)).toHaveValue(String(DEFAULT_VALUE + STEP));
      });
      
      it('ArrowLeft decrements by step', async () => {
        const STEP = 10;
        const r = render(<SliderTest defaultValue={DEFAULT_VALUE} step={STEP} />);
        
        const thumb = getThumb(r);
        thumb.focus();
        
        await userEvent.keyboard('{ArrowLeft}');
        await expect.element(getInput(r)).toHaveValue(String(DEFAULT_VALUE - STEP));
      });
      
      it('Home sets to min', async () => {
        const r = render(<SliderTest defaultValue={DEFAULT_VALUE} />);
        
        const thumb = getThumb(r);
        thumb.focus();
        
        await userEvent.keyboard('{Home}');
        await expect.element(getInput(r)).toHaveValue(String(MIN));
      });
      
      it('End sets to max', async () => {
        const r = render(<SliderTest defaultValue={DEFAULT_VALUE} />);
        
        const thumb = getThumb(r);
        thumb.focus();
        
        await userEvent.keyboard('{End}');
        await expect.element(getInput(r)).toHaveValue(String(MAX));
      });
    });
  });
});