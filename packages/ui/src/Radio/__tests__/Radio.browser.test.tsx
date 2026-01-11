import { ComponentProps, FC, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Radio } from '../Radio';

afterEach(cleanup);

const TESTID = 'radio';

const VARIANT = 'primary';
const SIZE = 'md';

const RadioTest: FC<ComponentProps<typeof Radio>> = (props) => {
  return <Radio data-testid={TESTID} style={{ width: 20, height: 20 }} {...props} />;
};

const getRadio = (r: RenderResult) => r.getByTestId(TESTID) as HTMLInputElement;

describe('Radio', () => {
  describe('Critical User Paths', () => {
    describe('uncontrolled', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<RadioTest />);
      });
      
      it('renders input[type=radio]', async () => {
        const radio = getRadio(r);
        await expect.element(radio).toBeInTheDocument();
        await expect.element(radio).toHaveAttribute('type', 'radio');
      });
      
      it('applies default data attributes', async () => {
        const radio = getRadio(r);
        await expect.element(radio).toHaveAttribute('data-variant', VARIANT);
        await expect.element(radio).toHaveAttribute('data-size', SIZE);
      });
      
      it('can be checked via user interaction', async () => {
        const radio = getRadio(r);
        await expect.element(radio).not.toBeChecked();
        
        await userEvent.click(radio);
        await expect.element(radio).toBeChecked();
      });
      
      it('respects disabled state', async () => {
        r.rerender(<RadioTest disabled />);
        const radio = getRadio(r);
        await expect.element(radio).toBeDisabled();
      });
    });
    
    describe('controlled', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        const Controlled = () => {
          const [checked, setChecked] = useState(false);
          
          return (
            <RadioTest checked={checked} onChange={(e) => setChecked(e.currentTarget.checked)} />
          );
        };
        
        r = render(<Controlled />);
      });
      
      it('renders input[type=radio]', async () => {
        const radio = getRadio(r);
        await expect.element(radio).toBeInTheDocument();
        await expect.element(radio).toHaveAttribute('type', 'radio');
      });
      
      it('applies default data attributes', async () => {
        const radio = getRadio(r);
        await expect.element(radio).toHaveAttribute('data-variant', VARIANT);
        await expect.element(radio).toHaveAttribute('data-size', SIZE);
      });
      
      it('can be checked via user interaction (controlled)', async () => {
        const radio = getRadio(r);
        await expect.element(radio).not.toBeChecked();
        
        await userEvent.click(radio);
        await expect.element(radio).toBeChecked();
      });
      
      it('respects disabled state', async () => {
        r.rerender(<RadioTest checked disabled onChange={vi.fn()} />);
        
        const radio = getRadio(r);
        await expect.element(radio).toBeDisabled();
        await expect.element(radio).toBeChecked();
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('supports defaultChecked for uncontrolled usage', async () => {
      const r = render(<RadioTest defaultChecked />);
      await expect.element(getRadio(r)).toBeChecked();
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      it('has radio role implicitly', async () => {
        const r = render(<RadioTest />);
        await expect.element(getRadio(r)).toHaveRole('radio');
      });
    });
    
    describe('keyboard', () => {
      it('can receive focus', async () => {
        const r = render(<RadioTest />);
        const radio = getRadio(r);
        
        radio.focus();
        await expect.element(radio).toHaveFocus();
      });
      
      it('can be checked via keyboard (Space)', async () => {
        const r = render(<RadioTest />);
        const radio = getRadio(r);
        
        radio.focus();
        await userEvent.keyboard('[Space]');
        await expect.element(radio).toBeChecked();
      });
    });
  });
});