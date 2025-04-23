'use client';

import {
  Children,
  FC,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
  useCallback,
  useMemo,
  useRef,
  useState,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole, useTransitionStyles,
  useTypeahead,
  FloatingList,
} from '@floating-ui/react';
import { csx, mergeRefs } from '@adara-cs/utils';
import styles from './style.module.css';
import { SelectCombobox, SelectListbox, SelectOptionProps } from './components';
import { useControlledState } from '@adara-cs/hooks';
import { SelectProvider } from './providers';
import { VisuallyHidden } from '../VisuallyHidden';

export type SelectEvent = MouseEvent | null | KeyboardEvent

export interface SelectProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  /**
   * Optional class name for the listbox (dropdown) container.
   */
  listboxClassName?: string

  /**
   * Optional class name for the outer wrapper of the Select component.
   */
  wrapperClassName?: string

  /**
   * Class name applied to the value container.
   */
  valueClassName?: string

  /**
   * Class name applied to the placeholder container when no value is selected.
   */
  placeholderClassName?: string

  /**
   * Custom class name applied to the root trigger button element.
   */
  className?: string

  /**
   * One or more `<SelectOption />` elements defining the selectable items.
   */
  children?: ReactElement<SelectOptionProps> | ReactElement<SelectOptionProps>[]

  /**
   * Optional content placed at the start (left) of the trigger button.
   * Useful for icons or labels.
   */
  startSlot?: ReactNode

  /**
   * Optional content placed at the end (right) of the trigger button.
   * Commonly used for chevrons or indicators.
   */
  endSlot?: ReactNode

  /**
   * Custom node to render in place of the selected value.
   */
  valueSlot?: ReactNode

  /**
   * Custom node to render when no value is selected.
   */
  placeholderSlot?: ReactNode

  /**
   * Fallback string shown when no value is selected and no `placeholderSlot` is provided.
   */
  placeholder?: string

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
  variant?: 'inline' | 'field'

  /**
   * Visual size of the select control.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Ref to the combobox or button element for DOM access or focus management.
   */
  comboboxRef?: Ref<HTMLElement>

  /**
   * Makes the dropdown listbox span the full width of the trigger.
   */
  fullWidthListbox?: boolean

  /**
   * The currently selected value (controlled).
   */
  value?: string | number | undefined

  /**
   * The default selected value (uncontrolled).
   */
  defaultValue?: string | number | undefined

  /**
   * Callback fired when an option is selected.
   *
   * @param event - The triggering event
   * @param value - The selected option value
   */
  onSelect?(event: SelectEvent, value: string | number | undefined): void

  /**
   * Ref to the trigger button element.
   */
  ref?: Ref<HTMLButtonElement>

  /**
   * Optional `name` for form integration.
   * Included in form submissions when value is set.
   */
  name?: string
}

/** A Select is a UI component that provides a dropdown menu of options from which users can choose one. It is commonly used for forms and filtering, offering a list of predefined values in a compact, accessible manner */
export const Select: FC<SelectProps> = ({
  listboxClassName,
  wrapperClassName,
  valueClassName,
  placeholderClassName,
  className,
  startSlot,
  valueSlot,
  endSlot,
  disabled = false,
  readOnly = false,
  placeholder,
  children,
  variant = 'field',
  size = 'medium',
  fullWidthListbox = false,
  value: controlledValue,
  defaultValue,
  onSelect,
  ref,
  name,
  ...props
}) => {
  const [value, setValue] = useControlledState(controlledValue, defaultValue)

  const placement = variant === 'inline' ? 'bottom' : 'bottom-start'
  const enabled = !disabled && !readOnly

  const options = useMemo(() => Children.count(children) !== 0
    ? Children.map(children, (child) => ({
          label: child?.props.children ?? '',
          value: child?.props.value ?? ''
        }))
    : [], [children])

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const selectedIndex = useMemo(() => options?.findIndex(v => v.value === value), [options, value])

  const { refs, floatingStyles, context } = useFloating<HTMLElement>({
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ padding: 10 })
    ],
    placement,
    open,
    onOpenChange: setOpen,
  });

  const click = useClick(context, { event: 'mousedown', enabled });
  const dismiss = useDismiss(context, { enabled });
  const role = useRole(context, { role: 'listbox' });

  const elementsRef = useRef([]);

  const listContentRef = useRef<(string | null)[]>(
    options
      ? options.map(
        v =>
          Array.isArray(v.label)
            ? v.label.filter(v => typeof v === 'string')
            : v.label
      ).flat() as string[]
      : []
  );

  const isTypingRef = useRef(false);

  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
    enabled
  });

  const onMatch = (index: number) => {
    if (open) {
      setActiveIndex(index)
      return
    }

    const newValue = options?.[index].value
    setValue(newValue)
    onSelect?.(null, newValue)
  }

  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    selectedIndex,
    onMatch,
    onTypingChange(isTyping) {
      isTypingRef.current = isTyping;
    },
    enabled
  });

  const { getReferenceProps: getSelectComboboxProps, getFloatingProps: getSelectListboxProps, getItemProps: getSelectOptionProps } = useInteractions([
    click,
    dismiss,
    role,
    listNav,
    typeahead,
  ]);

  const onSelectOption = useCallback((e: MouseEvent | KeyboardEvent, value: number | string | undefined) => {
    setValue(value)
    setOpen(false)
    onSelect?.(e, value)
  }, [onSelect, setValue])

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
  });

  const label = useMemo(() => options?.find(v => v.value === value)?.label, [value, options])

  return (
    <div className={csx(styles.wrapper, wrapperClassName)}>
      <VisuallyHidden>
        <select defaultValue={value} aria-hidden='true' tabIndex={-1} name={name}>
          {options?.map(({ label, value: optionValue }) => (
            <option key={optionValue} value={optionValue}>
              {label}
            </option>
          ))}
        </select>
      </VisuallyHidden>
      <SelectCombobox
        ref={mergeRefs([refs.setReference, ref])}
        size={size}
        className={className}
        disabled={disabled}
        readOnly={readOnly}
        variant={variant}
        placeholder={placeholder}
        valueClassName={valueClassName}
        placeholderClassName={placeholderClassName}
        endSlot={endSlot}
        startSlot={startSlot}
        valueSlot={valueSlot}
        withArrow={!readOnly}
        open={open}
        {...getSelectComboboxProps(props)}
      >
        {label}
      </SelectCombobox>
      <SelectProvider
        size={size}
        getItemProps={getSelectOptionProps}
        onSelect={onSelectOption}
        activeIndex={activeIndex}
        value={value}
      >
        <FloatingList elementsRef={elementsRef}>
          {open && (
            <FloatingFocusManager context={context} modal={false}>
              <SelectListbox
                ref={refs.setFloating}
                className={listboxClassName}
                fullWidth={fullWidthListbox}
                style={{ ...floatingStyles, ...transitionStyles }}
                {...getSelectListboxProps()}
              >
                {children}
              </SelectListbox>
            </FloatingFocusManager>
          )}
        </FloatingList>
      </SelectProvider>
    </div>
  )
}