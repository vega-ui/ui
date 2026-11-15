import { CSSProperties, FC, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Slider, SliderProps } from '../Slider';
import { SliderRange, SliderThumb, SliderThumbIndicator, SliderThumbInput, SliderTrack } from '../components';

afterEach(cleanup);

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
  });

  describe('Edge Cases', () => {
    describe('thumbs', () => {
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
    it('fires input and change on the thumb like the native input for a key it moves', async () => {
      const onInput = vi.fn();
      const onChange = vi.fn();
      const r = render(<SliderTest defaultValue={[50]} />);
      const [input] = getInputs(r);
      input.addEventListener('input', onInput);
      input.addEventListener('change', onChange);

      input.focus();
      await userEvent.keyboard('{PageUp}');
      await flush();

      expect(input.value).toBe('60');
      expect(onInput).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledOnce();
    });
  });
});
