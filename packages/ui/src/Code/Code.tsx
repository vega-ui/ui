import { FC, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { Text, TextProps } from '../Text';
import { TextSize } from '../Text';

export interface CodeProps extends TextProps {
  /**
   * Defines the font size of the code element.
   * Inherits from the typography system’s `TextSize` type.
   */
  size?: TextSize

  /**
   * Ref forwarded to the native `<code>` HTML element.
   * Enables direct access for focus, measurement, or custom logic.
   */
  ref?: Ref<HTMLElement>
}

/** Code is a UI component used to display snippets of code in a readable, monospaced font. */
export const Code: FC<CodeProps> = ({
  size,
  className,
  children,
  ref,
  ...props
}) => {
  return (
    <Text asChild className={csx(style.code, className)} size={size} ref={ref} {...props}>
      <code>
        {children}
      </code>
    </Text>
  )
}