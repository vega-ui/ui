'use client';
import { FC, ReactNode, useCallback } from 'react';
import { Separator } from '../../../Separator';
import { Collapsible } from '../../../Collapsible';
import style from './style.module.css'
import { AccordionItemProvider, useAccordionContext } from '../../contexts';
import { AccordionSize } from '../../types.ts';

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
   * Unique identifier for this accordion item.
   * Used for managing open state within the accordion group.
   */
  value: string

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
  
  /**
   * Controls the size of the trigger and affects typography and spacing.
   * Falls back to context value if not provided.
   */
  size?: AccordionSize
}

/** The AccordionItem component represents an individual collapsible section within an accordion group, supporting controlled or uncontrolled open state, a customizable trigger slot, and optional visual separation from adjacent items */
export const AccordionItem: FC<AccordionItemProps> = ({ separated, size, value, open, onChangeOpen, children }) => {
  const { opened, onChangeOpened, separated: _separated, size: _size = 'medium' } = useAccordionContext()

  const onChange = useCallback((state: boolean) => {
    onChangeOpen?.(value, state)
    onChangeOpened?.(value, state)
  }, [value, onChangeOpen, onChangeOpened])

  return (
    <AccordionItemProvider size={size ?? _size}>
      <li className={style.item}>
        <Collapsible open={open ?? opened.includes(value)} onChangeOpen={onChange}>
          {children}
          {(separated ?? _separated) && <Separator className={style.separator} />}
        </Collapsible>
      </li>
    </AccordionItemProvider>
  )
}