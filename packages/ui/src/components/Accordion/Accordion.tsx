'use client';
import { Children, FC, HTMLAttributes, ReactElement, useState } from 'react';
import { AccordionItem, AccordionItemProps } from './components';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'

export interface AccordionProps extends HTMLAttributes<HTMLUListElement> {
  /**
   * Optional custom CSS class to apply to the accordion wrapper.
   * Useful for styling overrides or scoped custom styling.
   */
  className?: string

  /**
   * Defines the size of the accordion. Affects padding and font size.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Accordion items to render. Should be one or more `<AccordionItem>` components.
   * Accepts a single element or an array of elements.
   */
  children?: ReactElement<AccordionItemProps> | ReactElement<AccordionItemProps>[]

  /**
   * An array of item `id`s that should be open by default when the accordion mounts.
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
export const Accordion: FC<AccordionProps> = ({ size = 'medium', defaultOpened, multiple = false, separated = true, children, className, ...props }) => {
  const [opened, setOpened] = useState<string[]>(defaultOpened ?? [])

  const closeAll = () => {
    setOpened([])
  }

  const open = (value: string) => {
    if (!multiple) closeAll()
    setOpened(p => ([...p, value]))
  }

  const close = (value: string) => {
    setOpened(p => p.filter(v => v !== value))
  }

  const onChangeOpen = (value: string, state: boolean) => {
    if (!state) close(value)
    else open(value)
  }

  return (
    <ul {...props} className={csx(className, style.accordion)}>
      {children && (
        Children.map(children, (child, i) => {
          const value = child.props.value

          return (
            <AccordionItem
              key={value}
              {...child.props}
              size={size}
              separated={separated ? i !== Children.count(children) - 1 : undefined}
              open={opened.includes(value)}
              onChangeOpen={onChangeOpen}
            />
          )
        })
      )}
    </ul>
  );
}