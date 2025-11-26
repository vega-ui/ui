'use client';

import { useContext } from 'react';
import { IndexedSnapScrollerContext } from '../providers';

export const useIndexesSnapScrollerContext = () => useContext(IndexedSnapScrollerContext)