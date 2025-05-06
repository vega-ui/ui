import { FC, ReactNode, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { Text, TextProps } from '../Text';
import { TextSize } from '../Text/Text.tsx';

export interface CodeProps extends TextProps {
  /**
   * The content inside the `<code>` element.
   * Can be a single node or an array of nodes.
   * Usually used for inline code or short code snippets.
   */
  children?: ReactNode | ReactNode[]

  /**
   * Optional custom CSS class applied to the `<code>` element.
   * Useful for extending or overriding typographic styles.
   */
  className?: string

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