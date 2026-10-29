import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { PasswordField } from '../PasswordField';
import {
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
} from '../components';

afterEach(cleanup);

const TESTID_ROOT = 'password-field';
const TESTID_INPUT = 'password-input';
const TESTID_TOGGLE = 'toggle';
const TESTID_SHOWN_ICON = 'shown-icon';
const TESTID_HIDDEN_ICON = 'hidden-icon';

const PLACEHOLDER = 'Password';
const TOGGLE_LABEL = 'Show password';

const CUSTOM_SHOWN = 'custom-shown';
const CUSTOM_HIDDEN = 'custom-hidden';

const PasswordFieldTest: FC<ComponentProps<typeof PasswordField>> = (props) => {
  const { children, ...rest } = props;
  
  return (
    <PasswordField data-testid={TESTID_ROOT} {...rest}>
      {children ?? (
        <>
          <PasswordFieldInput
            data-testid={TESTID_INPUT}
            placeholder={PLACEHOLDER}
            autoComplete='current-password'
          />
          
          <PasswordFieldToggleIconButton data-testid={TESTID_TOGGLE} aria-label={TOGGLE_LABEL}>
            <PasswordFieldShownIcon data-testid={TESTID_SHOWN_ICON} />
            <PasswordFieldHiddenIcon data-testid={TESTID_HIDDEN_ICON} />
          </PasswordFieldToggleIconButton>
        </>
      )}
    </PasswordField>
  );
};

const getRoot = (r: RenderResult) => r.getByTestId(TESTID_ROOT);
const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;
const getToggle = (r: RenderResult) => r.getByTestId(TESTID_TOGGLE) as HTMLButtonElement;
const getShownIcon = (r: RenderResult) => r.getByTestId(TESTID_SHOWN_ICON);
const getHiddenIcon = (r: RenderResult) => r.getByTestId(TESTID_HIDDEN_ICON);

