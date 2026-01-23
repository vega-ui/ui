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
  DataGridExclude, DataGridCoordinates, DataGridCellKey,
  DataGridWrap, DataGridApiRef, DataGridExcludeResolver, DataGridScope,
} from './types';

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
   * Fires on each Arrow navigation step after focus changes
   */
  onArrow?(e: KeyboardEvent<HTMLDivElement>, node: MatrixNode<HTMLElement, K>, prevNode: MatrixNode<HTMLElement, K>): void;
}

/**
 * DataGrid is a focusable grid container that manages keyboard navigation
 * and active-cell focus. It supports Arrow, PageUp/PageDown, Home/End,
 * optional wrapping, exclusion of specific cells from traversal, and an
 * imperative API (`apiRef`) for advanced integrations.
 */
export const DataGrid = <K extends DataGridCellKey = DataGridCellKey>({
  wrap,
  children,
  apiRef,
  className,
  rowDelta,
  exclude,
  active: _active,
  defaultActive = '' as K,
  onChangeActive,
  onKeyDown: _onKeyDown,
  onArrow,
  ...props
}: PropsWithChildren<DataGridProps<K>>) => {
  const wrapH = ['horizontal', 'both'].includes(wrap ?? '')
  const wrapV = ['vertical', 'both'].includes(wrap ?? '')

  const grid = useGrid<HTMLDivElement, K>()
  const scopes = useMap<DataGridScope, DataGridCellKey[]>()

  const [active, setActive] = useControlledState<K>(_active, defaultActive ?? '' as K, onChangeActive)
  
  useImperativeHandle(apiRef, () => ({ grid, scopes }), [])

  const setItemRef = useCallback((coordinates: DataGridCoordinates, key: K, scope: DataGridScope) => (element: HTMLDivElement) => {
    grid.addNode(coordinates, key, element)
    
    const currentScope = scopes.get(scope) ?? []
    scopes.set(scope, [...currentScope, key])
  }, [])

  const removeItemRef = useCallback((coordinates: DataGridCoordinates, key: K, scope: DataGridScope) => {
    grid.removeNode(coordinates)
    
    const currentScope = scopes.get(scope) ?? []
    scopes.set(scope, currentScope.filter(v => v !== key))
    if (scopes.get(scope)?.length === 0) scopes.delete(scope)
  }, [])

  const changeFocus = (node: MatrixNode<HTMLElement, K>) => {
    node.payload?.focus()
  }

  const excluded = useCallback((key?: K) => {
    if (!key) return false
    
    if (typeof exclude === 'function') return (exclude as DataGridExcludeResolver<K>)(key)
    if (Array.isArray(exclude)) return exclude.includes(key)
    
    return key === exclude
  }, [exclude])
  
  const getNodeByArrowKey = (coordinates: [number, number], key: string) => {
    if (key === 'ArrowLeft') return grid.before(coordinates, 0, wrapH)
    if (key === 'ArrowRight') return grid.after(coordinates, 0, wrapH)
    if (key === 'ArrowDown') return grid.after(coordinates, 1, wrapV)
    if (key === 'ArrowUp') return grid.before(coordinates, 1, wrapV)
  }
  
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const activeNode = grid.getNodeByKey(active)
    if (!activeNode) return
    
    const activePosition = activeNode.index
    
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowDown':
      case 'ArrowUp': {
        e.preventDefault()
        
        const nextNode = getNodeByArrowKey(activePosition, e.key)
        if (!nextNode) return
        
        changeFocus(nextNode)
        onArrow?.(e, nextNode, activeNode)
        
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

        changeFocus(node)
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

        changeFocus(node)
        return
      }
      case 'Home': {
        e.preventDefault()

        if (e.ctrlKey) {
          const firstNode = grid.firstRow()?.first()
          if (!firstNode) return

          changeFocus(firstNode)
          return
        }

        const first = grid.getRow(activePosition[0])?.first()
        if (!first) return

        changeFocus(first)
        return
      }
      case 'End': {
        e.preventDefault()

        if (e.ctrlKey) {
          const lastNode = grid.lastRow()?.last()
          if (!lastNode) return

          changeFocus(lastNode)
          return
        }

        const last = grid.getRow(activePosition[0])?.last()
        if (!last) return

        changeFocus(last)
        return
      }
    }
  }

  return (
    <DataGridProvider
      grid={grid}
      active={active}
      scopes={scopes}
      excluded={excluded}
      setItemRef={setItemRef}
      changeActive={setActive}
      removeItemRef={removeItemRef}
    >
      <div
        role='grid'
        onKeyDown={mergeEventHandlers(onKeyDown, _onKeyDown)}
        className={csx(style.grid, className)}
        {...props}
      >
        {children}
      </div>
    </DataGridProvider>
  )
}