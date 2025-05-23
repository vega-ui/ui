'use client';

import { useContext } from 'react';
import { RangeSliderContext } from '../providers';

export const useRangeSliderContext = () => useContext(RangeSliderContext)