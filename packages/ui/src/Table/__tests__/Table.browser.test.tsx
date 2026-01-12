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
const TESTID_HEAD = 'head';
const TESTID_BODY = 'body';
const TESTID_FOOT = 'foot';

const TESTID_ROW_HEAD = 'row-head';
const TESTID_ROW_BODY = 'row-body';
const TESTID_ROW_FOOT = 'row-foot';

const TESTID_TH_0 = 'th-0';
const TESTID_TH_1 = 'th-1';

const TESTID_TD_0 = 'td-0';
const TESTID_TD_1 = 'td-1';

const TABLE_ID = 'tbl';
const CUSTOM_CLASS = 'custom-class';

const TableTest: FC<PropsWithChildren<ComponentProps<typeof Table>>> = (props) => (
  <Table data-testid={TESTID_TABLE} {...props}>
    <TableHead data-testid={TESTID_HEAD}>
      <TableRow data-testid={TESTID_ROW_HEAD}>
        <TableHeading data-testid={TESTID_TH_0}>Head 0</TableHeading>
        <TableHeading data-testid={TESTID_TH_1}>Head 1</TableHeading>
      </TableRow>
    </TableHead>
    
    <TableBody data-testid={TESTID_BODY}>
      <TableRow data-testid={TESTID_ROW_BODY}>
        <TableData data-testid={TESTID_TD_0}>Cell 0</TableData>
        <TableData data-testid={TESTID_TD_1}>Cell 1</TableData>
      </TableRow>
    </TableBody>
    
    <TableFoot data-testid={TESTID_FOOT}>
      <TableRow data-testid={TESTID_ROW_FOOT}>
        <TableData>Foot 0</TableData>
        <TableData>Foot 1</TableData>
      </TableRow>
    </TableFoot>
  </Table>
);

const getTable = (r: RenderResult) => r.getByTestId(TESTID_TABLE) as HTMLTableElement;

const getHead = (r: RenderResult) => r.getByTestId(TESTID_HEAD) as HTMLTableSectionElement;
const getBody = (r: RenderResult) => r.getByTestId(TESTID_BODY) as HTMLTableSectionElement;
const getFoot = (r: RenderResult) => r.getByTestId(TESTID_FOOT) as HTMLTableSectionElement;

const getHeadRow = (r: RenderResult) => r.getByTestId(TESTID_ROW_HEAD) as HTMLTableRowElement;
const getBodyRow = (r: RenderResult) => r.getByTestId(TESTID_ROW_BODY) as HTMLTableRowElement;
const getFootRow = (r: RenderResult) => r.getByTestId(TESTID_ROW_FOOT) as HTMLTableRowElement;

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
    
    describe('Structure', () => {
      it('renders the table element', () => {
        expect(getTable(r)).toBeInTheDocument();
      });
      
      it('renders thead section', () => {
        expect(getHead(r)).toBeInTheDocument();
      });
      
      it('renders tbody section', () => {
        expect(getBody(r)).toBeInTheDocument();
      });
      
      it('renders tfoot section', () => {
        expect(getFoot(r)).toBeInTheDocument();
      });
      
      it('renders rows', () => {
        expect(getHeadRow(r)).toBeInTheDocument();
        expect(getBodyRow(r)).toBeInTheDocument();
        expect(getFootRow(r)).toBeInTheDocument();
      });
      
      it('renders heading cells', () => {
        expect(getTh0(r)).toBeInTheDocument();
        expect(getTh1(r)).toBeInTheDocument();
      });
      
      it('renders data cells', () => {
        expect(getTd0(r)).toBeInTheDocument();
        expect(getTd1(r)).toBeInTheDocument();
      });
    });
    
    describe('Table props', () => {
      it('passes through id', () => {
        r.rerender(<TableTest id={TABLE_ID} />);
        expect(getTable(r)).toHaveAttribute('id', TABLE_ID);
      });
      
      it('merges className', () => {
        r.rerender(<TableTest className={CUSTOM_CLASS} />);
        expect(getTable(r)).toHaveClass(CUSTOM_CLASS);
      });
      
      it('sets data-align attribute', () => {
        r.rerender(<TableTest dataAlign='end' />);
        expect(getTable(r)).toHaveAttribute('data-align', 'end');
      });
      
      it('sets data-edge-padded attribute', () => {
        r.rerender(<TableTest edgePadded />);
        expect(getTable(r)).toHaveAttribute('data-edge-padded', 'true');
      });
      
      it('sets data-full-width attribute', () => {
        r.rerender(<TableTest fullWidth />);
        expect(getTable(r)).toHaveAttribute('data-full-width', 'true');
      });
      
      it('sets data-full-height attribute', () => {
        r.rerender(<TableTest fullHeight />);
        expect(getTable(r)).toHaveAttribute('data-full-height', 'true');
      });
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
  
  describe('Edge Cases', () => {
    it('renders empty head section', () => {
      const r = render(
        <Table data-testid={TESTID_TABLE}>
          <TableHead data-testid={TESTID_HEAD} />
        </Table>
      );
      
      expect(getHead(r)).toBeEmptyDOMElement();
    });
    
    it('renders empty body section', () => {
      const r = render(
        <Table data-testid={TESTID_TABLE}>
          <TableBody data-testid={TESTID_BODY} />
        </Table>
      );
      
      expect(getBody(r)).toBeEmptyDOMElement();
    });
    
    it('renders empty foot section', () => {
      const r = render(
        <Table data-testid={TESTID_TABLE}>
          <TableFoot data-testid={TESTID_FOOT} />
        </Table>
      );
      
      expect(getFoot(r)).toBeEmptyDOMElement();
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<TableTest />);
      });
      
      it('exposes role=table', () => {
        expect(r.getByRole('table')).toBeInTheDocument();
      });
      
      it('exposes role=row', () => {
        expect(r.getAllByRole('row').length).toBeGreaterThan(0);
      });
      
      it('exposes role=columnheader', () => {
        expect(r.getAllByRole('columnheader')).toHaveLength(2);
      });
      
      it('exposes role=cell', () => {
        expect(r.getAllByRole('cell').length).toBeGreaterThan(0);
      });
    });
  });
});