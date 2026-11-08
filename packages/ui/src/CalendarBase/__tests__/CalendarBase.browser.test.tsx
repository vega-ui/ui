import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { CalendarBase } from '../CalendarBase';
import {
  CalendarBaseHeader,
  CalendarBasePickerButton,
  CalendarBaseControlIconButton,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
} from '../components';

afterEach(cleanup);

const CalendarBaseTest = (props: ComponentProps<typeof CalendarBase>) => {
  const { children, ...rest } = props;
  
  return (
    <CalendarBase {...rest} data-testid='root'>
      {children ?? (
        <>
          <CalendarBaseHeader data-testid='header'>
            <CalendarBaseControlIconButton data-testid='prev'>Prev</CalendarBaseControlIconButton>
            
            <div data-testid='picker-group'>
              <CalendarBasePickerButton data-testid='month-btn'>Month</CalendarBasePickerButton>
              <CalendarBasePickerButton data-testid='year-btn'>Year</CalendarBasePickerButton>
            </div>
            
            <CalendarBaseControlIconButton data-testid='next'>Next</CalendarBaseControlIconButton>
          </CalendarBaseHeader>
          
          <div data-testid='body'>
            <CalendarBaseWeekLabels data-testid='week-labels'>
              <CalendarBaseWeekLabel data-testid='week-label'>Mon</CalendarBaseWeekLabel>
              <CalendarBaseWeekLabel data-testid='week-label'>Tue</CalendarBaseWeekLabel>
              <CalendarBaseWeekLabel data-testid='week-label'>Wed</CalendarBaseWeekLabel>
            </CalendarBaseWeekLabels>
          </div>
        </>
      )}
    </CalendarBase>
  );
};

const getWeekLabels = (r: RenderResult) => r.getByTestId('week-labels');

describe('CalendarBase', () => {
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CalendarBaseTest />);
      });
      
      it('CalendarBaseWeekLabels has role=row', async () => {
        await expect.element(getWeekLabels(r)).toHaveRole('row');
      });
      
      it('CalendarBaseWeekLabel has role=columnheader', async () => {
        const labels = r.getAllByTestId('week-label');
        await expect.element(labels[0]).toHaveRole('columnheader');
        await expect.element(labels[1]).toHaveRole('columnheader');
        await expect.element(labels[2]).toHaveRole('columnheader');
      });
    });
  });
});
