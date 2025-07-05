'use client';

import { useContext } from 'react';
import { AccordionItemContext } from '../providers/AccordionItemProvider/context.ts';

export const useAccordionItemContext = () => useContext(AccordionItemContext)