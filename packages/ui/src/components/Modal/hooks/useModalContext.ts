'use client';

import { useContext } from 'react';
import { ModalContextState, ModalContext } from '../providers';

export const useModalContext = (): ModalContextState => useContext(ModalContext)