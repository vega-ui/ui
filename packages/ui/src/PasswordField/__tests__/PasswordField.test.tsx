// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordField, PasswordFieldProps } from '../PasswordField';
import {
  PasswordFieldInput,
  PasswordFieldToggleButton,
  PasswordFieldShownIcon,
  PasswordFieldHiddenIcon,
} from '../components';
import { userEvent } from 'storybook/test';

describe('PasswordField', () => {
  const renderField = (props?: PasswordFieldProps) => {
    render(
      <PasswordField {...props}>
        <PasswordFieldInput data-testid='input' placeholder='Password' />
        <PasswordFieldToggleButton aria-label='Toggle password visibility'>
          <PasswordFieldShownIcon />
          <PasswordFieldHiddenIcon />
        </PasswordFieldToggleButton>
      </PasswordField>
    );
  };
  
  it('renders', () => {
    renderField();
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });
  
  it('default type is password', () => {
    renderField();
    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input.type).toBe('password');
  });
  
  it('toggles visibility via toggle button', () => {
    renderField();
    const input = screen.getByTestId('input') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /toggle password visibility/i });
    
    expect(input.type).toBe('password');
    
    fireEvent.click(button);
    expect(input.type).toBe('text');
    
    fireEvent.click(button);
    expect(input.type).toBe('password');
  });
  
  it('supports typing', () => {
    renderField();
    const input = screen.getByTestId('input') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'secret' } });
    
    expect(input.value).toBe('secret');
  });
  
  it('disables both input and toggle button when PasswordField is disabled', () => {
    renderField({ disabled: true });
    
    const input = screen.getByTestId('input') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /toggle password visibility/i });
    
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
  
  it('does not toggle when disabled', () => {
    renderField({ disabled: true });
    
    const input = screen.getByTestId('input') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /toggle password visibility/i });
    
    expect(input.type).toBe('password');
    
    fireEvent.click(button);
    
    expect(input.type).toBe('password');
  });
  
  it('allows consumers to disable toggle button independently', () => {
    render(
      <PasswordField>
        <PasswordFieldInput data-testid='input' />
        <PasswordFieldToggleButton disabled aria-label='Toggle password visibility'>
          <PasswordFieldShownIcon />
          <PasswordFieldHiddenIcon />
        </PasswordFieldToggleButton>
      </PasswordField>
    );
    
    const input = screen.getByTestId('input') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /toggle password visibility/i });
    
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(input.type).toBe('password');
  });
  
  it('calls input onChange when enabled', () => {
    const onChange = vi.fn();
    
    render(
      <PasswordField>
        <PasswordFieldInput data-testid='input' onChange={onChange} />
        <PasswordFieldToggleButton aria-label='Toggle password visibility'>
          <PasswordFieldShownIcon />
          <PasswordFieldHiddenIcon />
        </PasswordFieldToggleButton>
      </PasswordField>
    );
    
    const input = screen.getByTestId('input') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'abc' } });
    
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  
  it('does not call input onChange when disabled', () => {
    const onChange = vi.fn();
    
    render(
      <PasswordField disabled>
        <PasswordFieldInput data-testid='input' onChange={onChange} />
        <PasswordFieldToggleButton aria-label='Toggle password visibility'>
          <PasswordFieldShownIcon />
          <PasswordFieldHiddenIcon />
        </PasswordFieldToggleButton>
      </PasswordField>
    );
    
    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input.disabled).toBeTruthy()
    
    userEvent.type(input, 'pwd');
    expect(onChange).toBeCalledTimes(0)
  });
});
