import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { MonthPicker } from '../MonthPicker';
import { MonthPickerItem, MonthPickerRow } from '../components';

describe('MonthPicker', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15T00:00:00Z'));
  });
  
  afterEach(() => {
    vi.useRealTimers();
  });
  
  it('renders and forwards children', () => {
    render(
      <MonthPicker data-testid='month-picker'>
        <div data-testid='child'>child-content</div>
      </MonthPicker>
    );
    
    expect(screen.getByTestId('month-picker')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('child').textContent).toBe('child-content');
  });
  
  it('uses current month as defaultActive when not provided', () => {
    render(
      <MonthPicker data-testid='month-picker'>
        <MonthPickerRow row={0}>
          <MonthPickerItem col={0} value={2025}>2025</MonthPickerItem>
        </MonthPickerRow>
      </MonthPicker>
    );
    
    waitFor(() => {
      expect((document.activeElement as HTMLElement)?.dataset.key).toBe('2025');
    })
  });
  
  it('respects provided defaultActive and does not override it', () => {
    render(
      <MonthPicker defaultActive={1999} data-testid='month-picker'>
        <MonthPickerRow row={0}>
          <MonthPickerItem col={0} value={1999}>1999</MonthPickerItem>
        </MonthPickerRow>
      </MonthPicker>
    );
    
    waitFor(() => {
      expect((document.activeElement as HTMLElement)?.dataset.key).toBe('1999');
    })
  });
  
  it('uses xs as default size when size is not provided', () => {
    render(
      <MonthPicker data-testid='month-picker'>
        <MonthPickerRow row={0}>
          <MonthPickerItem data-testid='month-picker-item' col={0} value={2025}>2025</MonthPickerItem>
        </MonthPickerRow>
      </MonthPicker>
    );
    
    waitFor(() => {
      expect(screen.getByTestId('month-picker-item')).toHaveAttribute('size', 'xs');
    })
  });
  
  it('forwards custom size to DataGridPicker', () => {
    render(
      <MonthPicker data-testid='month-picker'>
        <MonthPickerRow row={0}>
          <MonthPickerItem data-testid='month-picker-item' col={0} value={2025}>2025</MonthPickerItem>
        </MonthPickerRow>
      </MonthPicker>
    );
    
    waitFor(() => {
      expect(screen.getByTestId('month-picker-item')).toHaveAttribute('size', 'lg');
    })
  });
});
