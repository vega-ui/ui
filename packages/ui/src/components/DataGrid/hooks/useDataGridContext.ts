'use client';

import { useContext } from 'react';
import { DataGridContext } from '../providers/DataGridProvider/context.ts';

export const useDataGridContext = () => useContext(DataGridContext)