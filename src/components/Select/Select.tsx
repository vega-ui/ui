import { Children, cloneElement, FC, ReactElement, ReactNode, useMemo, useRef, useState } from 'react';
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

export interface SelectProps {
  listboxClassName?: string
  comboboxClassName?: string
  children?: ReactElement | ReactElement[]
  start?: ReactNode
  end?: ReactNode
  placeholder?: string
  disabled?: boolean
  icon?: IconProps['name']
  iconColor?: IconProps['color']
  iconSize?: IconProps['size']
  variant?: 'inline' | 'field'
  value?: string | number
  onSelect?(value: string | number):void
}

export const Select: FC<SelectProps> = ({
  listboxClassName,
  comboboxClassName,
  start,
  end,
  disabled = false,
  icon,
  iconColor = 'currentColor',
  iconSize,
  placeholder,
  children,
  variant = 'field',
  onSelect: handleSelect,
  value,
}) => {
  const options = useMemo(() => Children.count(children) !== 0 ? Children.map(children, (child) => ({
    label: child!.props.children,
    value: child!.props.value
  })) : [], [children])

  const selectedDefaultIndex = options?.findIndex(v => value === v.value)

  const [isOpen, setIsOpen] = useState(false);
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
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context, { event: 'mousedown', enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });

  const listRef = useRef<Array<HTMLElement | null>>([]);

  const listContentRef = useRef(options?.map(v => v.label) ?? []);
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
    onMatch: isOpen ? setActiveIndex : setSelectedIndex,
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
    setIsOpen(false);
  };

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
  });

  return (
    <>
      <div data-variant={variant} data-state={isOpen ? 'open' : 'close'} aria-disabled={disabled} tabIndex={0} ref={refs.setReference} className={csx(styles.selectCombobox, comboboxClassName)} {...getReferenceProps()}>
        <div className={styles.segment}>
          {start ? start : icon ? <Icon name={icon} size={iconSize} color={iconColor} aria-hidden /> : undefined}
          {selectedIndex != null && options ? <Text className={styles.value}>{options[selectedIndex].label}</Text> : <Text className={styles.placeholder}>{placeholder}</Text>}
        </div>
        <div className={styles.control}>
          <Icon className={styles.controlIcon} color='currentColor' name='chevron' size='pico' />
          {end}
        </div>
      </div>
      {isOpen && options?.length !== 0 && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, ...transitionStyles }}
            className={csx(styles.selectListbox, listboxClassName)}
            {...getFloatingProps()}
          >
            {Children.map(children, (child, i) => (
              cloneElement(child!, {
                ...child?.props,
                value: i,
                ref(node: HTMLElement) {
                  listRef.current[i] = node;
                },
                selected: i === selectedIndex,
                focusable: i === activeIndex,
                onSelect,
                ...getItemProps(),
              })
            ))}
          </div>
        </FloatingFocusManager>
      )}
    </>
  )
}