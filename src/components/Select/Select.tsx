import { Children, FC, ReactElement, ReactNode, useMemo, useRef, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  size,
  useClick,
  useDismiss,
  useFloating, useInteractions, useListNavigation, useRole, useTransitionStyles, useTypeahead
} from '@floating-ui/react';
import { csx } from '../../utils/css';
import styles from './style.module.css';
import { Text } from '../Text';
import { Icon, IconProps } from '../Icon';
import { Option, OptionProps } from '../Option';

export interface SelectProps {
  listboxClassName?: string
  comboboxClassName?: string
  children?: ReactElement<OptionProps> | ReactElement<OptionProps>[]
  start?: ReactNode
  end?: ReactNode
  placeholder?: string
  disabled?: boolean
  icon?: IconProps['name']
  iconSize?: IconProps['size']
  variant?: 'inline' | 'field'
  size?: 'small' | 'medium' | 'large'
  value?: string | number | undefined
  onSelect?(value: string | number | undefined):void
}

export const Select: FC<SelectProps> = ({
  listboxClassName,
  comboboxClassName,
  start,
  end,
  disabled = false,
  icon,
  iconSize,
  placeholder,
  children,
  variant = 'field',
  size: fieldSize = 'medium',
  onSelect: handleSelect,
  value,
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
      flip({ padding: 10 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            minWidth: `${rects.reference.width}px`,
          });
        },
        padding: 10,
      }),
    ],
    placement: variant === 'inline' ? 'bottom' : 'bottom-start',
    open,
    onOpenChange: setOpen,
  });

  const click = useClick(context, { event: 'mousedown', enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });

  const listRef = useRef<Array<HTMLElement | null>>([]);

  const listContentRef = useRef(options ? options.map(v => v.label) : []);
  const isTypingRef = useRef(false);

  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
    enabled: !disabled
  });

  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    selectedIndex,
    onMatch: open ? setActiveIndex : setSelectedIndex,
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

  const onSelect = (index: number) => {
    setSelectedIndex(index);
    handleSelect?.(options?.[index].value)
    setOpen(false);
  };

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
  });

  return (
    <>
      <div data-size={fieldSize} data-variant={variant} data-state={open ? 'open' : 'close'} aria-disabled={disabled} tabIndex={0} ref={refs.setReference} className={csx(styles.selectCombobox, comboboxClassName)} {...getReferenceProps()}>
        <div className={styles.segment}>
          {start ? start : icon ? <Icon name={icon} size={iconSize} aria-hidden /> : undefined}
          {selectedIndex != null && options ? <Text className={styles.value}>{options[selectedIndex].label}</Text> : <Text className={styles.placeholder}>{placeholder}</Text>}
        </div>
        <div className={styles.control}>
          <Icon className={styles.controlIcon} name='chevron' size='pico' />
          {end}
        </div>
      </div>
      {open && options?.length !== 0 && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
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
                onSelect={onSelect}
                {...getItemProps()}
              >
                {child.props?.children}
              </Option>
            ))}
          </div>
        </FloatingFocusManager>
      )}
    </>
  )
}