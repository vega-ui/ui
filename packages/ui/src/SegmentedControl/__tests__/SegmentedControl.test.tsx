import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SegmentedControl } from '../SegmentedControl';
import {
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemHiddenInput,
} from '../components';

const renderControl = (props?: Partial<React.ComponentProps<typeof SegmentedControl>>) => {
  const name = props?.name ?? 'segmented';
  
  render(
    <SegmentedControl name={name} {...props}>
      <SegmentedControlItem value='1' data-testid='item-1'>
        <SegmentedControlItemHiddenInput data-testid='input-1' />
        Apple
      </SegmentedControlItem>
      
      <SegmentedControlItem value='2' data-testid='item-2'>
        <SegmentedControlItemHiddenInput data-testid='input-2' />
        Orange
      </SegmentedControlItem>
      
      <SegmentedControlItem value='3' data-testid='item-3'>
        <SegmentedControlItemHiddenInput data-testid='input-3' />
        Blueberry
      </SegmentedControlItem>
      
      <SegmentedControlIndicator data-testid='indicator' />
    </SegmentedControl>,
  );
  
  const indicator = screen.getByTestId('indicator');
  const item1 = screen.getByTestId('item-1');
  const item2 = screen.getByTestId('item-2');
  const item3 = screen.getByTestId('item-3');
  const input1 = screen.getByTestId('input-1') as HTMLInputElement;
  const input2 = screen.getByTestId('input-2') as HTMLInputElement;
  const input3 = screen.getByTestId('input-3') as HTMLInputElement;
  
  return { indicator, item1, item2, item3, input1, input2, input3, name };
};

describe('SegmentedControl', () => {
  it('renders items and indicator', () => {
    const { item1, item2, item3, indicator } = renderControl();
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
    expect(indicator).toBeInTheDocument();
  });
  
  it('passes name to hidden radio inputs', () => {
    const { input1, input2, input3, name } = renderControl({ name: 'theme' });
    expect(input1.name).toBe('theme');
    expect(input2.name).toBe('theme');
    expect(input3.name).toBe('theme');
    expect(name).toBe('theme');
  });
  
  it('sets correct values on hidden radio inputs', () => {
    const { input1, input2, input3 } = renderControl();
    expect(input1.value).toBe('1');
    expect(input2.value).toBe('2');
    expect(input3.value).toBe('3');
  });
  
  it('indicator reflects context data attributes', () => {
    const { indicator } = renderControl({ size: 'md', variant: 'secondary' });
    expect(indicator.getAttribute('data-size')).toBe('md');
    expect(indicator.getAttribute('data-variant')).toBe('secondary');
  });
  
  it('supports controlled value (does not change without prop update)', () => {
    const onChange = vi.fn();
    const { input1, input2, input3 } = renderControl({ value: '2', onChange });
    
    expect(input2.checked).toBe(true);
    expect(input1.checked).toBe(false);
    expect(input3.checked).toBe(false);
    
    fireEvent.click(input1);
    fireEvent.change(input1);
    
    expect(onChange).toHaveBeenCalled();
    expect(input2.checked).toBe(true);
    expect(input1.checked).toBe(false);
  });
  
  it('supports uncontrolled defaultValue', () => {
    const onChange = vi.fn();
    const { input1, input2, input3 } = renderControl({ defaultValue: '1', onChange });
    
    expect(input1.checked).toBe(true);
    expect(input2.checked).toBe(false);
    expect(input3.checked).toBe(false);
    
    fireEvent.click(input3);
    fireEvent.change(input3);
    
    expect(onChange).toHaveBeenCalled();
  });
  
  it('calls SegmentedControl onChange when item input changes', () => {
    const onChange = vi.fn();
    const { input2 } = renderControl({ onChange });
    
    fireEvent.click(input2);
    fireEvent.change(input2);
    
    expect(onChange).toHaveBeenCalledTimes(1);
    const call = onChange.mock.calls[0][0] as React.ChangeEvent<HTMLInputElement>;
    expect(call.target.value).toBe('2');
  });
  
  it('merges item-level onChange with root onChange', () => {
    const rootOnChange = vi.fn();
    const itemOnChange = vi.fn();
    
    render(
      <SegmentedControl name='segmented' onChange={rootOnChange}>
        <SegmentedControlItem value='1'>
          <SegmentedControlItemHiddenInput data-testid='input-1' onChange={itemOnChange} />
          Apple
        </SegmentedControlItem>
        <SegmentedControlIndicator />
      </SegmentedControl>,
    );
    
    const input = screen.getByTestId('input-1') as HTMLInputElement;
    fireEvent.click(input);
    fireEvent.change(input);
    
    expect(rootOnChange).toHaveBeenCalledTimes(1);
    expect(itemOnChange).toHaveBeenCalledTimes(1);
  });
  
  it('disabled SegmentedControl disables hidden inputs', () => {
    const { input1, input2, input3, indicator } = renderControl({ disabled: true });
    
    expect(input1.disabled).toBe(true);
    expect(input2.disabled).toBe(true);
    expect(input3.disabled).toBe(true);
    
    expect(indicator.getAttribute('data-disabled')).toBe('true');
  });
  
  it('clicking item label triggers its hidden input change', () => {
    const onChange = vi.fn();
    const { item2, input2 } = renderControl({ onChange });
    
    fireEvent.click(item2);
    fireEvent.change(input2);
    
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((onChange.mock.calls[0][0] as React.ChangeEvent<HTMLInputElement>).target.value).toBe('2');
  });
  
  it('renders with custom className on hidden input', () => {
    render(
      <SegmentedControl name='segmented'>
        <SegmentedControlItem value='1'>
          <SegmentedControlItemHiddenInput data-testid='input' className='custom' />
          Apple
        </SegmentedControlItem>
      </SegmentedControl>,
    );
    
    const input = screen.getByTestId('input');
    expect(input.classList.contains('custom')).toBe(true);
  });
});
