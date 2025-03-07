'use client';

import { useContext } from 'react';
import { CheckboxCardContext, CheckboxCardContextState } from '../providers/CheckboxCardProvider/context.ts';

export const useCheckboxCardContext = (): CheckboxCardContextState => useContext(CheckboxCardContext)