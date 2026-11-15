import { isValidElement, ReactNode } from 'react'

const INTERACTIVE_TAGS = new Set(['button', 'input', 'select', 'textarea', 'summary'])

export const isInteractiveChild = (children: ReactNode): boolean => {
  if (!isValidElement<{ href?: string }>(children) || typeof children.type !== 'string') return false
  if (children.type === 'a') return children.props.href !== undefined

  return INTERACTIVE_TAGS.has(children.type)
}

const INTERACTIVE = [...INTERACTIVE_TAGS, 'a[href]'].join(', ')

export const isInteractiveElement = (element: Element | null) => element !== null && element.matches(INTERACTIVE)
