'use client';

import { HTMLAttributes, Ref, useCallback, useRef, useState } from 'react';
import {
  flip,
  offset,
  useRole,
  useClick,
  useDismiss,
  autoUpdate,
  useFloating,
  useTypeahead,
  useInteractions,
  useListNavigation,
  useTransitionStatus,
  shift,
} from '@floating-ui/react';
import { csx, mergeRefs } from '@vega-ui/utils';
import styles from './style.module.css';
import { useControlledState, useMap, useSelection } from '@vega-ui/hooks';
import { SelectOptionsProvider, SelectProvider } from './contexts';
import { SelectNativeOption, SelectSize, SelectVariant } from './types';

export interface SelectProps<V extends string | number = string> extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the select is disabled.
   * Prevents interaction and applies a disabled style.
   */
  disabled?: boolean

  /**
   * If true, the select cannot be changed but remains focusable.
   */
  readOnly?: boolean

  /**
   * Visual style variant for the select control.
   */
  variant?: SelectVariant

  /**
   * Visual size of the select control.
   */
  size?: SelectSize

  /**
   * The currently selected value (controlled).
   */
  value?: V | undefined

  /**
   * The default selected value (uncontrolled).
   */
  defaultValue?: V | undefined

  /**
   * Callback fired when an option is selected.
   *
   * @param value - The selected option value
   */
  onSelectValue?(value: V | undefined): void

  /**
   * Ref to the trigger button element.
   */
  ref?: Ref<HTMLDivElement>
  
  /**
   * Controls the open state of the Select dropdown.
   *
   * When provided, the Select becomes a controlled component
   * and relies on this value to determine whether the listbox
   * is open or closed.
   */
  open?: boolean
  
  /**
   * Callback fired when the open state changes.
   *
   * Called with the next open state (`true` or `false`)
   * whenever the Select is opened or closed by user interaction.
   *
   * Useful for synchronizing the Select state with external logic.
   */
  onOpenChange?(open: boolean): void
  
  /**
   * Sets the initial open state of the Select when used
   * in uncontrolled mode.
   *
   * Applied only on the first render and ignored afterward.
   */
  defaultOpen?: boolean
  
  /**
   * Enables type-based matching for typeahead navigation.
   *
   * When enabled, option matching respects the value type.
   *
   * @default true
   */
  typeMatchEnabled?: boolean
}

/** A Select is a UI component that provides a dropdown menu of options from which users can choose one. It is commonly used for forms and filtering, offering a list of predefined values in a compact, accessible manner */
export const Select = <V extends string | number>({
  className,
  disabled = false,
  readOnly = false,
  children,
  variant = 'field',
  size = 'md',
  value,
  defaultValue = '' as V,
  onSelectValue,
  open: _open,
  defaultOpen = false,
  typeMatchEnabled = true,
  onOpenChange,
  ref,
  ...props
}: SelectProps<V>) => {
  const innerRef = useRef<HTMLDivElement>(null)
  
  const indexValueMap = useMap<number, V>()
  
  const { selected, select, isSelected } = useSelection<V, 'single'>({
    selection: 'single',
    defaultSelected: defaultValue,
    selected: value,
    onSelect: onSelectValue,
  })
  
  const [hasValueChildren, setHasValueChildren] = useState(false)
  const [options, setOptions] = useState<Array<SelectNativeOption<V>>>([])

  const placement = variant === 'inline' ? 'bottom' : 'bottom-start'
  const enabled = !disabled && !readOnly
  
  const valueRef = useRef<HTMLSpanElement>(null)

  const [open, setOpen] = useControlledState(_open, defaultOpen, onOpenChange);
  
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  
  const { floatingStyles, context } = useFloating({
    open,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), flip(), shift()],
    onOpenChange: setOpen,
  });

  const click = useClick(context, { enabled, event: 'mousedown' });
  const dismiss = useDismiss(context, { enabled, bubbles: false });
  const role = useRole(context, { enabled, role: 'listbox' });

  const elementsRef = useRef<HTMLElement[]>([]);
  const labelsRef = useRef<Array<string | null>>([]);
  
  const onMatch = (index: number) => {
    setActiveIndex(index)
    if (open) return
    
    setSelectedIndex(index)
    
    const value = indexValueMap.get(index)
    if (!value) return
    
    select(value)
  }
  
  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate(nextActive) {
      if (nextActive === null && !open) return
      setActiveIndex(nextActive)
    },
    loop: true,
    enabled,
    focusItemOnHover: false,
  });
  
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch,
    findMatch(list, search) {
      const q = search.trim().toLowerCase()
      return list.find(l => l?.toLowerCase().includes(q))
    },
    enabled: enabled && typeMatchEnabled,
  });

  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps
  } = useInteractions([
    click,
    dismiss,
    role,
    listNav,
    typeahead,
  ]);

  const onSelectOption = useCallback((index: number, value: V) => {
    setSelectedIndex(index)
    select(value)
    setOpen(false)
  }, [])

  const { status } = useTransitionStatus(context);
  
  const addOption = useCallback((option: SelectNativeOption<V>) => {
    const { index, ...data } = option
    indexValueMap.set(index, data.value)
    setOptions(p => [...p, option])
  }, [])
  
  const removeOption = useCallback((option: SelectNativeOption<V>) => {
    setOptions(p => p.filter(v => v.value !== option.value))
    indexValueMap.delete(option.index)
  }, [])
  
  return (
    <SelectProvider
      size={size}
      status={status}
      variant={variant}
      open={open}
      selectRef={innerRef}
      disabled={disabled}
      readOnly={readOnly}
      isSelected={isSelected}
      itemProps={getItemProps}
      listboxProps={getFloatingProps()}
      comboboxProps={getReferenceProps()}
      onSelect={onSelectOption}
      activeIndex={activeIndex}
      selectedIndex={selectedIndex}
      valueRef={valueRef}
      selected={selected}
      context={context}
      labelsRef={labelsRef}
      elementsRef={elementsRef}
      hasValueChildren={hasValueChildren}
      onHasValueChildrenChange={setHasValueChildren}
      listboxStyles={floatingStyles}
    >
      <SelectOptionsProvider
        options={options}
        addOption={addOption}
        removeOption={removeOption}
      >
        <div
          data-size={size}
          className={csx(styles.select, className)}
          ref={mergeRefs([ref, innerRef])}
          {...props}
        >
          {children}
        </div>
      </SelectOptionsProvider>
    </SelectProvider>
  )
}