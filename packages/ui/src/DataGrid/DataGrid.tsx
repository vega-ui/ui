import {
  HTMLAttributes,
  PropsWithChildren,
  KeyboardEvent,
  useCallback,
  useImperativeHandle,
  Ref,
} from 'react';
import style from './style.module.css'
import { csx, MatrixNode, mergeEventHandlers } from '@vega-ui/utils';
import { useControlledState, useGrid, useMap } from '@vega-ui/hooks';

import { DataGridProvider } from './contexts';
import {
  DataGridExclude,
  DataGridCoordinates,
  DataGridCellKey,
  DataGridWrap, DataGridApiRef, DataGridExcludeResolver,
} from './types.ts';

export interface DataGridProps<K extends DataGridCellKey = DataGridCellKey> extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref to the grid’s root element.
   */
  ref?: Ref<HTMLDivElement>;
  
  /**
   * Ref to the grid’s imperative API.
   * Exposes low-level structures for advanced scenarios:
   * - `grid` — matrix navigation helper
   * - `keyMap` — Map<K, [row, col]> for fast lookups
   */
  apiRef?: Ref<DataGridApiRef<K>>;
  
  /**
   * Navigation wrap mode.
   * - 'horizontal' — wrap across columns within the same row
   * - 'vertical'   — wrap across rows within the same column
   * - 'both'       — enable both behaviors
   * - undefined    — no wrapping
   */
  wrap?: DataGridWrap;
  
  /**
   * Uncontrolled initial active (focused) cell key.
   */
  defaultActive?: K;
  
  /**
   * Controlled active (focused) cell key.
   */
  active?: K;
  
  /**
   * Fires when the active (focused) cell key changes.
   */
  onChangeActive?(active: K): void;
  
  /**
   * Exclude cells from focus traversal.
   * Can be:
   * - a single key
   * - an array of keys
   * - a predicate `(key) => boolean`
   */
  exclude?: DataGridExclude<K>;
  
  /**
   * Page navigation row step for PageUp/PageDown.
   * - `undefined` — jump to the first/last row
   * - `number`    — move by N rows relative to the current row
   */
  rowDelta?: number;
  
  /**
   * Fires on each Arrow navigation step after focus changes.
   * @param e   Keyboard event
   * @param node Target matrix node (newly focused)
   * @param axis 0 — horizontal, 1 — vertical
   * @param dir  -1 — backward/up, 1 — forward/down
   */
  onMove?(
    e: KeyboardEvent<HTMLDivElement>,
    node: MatrixNode<HTMLElement, K>,
    axis: 0 | 1,
    dir: -1 | 1
  ): void;
}

/**
 * DataGrid is a focusable grid container that manages keyboard navigation
 * and active-cell focus. It supports Arrow, PageUp/PageDown, Home/End,
 * optional wrapping, exclusion of specific cells from traversal, and an
 * imperative API (`apiRef`) for advanced integrations.
 */
export const DataGrid = <K extends DataGridCellKey = DataGridCellKey>({
  children,
  apiRef,
  className,
  rowDelta,
  exclude,
  active: _active,
  defaultActive,
  onChangeActive,
  onKeyDown: _onKeyDown,
  wrap,
  ref,
  onMove,
  ...props
}: PropsWithChildren<DataGridProps<K>>) => {
  const wrapH = ['horizontal', 'both'].includes(wrap ?? '')
  const wrapV = ['vertical', 'both'].includes(wrap ?? '')

  const grid = useGrid<HTMLDivElement, K>()
  const keyMap = useMap<K, DataGridCoordinates>()
  
  useImperativeHandle(apiRef, () => ({
    grid,
    keyMap,
  }), [grid, keyMap])
  
  const [active, setActive] = useControlledState<K>(_active, defaultActive ?? '' as K, onChangeActive)

  const setItemRef = useCallback((coordinates: DataGridCoordinates, key: K) => (element: HTMLDivElement) => {
    keyMap.set(key, coordinates)
    grid.addNode(coordinates, key, element)
  }, [])
  
  const changeActive = (node: MatrixNode<HTMLElement, K>) => {
    if (node.key) setActive(node.key)
    node.payload?.focus()
  }

  const excluded = useCallback((key?: K) => {
    if (!key) return false
    
    if (typeof exclude === 'function') return (exclude as DataGridExcludeResolver<K>)(key)
    if (Array.isArray(exclude)) return exclude.includes(key)
    
    return key === exclude
  }, [exclude])
  
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const activePosition = keyMap.get(active)
    if (!activePosition) return
    
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowDown':
      case 'ArrowUp': {
        e.preventDefault()
        
        const getNode = (key: string) => {
          if (key === 'ArrowLeft') return grid.before(activePosition, 0, wrapH)
          if (key === 'ArrowRight') return grid.after(activePosition, 0, wrapH)
          if (key === 'ArrowDown') return grid.after(activePosition, 1, wrapV)
          if (key === 'ArrowUp') return grid.before(activePosition, 1, wrapV)
        }
        
        const nextNode = getNode(e.key)
        if (!nextNode) return
        
        changeActive(nextNode)
        
        const axis = ['ArrowLeft', 'ArrowRight'].includes(e.key) ? 0 : 1
        const dir = ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 1
        
        onMove?.(e, nextNode, axis, dir)
        
        return
      }
      case 'PageUp': {
        e.preventDefault()
        
        const firstRow = rowDelta !== undefined
          ? grid.getRowByDelta(activePosition[0], -rowDelta) ?? grid.firstRow()
          : grid.firstRow()
        if (!firstRow) return
        
        const node = grid.getNode([firstRow.index, activePosition[1]])
        if (!node) return
        
        changeActive(node)
        return
      }
      case 'PageDown': {
        e.preventDefault()
        
        const lastRow = rowDelta !== undefined
          ? grid.getRowByDelta(activePosition[0], rowDelta) ?? grid.lastRow()
          : grid.lastRow()
        if (!lastRow) return
        
        const node = grid.getNode([lastRow.index, activePosition[1]])
        if (!node) return
        
        changeActive(node)
        return
      }
      case 'Home': {
        e.preventDefault()
        
        if (e.ctrlKey) {
          const firstNode = grid.firstRow()?.first()
          if (!firstNode) return
          
          changeActive(firstNode)
          return
        }
        
        const first = grid.getRow(activePosition[0])?.first()
        if (!first) return
        
        changeActive(first)
        
        return
      }
      case 'End': {
        e.preventDefault()
        
        if (e.ctrlKey) {
          const lastNode = grid.lastRow()?.last()
          if (!lastNode) return
          
          changeActive(lastNode)
          return
        }
        
        const last = grid.getRow(activePosition[0])?.last()
        if (!last) return
        
        changeActive(last)
        
        return
      }
    }
  }

  return (
    <DataGridProvider
      active={active}
      onChangeActive={setActive}
      itemRef={setItemRef}
      excluded={excluded}
    >
      <div
        role='grid'
        ref={ref}
        onKeyDown={mergeEventHandlers(onKeyDown, _onKeyDown)}
        className={csx(style.grid, className)}
        {...props}
      >
        {children}
      </div>
    </DataGridProvider>
  )
}