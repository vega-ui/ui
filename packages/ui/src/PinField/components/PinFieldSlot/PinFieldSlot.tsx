import { FC, HTMLAttributes, PointerEvent } from 'react';
import style from './style.module.css';
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import { usePinFieldContext } from '../../contexts';

export interface PinFieldSlotProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The zero-based index of the slot within the PinField sequence.
   */
  index: number
}

/** The PinFieldSlot component represents an individual character position within a PinField, exposing its index for customizing the rendering, behavior, or styling of that specific input cell. */
export const PinFieldSlot: FC<PinFieldSlotProps> = ({
  index,
  className,
  onPointerDown: _onPointerDown,
  ...props
}) => {
  const {
    innerInputRef,
    placeholder,
    value,
    size,
    disabled,
    error,
    syncActive,
    active,
    selectedAll,
  } = usePinFieldContext()
  
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!innerInputRef?.current || disabled) return;
    
    e.preventDefault();
    innerInputRef.current.focus();
    
    requestAnimationFrame(() => syncActive(index))
  };
  
  return (
    <div
      aria-hidden='true'
      data-size={size}
      className={csx(style.slot, className)}
      data-placeholder={!value[index]}
      data-caret={active === index}
      data-active={active === index || selectedAll}
      data-disabled={disabled}
      data-error={error}
      onPointerDown={mergeEventHandlers(onPointerDown, _onPointerDown)}
      {...props}
    >
      {!value[index] ? placeholder?.[index] : value[index]}
    </div>
  )
}