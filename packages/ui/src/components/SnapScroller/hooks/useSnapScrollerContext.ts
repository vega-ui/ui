'use client';

import { useContext } from 'react';
import { SnapScrollerContext } from '../providers';

export const useSnapScrollerContext = () => useContext(SnapScrollerContext)