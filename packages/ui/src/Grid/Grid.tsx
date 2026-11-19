import { HTMLAttributes, PropsWithChildren, Ref, useImperativeHandle, useState } from 'react';
import { createInput } from '@vega-ui/core';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput, useWidget, widgetEnvironment } from '../internals/widget';
import { csx } from '@vega-ui/utils';
import {
  GridKeys,
  GridKey,
  GridWrap,
  GridApiRef,
  GridIntent,
  GridLayoutCell,
  GridSelection,
} from './types';
import { createGrid, FOCUS, GridEntry, GridValue } from '@vega-ui/widgets/grid'
import { eraseKey, GridProvider } from './contexts';
import { Slot } from '../Slot';
import style from './style.module.css';

export interface GridProps<Key extends GridKey = GridKey, SelectionMode extends GridSelection | undefined = undefined> extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /**
   * Ref to the grid’s root element.
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Ref to the grid’s imperative API.
   * - `focus(key?)` — moves focus to the cell with this key, or to the tab stop without one; a cell that is not rendered yet becomes the active cell and takes focus as soon as it renders
   */
  apiRef?: Ref<GridApiRef<Key>>;

  /**
   * When `true`, renders the child element instead of a `<div>`, merging the props,
   * for example a `<table>`.
   *
   * @default false
   */
  asChild?: boolean;

  /**
   * The cells of the grid as data: the key, row and column of every cell, whether it is rendered or not.
   * With it the grid knows its cells before they render: the server HTML has the right tab stop, the cells
   * mount in one commit, the arrow keys and Shift + arrows move through cells that are not rendered, and
   * `compare`, `getNextKey` and `resolveRange` are not needed for a grid that renders only part of its cells.
   * A rendered cell that is not in `cells` is not seen by the grid.
   * Without it the grid learns its cells from the rendered `GridCell`s.
   */
  cells?: readonly GridLayoutCell<Key>[];

  /**
   * Navigation wrap mode.
   * - 'horizontal' — wrap across columns within the same row
   * - 'vertical'   — wrap across rows within the same column
   * - 'both'       — enable both behaviors
   * - undefined    — no wrapping
   */
  wrap?: GridWrap;

  /**
   * Uncontrolled initial active (focused) cell key.
   * Without it, or when it is not focusable, the tab stop is the first selected focusable cell,
   * otherwise the first focusable cell. Pass it to a server-rendered grid: without it only the selected
   * cell of `selection='single'` is a tab stop in the server HTML.
   */
  defaultActive?: Key;

  /**
   * Controlled active (focused) cell key.
   */
  active?: Key;

  /**
   * Fires when the active (focused) cell key changes.
   */
  onChangeActive?: (active: Key) => void;

  /**
   * Exclude cells from focus traversal: excluded cells are not focusable at all.
   * Can be:
   * - a single key
   * - an array of keys
   * - a predicate `(key) => boolean`
   */
  exclude?: GridKeys<Key>;

  /**
   * Overrides keyboard navigation. Receives the navigation intent (`forward` and `backward`
   * follow the text direction), the key of the cell it starts from and the key the grid
   * would move to by default, and returns the key to move to, or `undefined` to stay.
   * A key of a cell that is not rendered yet becomes the active cell and takes focus
   * as soon as it renders.
   */
  getNextKey?: (intent: GridIntent, from: Key, next: Key | undefined) => Key | undefined;

  /**
   * Selection mode. Without it the grid has no selection: cells have no
   * `aria-selected` and clicks do not select.
   * - `'single'` — only one cell can be selected at a time
   * - `'multiple'` — independent multi-selection, the recommended model of the WAI-ARIA listbox pattern: a click, Enter or Space toggles a cell, moving the focus keeps the selection, Shift + arrows add the cells from the most recently selected one, Shift + Space selects from the most recently selected cell to the focused one, a pointer drag adds the cells in between, and Ctrl+A or Command+A selects all
   * - `'range'` — range selection between two points (Shift + arrows or pointer drag); it has no select all
   */
  selection?: SelectionMode;

  /**
   * Disabled cells, marked with `aria-disabled`: they stay focusable but cannot be selected,
   * and a range never starts or ends on them.
   * To skip them in keyboard navigation, pass them to `exclude` too.
   * Can be:
   * - a function `(key) => boolean`
   * - an array of disabled keys
   * - a single key
   */
  disabled?: GridKeys<Key>;

  /**
   * Makes the selection read-only like a native `readonly` input: the grid gets
   * `aria-readonly="true"`, navigation still works, and selecting a cell neither
   * changes the selection nor calls `onChangeValue`.
   */
  readOnly?: boolean;

  /**
   * Controlled selected cells: a key in `'single'` mode, an array of keys otherwise.
   * In `'single'` mode `null` means controlled with nothing selected.
   */
  value?: (SelectionMode extends 'multiple' | 'range' ? Key[] : SelectionMode extends 'single' ? Key | null : never) | undefined;

  /**
   * Uncontrolled initially selected cells.
   */
  defaultValue?: NoInfer<SelectionMode extends 'multiple' | 'range' ? Key[] : SelectionMode extends 'single' ? Key : never> | undefined;

  /**
   * The smallest key that can be selected, by the `compare` order, or by position without `compare`.
   */
  min?: (SelectionMode extends GridSelection ? Key : never) | undefined;

  /**
   * The largest key that can be selected, by the `compare` order, or by position without `compare`.
   */
  max?: (SelectionMode extends GridSelection ? Key : never) | undefined;

  /**
   * Given the start and the end key, ordered by `compare`, returns the list of keys forming the range.
   * With `selection="range"` it resolves the range. With `selection="multiple"` Shift + arrows,
   * a pointer drag and Ctrl+A take their keys from it instead of the rendered cells, and Ctrl+A
   * selects the range from the `gridStart` to the `gridEnd` key of `getNextKey`: pass both when not
   * every cell is rendered, as in a virtualized grid. Return only the keys that can be selected.
   */
  resolveRange?: (start: Key, end: Key) => Key[];

  /**
   * Orders two cell keys for ranges, `min` and `max`, like the compare function of `Array.prototype.sort`:
   * a negative number when `a` comes first, a positive number when `b` comes first, and `0` for the same place.
   * Without it the cells are ordered by their position, the row and then the column, and a key
   * of a cell that is not rendered is not ordered: pass it for keys with an order of their own,
   * like dates, and for grids that render only part of their cells.
   */
  compare?: (a: Key, b: Key) => number;

  /**
   * Fires when the user changes the selection, with the new value:
   * a key in `'single'` mode, an array of keys otherwise.
   */
  onChangeValue?: (value: SelectionMode extends 'multiple' | 'range' ? Key[] : SelectionMode extends 'single' ? Key : never) => void;
}

