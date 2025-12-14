import { FC } from 'react';
import { Text, TextProps } from '../../../Text';
import style from './style.module.css';

export type AlertTitleProps = TextProps

/**
 * AlertTitle renders the primary heading text of an Alert.
 * It is intended to communicate the main message or summary
 * of the alert to the user.
 *
 * The title is rendered using the Text primitive to ensure
 * consistent typography, with a predefined font weight and
 * size to establish visual prominence within the Alert.
 */
export const AlertTitle: FC<AlertTitleProps> = ({ children, ...props }) => {
  return (
    <Text className={style.title} fontWeight={500} size={3} asChild {...props}>
      <p>{children}</p>
    </Text>
  )
}