describe('PasswordField', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<PasswordFieldTest />);
    });
    
    it('renders root, input and toggle button', async () => {
      await expect.element(getRoot(r)).toBeInTheDocument();
      await expect.element(getInput(r)).toBeInTheDocument();
      await expect.element(getToggle(r)).toBeInTheDocument();
    });
    
    it('renders placeholder', async () => {
      await expect.element(r.getByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
    });
    
    it('starts with type="password"', async () => {
      await expect.element(getInput(r)).toHaveAttribute('type', 'password');
    });
    
    it('toggles input type to text on click', async () => {
      await userEvent.click(getToggle(r));
      await expect.element(getInput(r)).toHaveAttribute('type', 'text');
    });
    
    it('toggles input type back to password on second click', async () => {
      await userEvent.click(getToggle(r));
      await userEvent.click(getToggle(r));
      await expect.element(getInput(r)).toHaveAttribute('type', 'password');
    });
    
    it('does not move the focus to the input on a toggle click', async () => {
      await userEvent.click(getToggle(r));
      await expect.element(getInput(r)).toHaveAttribute('type', 'text');

      expect(document.activeElement).not.toBe(getInput(r));
    });

    it('starts shown with defaultShown', async () => {
      r.unmount();
      r = render(<PasswordFieldTest defaultShown />);

      await expect.element(getInput(r)).toHaveAttribute('type', 'text');
    });

    it('reports the visibility on toggle', async () => {
      const onChangeShown = vi.fn();
      r.rerender(<PasswordFieldTest onChangeShown={onChangeShown} />);

      await userEvent.click(getToggle(r));

      expect(onChangeShown).toHaveBeenLastCalledWith(true);
    });

    it('shows the password while shown is true', async () => {
      r.rerender(<PasswordFieldTest shown />);

      await expect.element(getInput(r)).toHaveAttribute('type', 'text');
    });

    it('keeps the password hidden until the parent shows it', async () => {
      const onChangeShown = vi.fn();
      r.rerender(<PasswordFieldTest shown={false} onChangeShown={onChangeShown} />);

      await userEvent.click(getToggle(r));

      expect(onChangeShown).toHaveBeenLastCalledWith(true);
      await expect.element(getInput(r)).toHaveAttribute('type', 'password');
    });

    it('reflects initial state via icons data-hidden attributes', async () => {
      await expect.element(getShownIcon(r)).toHaveAttribute('data-hidden', 'false');
      await expect.element(getHiddenIcon(r)).toHaveAttribute('data-hidden', 'true');
    });
    
    it('reflects toggled state via icons data-hidden attributes', async () => {
      await userEvent.click(getToggle(r));
      
      await expect.element(getShownIcon(r)).toHaveAttribute('data-hidden', 'true');
      await expect.element(getHiddenIcon(r)).toHaveAttribute('data-hidden', 'false');
    });
    
    it('disables toggle button when PasswordField is disabled', async () => {
      r.rerender(<PasswordFieldTest disabled />);
      await expect.element(getToggle(r)).toBeDisabled();
    });
    
    it('disables input when PasswordField is disabled', async () => {
      r.rerender(<PasswordFieldTest disabled />);
      await expect.element(getInput(r)).toBeDisabled();
    });
    
    it('respects explicit input disabled over context disabled', async () => {
      r.rerender(
        <PasswordFieldTest disabled>
          <PasswordFieldInput data-testid={TESTID_INPUT} disabled={false} placeholder={PLACEHOLDER} />
          <PasswordFieldToggleIconButton data-testid={TESTID_TOGGLE} aria-label={TOGGLE_LABEL}>
            <PasswordFieldShownIcon data-testid={TESTID_SHOWN_ICON} />
            <PasswordFieldHiddenIcon data-testid={TESTID_HIDDEN_ICON} />
          </PasswordFieldToggleIconButton>
        </PasswordFieldTest>,
      );
      
      await expect.element(getInput(r)).not.toBeDisabled();
      await expect.element(getToggle(r)).toBeDisabled();
    });
    
    it('respects explicit toggle disabled over context disabled', async () => {
      r.rerender(
        <PasswordFieldTest disabled>
          <PasswordFieldInput data-testid={TESTID_INPUT} placeholder={PLACEHOLDER} />
          <PasswordFieldToggleIconButton
            data-testid={TESTID_TOGGLE}
            aria-label={TOGGLE_LABEL}
            disabled={false}
          >
            <PasswordFieldShownIcon data-testid={TESTID_SHOWN_ICON} />
            <PasswordFieldHiddenIcon data-testid={TESTID_HIDDEN_ICON} />
          </PasswordFieldToggleIconButton>
        </PasswordFieldTest>,
      );
      
      await expect.element(getToggle(r)).not.toBeDisabled();
      await expect.element(getInput(r)).toBeDisabled();
    });
  });
  
  describe('Edge Cases', () => {
    it('does not submit the surrounding form on toggle click', async () => {
      const onSubmit = vi.fn();
      const r = render(
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <PasswordFieldTest />
        </form>
      );

      await userEvent.click(getToggle(r));

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('keeps toggling with a custom onClick on the toggle', async () => {
      const onClick = vi.fn();
      const r = render(
        <PasswordFieldTest>
          <PasswordFieldInput data-testid={TESTID_INPUT} placeholder={PLACEHOLDER} />
          <PasswordFieldToggleIconButton data-testid={TESTID_TOGGLE} aria-label={TOGGLE_LABEL} onClick={onClick} />
        </PasswordFieldTest>,
      );

      await userEvent.click(getToggle(r));

      expect(onClick).toHaveBeenCalledOnce();
      await expect.element(getInput(r)).toHaveAttribute('type', 'text');
    });

    it('supports custom shown icon children', async () => {
      const r = render(
        <PasswordFieldTest>
          <PasswordFieldInput data-testid={TESTID_INPUT} placeholder={PLACEHOLDER} />
          <PasswordFieldToggleIconButton data-testid={TESTID_TOGGLE} aria-label={TOGGLE_LABEL}>
            <PasswordFieldShownIcon data-testid={TESTID_SHOWN_ICON}>
              <span>{CUSTOM_SHOWN}</span>
            </PasswordFieldShownIcon>
            <PasswordFieldHiddenIcon data-testid={TESTID_HIDDEN_ICON} />
          </PasswordFieldToggleIconButton>
        </PasswordFieldTest>,
      );
      
      await expect.element(r.getByText(CUSTOM_SHOWN)).toBeInTheDocument();
    });
    
    it('supports custom hidden icon children', async () => {
      const r = render(
        <PasswordFieldTest>
          <PasswordFieldInput data-testid={TESTID_INPUT} placeholder={PLACEHOLDER} />
          <PasswordFieldToggleIconButton data-testid={TESTID_TOGGLE} aria-label={TOGGLE_LABEL}>
            <PasswordFieldShownIcon data-testid={TESTID_SHOWN_ICON} />
            <PasswordFieldHiddenIcon data-testid={TESTID_HIDDEN_ICON}>
              <span>{CUSTOM_HIDDEN}</span>
            </PasswordFieldHiddenIcon>
          </PasswordFieldToggleIconButton>
        </PasswordFieldTest>,
      );
      
      await expect.element(r.getByText(CUSTOM_HIDDEN)).toBeInTheDocument();
    });
    
    it('renders both custom icons at once', async () => {
      const r = render(
        <PasswordFieldTest>
          <PasswordFieldInput data-testid={TESTID_INPUT} placeholder={PLACEHOLDER} />
          <PasswordFieldToggleIconButton data-testid={TESTID_TOGGLE} aria-label={TOGGLE_LABEL}>
            <PasswordFieldShownIcon data-testid={TESTID_SHOWN_ICON}>
              <span>{CUSTOM_SHOWN}</span>
            </PasswordFieldShownIcon>
            <PasswordFieldHiddenIcon data-testid={TESTID_HIDDEN_ICON}>
              <span>{CUSTOM_HIDDEN}</span>
            </PasswordFieldHiddenIcon>
          </PasswordFieldToggleIconButton>
        </PasswordFieldTest>,
      );
      
      await expect.element(r.getByText(CUSTOM_SHOWN)).toBeInTheDocument();
      await expect.element(r.getByText(CUSTOM_HIDDEN)).toBeInTheDocument();
    });
    
    it('keeps custom icons mounted after toggling', async () => {
      const r = render(
        <PasswordFieldTest>
          <PasswordFieldInput data-testid={TESTID_INPUT} placeholder={PLACEHOLDER} />
          <PasswordFieldToggleIconButton data-testid={TESTID_TOGGLE} aria-label={TOGGLE_LABEL}>
            <PasswordFieldShownIcon data-testid={TESTID_SHOWN_ICON}>
              <span>{CUSTOM_SHOWN}</span>
            </PasswordFieldShownIcon>
            <PasswordFieldHiddenIcon data-testid={TESTID_HIDDEN_ICON}>
              <span>{CUSTOM_HIDDEN}</span>
            </PasswordFieldHiddenIcon>
          </PasswordFieldToggleIconButton>
        </PasswordFieldTest>,
      );
      
      await userEvent.click(getToggle(r));
      
      await expect.element(r.getByText(CUSTOM_SHOWN)).toBeInTheDocument();
      await expect.element(r.getByText(CUSTOM_HIDDEN)).toBeInTheDocument();
    });
  });
  
  describe('Accessibility', () => {
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<PasswordFieldTest />);
      });
      
      it('exposes an accessible label on the toggle button', async () => {
        await expect.element(r.getByLabelText(TOGGLE_LABEL)).toBeInTheDocument();
      });

      it('exposes the visibility with aria-pressed on the toggle', async () => {
        await expect.element(getToggle(r)).toHaveAttribute('aria-pressed', 'false');

        await userEvent.click(getToggle(r));

        await expect.element(getToggle(r)).toHaveAttribute('aria-pressed', 'true');
      });
    });
    
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<PasswordFieldTest />);
      });
      
      it('input is a textbox', async () => {
        await expect.element(getInput(r)).toHaveRole('textbox');
      });
      
      it('toggle is a button', async () => {
        await expect.element(getToggle(r)).toHaveRole('button');
      });
    });
    
    describe('focus', () => {
      it('keeps focus on the toggle after toggling with the keyboard', async () => {
        const r = render(<PasswordFieldTest />);

        getToggle(r).focus();
        await userEvent.keyboard('{Enter}');

        await expect.element(getToggle(r)).toHaveFocus();
      });
    });
    
    describe('keyboard', () => {
      it('toggles visibility with Space when toggle is focused', async () => {
        const r = render(<PasswordFieldTest />);
        
        getToggle(r).focus();
        await expect.element(getToggle(r)).toHaveFocus();
        
        await userEvent.keyboard('[Space]');
        await expect.element(getInput(r)).toHaveAttribute('type', 'text');
      });
      
      it('toggles visibility with Enter when toggle is focused', async () => {
        const r = render(<PasswordFieldTest />);
        
        getToggle(r).focus();
        await expect.element(getToggle(r)).toHaveFocus();
        
        await userEvent.keyboard('{Enter}');
        await expect.element(getInput(r)).toHaveAttribute('type', 'text');
      });
      
      it('disabled: input and toggle are disabled', async () => {
        const r = render(<PasswordFieldTest disabled />);
        
        await expect.element(getInput(r)).toBeDisabled();
        await expect.element(getToggle(r)).toBeDisabled();
      });
    });
  });
});