/**
 * Grid is a focusable grid container that manages keyboard navigation
 * and active-cell focus. It supports Arrow, PageUp/PageDown, Home/End,
 * optional wrapping, exclusion of specific cells from traversal, and an
 * imperative API (`apiRef`) to move focus to a cell.
 *
 * ArrowLeft / ArrowRight follow the text direction of the grid, so they are
 * mirrored in a right-to-left context.
 *
 * With `selection` it implements the selection of the WAI-ARIA grid pattern:
 * single, multiple, and range selection with the keyboard and the pointer.
 *
 * There is always exactly one tab stop when the grid has a focusable cell:
 * the active cell when it is focusable, otherwise the first selected
 * focusable cell, otherwise the first focusable cell.
 */
export const Grid = <Key extends GridKey = GridKey, SelectionMode extends GridSelection | undefined = undefined>({
  cells,
  wrap,
  exclude,
  active,
  defaultActive,
  apiRef,
  getNextKey,
  onChangeActive,
  selection,
  disabled,
  readOnly,
  value,
  defaultValue,
  min,
  max,
  resolveRange,
  compare,
  onChangeValue,
  asChild,
  className,
  children,
  ref,
  ...props
}: PropsWithChildren<GridProps<Key, SelectionMode>>) => {
  const [grid] = useState(() => createGrid<Key>())

  const handle = useWidget(grid, (entries: readonly GridEntry<Key>[]) => ({
    entries,
    cells,
    wrap,
    exclude,
    disabled,
    readOnly,
    selection,
    min,
    max,
    compare,
    resolveRange,
    getNextKey,
    active,
    defaultActive,
    onChangeActive: (key: Key | undefined) => {
      if (key !== undefined) onChangeActive?.(key)
    },
    value,
    defaultValue,
    onChangeValue: onChangeValue as ((value: GridValue<Key>) => void) | undefined,
  }), widgetEnvironment)

  useImperativeHandle(apiRef, () => ({ focus: (key?: Key) => void handle.send(createInput(FOCUS, { key })) }), [handle])

  const Element = asChild ? Slot : 'div'
  const attrs = useOutput(handle, grid.output.root)
  const rootRef = useMergeRefs([handle.root, ref])

  return (
    <GridProvider {...eraseKey({ handle, grid })}>
      <Element ref={rootRef} className={csx(style.grid, className)} {...handle.listen(attrs, props)}>
        {children}
      </Element>
    </GridProvider>
  )
}
