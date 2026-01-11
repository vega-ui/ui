import { ComponentProps, CSSProperties, FC, FormEvent, PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { userEvent } from 'vitest/browser';
import { cleanup, render, type RenderResult, waitFor } from '@testing-library/react';

import { CheckboxCard } from '../CheckboxCard';
import {
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlHiddenInput,
  CheckboxCardControlIndicator,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardDescription,
  CheckboxCardTitle,
} from '../components';

afterEach(cleanup);

const TESTID_CARD = 'card';
const TESTID_CONTENT = 'content';
const TESTID_TITLE = 'title';
const TESTID_DESCRIPTION = 'description';
const TESTID_CHECKBOX = 'checkbox';
const TESTID_INPUT = 'hidden-input';
const TESTID_INDICATOR = 'indicator';
const TESTID_CHECKED_ICON = 'checked-icon';
const TESTID_INDETERMINATE_ICON = 'indeterminate-icon';

const CHECKBOX_NAME = 'agree';
const CHECKBOX_VALUE = 'yes';

const CheckboxCardTest: FC<PropsWithChildren<ComponentProps<typeof CheckboxCard>>> = (props) => {
  const { children, ...rest } = props;
  
  return (
    <CheckboxCard data-testid={TESTID_CARD} {...rest}>
      {children ?? (
        <>
          <CheckboxCardContent data-testid={TESTID_CONTENT}>
            <CheckboxCardTitle data-testid={TESTID_TITLE}>Title</CheckboxCardTitle>
            <CheckboxCardDescription data-testid={TESTID_DESCRIPTION}>
              Description
            </CheckboxCardDescription>
          </CheckboxCardContent>
          
          <CheckboxCardControl
            style={{ '--checkbox-size': '16px' } as CSSProperties}
            data-testid={TESTID_CHECKBOX}
          >
            <CheckboxCardControlHiddenInput
              data-testid={TESTID_INPUT}
              name={CHECKBOX_NAME}
              value={CHECKBOX_VALUE}
            />
            <CheckboxCardControlIndicator data-testid={TESTID_INDICATOR}>
              <CheckboxCardControlCheckedIcon data-testid={TESTID_CHECKED_ICON} />
              <CheckboxCardControlIndeterminateIcon data-testid={TESTID_INDETERMINATE_ICON} />
            </CheckboxCardControlIndicator>
          </CheckboxCardControl>
        </>
      )}
    </CheckboxCard>
  );
};

const getCard = (r: RenderResult) => r.getByTestId(TESTID_CARD);
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT);
const getTitle = (r: RenderResult) => r.getByTestId(TESTID_TITLE);
const getDescription = (r: RenderResult) => r.getByTestId(TESTID_DESCRIPTION);
const getCheckbox = (r: RenderResult) => r.getByTestId(TESTID_CHECKBOX);
const getIndicator = (r: RenderResult) => r.getByTestId(TESTID_INDICATOR);
const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;

const queryContent = (r: RenderResult) => r.queryByTestId(TESTID_CONTENT);
const queryTitle = (r: RenderResult) => r.queryByTestId(TESTID_TITLE);
const queryDescription = (r: RenderResult) => r.queryByTestId(TESTID_DESCRIPTION);

