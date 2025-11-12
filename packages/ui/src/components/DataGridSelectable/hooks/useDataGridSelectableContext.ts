'use client';

import { useContext } from 'react';
import { DataGridSelectableContext } from '../providers';

export const useDataGridSelectableContext = () => useContext(DataGridSelectableContext)