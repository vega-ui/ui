import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import { Text, TextProps } from '../../../Text';
import style from './style.module.css';

export type AlertContentProps = TextProps

/**
 * AlertContent renders the main textual content of an Alert.
 * It is intended for descriptive or supporting text displayed
 * inside the alert container.
 *
 * The component uses the Text primitive for consistent typography
 * and renders its content as a paragraph element. A predefined text
 * size is applied to ensure visual hierarchy within the Alert.
 */
export const AlertContent: FC<AlertContentProps> = ({ children, className, ...props }) => {
  return (
    <Text asChild size={2} className={csx(style.text, className)} {...props}>
      <p>{children}</p>
    </Text>
  )
}