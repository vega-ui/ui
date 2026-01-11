import { ComponentProps, FC, FormEvent, PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Switch } from '../Switch';
import { SwitchHiddenInput, SwitchIndicator } from '../components';

afterEach(cleanup);

const TESTID_SWITCH = 'switch';
const TESTID_INPUT = 'input';
const TESTID_INDICATOR = 'indicator';

const FORM_TESTID = 'form';
const SUBMIT_TESTID = 'submit';

const NAME = 'newsletter';
const VALUE = 'yes';

const SwitchTest: FC<
  ComponentProps<typeof Switch> & {
  inputProps?: ComponentProps<typeof SwitchHiddenInput>;
}
> = ({ inputProps, ...props }) => {
  return (
    <Switch data-testid={TESTID_SWITCH} {...props}>
      <SwitchHiddenInput data-testid={TESTID_INPUT} {...inputProps} />
      <SwitchIndicator data-testid={TESTID_INDICATOR} />
    </Switch>
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

const getSwitch = (r: RenderResult) => r.getByTestId(TESTID_SWITCH) as HTMLLabelElement;
const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;
const getIndicator = (r: RenderResult) => r.getByTestId(TESTID_INDICATOR) as HTMLDivElement;

const getSubmit = (r: RenderResult) => r.getByTestId(SUBMIT_TESTID) as HTMLButtonElement;

describe('Switch', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<SwitchTest inputProps={{ name: NAME, value: VALUE }} />);
    });
    
    it('renders hidden input', async () => {
      await expect.element(getInput(r)).toBeInTheDocument();
    });
    
    it('renders indicator', async () => {
      await expect.element(getIndicator(r)).toBeInTheDocument();
    });
    
    it('is unchecked by default', async () => {
      await expect.element(getInput(r)).not.toBeChecked();
    });
    
    it('becomes checked after click on root', async () => {
      await userEvent.click(getSwitch(r));
      await expect.element(getInput(r)).toBeChecked();
    });
    
    it('becomes unchecked after second click on root', async () => {
      await userEvent.click(getSwitch(r));
      await userEvent.click(getSwitch(r));
      await expect.element(getInput(r)).not.toBeChecked();
    });
    
    it('calls onChange when toggled', async () => {
      const onChange = vi.fn();
      
      r.rerender(<SwitchTest inputProps={{ name: NAME, value: VALUE, onChange }} />);
      
      await userEvent.click(getSwitch(r));
      
      expect(onChange).toHaveBeenCalledTimes(1);
    });
    
    it('passes size to hidden input as data-size via context', async () => {
      r.rerender(<SwitchTest size='lg' inputProps={{ name: NAME, value: VALUE }} />);
      
      await expect.element(getInput(r)).toHaveAttribute('data-size', 'lg');
    });
  });
  
  describe('Edge Cases', () => {
    it('submits no value when unchecked', async () => {
      let submitted: Record<string, string> | null = null;
      
      const r = render(
        <FormTest onSubmit={(d) => (submitted = d)}>
          <SwitchTest inputProps={{ name: NAME, value: VALUE }} />
        </FormTest>
      );
      
      await userEvent.click(getSubmit(r));
      expect(submitted).toEqual({});
    });
    
    it('submits value when checked', async () => {
      let submitted: Record<string, string> | null = null;
      
      const r = render(
        <FormTest onSubmit={(d) => (submitted = d)}>
          <SwitchTest inputProps={{ name: NAME, value: VALUE }} />
        </FormTest>
      );
      
      await userEvent.click(getSwitch(r));
      await userEvent.click(getSubmit(r));
      
      expect(submitted).toEqual({
        [NAME]: VALUE,
      });
    });
    
    it('submits "on" when checked and value is not provided', async () => {
      let submitted: Record<string, string> | null = null;
      
      const r = render(
        <FormTest onSubmit={(d) => (submitted = d)}>
          <SwitchTest inputProps={{ name: NAME, defaultChecked: true }} />
        </FormTest>
      );
      
      await userEvent.click(getSubmit(r));
      
      expect(submitted).toEqual({
        [NAME]: 'on',
      });
    });
    
    it('does not submit value when disabled (native checkbox behavior)', async () => {
      let submitted: Record<string, string> | null = null;
      
      const r = render(
        <FormTest onSubmit={(d) => (submitted = d)}>
          <SwitchTest inputProps={{ name: NAME, value: VALUE, defaultChecked: true, disabled: true }} />
        </FormTest>
      );
      
      await userEvent.click(getSubmit(r));
      
      expect(submitted).toEqual({});
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SwitchTest inputProps={{ name: NAME, value: VALUE }} />);
      });
      
      it('exposes switch role', async () => {
        await expect.element(getInput(r)).toHaveRole('switch');
      });
      
      it('exposes type checkbox', async () => {
        await expect.element(getInput(r)).toHaveAttribute('type', 'checkbox');
      });
    });
    
    describe('keyboard', () => {
      it('toggles with Space when input is focused', async () => {
        const r = render(<SwitchTest inputProps={{ name: NAME, value: VALUE }} />);
        const input = getInput(r);
        
        input.focus();
        await expect.element(input).toHaveFocus();
        await expect.element(input).not.toBeChecked();
        
        await userEvent.keyboard(' ');
        await expect.element(input).toBeChecked();
      });
    });
  });
});