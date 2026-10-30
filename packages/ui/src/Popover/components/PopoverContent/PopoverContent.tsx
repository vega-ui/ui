'use client';

import { FC, HTMLAttributes, Ref, ToggleEvent, useLayoutEffect, useReducer, useRef, useState } from 'react';
import { csx, mergeEventHandlers, mergeRefs, togglePopover } from '@vega-ui/utils';
import styles from './style.module.css';
import { usePopoverContext } from '../../contexts';

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Applies a visual shadow to the component container.
   * Adds elevation and depth, visually separating the content from the background.
   */
  shadowed?: boolean

  /**
   * Ref forwarded to the native `[popover]` element.
   * Useful for focus management, animations, or measuring position.
   */
  ref?: Ref<HTMLDivElement>
}

/** The PopoverContent component is the native `popover="auto"` panel of a Popover: the browser shows it in the top layer, closes it on an outside click or `Escape`, and returns focus to the trigger, while its children render only while it is open */
export const PopoverContent: FC<PopoverContentProps> = ({
  ref,
  shadowed = true,
  className,
  children,
  style,
  onToggle: _onToggle,
  ...props
}) => {
  const { open, changeOpen, role, contentId, placement = 'bottom', setFloating, contentStyles } = usePopoverContext()
  const element = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)
  const [syncKey, resync] = useReducer((key: number) => key + 1, 0)
  const [side, align = 'center'] = placement.split('-')

  useLayoutEffect(() => {
    const popover = element.current
    if (!popover) return

    togglePopover(popover, open)

    if (open) {
      setRendered(true)
      return
    }

    let cancelled = false

    Promise.allSettled(popover.getAnimations().map((animation) => animation.finished)).then(() => {
      if (!cancelled) setRendered(false)
    })

    return () => {
      cancelled = true
    }
  }, [open, syncKey])

  const onToggle = (event: ToggleEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return

    const shown = event.newState === 'open'

    if (shown !== open) changeOpen(shown)
    resync()
  }

  return (
    <div
      id={contentId}
      popover='auto'
      role={role}
      ref={mergeRefs([element, setFloating, ref])}
      style={{ ...contentStyles, ...style }}
      data-shadowed={shadowed}
      data-status={open ? 'open' : 'close'}
      data-side={side}
      data-align={align}
      className={csx(styles.content, className)}
      onToggle={mergeEventHandlers(onToggle, _onToggle)}
      {...props}
    >
      {rendered && children}
    </div>
  )
}
