import { FC, HTMLAttributes, PointerEvent } from 'react';
import { createInput } from '@vega-ui/core';
import { useOutput, useSnapshot } from '../../../internals/widget';
import style from './style.module.css';
import { csx } from '@vega-ui/utils';
import { usePinFieldContext } from '../../contexts';
import { SELECT_SLOT, slotGlyphOf, slotPart } from '@vega-ui/widgets/pin-field';

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
  const { handle, placeholder, size } = usePinFieldContext()
  const attrs = useOutput(handle, slotPart, index)
  const glyph = useSnapshot(handle, (state) => slotGlyphOf(state, index))

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    _onPointerDown?.(event)
    if (event.defaultPrevented) return

    if (handle.send(createInput(SELECT_SLOT, { to: index })).answer === 'handled') event.preventDefault()
  }

  return (
    <div
      data-size={size}
      className={csx(style.slot, className)}
      onPointerDown={onPointerDown}
      {...handle.merge(attrs, props)}
    >
      {glyph || placeholder?.[index]}
    </div>
  )
}