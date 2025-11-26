import { useCallback, useMemo } from 'react';
import { useControlledState } from './useControlledState';

export type Selection = 'single' | 'multiple' | 'range'
export type SelectedValue<M extends Selection, K> = M extends 'single' ? K : K[]
export type SelectionDisabledResolver<K> = ((value: K) => boolean)
export type SelectedDisabled<K> = K | K[] | SelectionDisabledResolver<K>

export interface UseSelectionOptions<K, M extends Selection> {
  selection: M;
  defaultSelected?: SelectedValue<M, K>;
  selected?: SelectedValue<M, K>;
  disabled?: SelectedDisabled<K>;
  equals?(a: K, b: K): boolean;
  compare: M extends 'range' ? (a: K, b: K) => -1 | 0 | 1 : never;
  resolveRange?: M extends 'range' ? (a: K, b: K) => K[] : never;
  onSelect?(selected: SelectedValue<M, K> | undefined): void;
  min?: K
  max?: K
}

export const useSelection = <K, const M extends Selection>({
  selection,
  defaultSelected = [] as SelectedValue<M, K>,
  disabled,
  selected: _selected,
  onSelect,
  equals,
  compare,
  resolveRange,
  min,
  max,
}: UseSelectionOptions<K, M>) => {
  const [selected, setSelected] = useControlledState<SelectedValue<M, K> | undefined>(_selected, defaultSelected, onSelect)

  const eq = useMemo(() => equals ?? ((a: K, b: K) => Object.is(a, b)), [equals])
  
  const edges = useCallback((): [K, K] | [] => {
    if (selection !== 'range') return []
    
    const range = selected as SelectedValue<'range', K>
    const start = range[0]
    const end = range[range.length - 1]
    
    if (compare(start, end) === 1) return [end, start]
    
    return [start, end]
  }, [selected, selection, compare])
  
  const isSelected = useCallback((key: K | undefined) => {
    if (selected === undefined || key === undefined) return false
    
    if (Array.isArray(selected)) {
      if (selection === 'range') {
        const [start, end] = edges()
        
        return eq(start, key) || eq(end, key) || (compare(key, start) > 0 && compare(key, end) < 0)
      }
      
      return selected.some(k => eq(k, key))
    }
    
    return eq(selected as SelectedValue<'single', K>, key)
  }, [selection, selected, eq, edges, compare])
  
  const isDisabled = useCallback((key?: K) => {
    if (key === undefined) return false
    if (typeof disabled === 'function') return (disabled as SelectionDisabledResolver<K>)(key)
    if (Array.isArray(disabled)) return disabled.includes(key)
    if (compare) {
      if (min && compare(key, min) === -1) return true
      if (max && compare?.(key, max) === 1) return true
    }
    
    return disabled === key
  }, [disabled, min, max, compare])
  
  const unselect = useCallback((key: K) => {
    if (selection === 'multiple') {
      const array = selected as SelectedValue<'multiple', K>
      const next = array.filter(k => !eq(k, key))
      setSelected(next as SelectedValue<M, K>)
      return
    }
    
    if (selection === 'range') {
      const array = selected as SelectedValue<'range', K>
      
      if (array.length === 0) return
      if (array.length === 1) {
        if (eq(array[0], key)) setSelected([] as SelectedValue<M, K>)
        return
      }

      setSelected([key] as SelectedValue<M, K>)
    }
  }, [eq, selected])

  const select = useCallback((key: K) => {
    if (isDisabled(key)) return
    
    if (selection === 'range') {
      const array = selected as SelectedValue<'range', K>

      if (array.length === 0) {
        setSelected([key] as SelectedValue<M, K>)
        return
      }
      
      const start = array[0]
      if (eq(start, key)) return

      if (array.length === 1) {
        const range = resolveRange
          ? resolveRange(start, key)
          : [start, key]
        setSelected(range as SelectedValue<M, K>)
        return
      }
      
      setSelected([key] as SelectedValue<M, K>)
      return
    }
    
    if (selection === 'multiple') {
      const array = selected as SelectedValue<'multiple', K>
      if (array.some(k => eq(k, key))) return
      const next = [...array, key]
      setSelected(next as SelectedValue<M, K>)
      return
    }
    
    setSelected(key as SelectedValue<M, K>)
  }, [selection, selected, eq, resolveRange, isDisabled])

  const resolvedRange = useCallback((start: K, end: K): SelectedValue<M, K> => {
    const value = resolveRange ? resolveRange(start, end) : [start, end]
    return value as SelectedValue<M, K>
  }, [resolveRange])
  
  const expand = useCallback((key: K, edge?: 0 | 1) => {
    if (selection !== 'range' || !compare) return

    const [start, end] = edges()

    if (start === undefined) return
    
    if ((end === undefined) || eq(start, end)) {
      setSelected(resolvedRange(start, key))
      return
    }
    
    // end expanded
    if (edge === 1) {
      setSelected(resolvedRange(start, key))
      return
    }
    
    // start expanded
    if (edge === 0) {
      setSelected(resolvedRange(key, end))
      return
    }
    
    // key < start
    if (compare(key, start) < 0) {
      setSelected(resolvedRange(key, end))
      return
    }
    
    // key > end
    if (compare(key, end) > 0) {
      setSelected(resolvedRange(start, key))
      return
    }
  }, [selection, compare, eq, resolvedRange, edges])
  
  const toggle = useCallback((key: K) => {
    if (isSelected(key)) unselect(key)
    else select(key)
  }, [isSelected, unselect, select])
  
  return {
    toggle,
    select,
    unselect,
    expand,
    isSelected,
    isDisabled,
    edges,
    selected,
  }
}