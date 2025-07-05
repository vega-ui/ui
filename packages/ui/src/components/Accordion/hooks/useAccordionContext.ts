'use client';

import { useContext } from 'react';
import { AccordionContext } from '../providers/AccordionProvider/context.ts';

export const useAccordionContext = () => useContext(AccordionContext)