'use client';

import { useContext } from 'react';
import { DataGridRowContext } from '../providers/DataGridRowProvider/context.ts';

export const useDataGridRowContext = () => useContext(DataGridRowContext)