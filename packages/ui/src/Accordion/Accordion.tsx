'use client';
import { FC, HTMLAttributes, ReactElement } from 'react';
import { AccordionItemProps } from './components';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'
import { AccordionProvider } from './contexts';
import { useControlledState } from '@vega-ui/hooks';
import { AccordionSize } from './types.ts';

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
   * Adds visual separators (such as borders or spacing) between accordion items.
   * Enhances readability in dense layouts.
   */
  separated?: boolean

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
  size = 'medium',
  defaultOpened = [],
  opened,
  onChangeOpened,
  multiple = false,
  separated = true,
  children,
  className,
  ...props
}) => {
  const [openedValues, setOpenedValues] = useControlledState<string[]>(opened, defaultOpened, onChangeOpened)

  const open = (value: string) => {
    setOpenedValues(multiple ? [...openedValues, value] : [value])
  }

  const close = (value: string) => {
    setOpenedValues(openedValues.filter(v => v !== value))
  }

  const onChangeOpen = (value: string, state: boolean) => {
    if (!state) close(value)
    else open(value)
  }

  return (
    <AccordionProvider separated={separated} opened={openedValues} onChangeOpened={onChangeOpen} size={size}>
      <ul {...props} className={csx(className, style.accordion)}>
        {children}
      </ul>
    </AccordionProvider>
  );
}