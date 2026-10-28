import { CSSProperties, FC, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Slider, SliderProps } from '../Slider';
import { SliderRange, SliderThumb, SliderThumbIndicator, SliderThumbInput, SliderTrack } from '../components';
import '../../../../tokens/src/index.css';

afterEach(cleanup);

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const TESTID_ROOT = 'slider';
const TESTID_RANGE = 'range';
const TESTID_THUMB = 'thumb';

const NAME = 'price';

const SIZE_STYLE = { '--slider-size': '8px', width: '200px' } as CSSProperties;
const VERTICAL_STYLE = { '--slider-size': '8px', height: '200px' } as CSSProperties;

type SliderTestProps = SliderProps<number[]> & { thumbs?: number };

const SliderTest: FC<SliderTestProps> = ({ thumbs, ...props }) => (
  <Slider
    data-testid={TESTID_ROOT}
    style={props.orientation === 'vertical' ? VERTICAL_STYLE : SIZE_STYLE}
    {...props}
  >
    <SliderTrack>
      <SliderRange data-testid={TESTID_RANGE} />
    </SliderTrack>
    {Array.from({ length: thumbs ?? props.value?.length ?? props.defaultValue?.length ?? 1 }, (_, index) => (
      <SliderThumb key={index} index={index}>
        <SliderThumbInput aria-label={`thumb ${index}`} />
        <SliderThumbIndicator className={TESTID_THUMB} />
      </SliderThumb>
    ))}
  </Slider>
);

const ControlledSliderTest: FC<SliderTestProps & { initialValue: number[] }> = ({ initialValue, onChangeValue, ...props }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <SliderTest
      {...props}
      value={value}
      onChangeValue={(next) => {
        setValue(next);
        onChangeValue?.(next);
      }}
    />
  );
};

const getRoot = (r: RenderResult) => r.getByTestId(TESTID_ROOT);
const getInputs = (r: RenderResult) => r.getAllByRole('slider') as HTMLInputElement[];
const getThumbs = (r: RenderResult) => Array.from(getRoot(r).querySelectorAll<HTMLElement>(`.${TESTID_THUMB}`));

const getVar = (element: HTMLElement, name: string) => Number(getComputedStyle(element).getPropertyValue(name));
const getThumbPosition = (input: HTMLInputElement) => getVar(input, '--slider-thumb-position');

const flush = () => new Promise((resolve) => setTimeout(resolve));

const clickAt = async (r: RenderResult, fraction: number) => {
  const rect = getRoot(r).getBoundingClientRect();
  await userEvent.click(getRoot(r), { position: { x: rect.width * fraction, y: rect.height / 2 } });
  await flush();
};

const getCenter = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
};

const submit = (form: HTMLFormElement) => new FormData(form);

