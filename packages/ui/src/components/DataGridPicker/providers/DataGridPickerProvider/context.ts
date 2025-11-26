'use client';

import { createContext } from 'react';
import { DataGridPickerSize, DataGridPickerVariant } from '../../types.ts';

export interface DataGridPickerContextState {
  size: DataGridPickerSize
  variant: DataGridPickerVariant
}

export const defaultDataGridPickerContext: DataGridPickerContextState = {
  size: 'sm',
  variant: 'secondary',
}

export const DataGridPickerContext = createContext<DataGridPickerContextState>(defaultDataGridPickerContext)