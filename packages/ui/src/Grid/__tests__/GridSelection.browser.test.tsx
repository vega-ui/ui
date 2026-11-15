import { ComponentProps, Profiler, ProfilerOnRenderCallback } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  type RenderResult,
} from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Grid } from '../Grid';
import { GridCell, GridRow, GridRowGroup } from '../components';

const makeKey = (row: number, col: number) => `${row}:${col}`;

const getCell = (r: RenderResult, row: number, col: number) => r.getByTestId(`${row}:${col}`);

afterEach(cleanup);

describe('Grid selection', () => {
  describe('Critical User Paths', () => {
    describe('multiple selection – expansion', () => {
      it('Shift+Arrow skips disabled cells', async () => {
        const r = render(
          <Grid selection='multiple' defaultActive={makeKey(0, 0)}>
            <GridRowGroup>
              <GridRow row={0}>
                {[0, 1, 2].map((col) => (
                  <GridCell key={col} col={col} disabled={col === 1} data-testid={makeKey(0, col)}>
                    {col}
                  </GridCell>
                ))}
              </GridRow>
            </GridRowGroup>
          </Grid>
        );
        
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{Shift>}{ArrowRight}{ArrowRight}{/Shift}');
        
        await expect.element(getCell(r, 0, 2)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('aria-selected', 'false');
      });
    });

    describe('onChangeValue', () => {
      it('selects after the click and key handlers of the cell run', async () => {
        const calls: string[] = [];
        const r = render(
          <Grid selection='multiple' onChangeValue={() => calls.push('change')}>
            <GridRow row={0}>
              <GridCell
                col={0}
                onClick={() => calls.push('click')}
                onKeyDown={(event) => { if (event.key === ' ') calls.push('key'); }}
              >
                0:0
              </GridCell>
            </GridRow>
          </Grid>
        );

        await userEvent.click(r.getByRole('gridcell'));
        await userEvent.keyboard(' ');

        expect(calls).toEqual(['click', 'change', 'key', 'change']);
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('uses explicit cellKey when provided', async () => {
      const r = render(
        <Grid selection='single' defaultActive='k'>
          <GridRowGroup>
            <GridRow row={0}>
              <GridCell col={0} value='k' data-testid='cell-k'>
                A
              </GridCell>
            </GridRow>
          </GridRowGroup>
        </Grid>
      );
      
      const cell = r.getByTestId('cell-k');
      await expect.element(cell).toHaveAttribute('data-key', 'k');
      await expect.element(cell).toHaveAttribute('tabindex', '0');
    });
    
    it('merges user onClick with internal selection handler', async () => {
      const onClick = vi.fn();
      
      const r = render(
        <Grid selection='single'>
          <GridRowGroup>
            <GridRow row={0}>
              <GridCell col={0} data-testid='cell-0-0' onClick={onClick}>
                0:0
              </GridCell>
            </GridRow>
          </GridRowGroup>
        </Grid>
      );
      
      const cell = r.getByTestId('cell-0-0');
      
      await userEvent.click(cell);
      
      expect(onClick).toHaveBeenCalledTimes(1);
      await expect.element(cell).toHaveAttribute('aria-selected', 'true');
    });
    
    it('merges user onKeyDown with internal selection handler', async () => {
      const onKeyDown = vi.fn();
      
      const r = render(
        <Grid selection='single'>
          <GridRowGroup>
            <GridRow row={0}>
              <GridCell col={0} data-testid='cell-0-0' onKeyDown={onKeyDown}>
                0:0
              </GridCell>
            </GridRow>
          </GridRowGroup>
        </Grid>
      );
      
      const cell = r.getByTestId('cell-0-0');
      cell.focus();
      
      await userEvent.keyboard(' ');
      
      expect(onKeyDown).toHaveBeenCalled();
      await expect.element(cell).toHaveAttribute('aria-selected', 'true');
    });

    it('starts a range drag from a child element of an edge cell', async () => {
      const r = render(
        <Grid selection='range' defaultValue={[makeKey(0, 0)]}>
          <GridRowGroup>
            <GridRow row={0}>
              {[0, 1, 2].map((col) => (
                <GridCell key={col} col={col} data-testid={makeKey(0, col)}>
                  <span data-testid={`label-${col}`}>{col}</span>
                </GridCell>
              ))}
            </GridRow>
          </GridRowGroup>
        </Grid>
      );
      
      const end = r.getByTestId('label-2');
      const spy = vi.spyOn(document, 'elementFromPoint').mockImplementation(() => end);
      
      fireEvent.pointerDown(r.getByTestId('label-0'), { clientX: 0, clientY: 0 });
      fireEvent.pointerMove(r.getByTestId('label-0'), { clientX: 10, clientY: 0, buttons: 1 });
      fireEvent.pointerUp(document);
      
      spy.mockRestore();
      
      await expect.element(getCell(r, 0, 1)).toHaveAttribute('aria-selected', 'true');
      await expect.element(getCell(r, 0, 2)).toHaveAttribute('aria-selected', 'true');
    });

    it('selects a cell rendered later inside the range', async () => {
      const Rows = ({ rows }: { rows: number[] }) => (
        <Grid selection='range' defaultValue={[makeKey(0, 0), makeKey(2, 0)]}>
          <GridRowGroup>
            {rows.map((row) => (
              <GridRow key={row} row={row}>
                <GridCell data-testid={makeKey(row, 0)} col={0}>{row}</GridCell>
              </GridRow>
            ))}
          </GridRowGroup>
        </Grid>
      );

      const r = render(<Rows rows={[0, 2]} />);
      r.rerender(<Rows rows={[0, 1, 2]} />);

      await expect.element(getCell(r, 1, 0)).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Performance', () => {
    const renders = new Map<string, number>();
    
    const onRender: ProfilerOnRenderCallback = (id) => {
      renders.set(id, (renders.get(id) ?? 0) + 1);
    };
    
    const cells = (
      <GridRowGroup>
        {[0, 1, 2].map((row) => (
          <GridRow key={row} row={row}>
            {[0, 1, 2].map((col) => (
              <Profiler key={col} id={makeKey(row, col)} onRender={onRender}>
                <GridCell data-testid={makeKey(row, col)} col={col}>
                  {makeKey(row, col)}
                </GridCell>
              </Profiler>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    );
    
    const Harness = (props: Partial<ComponentProps<typeof Grid>>) => (
      <Grid selection='single' defaultActive={makeKey(1, 1)} {...props}>
        {cells}
      </Grid>
    );
    
    const settle = () => new Promise((resolve) => setTimeout(resolve, 50));
    
    const measure = async (action: () => unknown) => {
      await settle();
      renders.clear();
      await action();
      await settle();
      
      return Object.keys(Object.fromEntries(renders)).sort();
    };
    
    it('selecting with the keyboard re-renders only the cells whose selection changes', async () => {
      const r = render(<Harness defaultValue={makeKey(0, 0)} />);
      getCell(r, 1, 1).focus();
      
      const rendered = await measure(() => userEvent.keyboard(' '));
      
      await expect.element(getCell(r, 1, 1)).toHaveAttribute('aria-selected', 'true');
      expect(rendered).toEqual([makeKey(0, 0), makeKey(1, 1)]);
    });
    
    it('changing disabled re-renders only the cells whose state changes', async () => {
      const r = render(<Harness disabled={[makeKey(0, 0)]} />);
      
      const rendered = await measure(() => r.rerender(<Harness disabled={[makeKey(0, 1)]} />));
      
      expect(rendered).toEqual([makeKey(0, 0), makeKey(0, 1)]);
    });
  });
});
