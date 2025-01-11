import { useContext } from 'react';
import { DrawerContext } from '../providers/DrawerProvider/context.ts';

export const useDrawerContext = () => useContext(DrawerContext)