'use client';

import { useContext } from 'react';
import { DataGridPickerContext } from '../providers';

export const useDataGridPickerContext = () => useContext(DataGridPickerContext)