describe('CheckboxCard', () => {
  describe('Critical User Paths', () => {
    describe('default', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CheckboxCardTest />);
      });
      
      it('renders card', async () => {
        await expect.element(getCard(r)).toBeInTheDocument();
      });
      
      it('renders content', async () => {
        await expect.element(getContent(r)).toBeInTheDocument();
      });
      
      it('renders title', async () => {
        await expect.element(getTitle(r)).toHaveTextContent('Title');
      });
      
      it('renders description', async () => {
        await expect.element(getDescription(r)).toHaveTextContent('Description');
      });
      
      it('sets default data-size', async () => {
        await expect.element(getCard(r)).toHaveAttribute('data-size', 'md');
      });
      
      it('sets default data-orientation', async () => {
        await expect.element(getCard(r)).toHaveAttribute('data-orientation', 'vertical');
      });
      
      it('sets default data-variant', async () => {
        await expect.element(getCard(r)).toHaveAttribute('data-variant', 'primary');
      });
      
      it('renders visible control', async () => {
        await expect.element(getCheckbox(r)).toBeInTheDocument();
      });
      
      it('renders indicator', async () => {
        await expect.element(getIndicator(r)).toBeInTheDocument();
      });
      
      it('renders hidden input', async () => {
        await expect.element(getInput(r)).toBeInTheDocument();
      });
      
      it('is not checked by default', async () => {
        await expect.element(getInput(r)).not.toBeChecked();
      });
      
      it('checks when clicking control', async () => {
        await userEvent.click(getCheckbox(r));
        await expect.element(getInput(r)).toBeChecked();
      });
      
      it('unchecks when clicking control twice', async () => {
        await userEvent.click(getCheckbox(r));
        await userEvent.click(getCheckbox(r));
        await expect.element(getInput(r)).not.toBeChecked();
      });
    });
    
    describe('orientation', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CheckboxCardTest />);
      });
      
      it('applies horizontal data-orientation', async () => {
        r.rerender(<CheckboxCardTest orientation='horizontal' />);
        await expect.element(getCard(r)).toHaveAttribute('data-orientation', 'horizontal');
      });
    });
    
    describe('variant', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CheckboxCardTest />);
      });
      
      it('applies secondary data-variant', async () => {
        r.rerender(<CheckboxCardTest variant='secondary' />);
        await expect.element(getCard(r)).toHaveAttribute('data-variant', 'secondary');
      });
    });
    
    describe('controlled', () => {
      let r: RenderResult;
      let onChangeChecked: Mock;
      
      beforeEach(() => {
        onChangeChecked = vi.fn();
        r = render(<CheckboxCardTest checked={false} onChangeChecked={onChangeChecked} />);
      });
      
      it('is not checked when checked=false', async () => {
        await expect.element(getInput(r)).not.toBeChecked();
      });
      
      it('calls onChangeChecked(true) on click', async () => {
        await userEvent.click(getCheckbox(r));
        
        await waitFor(() => {
          expect(onChangeChecked).toHaveBeenLastCalledWith(true);
        });
      });
      
      it('does not update checked state without prop update', async () => {
        await userEvent.click(getCheckbox(r));
        await expect.element(getInput(r)).not.toBeChecked();
      });
    });
    
    describe('disabled', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CheckboxCardTest disabled />);
      });
      
      it('disables hidden input', async () => {
        await expect.element(getInput(r)).toBeDisabled();
      });
      
      it('is not checked when disabled by default', async () => {
        await expect.element(getInput(r)).not.toBeChecked();
      });
    });
  });
  
  describe('Error Handling', () => {
    it('renders with minimal structure (no crash)', async () => {
      const r = render(
        <CheckboxCard data-testid={TESTID_CARD}>
          <CheckboxCardControl data-testid={TESTID_CHECKBOX}>
            <CheckboxCardControlHiddenInput data-testid={TESTID_INPUT} />
          </CheckboxCardControl>
        </CheckboxCard>,
      );
      
      await expect.element(r.getByTestId(TESTID_CARD)).toBeInTheDocument();
    });
    
    it('renders checkbox control in minimal structure', async () => {
      const r = render(
        <CheckboxCard data-testid={TESTID_CARD}>
          <CheckboxCardControl data-testid={TESTID_CHECKBOX}>
            <CheckboxCardControlHiddenInput data-testid={TESTID_INPUT} />
          </CheckboxCardControl>
        </CheckboxCard>,
      );
      
      await expect.element(r.getByTestId(TESTID_CHECKBOX)).toBeInTheDocument();
    });
    
    it('renders hidden input in minimal structure', async () => {
      const r = render(
        <CheckboxCard data-testid={TESTID_CARD}>
          <CheckboxCardControl data-testid={TESTID_CHECKBOX}>
            <CheckboxCardControlHiddenInput data-testid={TESTID_INPUT} />
          </CheckboxCardControl>
        </CheckboxCard>,
      );
      
      await expect.element(r.getByTestId(TESTID_INPUT)).toBeInTheDocument();
    });
  });
  
  describe('Edge Cases', () => {
    it('form: becomes checked before submit', async () => {
      const r = render(
        <form>
          <CheckboxCardTest />
          <button type='submit'>Submit</button>
        </form>,
      );
      
      await userEvent.click(getCheckbox(r));
      await expect.element(getInput(r)).toBeChecked();
    });
    
    it('form: submits hidden input value when checked', async () => {
      const onSubmit = vi.fn((e: FormEvent) => {
        e.preventDefault();
        const fd = new FormData(e.target as HTMLFormElement);
        expect(fd.get(CHECKBOX_NAME)).toBe(CHECKBOX_VALUE);
      });
      
      const r = render(
        <form onSubmit={onSubmit}>
          <CheckboxCardTest />
          <button type='submit'>Submit</button>
        </form>,
      );
      
      await userEvent.click(getCheckbox(r));
      await userEvent.click(r.getByRole('button', { name: 'Submit' }));
      
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
    
    it('custom icons: renders custom checked svg', async () => {
      const r = render(
        <CheckboxCardTest>
          <CheckboxCardContent data-testid={TESTID_CONTENT}>
            <CheckboxCardTitle data-testid={TESTID_TITLE}>X</CheckboxCardTitle>
          </CheckboxCardContent>
          
          <CheckboxCardControl data-testid={TESTID_CHECKBOX} indeterminate>
            <CheckboxCardControlHiddenInput data-testid={TESTID_INPUT} />
            <CheckboxCardControlIndicator data-testid={TESTID_INDICATOR}>
              <CheckboxCardControlCheckedIcon data-testid={TESTID_CHECKED_ICON}>
                <svg data-testid='custom-checked' />
              </CheckboxCardControlCheckedIcon>
              
              <CheckboxCardControlIndeterminateIcon data-testid={TESTID_INDETERMINATE_ICON}>
                <svg data-testid='custom-indeterminate' />
              </CheckboxCardControlIndeterminateIcon>
            </CheckboxCardControlIndicator>
          </CheckboxCardControl>
        </CheckboxCardTest>,
      );
      
      await expect.element(r.getByTestId('custom-checked')).toBeInTheDocument();
    });
    
    it('custom icons: renders custom indeterminate svg', async () => {
      const r = render(
        <CheckboxCardTest>
          <CheckboxCardContent data-testid={TESTID_CONTENT}>
            <CheckboxCardTitle data-testid={TESTID_TITLE}>X</CheckboxCardTitle>
          </CheckboxCardContent>
          
          <CheckboxCardControl data-testid={TESTID_CHECKBOX} indeterminate>
            <CheckboxCardControlHiddenInput data-testid={TESTID_INPUT} />
            <CheckboxCardControlIndicator data-testid={TESTID_INDICATOR}>
              <CheckboxCardControlCheckedIcon data-testid={TESTID_CHECKED_ICON}>
                <svg data-testid='custom-checked' />
              </CheckboxCardControlCheckedIcon>
              
              <CheckboxCardControlIndeterminateIcon data-testid={TESTID_INDETERMINATE_ICON}>
                <svg data-testid='custom-indeterminate' />
              </CheckboxCardControlIndeterminateIcon>
            </CheckboxCardControlIndicator>
          </CheckboxCardControl>
        </CheckboxCardTest>,
      );
      
      await expect.element(r.getByTestId('custom-indeterminate')).toBeInTheDocument();
    });
    
    it('renders without content block', async () => {
      const r = render(
        <CheckboxCard data-testid={TESTID_CARD}>
          <CheckboxCardControl data-testid={TESTID_CHECKBOX}>
            <CheckboxCardControlHiddenInput data-testid={TESTID_INPUT} />
          </CheckboxCardControl>
        </CheckboxCard>,
      );
      
      expect(queryContent(r)).not.toBeInTheDocument();
      expect(queryTitle(r)).not.toBeInTheDocument();
      expect(queryDescription(r)).not.toBeInTheDocument();
    });
    
    it('passes className to card root', async () => {
      const r = render(<CheckboxCardTest className='my-card' />);
      await expect.element(r.getByTestId(TESTID_CARD)).toHaveClass('my-card');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CheckboxCardTest />);
      });
      
      it('hidden input has checkbox role', async () => {
        await expect.element(getInput(r)).toHaveRole('checkbox');
      });
    });
    
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CheckboxCardTest />);
      });
      
      it('hidden input has name attribute', async () => {
        await expect.element(getInput(r)).toHaveAttribute('name', CHECKBOX_NAME);
      });
    });
    
    describe('keyboard', () => {
      it('Space toggles when focusing the hidden input', async () => {
        const r = render(<CheckboxCardTest />);
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