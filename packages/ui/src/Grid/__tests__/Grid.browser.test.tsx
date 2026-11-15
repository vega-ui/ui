import { ComponentProps, createRef, FC, Profiler, ProfilerOnRenderCallback, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { act, cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Grid } from '../Grid';
import { GridCell, GridColumnHeader, GridRow, GridRowGroup, GridScroller } from '../components';
import { GridKey } from '../types';
import { IndexedSnapScrollerContent, useIndexedSnapScrollerContext, type IndexedSnapScrollerApiRef } from '../../IndexedSnapScroller';

afterEach(cleanup);

const makeKey = (row: number, col: number) => `${row}:${col}`;

const GridTest = (props: Partial<ComponentProps<typeof Grid>>) => {
  return (
    <Grid defaultActive={makeKey(0, 0)} {...props}>
      <GridRowGroup>
        <GridRow row={0}>
          <GridCell data-testid={makeKey(0, 0)} col={0} />
          <GridCell data-testid={makeKey(0, 1)} col={1} />
          <GridCell data-testid={makeKey(0, 2)} col={2} />
        </GridRow>
        
        <GridRow row={1}>
          <GridCell data-testid={makeKey(1, 0)} col={0} />
          <GridCell data-testid={makeKey(1, 1)} col={1} />
          <GridCell data-testid={makeKey(1, 2)} col={2} />
        </GridRow>
      </GridRowGroup>
    </Grid>
  );
};

const getCell = (r: RenderResult, row: number, col: number) => r.getByTestId(makeKey(row, col));

describe('Grid', () => {
  describe('Critical User Paths', () => {
    describe('default (uncontrolled via defaultActive)', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<GridTest />);
      });
      
      describe('controlled/uncontrolled behavior', () => {
        it('updates tabbable cell when active prop changes from outside', async () => {
          r.rerender(<GridTest active={makeKey(0, 0)} onChangeActive={() => {}} />);
          
          await expect.element(getCell(r, 0, 0)).toHaveAttribute('tabindex', '0');
          
          r.rerender(<GridTest active={makeKey(1, 1)} onChangeActive={() => {}} />);
          
          await expect.element(getCell(r, 1, 1)).toHaveAttribute('tabindex', '0');
          await expect.element(getCell(r, 0, 0)).toHaveAttribute('tabindex', '-1');
        });
      });
    });
    
    describe('getNextKey', () => {
      it('focuses a cell that renders after it becomes active', async () => {
        const Lazy = () => {
          const [rows, setRows] = useState(1);

          return (
            <Grid
              defaultActive={makeKey(0, 0)}
              getNextKey={(intent, _from, next) => intent === 'down' ? makeKey(1, 0) : next}
              onChangeActive={(key) => {
                if (key === makeKey(1, 0)) setRows(2);
              }}
            >
              <GridRowGroup>
                {Array.from({ length: rows }, (_, row) => (
                  <GridRow key={row} row={row}>
                    <GridCell data-testid={makeKey(row, 0)} col={0} />
                  </GridRow>
                ))}
              </GridRowGroup>
            </Grid>
          );
        };

        const r = render(<Lazy />);

        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowDown}');

        await expect.element(getCell(r, 1, 0)).toHaveFocus();
        await expect.element(getCell(r, 1, 0)).toHaveAttribute('tabindex', '0');
      });
    });

    describe('GridScroller', () => {
      it('makes the first cell of the page scrolled into view the active cell', async () => {
        const apiRef = createRef<IndexedSnapScrollerApiRef>();

        const Page = () => {
          const { index } = useIndexedSnapScrollerContext();

          return (
            <GridRowGroup>
              <GridRow row={index}>
                <GridCell data-testid={makeKey(index, 0)} col={0}>{index}</GridCell>
                <GridCell data-testid={makeKey(index, 1)} col={1}>{index}</GridCell>
              </GridRow>
            </GridRowGroup>
          );
        };

        const r = render(
          <Grid aria-label='Pages' defaultActive={makeKey(0, 1)} style={{ width: 200 }}>
            <GridScroller apiRef={apiRef} defaultIndex={0}>
              <IndexedSnapScrollerContent style={{ width: '100%' }}>
                <Page />
              </IndexedSnapScrollerContent>
            </GridScroller>
          </Grid>
        );

        await expect.poll(() => apiRef.current).not.toBeNull();
        apiRef.current?.next();

        await expect.element(getCell(r, 1, 0)).toHaveAttribute('tabindex', '0');
      });
    });
  });

  describe('Error handling', () => {
    it('controlled active without onChangeActive: keeps the tabbable cell', async () => {
      const Test: FC = () => (
        <Grid active={makeKey(0, 0)}>
          <GridRowGroup>
            <GridRow row={0}>
              <GridCell col={0} data-testid='cell-0-0'>
                0:0
              </GridCell>
              <GridCell col={1} data-testid='cell-0-1'>
                0:1
              </GridCell>
            </GridRow>
          </GridRowGroup>
        </Grid>
      );
      
      const r = render(<Test />);
      
      r.getByTestId('cell-0-0').focus();
      await userEvent.keyboard('{ArrowRight}');
      
      await expect.element(r.getByTestId('cell-0-0')).toHaveAttribute('tabindex', '0');
      await expect.element(r.getByTestId('cell-0-1')).toHaveAttribute('tabindex', '-1');
    });
  });
  
  describe('Edge Cases', () => {
    it('leaves the role to a control a component renders as the cell with asChild', async () => {
      const Action: FC<ComponentProps<'button'>> = (props) => <button type='button' {...props} />
      const r = render(
        <Grid aria-label='Grid'>
          <GridRowGroup>
            <GridRow row={0}>
              <GridCell col={0} asChild>
                <Action data-testid='action'>Go</Action>
              </GridCell>
              <GridCell col={1} asChild>
                <span data-testid='plain'>Plain</span>
              </GridCell>
            </GridRow>
          </GridRowGroup>
        </Grid>
      );

      await expect.element(r.getByTestId('action')).not.toHaveAttribute('role');
      await expect.element(r.getByTestId('plain')).toHaveAttribute('role', 'gridcell');
    });

    it('renders on table elements with asChild and navigates them', async () => {
      const r = render(
        <Grid aria-label='Grid' asChild>
          <table>
            <GridRowGroup asChild>
              <tbody>
                {[0, 1].map((row) => (
                  <GridRow key={row} row={row} asChild>
                    <tr>
                      {[0, 1].map((col) => (
                        <GridCell key={col} col={col} asChild>
                          <td data-testid={makeKey(row, col)}>{makeKey(row, col)}</td>
                        </GridCell>
                      ))}
                    </tr>
                  </GridRow>
                ))}
              </tbody>
            </GridRowGroup>
          </table>
        </Grid>
      );

      expect(r.getByRole('grid').tagName).toBe('TABLE');
      expect(r.getAllByRole('row')[0].tagName).toBe('TR');
      expect(getCell(r, 0, 0).getAttribute('role')).toBe('gridcell');

      getCell(r, 0, 0).focus();
      await userEvent.keyboard('{ArrowDown}{ArrowRight}');

      await expect.element(getCell(r, 1, 1)).toHaveFocus();
    });

    describe('right-to-left', () => {
      const renderRtl = (props?: Partial<ComponentProps<typeof Grid>>) => render(
        <div dir='rtl'>
          <GridTest {...props} />
        </div>
      );
    
      it('ArrowLeft moves to the next cell and ArrowRight to the previous one', async () => {
        const r = renderRtl();
      
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowLeft}');
        await expect.element(getCell(r, 0, 1)).toHaveFocus();
      
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getCell(r, 0, 0)).toHaveFocus();
      });
    
      it('follows the dir attribute of the grid itself', async () => {
        const r = render(<GridTest dir='rtl' />);
      
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowLeft}');
        await expect.element(getCell(r, 0, 1)).toHaveFocus();
      });
    });

    describe('exclusion changed after mount', () => {
      it('follows the excluded prop of a cell', async () => {
        const Test = ({ excluded }: { excluded: boolean }) => (
          <Grid defaultActive={makeKey(0, 0)}>
            <GridRowGroup>
              <GridRow row={0}>
                <GridCell data-testid={makeKey(0, 0)} col={0} />
                <GridCell data-testid={makeKey(0, 1)} col={1} excluded={excluded} />
                <GridCell data-testid={makeKey(0, 2)} col={2} />
              </GridRow>
            </GridRowGroup>
          </Grid>
        );

        const r = render(<Test excluded={false} />);

        r.rerender(<Test excluded />);
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}');

        await expect.element(getCell(r, 0, 2)).toHaveFocus();
      });
    });
  });
  
  describe('Accessibility', () => {
    describe('server rendering', () => {
      const getTabStops = (html: string) => {
        const container = document.createElement('div');
        container.innerHTML = html;

        return [...container.querySelectorAll('[tabindex="0"]')].map((cell) => cell.getAttribute('data-testid'));
      };

      it('renders the selected cell of a single selection as the tab stop without an active cell', () => {
        const html = renderToString(<GridTest defaultActive={undefined} selection='single' defaultValue={makeKey(1, 2)} />);

        expect(getTabStops(html)).toEqual([makeKey(1, 2)]);
      });

      it('renders the active cell as the tab stop over the selected one', () => {
        const html = renderToString(<GridTest selection='single' defaultValue={makeKey(1, 2)} />);

        expect(getTabStops(html)).toEqual([makeKey(0, 0)]);
      });

      it('renders the first cell as the tab stop from cells without an active or a selected cell', () => {
        const cells = [0, 1].flatMap((row) => [0, 1, 2].map((col) => ({ key: makeKey(row, col), row, col })));
        const html = renderToString(<GridTest defaultActive={undefined} cells={cells} />);

        expect(getTabStops(html)).toEqual([makeKey(0, 0)]);
      });

      it('mounts the cells from data in one commit', async () => {
        const cells = [0, 1].flatMap((row) => [0, 1, 2].map((col) => ({ key: makeKey(row, col), row, col })));
        const commits: string[] = [];
        const onRender: ProfilerOnRenderCallback = (id) => { commits.push(id); };

        render(
          <Profiler id='grid' onRender={onRender}>
            <GridTest defaultActive={undefined} cells={cells} />
          </Profiler>,
        );
        await act(async () => { await Promise.resolve(); });

        expect(commits).toEqual(['grid']);
      });
    });

    describe('headers', () => {
      const HeaderTest = (props: Partial<ComponentProps<typeof Grid>>) => (
        <Grid aria-label='Grid' defaultActive={makeKey(0, 0)} {...props}>
          <GridRow row={-1}>
            <GridColumnHeader col={0} data-testid='name'>
              <button type='button'>Name</button>
            </GridColumnHeader>
            <GridColumnHeader col={1} excluded data-testid='note'>Note</GridColumnHeader>
          </GridRow>
          <GridRowGroup>
            {[0, 1].map((row) => (
              <GridRow key={row} row={row}>
                {[0, 1].map((col) => (
                  <GridCell key={col} col={col} data-testid={makeKey(row, col)}>{makeKey(row, col)}</GridCell>
                ))}
              </GridRow>
            ))}
          </GridRowGroup>
        </Grid>
      );

      it('reaches a header with a button by the arrows and enters it with Enter', async () => {
        const r = render(<HeaderTest />);

        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowUp}');
        await expect.element(r.getByTestId('name')).toHaveFocus();
        await expect.element(r.getByTestId('name')).toHaveAttribute('role', 'columnheader');

        await userEvent.keyboard('{Enter}');
        await expect.element(r.getByRole('button', { name: 'Name' })).toHaveFocus();
      });

      it('skips an excluded header', async () => {
        const r = render(<HeaderTest />);

        getCell(r, 0, 1).focus();
        await userEvent.keyboard('{ArrowUp}');

        await expect.element(getCell(r, 0, 1)).toHaveFocus();
        expect(r.getByTestId('note').hasAttribute('tabindex')).toBe(false);
      });

      it('is never selected, by click, Ctrl+A or Shift + arrows', async () => {
        const r = render(<HeaderTest selection='multiple' />);

        await userEvent.click(r.getByTestId('name'));
        getCell(r, 0, 0).focus();
        await userEvent.keyboard(' ');
        await userEvent.keyboard('{Shift>}{ArrowUp}{/Shift}');
        await userEvent.keyboard('{Control>}a{/Control}');

        expect(r.getByTestId('name').hasAttribute('aria-selected')).toBe(false);
        await expect.element(getCell(r, 1, 1)).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('cell content', () => {
      const ContentTest = (props: Partial<ComponentProps<typeof Grid>>) => (
        <>
          <button type='button' tabIndex={0}>before</button>
          <Grid aria-label='Grid' defaultActive={makeKey(0, 0)} {...props}>
            <GridRowGroup>
              <GridRow row={0}>
                <GridCell col={0} data-testid={makeKey(0, 0)}>0:0</GridCell>
                <GridCell col={1} data-testid={makeKey(0, 1)}>
                  <input aria-label='Note' defaultValue='ab' tabIndex={-1} />
                  <button type='button' tabIndex={-1}>Save</button>
                </GridCell>
              </GridRow>
              <GridRow row={1}>
                <GridCell col={0} data-testid={makeKey(1, 0)}>
                  <button type='button' tabIndex={-1}>Open</button>
                </GridCell>
                <GridCell col={1} data-testid={makeKey(1, 1)}>1:1</GridCell>
              </GridRow>
            </GridRowGroup>
          </Grid>
          <button type='button' tabIndex={0}>after</button>
        </>
      );

      it('Tab and Shift+Tab leave the grid past the content of the cells', async () => {
        const r = render(<ContentTest />);

        getCell(r, 0, 0).focus();
        await userEvent.tab();
        await expect.element(r.getByRole('button', { name: 'after' })).toHaveFocus();

        getCell(r, 0, 0).focus();
        await userEvent.tab({ shift: true });
        await expect.element(r.getByRole('button', { name: 'before' })).toHaveFocus();
      });

      it('Tab from outside lands on the active cell, not on the content of a cell before it', async () => {
        const r = render(<ContentTest defaultActive={makeKey(1, 1)} />);

        r.getByRole('button', { name: 'before' }).focus();
        await userEvent.tab();

        await expect.element(getCell(r, 1, 1)).toHaveFocus();
      });

      it('Shift+Tab from outside lands on the active cell, not on the content of a cell after it', async () => {
        const r = render(<ContentTest defaultActive={makeKey(0, 0)} />);

        r.getByRole('button', { name: 'after' }).focus();
        await userEvent.tab({ shift: true });

        await expect.element(getCell(r, 0, 0)).toHaveFocus();
      });

      it('Enter and F2 move the focus into the cell, Escape returns it to the cell', async () => {
        const r = render(<ContentTest />);

        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}{Enter}');
        await expect.element(r.getByRole('textbox', { name: 'Note' })).toHaveFocus();

        await userEvent.keyboard('{Escape}');
        await expect.element(getCell(r, 0, 1)).toHaveFocus();

        await userEvent.keyboard('{F2}');
        await expect.element(r.getByRole('textbox', { name: 'Note' })).toHaveFocus();
      });

      it('Escape on a control with an open popup closes the popup and keeps the focus on the control', async () => {
        const Disclosure = () => {
          const [open, setOpen] = useState(true);

          return (
            <button type='button' aria-expanded={open} onKeyDown={(event) => event.key === 'Escape' && setOpen(false)}>
              Role
            </button>
          );
        };

        const r = render(
          <Grid aria-label='Grid' defaultActive={makeKey(0, 0)}>
            <GridRowGroup>
              <GridRow row={0}>
                <GridCell col={0} data-testid={makeKey(0, 0)}><Disclosure /></GridCell>
              </GridRow>
            </GridRowGroup>
          </Grid>,
        );
        const control = r.getByRole('button', { name: 'Role' });

        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{Enter}');
        await userEvent.keyboard('{Escape}');
        await expect.element(control).toHaveFocus();
        await expect.element(control).toHaveAttribute('aria-expanded', 'false');

        await userEvent.keyboard('{Escape}');
        await expect.element(getCell(r, 0, 0)).toHaveFocus();
      });

      it('Escape inside an open popover of a cell is left to the popover', async () => {
        const r = render(
          <Grid aria-label='Grid' defaultActive={makeKey(0, 0)}>
            <GridRowGroup>
              <GridRow row={0}>
                <GridCell col={0} data-testid={makeKey(0, 0)}>
                  <div popover='auto' data-testid='popup'>
                    <button type='button'>Pick</button>
                  </div>
                </GridCell>
              </GridRow>
            </GridRowGroup>
          </Grid>,
        );
        const popup = r.getByTestId('popup');

        popup.showPopover();
        r.getByRole('button', { name: 'Pick' }).focus();
        await userEvent.keyboard('{Escape}');

        expect(popup.matches(':popover-open')).toBe(false);
        expect(getCell(r, 0, 0)).not.toHaveFocus();
      });

      it('Tab inside an open popover of a cell is left to the browser', async () => {
        const r = render(
          <Grid aria-label='Grid' defaultActive={makeKey(0, 0)}>
            <GridRowGroup>
              <GridRow row={0}>
                <GridCell col={0} data-testid={makeKey(0, 0)}>
                  <button type='button'>Edit</button>
                  <div popover='manual' data-testid='popup'>
                    <button type='button'>Pick</button>
                  </div>
                </GridCell>
              </GridRow>
            </GridRowGroup>
          </Grid>,
        );

        r.getByTestId('popup').showPopover();
        r.getByRole('button', { name: 'Pick' }).focus();
        await userEvent.keyboard('{Tab}');

        await expect.element(r.getByRole('button', { name: 'Edit' })).not.toHaveFocus();
      });

      it('arrows inside an input move the caret, not the grid focus', async () => {
        const r = render(<ContentTest />);
        const input = r.getByRole('textbox', { name: 'Note' }) as HTMLInputElement;

        input.focus();
        input.setSelectionRange(2, 2);
        await userEvent.keyboard('{ArrowLeft}');
        expect(input.selectionStart).toBe(1);

        await userEvent.keyboard('{ArrowDown}');
        await expect.element(input).toHaveFocus();
      });

      it('Tab cycles through the content of the cell', async () => {
        const r = render(<ContentTest />);

        r.getByRole('textbox', { name: 'Note' }).focus();
        await userEvent.tab();
        await expect.element(r.getByRole('button', { name: 'Save' })).toHaveFocus();

        await userEvent.tab();
        await expect.element(r.getByRole('textbox', { name: 'Note' })).toHaveFocus();
      });

      it('focus inside a cell makes it the tab stop, and typing there does not select it', async () => {
        const r = render(<ContentTest selection='single' />);

        await userEvent.click(r.getByRole('textbox', { name: 'Note' }));
        await userEvent.keyboard(' ');

        await expect.element(getCell(r, 0, 1)).toHaveAttribute('tabindex', '0');
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('aria-selected', 'false');
      });

      it('Enter on a cell without content still selects it', async () => {
        const r = render(<ContentTest selection='single' />);

        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{Enter}');

        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('without selection', () => {
      it('marks the cells of disabled as aria-disabled and keeps them focusable', async () => {
        const r = render(<GridTest disabled={makeKey(0, 1)} />);

        await expect.element(getCell(r, 0, 1)).toHaveAttribute('aria-disabled', 'true');

        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}');

        await expect.element(getCell(r, 0, 1)).toHaveFocus();
      });
    });

    describe('keyboard', () => {
      it('moves by the new row order after the rows are reordered', async () => {
        const Sortable = ({ ids }: { ids: string[] }) => (
          <Grid aria-label='Grid' defaultActive='a'>
            <GridRowGroup>
              {ids.map((id, row) => (
                <GridRow key={id} row={row}>
                  <GridCell col={0} value={id} data-testid={id} />
                </GridRow>
              ))}
            </GridRowGroup>
          </Grid>
        );
        const r = render(<Sortable ids={['a', 'b', 'c']} />);

        r.rerender(<Sortable ids={['c', 'a', 'b']} />);
        r.getByTestId('a').focus();

        await userEvent.keyboard('{ArrowDown}');
        await expect.element(r.getByTestId('b')).toHaveFocus();

        await userEvent.keyboard('{ArrowUp}{ArrowUp}');
        await expect.element(r.getByTestId('c')).toHaveFocus();
      });

      it('keeps exactly one tabbable gridcell at a time', async () => {
        const r = render(<GridTest />);
        
        const getTabbables = () =>
          r
            .getAllByRole('gridcell')
            .filter((el) => (el as HTMLElement).getAttribute('tabindex') === '0');
        
        expect(getTabbables()).toHaveLength(1);
        
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}');
        
        expect(getTabbables()).toHaveLength(1);
      });
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
                <GridCell data-testid={makeKey(row, col)} col={col} />
              </Profiler>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    );

    const Harness = (props: Partial<ComponentProps<typeof Grid>>) => (
      <Grid defaultActive={makeKey(1, 1)} {...props}>
        {cells}
      </Grid>
    );

    const settle = () => new Promise((resolve) => setTimeout(resolve, 50));

    const measure = async (action: () => unknown) => {
      await settle();
      renders.clear();
      await action();
      await settle();

      return Object.fromEntries(renders);
    };

    it('ArrowRight re-renders only the two cells whose active state changes', async () => {
      const r = render(<Harness />);
      getCell(r, 1, 1).focus();

      const rendered = await measure(() => userEvent.keyboard('{ArrowRight}'));

      await expect.element(getCell(r, 1, 2)).toHaveFocus();
      expect(rendered).toEqual({ [makeKey(1, 1)]: 1, [makeKey(1, 2)]: 1 });
    });

    it('ArrowRight does not evaluate exclude again', async () => {
      const exclude = vi.fn<(key: GridKey) => boolean>(() => false);
      const r = render(<Harness exclude={exclude} />);
      getCell(r, 1, 1).focus();

      await settle();
      exclude.mockClear();
      await userEvent.keyboard('{ArrowRight}');
      await settle();

      await expect.element(getCell(r, 1, 2)).toHaveFocus();
      expect(exclude).not.toHaveBeenCalled();
    });

    it('changing exclude re-renders only the cells whose exclusion changes', async () => {
      const r = render(<Harness exclude={[makeKey(0, 0)]} />);

      const rendered = await measure(() => r.rerender(<Harness exclude={[makeKey(0, 1)]} />));

      expect(rendered).toEqual({ [makeKey(0, 0)]: 1, [makeKey(0, 1)]: 1 });
    });

    it('a parent re-render with the same props re-renders no cell', async () => {
      const r = render(<Harness exclude={[makeKey(0, 0)]} />);

      const rendered = await measure(() => r.rerender(<Harness exclude={[makeKey(0, 0)]} />));

      expect(rendered).toEqual({});
    });
  });
});
