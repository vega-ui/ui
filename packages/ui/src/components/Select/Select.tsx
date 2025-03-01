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
import { OptionProps } from '../Option';
import { SelectCombobox, SelectListbox } from './components';
import { useControlledState } from '@adara-cs/hooks';
import { SelectProvider } from './providers';
import { VisuallyHidden } from '../VisuallyHidden';

export type SelectEvent = MouseEvent | null | KeyboardEvent

export interface SelectProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  listboxClassName?: string
  wrapperClassName?: string
  valueClassName?: string
  placeholderClassName?: string
  className?: string
  children?: ReactElement<OptionProps> | ReactElement<OptionProps>[]
  startSlot?: ReactNode
  endSlot?: ReactNode
  valueSlot?: ReactNode
  placeholderSlot?: ReactNode
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  variant?: 'inline' | 'field'
  size?: 'small' | 'medium' | 'large'
  comboboxRef?: Ref<HTMLElement>
  fullWidthListbox?: boolean
  value?: string | number | undefined
  defaultValue?: string | number | undefined
  onSelect?(event: SelectEvent, value: string | number | undefined): void
  ref?: Ref<HTMLButtonElement>
  name?: string
}

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
      <VisuallyHidden name={name} defaultValue={value} aria-hidden='true' tabIndex={-1} as='select'>
        {options?.map(({ label, value: optionValue }) => (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        ))}
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