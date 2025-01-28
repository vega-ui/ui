'use client';

import { Children, FC, HTMLAttributes, ReactElement, ReactNode, useMemo, useRef, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  useClick,
  useDismiss,
  useFloating, useInteractions, useListNavigation, useRole, useTransitionStyles, useTypeahead
} from '@floating-ui/react';
import { csx } from '@adara-cs/utils';
import styles from './style.module.css';
import { Text } from '../Text';
import { Icon, IconProps } from '../Icon';
import { Option, OptionProps } from '../Option';

export interface SelectProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  listboxClassName?: string
  comboboxClassName?: string
  wrapperClassName?: string
  valueClassName?: string
  placeholderClassName?: string
  className?: string
  children?: ReactElement<OptionProps> | ReactElement<OptionProps>[]
  startSlot?: ReactNode
  endSlot?: ReactNode
  valueSlot?: ReactNode
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  icon?: IconProps['name']
  iconSize?: IconProps['size']
  variant?: 'inline' | 'field'
  size?: 'small' | 'medium' | 'large'
  fullWidthListbox?: boolean
  value?: string | number | undefined
  onSelect?(value: string | number | undefined):void
}

export const Select: FC<SelectProps> = ({
  listboxClassName,
  comboboxClassName,
  wrapperClassName,
  valueClassName,
  placeholderClassName,
  className,
  startSlot,
  valueSlot,
  endSlot,
  disabled = false,
  readOnly = false,
  icon,
  iconSize,
  placeholder,
  children,
  variant = 'field',
  size: fieldSize = 'medium',
  onSelect: handleSelect,
  fullWidthListbox = true,
  value,
  ...props
}) => {
  const options = useMemo(() => Children.count(children) !== 0 ? Children.map(children, (child) => ({
    label: child?.props.children ?? '',
    value: child?.props.value ?? ''
  })) : [], [children])

  const selectedDefaultIndex = options?.findIndex(v => value === v.value)

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null | undefined>(selectedDefaultIndex !== -1 ? selectedDefaultIndex : null);

  const { refs, floatingStyles, context } = useFloating<HTMLElement>({
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ padding: 10 })
    ],
    placement: variant === 'inline' ? 'bottom' : 'bottom-start',
    open,
    onOpenChange: setOpen,
  });

  const click = useClick(context, { event: 'mousedown', enabled: !disabled && !readOnly });
  const dismiss = useDismiss(context, { enabled: !disabled && !readOnly });
  const role = useRole(context, { role: 'listbox' });

  const listRef = useRef<Array<HTMLElement | null>>([]);

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
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
    enabled: !disabled && !readOnly
  });

  const onMatch = (index: number) => {
    if (open) {
      setActiveIndex(index)
      return
    }

    setSelectedIndex(index)
    handleSelect?.(options?.[index].value)
  }

  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    selectedIndex,
    onMatch,
    onTypingChange(isTyping) {
      isTypingRef.current = isTyping;
    },
    enabled: !disabled
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNav,
    typeahead,
  ]);

  const onSelectIndex = (index: number) => {
    setSelectedIndex(index);
    handleSelect?.(options?.[index].value)
    setOpen(false);
  }

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
  });

  return (
    <div className={csx(styles.wrapper, wrapperClassName)}>
      <button {...props} type='button' data-size={fieldSize} data-variant={variant} data-state={open ? 'open' : 'close'}
              aria-disabled={disabled} aria-readonly={readOnly} tabIndex={0} ref={refs.setReference}
              className={csx(styles.selectCombobox, comboboxClassName, className)} {...getReferenceProps()}>
        <div className={styles.segment}>
          {startSlot ? startSlot : icon ? <Icon name={icon} size={iconSize} aria-hidden/> : undefined}
          {
            selectedIndex != null && options
              ? valueSlot ? valueSlot :
                <Text className={csx(styles.value, valueClassName)}>{options[selectedIndex].label}</Text>
              : <Text className={csx(styles.placeholder, placeholderClassName)}>{placeholder}</Text>
          }
        </div>
        {(!readOnly || endSlot) && (
          <div className={styles.control}>
            {!readOnly && <Icon className={styles.controlIcon} name='chevron' size='pico'/>}
            {endSlot}
          </div>
        )}
      </button>
      {open && options?.length !== 0 && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            role='listbox'
            data-full-width={fullWidthListbox}
            style={{ ...floatingStyles, ...transitionStyles }}
            className={csx(styles.selectListbox, listboxClassName)}
            {...getFloatingProps()}
          >
            {children && Children.map(children, (child, i) => (
              <Option
                key={i}
                {...child.props}
                size={fieldSize}
                value={i}
                ref={(node) => {
                  listRef.current[i] = node
                }}
                selected={i === selectedIndex}
                focusable={i === activeIndex}
                onSelect={onSelectIndex}
                {...getItemProps()}
              >
                {child.props?.children}
              </Option>
            ))}
          </div>
        </FloatingFocusManager>
      )}
    </div>
  )
}