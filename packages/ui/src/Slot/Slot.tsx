import { cloneElement, HTMLAttributes, isValidElement, ReactElement, ReactNode } from 'react';
import { mergeProps } from '@vega-ui/utils';

export type SlotProps<T> = Omit<HTMLAttributes<HTMLElement>, keyof T> & Record<string, unknown> & {
  /** The single element that receives the props of `Slot`. */
  children: ReactNode
} & T

export const Slot = <T,>({ children, ...props }: SlotProps<T>): ReactElement => {
  if (!isValidElement<{ [p: string]: unknown }>(children)) {
    throw new Error('[Slot] `asChild` must be a valid React-element.');
  }

  return cloneElement(
    children,
    mergeProps(props, children.props ?? {})
  )
}