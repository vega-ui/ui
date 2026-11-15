'use client';
import { FC, HTMLAttributes } from 'react';
import { createInput } from '@vega-ui/core';
import { useSnapshot } from '../../../internals/widget';
import { Collapsible } from '../../../Collapsible';
import style from './style.module.css'
import { AccordionItemProvider, useAccordionContext } from '../../contexts';
import { TOGGLE_ITEM } from '@vega-ui/widgets/accordion';
import { AccordionSize } from '../../types';
import { csx } from '@vega-ui/utils';

export interface AccordionItemProps extends HTMLAttributes<HTMLLIElement> {
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
   * Controls the size of the trigger and affects typography and spacing.
   * Falls back to context value if not provided.
   */
  size?: AccordionSize
  
  /**
   * ID of the collapsible content element.
   *
   * Used to:
   * - link trigger and content via accessibility attributes (`aria-controls`)
   * - expose the expanded region to assistive technologies
   * - provide a stable identifier for testing and DOM querying
   *
   * If not provided, an ID generated internally.
   */
  contentId?: string
}

/** The AccordionItem component represents an individual collapsible section within an accordion group, supporting controlled or uncontrolled open state, a customizable trigger slot, and optional visual separation from adjacent items */
export const AccordionItem: FC<AccordionItemProps> = ({
  size,
  className,
  value,
  open,
  onChangeOpen,
  contentId,
  children,
  ...props
}) => {
  const { handle, size: _size = 'md' } = useAccordionContext()
  const opened = useSnapshot(handle, (state) => state.opened.includes(value))

  const onChange = (state: boolean) => {
    onChangeOpen?.(value, state)
    handle.send(createInput(TOGGLE_ITEM, { value, to: state }))
  }

  return (
    <AccordionItemProvider size={size ?? _size}>
      <li className={csx(className, style.item)} {...props}>
        <Collapsible contentId={contentId} open={open ?? opened} onChangeOpen={onChange}>
          {children}
        </Collapsible>
      </li>
    </AccordionItemProvider>
  )
}