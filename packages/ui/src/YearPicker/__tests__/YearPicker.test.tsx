import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { YearPicker } from '../YearPicker.tsx';
import { YearPickerItem, YearPickerRow } from '../components';

describe('YearPicker', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15T00:00:00Z'));
  });
  
  afterEach(() => {
    vi.useRealTimers();
  });
  
  it('renders and forwards children', () => {
    render(
      <YearPicker data-testid='year-picker'>
        <div data-testid='child'>child-content</div>
      </YearPicker>
    );
    
    expect(screen.getByTestId('year-picker')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('child').textContent).toBe('child-content');
  });
  
  it('uses current year as defaultActive when not provided', () => {
    render(
      <YearPicker data-testid='year-picker'>
        <YearPickerRow row={0}>
          <YearPickerItem col={0} value={2025}>2025</YearPickerItem>
        </YearPickerRow>
      </YearPicker>
    );
    
    waitFor(() => {
      expect((document.activeElement as HTMLElement)?.dataset.key).toBe('2025');
    })
  });
  
  it('respects provided defaultActive and does not override it', () => {
    render(
      <YearPicker defaultActive={1999} data-testid='year-picker'>
        <YearPickerRow row={0}>
          <YearPickerItem col={0} value={1999}>1999</YearPickerItem>
        </YearPickerRow>
      </YearPicker>
    );
    
    waitFor(() => {
      expect((document.activeElement as HTMLElement)?.dataset.key).toBe('1999');
    })
  });
  
  it('uses xs as default size when size is not provided', () => {
    render(
      <YearPicker data-testid='year-picker'>
        <YearPickerRow row={0}>
          <YearPickerItem data-testid='year-picker-item' col={0} value={2025}>2025</YearPickerItem>
        </YearPickerRow>
      </YearPicker>
    );
    
    waitFor(() => {
      expect(screen.getByTestId('year-picker-item')).toHaveAttribute('size', 'xs');
    })
  });
  
  it('forwards custom size to DataGridPicker', () => {
    render(
      <YearPicker data-testid='year-picker'>
        <YearPickerRow row={0}>
          <YearPickerItem data-testid='year-picker-item' col={0} value={2025}>2025</YearPickerItem>
        </YearPickerRow>
      </YearPicker>
    );
    
    waitFor(() => {
      expect(screen.getByTestId('year-picker-item')).toHaveAttribute('size', 'lg');
    })
  });
});
