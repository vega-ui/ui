'use client';

import { useContext } from 'react';
import { SliderContextState, SliderContext } from '../providers';

export const useSliderContext = (): SliderContextState => useContext(SliderContext)