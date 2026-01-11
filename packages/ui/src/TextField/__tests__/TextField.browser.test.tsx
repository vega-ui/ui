import { ComponentProps, createRef, FC, ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { TextField } from '../TextField';
import { TextFieldInput } from '../components/TextFieldInput';
import { Icon } from '../../Icon';

afterEach(cleanup);

const TESTID_FIELD = 'field';
const TESTID_INPUT = 'input';
const TESTID_START = 'start';
const TESTID_END = 'end';

const PLACEHOLDER = 'Type something…';
const VALUE = 'Hello';
const FIELD_CLASS = 'field-class';
const INPUT_CLASS = 'input-class';

const Heart = () => <svg data-testid='heart' aria-hidden='true' />;

type TextFieldTestProps = Partial<ComponentProps<typeof TextField>> & {
  inputProps?: Partial<ComponentProps<typeof TextFieldInput>>
  start?: ReactNode
  end?: ReactNode
};

const TextFieldTest: FC<TextFieldTestProps> = ({ inputProps, start, end, children, ...props }) => {
  return (
    <TextField data-testid={TESTID_FIELD} {...props}>
      {start ? <div data-testid={TESTID_START}>{start}</div> : null}
      <TextFieldInput data-testid={TESTID_INPUT} placeholder={PLACEHOLDER} {...inputProps} />
      {end ? <div data-testid={TESTID_END}>{end}</div> : null}
      {children}
    </TextField>
  );
};

const getField = (r: RenderResult) => r.getByTestId(TESTID_FIELD) as HTMLDivElement;
const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;

const queryStart = (r: RenderResult) => r.queryByTestId(TESTID_START) as HTMLDivElement | null;
const queryEnd = (r: RenderResult) => r.queryByTestId(TESTID_END) as HTMLDivElement | null;

const getStart = (r: RenderResult) => r.getByTestId(TESTID_START) as HTMLDivElement;
const getEnd = (r: RenderResult) => r.getByTestId(TESTID_END) as HTMLDivElement;

describe('TextField', () => {
  describe('Critical User Paths', () => {
    describe('Rendering and defaults', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<TextFieldTest />);
      });
      
      it('renders wrapper and input', async () => {
        const field = getField(r);
        const input = getInput(r);
        
        await expect.element(field).toBeInTheDocument();
        await expect.element(input).toBeInTheDocument();
      });
      
      it('applies default size to wrapper and input', async () => {
        const field = getField(r);
        const input = getInput(r);
        
        await expect.element(field).toHaveAttribute('data-size', 'md');
        await expect.element(input).toHaveAttribute('data-size', 'md');
      });
      
      it('does not render start/end containers by default', async () => {
        await expect.element(queryStart(r)).not.toBeInTheDocument();
        await expect.element(queryEnd(r)).not.toBeInTheDocument();
      });
      
      it('forwards input placeholder', async () => {
        const input = getInput(r);
        await expect.element(input).toHaveAttribute('placeholder', PLACEHOLDER);
      });
      
      it('supports typing into the input', async () => {
        const input = getInput(r);
        
        await userEvent.type(input, VALUE);
        await expect.element(input).toHaveValue(VALUE);
      });
    });
    
    describe('Props mapping (size / error)', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<TextFieldTest />);
      });
      
      it('reflects size on wrapper and input', async () => {
        r.rerender(<TextFieldTest size='lg' />);
        
        const field = getField(r);
        const input = getInput(r);
        
        await expect.element(field).toHaveAttribute('data-size', 'lg');
        await expect.element(input).toHaveAttribute('data-size', 'lg');
      });
      
      it('reflects error=true on wrapper and input', async () => {
        r.rerender(<TextFieldTest error />);
        
        const field = getField(r);
        const input = getInput(r);
        
        await expect.element(field).toHaveAttribute('data-error', 'true');
        await expect.element(input).toHaveAttribute('data-error', 'true');
      });
      
      it('reflects error=false on wrapper and input', async () => {
        r.rerender(<TextFieldTest error={false} />);
        
        const field = getField(r);
        const input = getInput(r);
        
        await expect.element(field).toHaveAttribute('data-error', 'false');
        await expect.element(input).toHaveAttribute('data-error', 'false');
      });
      
      it('supports toggling error via rerender', async () => {
        r.rerender(<TextFieldTest error />);
        await expect.element(getInput(r)).toHaveAttribute('data-error', 'true');
        
        r.rerender(<TextFieldTest error={false} />);
        await expect.element(getInput(r)).toHaveAttribute('data-error', 'false');
      });
    });
    
    describe('Composition (custom content)', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<TextFieldTest />);
      });
      
      it('renders custom start content', async () => {
        r.rerender(
          <TextFieldTest
            start={
              <button type='button' data-testid='start-btn'>
                Start
              </button>
            }
          />
        );
        
        const start = getStart(r);
        const btn = r.getByTestId('start-btn') as HTMLButtonElement;
        
        await expect.element(start).toBeInTheDocument();
        await expect.element(btn).toBeInTheDocument();
        await expect.element(btn).toHaveRole('button');
      });
      
      it('renders custom end content', async () => {
        r.rerender(
          <TextFieldTest
            end={
              <button type='button' data-testid='end-btn'>
                End
              </button>
            }
          />
        );
        
        const end = getEnd(r);
        const btn = r.getByTestId('end-btn') as HTMLButtonElement;
        
        await expect.element(end).toBeInTheDocument();
        await expect.element(btn).toBeInTheDocument();
        await expect.element(btn).toHaveRole('button');
      });
      
      it('renders icon content at start', async () => {
        r.rerender(
          <TextFieldTest
            start={
              <Icon>
                <Heart />
              </Icon>
            }
          />
        );
        
        const start = getStart(r);
        const heart = r.getByTestId('heart');
        
        await expect.element(start).toBeInTheDocument();
        await expect.element(heart).toBeInTheDocument();
      });
      
      it('renders icon content at end', async () => {
        r.rerender(
          <TextFieldTest
            end={
              <Icon>
                <Heart />
              </Icon>
            }
          />
        );
        
        const end = getEnd(r);
        const heart = r.getByTestId('heart');
        
        await expect.element(end).toBeInTheDocument();
        await expect.element(heart).toBeInTheDocument();
      });
      
      it('keeps input usable when clicking start button', async () => {
        const onStartClick = vi.fn();
        
        r.rerender(
          <TextFieldTest
            start={
              <button type='button' data-testid='start-btn' onClick={onStartClick}>
                Start
              </button>
            }
          />
        );
        
        const input = getInput(r);
        const startBtn = r.getByTestId('start-btn') as HTMLButtonElement;
        
        await userEvent.click(startBtn);
        expect(onStartClick).toHaveBeenCalledTimes(1);
        
        await userEvent.click(input);
        await userEvent.type(input, VALUE);
        await expect.element(input).toHaveValue(VALUE);
      });
      
      it('keeps input usable when clicking end button', async () => {
        const onEndClick = vi.fn();
        
        r.rerender(
          <TextFieldTest
            end={
              <button type='button' data-testid='end-btn' onClick={onEndClick}>
                End
              </button>
            }
          />
        );
        
        const input = getInput(r);
        const endBtn = r.getByTestId('end-btn') as HTMLButtonElement;
        
        await userEvent.click(endBtn);
        expect(onEndClick).toHaveBeenCalledTimes(1);
        
        await userEvent.click(input);
        await userEvent.type(input, VALUE);
        await expect.element(input).toHaveValue(VALUE);
      });
    });
    
    describe('Forwarding (className / wrapper attrs / input attrs / ref)', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<TextFieldTest />);
      });
      
      it('merges className on wrapper', async () => {
        r.rerender(<TextFieldTest className={FIELD_CLASS} />);
        
        const field = getField(r);
        await expect.element(field).toHaveClass(FIELD_CLASS);
      });
      
      it('merges className on input', async () => {
        r.rerender(<TextFieldTest inputProps={{ className: INPUT_CLASS }} />);
        
        const input = getInput(r);
        await expect.element(input).toHaveClass(INPUT_CLASS);
      });
      
      it('forwards wrapper attributes', async () => {
        r.rerender(<TextFieldTest id='field-id' aria-label='Field' />);
        
        const field = getField(r);
        await expect.element(field).toHaveAttribute('id', 'field-id');
        await expect.element(field).toHaveAttribute('aria-label', 'Field');
      });
      
      it('forwards native input attributes', async () => {
        r.rerender(<TextFieldTest inputProps={{ name: 'name', autoComplete: 'off' }} />);
        
        const input = getInput(r);
        await expect.element(input).toHaveAttribute('name', 'name');
        await expect.element(input).toHaveAttribute('autocomplete', 'off');
      });
      
      it('forwards input ref to native element', async () => {
        const inputRef = createRef<HTMLInputElement>();
        
        r.rerender(<TextFieldTest inputProps={{ ref: inputRef }} />);
        
        const input = getInput(r);
        expect(inputRef.current).toBe(input);
      });
      
      it('supports input events (onChange)', async () => {
        const onChange = vi.fn();
        
        r.rerender(<TextFieldTest inputProps={{ onChange }} />);
        
        const input = getInput(r);
        await userEvent.type(input, 'a');
        
        expect(onChange).toHaveBeenCalled();
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('does not set data-error when error is undefined', async () => {
      const r = render(<TextFieldTest />);
      await expect.element(getField(r)).not.toHaveAttribute('data-error');
      await expect.element(getInput(r)).not.toHaveAttribute('data-error');
    });
    
    it('supports disabled input', async () => {
      const r = render(<TextFieldTest inputProps={{ disabled: true }} />);
      await expect.element(getInput(r)).toBeDisabled();
    });
    
    it('keeps controlled value from props', async () => {
      const r = render(<TextFieldTest inputProps={{ value: 'a', readOnly: true }} />);
      await expect.element(getInput(r)).toHaveValue('a');
      
      r.rerender(<TextFieldTest inputProps={{ value: 'b', readOnly: true }} />);
      await expect.element(getInput(r)).toHaveValue('b');
    });
    
    it('supports empty start/end content removal via rerender', async () => {
      const r = render(<TextFieldTest start={<span>Start</span>} end={<span>End</span>} />);
      await expect.element(queryStart(r)).toBeInTheDocument();
      await expect.element(queryEnd(r)).toBeInTheDocument();
      
      r.rerender(<TextFieldTest />);
      await expect.element(queryStart(r)).not.toBeInTheDocument();
      await expect.element(queryEnd(r)).not.toBeInTheDocument();
    });
    
    it('does not break when inputProps are empty object', async () => {
      const r = render(<TextFieldTest inputProps={{}} />);
      await expect.element(getInput(r)).toBeInTheDocument();
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<TextFieldTest />);
      });
      
      it('input has textbox role', async () => {
        await expect.element(getInput(r)).toHaveRole('textbox');
      });
    });
    
    describe('keyboard', () => {
      it('allows typing after tab focus', async () => {
        const r = render(
          <div>
            <button data-testid='before'>Before</button>
            <TextFieldTest />
          </div>
        );
        
        const before = r.getByTestId('before') as HTMLButtonElement;
        const input = getInput(r);
        
        before.focus();
        await userEvent.tab();
        
        await expect.element(input).toHaveFocus();
        await userEvent.type(input, VALUE);
        await expect.element(input).toHaveValue(VALUE);
      });
    });
    
    describe('focus', () => {
      it('supports programmatic focus on the input', async () => {
        const r = render(<TextFieldTest />);
        const input = getInput(r);
        
        input.focus();
        await expect.element(input).toHaveFocus();
      });
      
      it('does not move focus when clicking wrapper (focus stays on input if already focused)', async () => {
        const r = render(<TextFieldTest />);
        const field = getField(r);
        const input = getInput(r);
        
        input.focus();
        await expect.element(input).toHaveFocus();
        
        fireEvent.mouseDown(field);
        fireEvent.click(field);
        
        await expect.element(input).toHaveFocus();
      });
    });
  });
});