describe('Slider', () => {
  describe('Critical User Paths', () => {
    describe('uncontrolled', () => {
      it('renders a native range input with min, max and step', () => {
        const r = render(<SliderTest min={10} max={20} step={2} />);
        const [input] = getInputs(r);

        expect(input.type).toBe('range');
        expect(input.min).toBe('10');
        expect(input.max).toBe('20');
        expect(input.step).toBe('2');
      });

      it('starts in the middle without a default value, like the native input', () => {
        const r = render(<SliderTest />);
        const [input] = getInputs(r);

        expect(input.value).toBe('50');
        expect(getThumbPosition(input)).toBe(0.5);
      });

      it('changes with the keyboard and reports all values', async () => {
        const onChangeValue = vi.fn();
        const r = render(<SliderTest defaultValue={[20, 80]} onChangeValue={onChangeValue} />);
        const [first] = getInputs(r);

        first.focus();
        await userEvent.keyboard('{ArrowRight}');
        await flush();

        expect(first.value).toBe('21');
        expect(onChangeValue).toHaveBeenLastCalledWith([21, 80]);
        expect(getThumbPosition(first)).toBe(0.21);
      });

      it('moves the thumb to a click on the track', async () => {
        const onChangeValue = vi.fn();
        const r = render(<SliderTest defaultValue={[20]} onChangeValue={onChangeValue} />);
        const [input] = getInputs(r);

        await clickAt(r, 0.75);

        expect(input.valueAsNumber).toBeCloseTo(75, -1);
        expect(onChangeValue).toHaveBeenLastCalledWith([input.valueAsNumber]);
        expect(getThumbPosition(input)).toBe(input.valueAsNumber / 100);
      });

      it('takes a number for a single thumb and reports a number', async () => {
        const onChangeValue = vi.fn();
        const r = render(
          <Slider defaultValue={20} onChangeValue={onChangeValue} style={SIZE_STYLE}>
            <SliderThumb><SliderThumbInput /></SliderThumb>
          </Slider>
        );
        const [input] = getInputs(r);

        input.focus();
        await userEvent.keyboard('{ArrowRight}');
        await flush();

        expect(input.value).toBe('21');
        expect(onChangeValue).toHaveBeenLastCalledWith(21);
      });

      it('reports a number without value and defaultValue', async () => {
        const onChangeValue = vi.fn();
        const r = render(
          <Slider onChangeValue={onChangeValue} style={SIZE_STYLE}>
            <SliderThumb><SliderThumbInput /></SliderThumb>
          </Slider>
        );
        const [input] = getInputs(r);

        input.focus();
        await userEvent.keyboard('{ArrowLeft}');
        await flush();

        expect(onChangeValue).toHaveBeenLastCalledWith(49);
      });

      it('fills the range between the first and the last thumbs', () => {
        const r = render(<SliderTest defaultValue={[20, 80]} />);
        const root = getRoot(r);

        expect(getVar(root, '--slider-range-start')).toBe(0.2);
        expect(getVar(root, '--slider-range-end')).toBe(0.8);
      });

      it('fills the range from min to a single thumb', () => {
        const r = render(<SliderTest defaultValue={[30]} />);
        const root = getRoot(r);

        expect(getVar(root, '--slider-range-start')).toBe(0);
        expect(getVar(root, '--slider-range-end')).toBe(0.3);
      });
    });

    describe('form', () => {
      it('submits every thumb under the root name', () => {
        const r = render(
          <form data-testid='form'>
            <SliderTest name={NAME} defaultValue={[20, 80]} />
          </form>
        );

        expect(submit(r.getByTestId('form') as HTMLFormElement).getAll(NAME)).toEqual(['20', '80']);
      });

      it('submits a thumb under its own name', () => {
        const r = render(
          <form data-testid='form'>
            <Slider name={NAME} defaultValue={[20, 80]} style={SIZE_STYLE}>
              <SliderThumb index={0}><SliderThumbInput name='from' /></SliderThumb>
              <SliderThumb index={1}><SliderThumbInput name='to' /></SliderThumb>
            </Slider>
          </form>
        );
        const data = submit(r.getByTestId('form') as HTMLFormElement);

        expect(data.get('from')).toBe('20');
        expect(data.get('to')).toBe('80');
        expect(data.has(NAME)).toBe(false);
      });

      it('restores a number default value on reset', async () => {
        const r = render(
          <form data-testid='form'>
            <Slider defaultValue={20} style={SIZE_STYLE}>
              <SliderThumb><SliderThumbInput /></SliderThumb>
            </Slider>
          </form>
        );
        const [input] = getInputs(r);

        input.focus();
        await userEvent.keyboard('{ArrowRight}');
        (r.getByTestId('form') as HTMLFormElement).reset();

        await expect.poll(() => input.value).toBe('20');
      });

      it('restores the default value on reset of a form linked by the form attribute', async () => {
        const r = render(
          <>
            <form id='linked' data-testid='form' />
            <Slider defaultValue={20} style={SIZE_STYLE}>
              <SliderThumb><SliderThumbInput form='linked' /></SliderThumb>
            </Slider>
          </>
        );
        const [input] = getInputs(r);

        input.focus();
        await userEvent.keyboard('{ArrowRight}');
        (r.getByTestId('form') as HTMLFormElement).reset();

        await expect.poll(() => input.value).toBe('20');
      });

      it('restores the default values and positions on reset', async () => {
        const r = render(
          <form data-testid='form'>
            <SliderTest defaultValue={[20, 80]} />
          </form>
        );
        const [first, second] = getInputs(r);

        first.focus();
        await userEvent.keyboard('{ArrowRight}{ArrowRight}');
        second.focus();
        await userEvent.keyboard('{ArrowLeft}');
        await flush();

        (r.getByTestId('form') as HTMLFormElement).reset();

        await expect.poll(() => first.value).toBe('20');
        expect(second.value).toBe('80');
        expect(getThumbPosition(first)).toBe(0.2);
        expect(getThumbPosition(second)).toBe(0.8);
        expect(getVar(getRoot(r), '--slider-range-start')).toBe(0.2);
        expect(getVar(getRoot(r), '--slider-range-end')).toBe(0.8);
      });

      it('keeps its value on the reset of another form', async () => {
        const r = render(
          <>
            <form>
              <SliderTest defaultValue={[20]} />
            </form>
            <form data-testid='form' />
          </>
        );
        const [input] = getInputs(r);

        input.focus();
        await userEvent.keyboard('{ArrowRight}');
        (r.getByTestId('form') as HTMLFormElement).reset();
        await flush();

        expect(input.value).toBe('21');
      });

      it('keeps its value when the form reset is canceled', async () => {
        const r = render(
          <form data-testid='form' onReset={(event) => event.preventDefault()}>
            <SliderTest defaultValue={[20]} />
          </form>
        );
        const [input] = getInputs(r);

        input.focus();
        await userEvent.keyboard('{ArrowRight}');
        (r.getByTestId('form') as HTMLFormElement).reset();
        await flush();

        expect(input.value).toBe('21');
      });

      it('restores the default values on a reset button click', async () => {
        const r = render(
          <form>
            <SliderTest defaultValue={[20, 80]} />
            <button type='reset'>Reset</button>
          </form>
        );
        const [first, second] = getInputs(r);

        first.focus();
        await userEvent.keyboard('{ArrowRight}');
        second.focus();
        await userEvent.keyboard('{ArrowLeft}');
        await userEvent.click(r.getByRole('button'));

        await expect.poll(() => first.value).toBe('20');
        expect(second.value).toBe('80');
        expect(getThumbPosition(first)).toBe(0.2);
        expect(getThumbPosition(second)).toBe(0.8);
      });
    });

    describe('controlled', () => {
      it('keeps the value when the parent does not accept the change', async () => {
        const onChangeValue = vi.fn();
        const r = render(<SliderTest value={[30]} onChangeValue={onChangeValue} />);
        const [input] = getInputs(r);

        input.focus();
        await userEvent.keyboard('{ArrowRight}');
        await flush();

        expect(onChangeValue).toHaveBeenLastCalledWith([31]);
        expect(input.value).toBe('30');
        expect(getThumbPosition(input)).toBe(0.3);
      });

      it('applies the change the parent accepts', async () => {
        const onChangeValue = vi.fn();
        const r = render(<ControlledSliderTest initialValue={[30, 60]} onChangeValue={onChangeValue} />);
        const [, second] = getInputs(r);

        second.focus();
        await userEvent.keyboard('{ArrowRight}');
        await flush();

        expect(onChangeValue).toHaveBeenLastCalledWith([30, 61]);
        expect(second.value).toBe('61');
        expect(getThumbPosition(second)).toBe(0.61);
        expect(getVar(getRoot(r), '--slider-range-end')).toBe(0.61);
      });

      it('controls a single thumb with a number', async () => {
        const Controlled = () => {
          const [value, setValue] = useState(30);

          return (
            <Slider value={value} onChangeValue={setValue} style={SIZE_STYLE}>
              <SliderThumb><SliderThumbInput /></SliderThumb>
            </Slider>
          );
        };
        const r = render(<Controlled />);
        const [input] = getInputs(r);

        input.focus();
        await userEvent.keyboard('{ArrowRight}');
        await flush();

        expect(input.value).toBe('31');
        expect(getThumbPosition(input)).toBe(0.31);
      });

      it('follows a value changed by the parent', () => {
        const onChangeValue = vi.fn();
        const r = render(<SliderTest value={[30, 60]} onChangeValue={onChangeValue} />);
        r.rerender(<SliderTest value={[10, 90]} onChangeValue={onChangeValue} />);
        const [first, second] = getInputs(r);

        expect(first.value).toBe('10');
        expect(second.value).toBe('90');
        expect(getThumbPosition(first)).toBe(0.1);
        expect(getVar(getRoot(r), '--slider-range-start')).toBe(0.1);
        expect(getVar(getRoot(r), '--slider-range-end')).toBe(0.9);
        expect(onChangeValue).not.toHaveBeenCalled();
      });

      it('ignores a form reset', async () => {
        const r = render(
          <form data-testid='form'>
            <SliderTest value={[30]} />
          </form>
        );

        (r.getByTestId('form') as HTMLFormElement).reset();
        await flush();

        expect(getInputs(r)[0].value).toBe('30');
      });
    });
  });

  describe('Error handling', () => {
    it('ignores a track click inside a disabled fieldset', async () => {
      const onChangeValue = vi.fn();
      const r = render(
        <fieldset disabled>
          <SliderTest defaultValue={[20]} onChangeValue={onChangeValue} />
        </fieldset>
      );

      await clickAt(r, 0.8);

      expect(getInputs(r)[0].value).toBe('20');
      expect(onChangeValue).not.toHaveBeenCalled();
    });

    it('looks disabled inside a disabled fieldset', () => {
      const r = render(
        <fieldset disabled style={{ '--disable-label-text-color': 'gray' } as CSSProperties}>
          <SliderTest defaultValue={[20]} />
        </fieldset>
      );

      expect(getComputedStyle(getRoot(r)).getPropertyValue('--slider-range-color')).toBe('gray');
    });

    it('looks enabled when a thumb overrides the disabled root', () => {
      const r = render(
        <div style={{ '--disable-label-text-color': 'gray' } as CSSProperties}>
          <Slider disabled data-testid={TESTID_ROOT} style={SIZE_STYLE}>
            <SliderThumb><SliderThumbInput aria-label='value' disabled={false} /></SliderThumb>
          </Slider>
        </div>
      );

      expect(getInputs(r)[0].disabled).toBe(false);
      expect(getComputedStyle(getRoot(r)).getPropertyValue('--slider-range-color')).not.toBe('gray');
    });

    it('ignores a disabled slider', async () => {
      const onChangeValue = vi.fn();
      const r = render(<SliderTest disabled defaultValue={[20, 80]} onChangeValue={onChangeValue} />);
      const [first, second] = getInputs(r);

      expect(first.disabled).toBe(true);
      expect(second.disabled).toBe(true);
      expect(getRoot(r).dataset.disabled).toBe('true');

      await clickAt(r, 0.5);
      await flush();

      expect(first.value).toBe('20');
      expect(second.value).toBe('80');
      expect(onChangeValue).not.toHaveBeenCalled();
    });

    it('keeps a disabled thumb in place on a click in its half of the track', async () => {
      const r = render(
        <Slider defaultValue={[20, 80]} style={SIZE_STYLE} data-testid={TESTID_ROOT}>
          <SliderTrack />
          <SliderThumb index={0}><SliderThumbInput /></SliderThumb>
          <SliderThumb index={1}><SliderThumbInput disabled /></SliderThumb>
        </Slider>
      );
      const [first, second] = getInputs(r);

      await clickAt(r, 0.75);

      expect(first.value).toBe('20');
      expect(second.value).toBe('80');
    });

    it('keeps a thumb on the track with a default value out of range', () => {
      const r = render(<SliderTest defaultValue={[150]} />);
      const [input] = getInputs(r);

      expect(input.value).toBe('100');
      expect(getThumbPosition(input)).toBe(1);
    });

    it('puts the thumbs at the start when max is below min', () => {
      const r = render(<SliderTest min={10} max={0} />);
      const [input] = getInputs(r);

      expect(input.value).toBe('10');
      expect(getThumbPosition(input)).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it('grows with every size', () => {
      const r = render(
        <>
          {SIZES.map((size) => (
            <Slider key={size} size={size} style={{ width: '200px' }}>
              <SliderTrack data-testid={size} />
            </Slider>
          ))}
        </>
      );
      const sizes = SIZES.map((size) => r.getByTestId(size).getBoundingClientRect().height);

      expect(new Set(sizes).size).toBe(SIZES.length);
      expect(sizes).toEqual([...sizes].sort((a, b) => a - b));
    });

    describe('thumbs', () => {
      it('snaps values off the step grid like the native input', () => {
        const r = render(
          <form data-testid='form'>
            <SliderTest name={NAME} defaultValue={[2.5, 7]} max={10} />
          </form>
        );
        const [first, second] = getInputs(r);

        expect(first.value).toBe('3');
        expect(second.value).toBe('7');
        expect(getThumbPosition(first)).toBe(0.3);
        expect(submit(r.getByTestId('form') as HTMLFormElement).getAll(NAME)).toEqual(['3', '7']);
      });

      it('keeps a value on the step grid next to a neighbour off it', () => {
        const r = render(<SliderTest defaultValue={[15, 50]} step={10} />);
        const [first, second] = getInputs(r);

        expect(first.value).toBe('20');
        expect(second.value).toBe('50');
      });

      it('limits each thumb natively by its neighbours', () => {
        const r = render(<SliderTest defaultValue={[20, 50, 80]} />);
        const [first, second, third] = getInputs(r);

        expect([first.min, first.max]).toEqual(['0', '50']);
        expect([second.min, second.max]).toEqual(['20', '80']);
        expect([third.min, third.max]).toEqual(['50', '100']);
      });

      it('does not let a thumb pass its neighbour', async () => {
        const onChangeValue = vi.fn();
        const r = render(<SliderTest defaultValue={[20, 80]} onChangeValue={onChangeValue} />);
        const [first, second] = getInputs(r);

        first.focus();
        await userEvent.keyboard('{End}');
        await flush();

        expect(onChangeValue).toHaveBeenLastCalledWith([80, 80]);

        second.focus();
        await userEvent.keyboard('{Home}');
        await flush();

        expect(first.value).toBe('80');
        expect(second.value).toBe('80');
      });

      it('keeps minStepsBetweenThumbs steps between the thumbs', async () => {
        const r = render(<SliderTest step={2} minStepsBetweenThumbs={5} defaultValue={[20, 80]} />);
        const [first, second] = getInputs(r);

        expect(first.max).toBe('70');

        first.focus();
        await userEvent.keyboard('{End}');
        await flush();

        expect(first.value).toBe('70');
        expect(second.value).toBe('80');
      });

      it('keeps the decimals of a fractional gap', async () => {
        const r = render(<SliderTest min={0} max={1} step={0.1} minStepsBetweenThumbs={1} defaultValue={[0.2, 0.3]} />);
        const [, second] = getInputs(r);

        expect(second.min).toBe('0.3');

        second.focus();
        await userEvent.keyboard('{Home}');
        await flush();

        expect(second.value).toBe('0.3');
      });

      it('sorts values given out of order', () => {
        const r = render(
          <form data-testid='form'>
            <SliderTest name={NAME} value={[80, 20]} />
          </form>
        );
        const [first, second] = getInputs(r);

        expect([first.value, second.value]).toEqual(['20', '80']);
        expect([getThumbPosition(first), getThumbPosition(second)]).toEqual([0.2, 0.8]);
        expect(submit(r.getByTestId('form') as HTMLFormElement).getAll(NAME)).toEqual(['20', '80']);
      });

      it('keeps every thumb between its neighbours with values out of order', () => {
        const r = render(<SliderTest defaultValue={[10, 90, 50, 60]} />);
        const inputs = getInputs(r);

        expect(inputs.map((input) => input.value)).toEqual(['10', '50', '60', '90']);
        expect(inputs.map(getThumbPosition)).toEqual([0.1, 0.5, 0.6, 0.9]);
      });

      it('lets thumbs meet with step any', async () => {
        const r = render(<SliderTest step='any' minStepsBetweenThumbs={5} defaultValue={[20, 30]} />);
        const [first] = getInputs(r);

        first.focus();
        await userEvent.keyboard('{End}');
        await flush();

        expect(first.value).toBe('30');
      });

      it('gives the pointer to every visual thumb', () => {
        const r = render(<SliderTest defaultValue={[10, 45, 90]} />);
        const inputs = getInputs(r);

        getThumbs(r).forEach((thumb, index) => {
          const { x, y } = getCenter(thumb);
          expect(document.elementFromPoint(x, y)).toBe(inputs[index]);
        });
      });

      it('splits stacked thumbs at max so the lower one can move back', () => {
        const r = render(<SliderTest defaultValue={[100, 100]} />);
        const [first, second] = getInputs(r);
        const { x, y } = getCenter(getThumbs(r)[0]);

        expect(document.elementFromPoint(x - 4, y)).toBe(first);
        expect(document.elementFromPoint(x + 4, y)).toBe(second);
      });

      it('splits stacked thumbs at min so the upper one can move forward', () => {
        const r = render(<div style={{ padding: 16 }}><SliderTest defaultValue={[0, 0]} /></div>);
        const [first, second] = getInputs(r);
        const { x, y } = getCenter(getThumbs(r)[0]);

        expect(document.elementFromPoint(x - 4, y)).toBe(first);
        expect(document.elementFromPoint(x + 4, y)).toBe(second);
      });

      it('moves a stacked thumb by the side of the click', async () => {
        const r = render(<SliderTest defaultValue={[50, 50]} />);
        const [first, second] = getInputs(r);

        await clickAt(r, 0.3);
        await clickAt(r, 0.8);

        expect(first.valueAsNumber).toBeCloseTo(30, -1);
        expect(second.valueAsNumber).toBeCloseTo(80, -1);
      });
    });

    describe('track click with several thumbs', () => {
      it('moves the thumb by its index when the thumbs are rendered in another order', async () => {
        const r = render(
          <Slider data-testid={TESTID_ROOT} defaultValue={[20, 80]} style={SIZE_STYLE}>
            <SliderThumb index={1}><SliderThumbInput aria-label='high' /></SliderThumb>
            <SliderThumb index={0}><SliderThumbInput aria-label='low' disabled /></SliderThumb>
          </Slider>
        );
        const high = r.getByLabelText('high') as HTMLInputElement;

        await clickAt(r, 0.9);

        expect(high.value).toBe('90');
      });

      it('moves the nearest thumb', async () => {
        const onChangeValue = vi.fn();
        const r = render(<SliderTest defaultValue={[20, 80]} onChangeValue={onChangeValue} />);
        const [first, second] = getInputs(r);

        await clickAt(r, 0.6);

        expect(second.value).toBe('60');
        expect(first.value).toBe('20');
        expect(onChangeValue).toHaveBeenLastCalledWith([20, 60]);

        await clickAt(r, 0.3);

        expect(first.value).toBe('30');
      });
    });

    describe('geometry', () => {
      it('lets the page scroll from the slider like the native input', () => {
        const r = render(<SliderTest />);

        expect(getComputedStyle(getRoot(r)).touchAction).toBe('auto');
      });

      it('leaves only horizontal scrolling and zoom to the page on a vertical slider', () => {
        const r = render(<SliderTest orientation='vertical' />);

        expect(getComputedStyle(getRoot(r)).touchAction).toBe('pan-x pinch-zoom');
      });

      it('centres the thumb on the track ends', () => {
        const r = render(<SliderTest defaultValue={[0, 100]} />);
        const rect = getRoot(r).getBoundingClientRect();
        const [first, second] = getThumbs(r);

        expect(getCenter(first).x).toBeCloseTo(rect.left, 0);
        expect(getCenter(second).x).toBeCloseTo(rect.right, 0);
        expect(getCenter(first).y).toBeCloseTo(rect.top + rect.height / 2, 0);
      });

      it('grows a vertical slider from the bottom', () => {
        const r = render(<SliderTest orientation='vertical' defaultValue={[0, 100]} />);
        const rect = getRoot(r).getBoundingClientRect();
        const [first, second] = getThumbs(r);
        const range = r.getByTestId(TESTID_RANGE).getBoundingClientRect();

        expect(getCenter(first).y).toBeCloseTo(rect.bottom, 0);
        expect(getCenter(second).y).toBeCloseTo(rect.top, 0);
        expect(range.height).toBeCloseTo(rect.height, 0);
      });

      it('grows a right-to-left slider from the right', async () => {
        const r = render(<div dir='rtl'><SliderTest defaultValue={[0, 30]} /></div>);
        const rect = getRoot(r).getBoundingClientRect();
        const [first, second] = getThumbs(r);

        expect(getCenter(first).x).toBeCloseTo(rect.right, 0);
        expect(getCenter(second).x).toBeCloseTo(rect.right - rect.width * 0.3, 0);

        await clickAt(r, 0.2);

        expect(getInputs(r)[1].value).toBe('80');
      });

      it('moves the native thumb with a click in a vertical slider', async () => {
        const r = render(<SliderTest orientation='vertical' defaultValue={[50]} />);
        const rect = getRoot(r).getBoundingClientRect();

        await userEvent.click(getRoot(r), { position: { x: rect.width / 2, y: rect.height * 0.25 } });
        await flush();

        expect(getInputs(r)[0].valueAsNumber).toBeCloseTo(75, -1);
      });

      it('gives the pointer to the visual thumbs in a vertical slider', () => {
        const r = render(<SliderTest orientation='vertical' defaultValue={[20, 70]} />);
        const inputs = getInputs(r);

        getThumbs(r).forEach((thumb, index) => {
          const { x, y } = getCenter(thumb);
          expect(document.elementFromPoint(x, y)).toBe(inputs[index]);
        });
      });
    });
  });

  describe('Accessibility', () => {
    it('exposes every thumb as a slider with its label', () => {
      const r = render(<SliderTest defaultValue={[20, 80]} />);

      expect(r.getByRole('slider', { name: 'thumb 0' })).toBeTruthy();
      expect(r.getByRole('slider', { name: 'thumb 1' })).toBeTruthy();
    });

    it('hides the visual thumb from assistive technologies', () => {
      const r = render(<SliderTest />);

      expect(getThumbs(r)[0].getAttribute('aria-hidden')).toBe('true');
    });

    it('sets aria-orientation from the root', () => {
      const r = render(<SliderTest orientation='vertical' />);

      expect(getInputs(r)[0].getAttribute('aria-orientation')).toBe('vertical');
    });

    it('keeps every thumb in the tab order', () => {
      const r = render(<SliderTest defaultValue={[20, 80]} />);

      expect(getInputs(r).map((input) => input.tabIndex)).toEqual([0, 0]);
    });

    it('increases a vertical slider with ArrowUp', async () => {
      const r = render(<SliderTest orientation='vertical' defaultValue={[50]} />);
      const [input] = getInputs(r);

      input.focus();
      await userEvent.keyboard('{ArrowUp}');

      expect(input.value).toBe('51');
    });

    it('moves by a tenth of the whole range on PageUp and PageDown', async () => {
      const r = render(<SliderTest defaultValue={[20, 80]} />);
      const [first, second] = getInputs(r);

      first.focus();
      await userEvent.keyboard('{PageUp}');
      second.focus();
      await userEvent.keyboard('{PageDown}');
      await flush();

      expect(first.value).toBe('30');
      expect(second.value).toBe('70');
    });

    it('increases a vertical slider with ArrowRight and decreases it with ArrowLeft', async () => {
      const r = render(<SliderTest orientation='vertical' defaultValue={[50]} />);
      const [input] = getInputs(r);

      input.focus();
      await userEvent.keyboard('{ArrowRight}');
      await flush();
      expect(input.value).toBe('51');

      await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
      await flush();
      expect(input.value).toBe('49');
    });

    it('supports Home and End natively', async () => {
      const r = render(<SliderTest defaultValue={[50]} />);
      const [input] = getInputs(r);

      input.focus();
      await userEvent.keyboard('{End}');
      expect(input.value).toBe('100');

      await userEvent.keyboard('{Home}');
      expect(input.value).toBe('0');
    });
  });
});
