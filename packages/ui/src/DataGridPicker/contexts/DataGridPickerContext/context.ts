'use client';

import { createContext } from '@vega-ui/react-context';
import { DataGridPickerSize, DataGridPickerVariant } from '../../types';

export interface DataGridPickerContextState {
  size: DataGridPickerSize
  variant: DataGridPickerVariant
}

export const [DataGridPickerProvider, useDataGridPickerContext] = createContext<DataGridPickerContextState>('DataGridPickerContext', {
  size: 'sm',
  variant: 'secondary',
})