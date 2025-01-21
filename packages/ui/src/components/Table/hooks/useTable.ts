import { useContext } from 'react';
import { TableContext } from '../providers/TableProvider/context.ts';

export const useTable = () => {
  return useContext(TableContext)
}