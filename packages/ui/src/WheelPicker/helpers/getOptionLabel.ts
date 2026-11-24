import { Children, isValidElement, ReactNode } from 'react';

const textOf = (children: ReactNode): string => Children.toArray(children).map((child) => {
  if (typeof child === 'string' || typeof child === 'number') return String(child)
  if (isValidElement<{ children?: ReactNode }>(child)) return textOf(child.props.children)
  return ''
}).join('')

export const getOptionLabel = (children: ReactNode, value: string | number): string => textOf(children) || String(value)
