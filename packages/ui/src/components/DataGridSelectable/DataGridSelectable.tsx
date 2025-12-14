import {
  KeyboardEvent,
  PropsWithChildren,
  PointerEvent,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { DataGrid, DataGridProps, DataGridResolveValue } from '../DataGrid';
import { DataGridApiRef, DataGridCellKey } from '../DataGrid';
import { DataGridDisabled, DataGridSelection } from './types';
import { DataGridSelectableProvider } from './contexts';
import { Grid, MatrixNode, mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { useControlledState, useSelection } from '@vega-ui/hooks';
import { getCellKey } from './helpers';

export interface DataGridSelectableProps<K extends DataGridCellKey = DataGridCellKey, S extends DataGridSelection = 'single'> extends DataGridProps<K> {
  /**
   * Selection mode.
   * - `'single'` — only one cell can be selected at a time
   * - `'multiple'` — independent multi-selection (toggle per cell)
   * - `'range'` — range selection between two points (Shift + arrows or pointer drag)
   *
   * @default 'single'
   */
  selection?: S;
  
  /**
   * Predicate or map of disabled cells.
   * Can be:
   * - a function `(key) => boolean`
   * - an array of disabled keys
   * - a single key
   *
   * Disabled cells cannot be selected or focused.
   */
  disabled?: DataGridDisabled<K>;
  
  excludeDisabled?: boolean
  
  /**
   * Enables expanding selection ranges (Shift + Arrow or mouse drag).
   *
   * @default true
   */
  expandable?: boolean;
  
  /**
   * Uncontrolled initial active cell.
   */
  defaultActive?: K;
  
  /**
   * Controlled active cell.
   */
  active?: K;
  
  /**
   * Controlled selected cells.
   */
  selected?: (S extends 'single' ? K : K[]) | undefined;
  
  /**
   * Uncontrolled initial selected cells.
   */
  defaultSelected?: (S extends 'single' ? K : K[]) | undefined;
  
  /**
   * Range boundaries.
   * If provided, limits selection to cells between `from` and `to`
   * based on the `compare` function.
   */
  from?: K;
  to?: K;
  
  /**
   * Custom range resolution logic for `selection="range"`.
   * Given start and end values, returns the list of keys forming the range.
   */
  resolveRange?(
    start: DataGridResolveValue<K>,
    end: DataGridResolveValue<K>,
    grid: Grid<HTMLElement, K>
  ): K[];
  
  /**
   * Custom equality comparator for comparing two cell keys.
   * Defaults to strict equality (`===`).
   */
  equals?(start: K | undefined, end: K | undefined): boolean;
  
  /**
   * Custom ordering comparator for comparing two cell keys.
   * Should return `-1`, `0`, or `1`.
   */
  compare?(a: K, b: K): -1 | 0 | 1;
  /**
   * Fires when the user selects cell.
   * Receives the list of selected cell keys.
   */
  onSelectCell?(value: S extends 'single' ? K : K[]): void;
  
  /**
   * Fires when the active (focused) cell changes.
   */
  onChangeActive?(active: K): void;
}

/**
 * DataGridSelectable extends `DataGrid` with a complete selection system.
 * It supports single, multiple, and range-based selections, keyboard
 * and pointer interactions, and integration with the low-level `Grid`
 * matrix via `apiRef`.
 */
export const DataGridSelectable = <K extends DataGridCellKey = DataGridCellKey, S extends DataGridSelection = 'single'>({
  to,
  from,
  children,
  disabled,
  expandable = true,
  exclude,
  excludeDisabled = true,
  selection = 'single' as S,
  apiRef: _apiRef,
  resolveRange: _resolveRange,
  equals: _equals,
  compare: _compare,
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
}: PropsWithChildren<DataGridSelectableProps<K, S>>) => {
  const [active, setActive] = useControlledState(_active, defaultActive ?? '' as K, onChangeActive)
  
  const apiRef = useRef<DataGridApiRef<K>>(null)
  const expanding = useRef(false)
  const index = useRef<0 | 1 | undefined>(undefined)
  const pointed = useRef<HTMLElement>(null)

  const equals = useCallback((a: K, b: K) => {
    if (_equals) return _equals(a, b)
    return a === b
  }, [_equals])
  
  const compare = useCallback((a: K, b: K) => {
    if (_compare) return _compare(a, b)
    return a < b ? -1 : a > b ? 1 : 0
  }, [_compare])
  
  const resolveRange = useCallback((start: K, end: K) => {
    const { grid, keyMap } = apiRef.current ?? {}
    const startCoord = keyMap?.get(start)
    const endCoord = keyMap?.get(end)
    
    if (!startCoord || !endCoord || !grid || !_resolveRange) return [start, end]
    
    if (grid.compare(startCoord, endCoord) > 0) return _resolveRange({ index: endCoord, key: end }, { index: startCoord, key: start }, grid)
    return _resolveRange({ index: startCoord, key: start }, { index: endCoord, key: end }, grid)
  }, [_resolveRange])

  const { expand, toggle, isSelected, isDisabled, selected, edges } = useSelection<K, S>({
    selection,
    equals,
    compare,
    disabled,
    resolveRange,
    onSelect: onSelectCell,
    min: from,
    max: to,
    selected: _selected,
    defaultSelected,
  })

  const onSelect = useCallback((key: K) => {
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
  
  const onMove = useCallback((e: KeyboardEvent<HTMLDivElement>, node: MatrixNode<HTMLElement, K>, axis: 0 | 1, dir: -1 | 1) => {
    _onMove?.(e, node, axis, dir)
    
    const keyMap = apiRef.current?.keyMap
    if (!keyMap) return;
    const [start] = edges()
    
    const edge = start !== undefined && active !== undefined
      ? equals(start, active) ? 0 : 1
      : undefined

    if (e.shiftKey && expandable && node.key !== undefined) expand(node.key, edge)
  }, [_onMove, active, edges, expand])
  
  const rangeExpandable = expandable && Array.isArray(selected) && selected.length !== 0 && selection === 'range'

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (!rangeExpandable) return
    
    const grid = apiRef.current?.grid
    if (!grid) return;

    const key = getCellKey<K>(event.target as HTMLElement, grid)
    if (key === undefined) return

    const [start, end] = edges()

    if (start !== undefined && equals(key, start)) index.current = 0
    if (end !== undefined && equals(key, end)) index.current = 1
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
    
    const key = getCellKey<K>(el as HTMLElement, grid)
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
  
  useEffect(() => {
    const controller = new AbortController()
    
    const onPointerUp = () => {
      index.current = undefined
      requestAnimationFrame(() => {
        expanding.current = false;
      })
    }
    
    document.addEventListener('pointerup', onPointerUp, { passive: true, signal: controller.signal })
    return () => controller.abort()
  }, [])
  
  const excluded = useCallback((key: K) => {
    if (excludeDisabled && isDisabled(key)) return true
    if (!exclude) return false
    
    if (Array.isArray(exclude)) return exclude.includes(key)
    if (typeof exclude === 'function') return exclude(key)
    
    return exclude === key
  }, [exclude, excludeDisabled, isDisabled])
  
  
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
        exclude={excluded}
        apiRef={mergeRefs([_apiRef, apiRef])}
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