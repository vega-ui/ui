'use client';
import { FC, ReactNode, useCallback, useRef } from 'react';
import { AccordionTrigger } from '../AccordionTrigger';
import { AccordionContent } from '../AccordionContent';
import { Separator } from '../../../Separator';
import { Collapsible } from '../../../Collapsible';
import style from './style.module.css'

export interface AccordionItemProps {
  /**
   * Controls whether the accordion item is open (expanded).
   * If provided, the component becomes controlled.
   */
  open?: boolean

  /**
   * Callback triggered when the open state changes.
   *
   * @param value - The value of the item
   * @param state - The new open state (`true` = opened, `false` = closed)
   */
  onChangeOpen?: (value: string, state: boolean) => void

  /**
   * Visual size of the item.
   * Affects spacing, padding, and font size.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Unique identifier for this accordion item.
   * Used for managing open state within the accordion group.
   */
  value: string

  /**
   * Custom node rendered inside the trigger area (typically a label or heading).
   */
  triggerSlot?: ReactNode

  /**
   * The content inside the accordion item.
   * Will be shown or hidden based on the open state.
   */
  children?: ReactNode | ReactNode[]

  /**
   * Adds a visual separator between this item and others in the accordion group.
   * Has no effect when used directly inside an `Accordion`, as separation is handled at the group level.
   */
  separated?: boolean
}

/** The AccordionItem component represents an individual collapsible section within an accordion group, supporting controlled or uncontrolled open state, a customizable trigger slot, and optional visual separation from adjacent items */
export const AccordionItem: FC<AccordionItemProps> = ({ size, triggerSlot, separated, value, open = false, onChangeOpen, children }) => {
  const triggerRef = useRef<HTMLButtonElement>(null)

  const onChange = useCallback((state: boolean) => {
    onChangeOpen?.(value, state)
  }, [value, onChangeOpen])

  return (
    <li className={style.item}>
      <Collapsible open={open} onChangeOpen={onChange}>
        <AccordionTrigger size={size} ref={triggerRef}>
          {triggerSlot}
        </AccordionTrigger>
        <AccordionContent>
          {children}
        </AccordionContent>
        {separated && <Separator />}
      </Collapsible>
    </li>
  )
}