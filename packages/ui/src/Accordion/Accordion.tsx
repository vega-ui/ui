'use client';
import { FC, HTMLAttributes, ReactElement } from 'react';
import { AccordionItemProps } from './components';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'
import { useWidget, widgetEnvironment } from '../internals/widget';
import { AccordionProvider } from './contexts';
import { accordionWidget } from '@vega-ui/widgets/accordion';
import { AccordionSize } from './types';

export interface AccordionProps extends HTMLAttributes<HTMLUListElement> {
  /**
   * Optional custom CSS class to apply to the accordion wrapper.
   * Useful for styling overrides or scoped custom styling.
   */
  className?: string

  /**
   * Defines the size of the accordion. Affects padding and font size.
   */
  size?: AccordionSize

  /**
   * Accordion items to render. Should be one or more `<AccordionItem>` components.
   * Accepts a single element or an array of elements.
   */
  children?: ReactElement<AccordionItemProps> | ReactElement<AccordionItemProps>[]
  
  /**
   * IDs of currently open items. Enables controlled mode when set.
   */
  opened?: string[]
  
  /**
   * Called when open item IDs change.
   */
  onChangeOpened?: (opened?: string[]) => void

  /**
   * An array of item `id's that should be open by default when the accordion mounts.
   */
  defaultOpened?: string[]

  /**
   * Allows multiple accordion items to be open at the same time.
   * If `false`, only one item can be open at once (classic accordion behavior).
   */
  multiple?: boolean
}

/**
 An Accordion is a UI component that toggles content visibility, allowing users to expand or collapse sections for better organization and navigation.
*/
export const Accordion: FC<AccordionProps> = ({
  size = 'md',
  defaultOpened = [],
  opened,
  onChangeOpened,
  multiple = false,
  children,
  className,
  ...props
}) => {
  const handle = useWidget(accordionWidget, {
    multiple,
    opened,
    defaultOpened,
    onChangeOpened: (value: readonly string[]) => onChangeOpened?.([...value]),
  }, widgetEnvironment)

  return (
    <AccordionProvider handle={handle} size={size}>
      <ul {...props} className={csx(className, style.accordion)}>
        {children}
      </ul>
    </AccordionProvider>
  );
}