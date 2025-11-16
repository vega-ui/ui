import {
  FC,
  KeyboardEvent,
  PropsWithChildren,
  PointerEvent,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { DataGrid, DataGridProps, DataGridResolveValue } from '../DataGrid';
import { DataGridApiRef, DataGridCellKey } from '../DataGrid/types';
import { DataGridDisabled, DataGridSelection } from './types';
import { DataGridSelectableProvider } from './providers';
import { Grid, MatrixNode, mergeEventHandlers } from '@vega-ui/utils';
import { useControlledState, useSelection } from '@vega-ui/hooks';
import { getCellKey } from './helpers';

export interface DataGridSelectableProps extends DataGridProps {
  /**
   * Selection mode.
   * - `'single'` — only one cell can be selected at a time
   * - `'multiple'` — independent multi-selection (toggle per cell)
   * - `'range'` — range selection between two points (Shift + arrows or pointer drag)
   *
   * @default 'single'
   */
  selection?: DataGridSelection;
  
  /**
   * Predicate or map of disabled cells.
   * Can be:
   * - a function `(key) => boolean`
   * - an array of disabled keys
   * - a single key
   *
   * Disabled cells cannot be selected or focused.
   */
  disabled?: DataGridDisabled;
  
  /**
   * Enables expanding selection ranges (Shift + Arrow or mouse drag).
   *
   * @default true
   */
  expandable?: boolean;
  
  /**
   * Uncontrolled initial active cell.
   */
  defaultActive?: DataGridCellKey;
  
  /**
   * Controlled active cell.
   */
  active?: DataGridCellKey;
  
  /**
   * Controlled selected cells.
   */
  selected?: DataGridCellKey | DataGridCellKey[] | undefined;
  
  /**
   * Uncontrolled initial selected cells.
   */
  defaultSelected?: DataGridCellKey | DataGridCellKey[] | undefined;
  
  /**
   * Range boundaries.
   * If provided, limits selection to cells between `from` and `to`
   * based on the `compare` function.
   */
  from?: DataGridCellKey;
  to?: DataGridCellKey;
  
  /**
   * Custom range resolution logic for `selection="range"`.
   * Given start and end values, returns the list of keys forming the range.
   */
  resolveRange?(
    start: DataGridResolveValue,
    end: DataGridResolveValue,
    grid: Grid<HTMLElement, DataGridCellKey>
  ): Array<DataGridCellKey>;
  
  /**
   * Custom equality comparator for comparing two cell keys.
   * Defaults to strict equality (`===`).
   */
  equals?(start: DataGridCellKey | undefined, end: DataGridCellKey | undefined): boolean;
  
  /**
   * Custom ordering comparator for comparing two cell keys.
   * Should return `-1`, `0`, or `1`.
   */
  compare?(a: DataGridCellKey, b: DataGridCellKey): -1 | 0 | 1;
  
  /**
   * Determines if a given value equals the currently selected key(s).
   * Used to stabilize selection reactivity.
   */
  selectedEqual?(
    value: DataGridCellKey,
    selected: DataGridCellKey | DataGridCellKey[]
  ): boolean;
  
  /**
   * Fires when the user selects cell.
   * Receives the list of selected cell keys.
   */
  onSelectCell?(value: Array<DataGridCellKey>): void;
  
  /**
   * Fires when the active (focused) cell changes.
   */
  onChangeActive?(active: DataGridCellKey): void;
}

/**
 * DataGridSelectable extends `DataGrid` with a complete selection system.
 * It supports single, multiple, and range-based selections, keyboard
 * and pointer interactions, and integration with the low-level `Grid`
 * matrix via `apiRef`.
 */
export const DataGridSelectable: FC<PropsWithChildren<DataGridSelectableProps>> = ({
  to,
  from,
  children,
  disabled,
  expandable = true,
  selection = 'single',
  resolveRange,
  equals: _equals,
  compare: _compare,
  selectedEqual,
  active: _active,
  defaultActive,
  selected: _selected,
  defaultSelected,
  onSelectCell,
  onChangeActive,
  onMove: _onMove,
  onPointerDown: _onPointerDown,
  onPointerMove: _onPointerMove,
  ...props
}) => {
  const [active, setActive] = useControlledState(_active, defaultActive ?? '', onChangeActive)
  
  const apiRef = useRef<DataGridApiRef>(null)
  const expanding = useRef(false)
  const index = useRef<0 | 1 | undefined>(undefined)
  const pointed = useRef<HTMLElement>(null)

  const equals = useCallback((a: DataGridCellKey | undefined, b: DataGridCellKey | undefined) => {
    if (_equals) return _equals(a, b)
    return a === b
  }, [_equals])
  
  const compare = useCallback((a: DataGridCellKey, b: DataGridCellKey) => {
    if (_compare) return _compare(a, b)
    return a < b ? -1 : a > b ? 1 : 0
  }, [_compare])
  
  const rangeResolver = useCallback((start: DataGridCellKey, end: DataGridCellKey) => {
    const { grid, keyMap } = apiRef.current ?? {}
    const startCoord = keyMap?.get(start)
    const endCoord = keyMap?.get(end)
    
    if (!startCoord || !endCoord || !grid || !resolveRange) return [start, end]
    
    if (grid.compare(startCoord, endCoord) > 0) return resolveRange?.({ index: endCoord, key: end }, { index: startCoord, key: start }, grid)
    return resolveRange?.({ index: startCoord, key: start }, { index: endCoord, key: end }, grid)
  }, [resolveRange, compare])

  const { expand, toggle, isSelected, isDisabled, selected, edges } = useSelection<DataGridCellKey, typeof selection>({
    selection,
    equals,
    compare,
    disabled,
    resolveRange: rangeResolver,
    onSelect: onSelectCell,
    selectedEqual,
    min: from,
    max: to,
    selected: _selected,
    defaultSelected,
  })
  
  const onSelect = useCallback((key: DataGridCellKey) => {
    if (expanding.current) return
    const { keyMap, grid } = apiRef.current ?? {}
    if (!grid || !keyMap) return;
    const position = keyMap.get(key)
    if (!position) return
    
    const node = grid.getNode(position)
    if (!node || node.key === undefined) return

    toggle(node.key)
    setActive(node.key)
  }, [toggle])
  
  const onMove = useCallback((e: KeyboardEvent<HTMLDivElement>, node: MatrixNode<HTMLElement, DataGridCellKey>, axis: 0 | 1, dir: -1 | 1) => {
    _onMove?.(e, node, axis, dir)
    
    const keyMap = apiRef.current?.keyMap
    if (!keyMap) return;
    
    const [start] = edges()
    
    const edge = start !== undefined && active !== undefined
      ? equals(start, active) ? 0 : 1
      : undefined
    
    if (e.shiftKey && expandable && node.key !== undefined) expand(node.key, edge)
  }, [_onMove, edges, expand])
  
  const rangeExpandable = expandable && Array.isArray(selected) && selected.length !== 0 && selection === 'range'
  
  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (!rangeExpandable) return
    
    const grid = apiRef.current?.grid
    if (!grid) return;

    const key = getCellKey(event.target as HTMLElement, grid)
    if (key === undefined) return

    const [start, end] = edges()

    if (equals(key, start)) index.current = 0
    if (equals(key, end)) index.current = 1
    if (index.current === undefined) return
    
    expanding.current = true;
    pointed.current = event.target as HTMLElement
  }

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (index.current === undefined || !rangeExpandable) return

    const el = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null
    
    if (el === pointed.current) return;
    pointed.current = el;

    const grid = apiRef.current?.grid
    if (!grid) return;
    
    const key = getCellKey(el as HTMLElement, grid)
    if (key === undefined) return;

    const [start, end] = edges()

    if (start === undefined || end === undefined) {
      index.current = undefined
      return
    }

    expand(key, index.current)
    
    if (compare(key, end) > 0) index.current = 1
    if (compare(key, start) < 0) index.current = 0
  }
  
  const onPointerUp = useRef(() => {
    index.current = undefined
    expanding.current = false;
  })

  useEffect(() => {
    document.addEventListener('pointerup', onPointerUp.current, { passive: true })
    return () => document.removeEventListener('pointerup', onPointerUp.current)
  }, [])
  
  return (
    <DataGridSelectableProvider
      onSelect={onSelect}
      isDisabled={isDisabled}
      isSelected={isSelected}
      selection={selection}
      selected={selected}
      compare={compare}
      equals={equals}
    >
      <DataGrid
        {...props}
        apiRef={apiRef}
        active={active}
        onChangeActive={setActive}
        defaultActive={defaultActive}
        onMove={onMove}
        onPointerDown={mergeEventHandlers(onPointerDown, _onPointerDown)}
        onPointerMove={mergeEventHandlers(onPointerMove, _onPointerMove)}
      >
        {children}
      </DataGrid>
    </DataGridSelectableProvider>
  )
}