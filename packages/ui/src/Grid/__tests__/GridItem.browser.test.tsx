import { ComponentProps, Profiler, ProfilerOnRenderCallback } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Grid } from '../Grid';
import { GridCell, GridItem, GridRow, GridRowGroup } from '../components';

const makeKey = (row: number, col: number) => `${row}:${col}`;

const Cell = ({ col, ...props }: { col: number } & ComponentProps<typeof GridItem>) => (
  <GridCell col={col} asChild>
    <GridItem {...props} />
  </GridCell>
);

const ItemsTest = (props: Partial<ComponentProps<typeof Grid>>) => (
  <Grid aria-label='Grid' wrap='horizontal' {...props}>
    <GridRowGroup>
      {[0, 1].map((row) => (
        <GridRow key={row} row={row}>
          {[0, 1, 2].map((col) => (
            <Cell key={col} col={col} data-testid={makeKey(row, col)}>
              {makeKey(row, col)}
            </Cell>
          ))}
        </GridRow>
      ))}
    </GridRowGroup>
  </Grid>
);

const getCell = (r: RenderResult, row: number, col: number) => r.getByTestId(makeKey(row, col));

afterEach(cleanup);

describe('GridItem', () => {
  describe('Critical User Paths', () => {
    it('renders as the grid cell inside GridCell asChild', async () => {
      const r = render(<ItemsTest selection='single' />);

      await userEvent.click(getCell(r, 1, 2));

      await expect.element(getCell(r, 1, 2)).toHaveAttribute('role', 'gridcell');
      await expect.element(getCell(r, 1, 2)).toHaveAttribute('aria-selected', 'true');
    });

    it('sets data-range="start" | "between" | "end" on the cells of a range', async () => {
      const r = render(<ItemsTest selection='range' />);

      getCell(r, 0, 0).focus();
      await userEvent.keyboard(' ');
      await userEvent.keyboard('{Shift>}{ArrowRight}{ArrowRight}{/Shift}');

      await expect.element(getCell(r, 0, 0)).toHaveAttribute('data-range', 'start');
      await expect.element(getCell(r, 0, 1)).toHaveAttribute('data-range', 'between');
      await expect.element(getCell(r, 0, 2)).toHaveAttribute('data-range', 'end');
      await expect.element(getCell(r, 1, 0)).not.toHaveAttribute('data-range');
    });

  });

  describe('Performance', () => {
    const renders = new Map<string, number>();

    const onRender: ProfilerOnRenderCallback = (id) => {
      renders.set(id, (renders.get(id) ?? 0) + 1);
    };

    const items = (
      <GridRowGroup>
        {[0, 1, 2].map((row) => (
          <GridRow key={row} row={row}>
            {[0, 1, 2].map((col) => (
              <Profiler key={col} id={makeKey(row, col)} onRender={onRender}>
                <Cell data-testid={makeKey(row, col)} col={col}>
                  {makeKey(row, col)}
                </Cell>
              </Profiler>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    );

    const settle = () => new Promise((resolve) => setTimeout(resolve, 50));

    const measure = async (action: () => unknown) => {
      await settle();
      renders.clear();
      await action();
      await settle();

      return Object.fromEntries(renders);
    };

    it('ArrowRight re-renders only the two items whose active state changes', async () => {
      const r = render(<Grid aria-label='Grid' selection='single' defaultActive={makeKey(1, 1)}>{items}</Grid>);
      getCell(r, 1, 1).focus();

      const rendered = await measure(() => userEvent.keyboard('{ArrowRight}'));

      await expect.element(getCell(r, 1, 2)).toHaveFocus();
      expect(rendered).toEqual({ [makeKey(1, 1)]: 1, [makeKey(1, 2)]: 1 });
    });

    it('extending a range re-renders only the items whose range position changes', async () => {
      const r = render(
        <Grid aria-label='Grid' selection='range' defaultValue={[makeKey(0, 0), makeKey(0, 1)]} defaultActive={makeKey(0, 1)}>
          {items}
        </Grid>
      );
      getCell(r, 0, 1).focus();

      const rendered = await measure(() => userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}'));

      await expect.element(getCell(r, 0, 2)).toHaveAttribute('data-range', 'end');
      expect(Object.keys(rendered).sort()).toEqual([makeKey(0, 1), makeKey(0, 2)]);
    });
  });
});
