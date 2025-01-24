import { useContext } from 'react';
import { CollapsibleContext } from '../providers/CollapsibleProvider/context.ts';

export const useCollapsibleContext = () => useContext(CollapsibleContext)