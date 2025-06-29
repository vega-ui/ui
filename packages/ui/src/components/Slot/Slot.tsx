import { Children, cloneElement, HTMLAttributes, isValidElement, ReactElement, ReactNode } from 'react';
import { mergeProps } from '@vega-ui/utils';

export type SlotProps<T> = Omit<HTMLAttributes<HTMLElement>, keyof T> & Record<string, unknown> & {
  children: ReactNode
} & T

export const Slot = <T,>({ children, ...props }: SlotProps<T>): ReactElement => {
  const child = Children.only(children);

  if (!isValidElement(child)) {
    throw new Error('[Slot] `asChild` must be a valid React-element.');
  }

  const elementToClone = children as ReactElement<{ [p: string]: unknown }>

  return cloneElement(
    elementToClone,
    mergeProps(props, elementToClone.props ?? {})
  )
}