import { ComponentProps, FC, PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Table } from '../Table';
import {
  TableBody,
  TableData,
  TableFoot,
  TableHead,
  TableHeading,
  TableRow,
} from '../components';

afterEach(cleanup);

const TESTID_TABLE = 'table';

const TESTID_TH_0 = 'th-0';
const TESTID_TH_1 = 'th-1';

const TESTID_TD_0 = 'td-0';
const TESTID_TD_1 = 'td-1';

const TableTest: FC<PropsWithChildren<ComponentProps<typeof Table>>> = (props) => (
  <Table data-testid={TESTID_TABLE} {...props}>
    <TableHead>
      <TableRow>
        <TableHeading data-testid={TESTID_TH_0}>Head 0</TableHeading>
        <TableHeading data-testid={TESTID_TH_1}>Head 1</TableHeading>
      </TableRow>
    </TableHead>
    
    <TableBody>
      <TableRow>
        <TableData data-testid={TESTID_TD_0}>Cell 0</TableData>
        <TableData data-testid={TESTID_TD_1}>Cell 1</TableData>
      </TableRow>
    </TableBody>
    
    <TableFoot>
      <TableRow>
        <TableData>Foot 0</TableData>
        <TableData>Foot 1</TableData>
      </TableRow>
    </TableFoot>
  </Table>
);

const getTh0 = (r: RenderResult) => r.getByTestId(TESTID_TH_0) as HTMLTableCellElement;
const getTh1 = (r: RenderResult) => r.getByTestId(TESTID_TH_1) as HTMLTableCellElement;

const getTd0 = (r: RenderResult) => r.getByTestId(TESTID_TD_0) as HTMLTableCellElement;
const getTd1 = (r: RenderResult) => r.getByTestId(TESTID_TD_1) as HTMLTableCellElement;

describe('Table', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<TableTest />);
    });
    
    describe('Cell alignment', () => {
      it('propagates Table dataAlign into TableHeading by default', () => {
        r.rerender(<TableTest dataAlign='center' />);
        expect(getTh0(r)).toHaveAttribute('data-align', 'center');
        expect(getTh1(r)).toHaveAttribute('data-align', 'center');
      });
      
      it('propagates Table dataAlign into TableData by default', () => {
        r.rerender(<TableTest dataAlign='center' />);
        expect(getTd0(r)).toHaveAttribute('data-align', 'center');
        expect(getTd1(r)).toHaveAttribute('data-align', 'center');
      });
      
      it('allows overriding dataAlign per cell', () => {
        r.rerender(
          <Table data-testid={TESTID_TABLE} dataAlign='between'>
            <TableHead>
              <TableRow>
                <TableHeading data-testid={TESTID_TH_0} dataAlign='start'>
                  Head
                </TableHeading>
              </TableRow>
            </TableHead>
            
            <TableBody>
              <TableRow>
                <TableData data-testid={TESTID_TD_0} dataAlign='end'>
                  Cell
                </TableData>
              </TableRow>
            </TableBody>
          </Table>
        );
        
        expect(getTh0(r)).toHaveAttribute('data-align', 'start');
        expect(getTd0(r)).toHaveAttribute('data-align', 'end');
      });
    });
    
    describe('Edge padding classes', () => {
      it('changes heading cell className when edgePadded toggles', () => {
        const initial = getTh0(r).className;
        
        r.rerender(<TableTest edgePadded />);
        expect(getTh0(r).className).not.toBe(initial);
      });
      
      it('changes data cell className when edgePadded toggles', () => {
        const initial = getTd0(r).className;
        
        r.rerender(<TableTest edgePadded />);
        expect(getTd0(r).className).not.toBe(initial);
      });
    });
  });
});
