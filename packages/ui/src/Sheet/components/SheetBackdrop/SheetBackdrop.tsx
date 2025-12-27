'use client';
import { FC } from 'react';
import { Backdrop, BackdropProps } from '../../../Backdrop';
import { useSheetContext } from '../../contexts';

export type SheetBackdropProps = BackdropProps

/**
 * SheetBackdrop
 *
 * A backdrop component used by `Sheet` to visually separate the sheet
 * content from the rest of the interface.
 *
 * The backdrop visibility is controlled internally via `useSheetContext()`
 * and reflects the current transition state of the sheet.
 *
 * Behavior:
 * - Becomes visible only when the sheet transition status is `'open'`
 * - Automatically hides during closing and closed states
 * - Does not manage its own state
 *
 * Notes:
 * - Should only be used inside a `Sheet` component
 * - Visibility is derived from context and should not be overridden manually
 */
export const SheetBackdrop: FC<SheetBackdropProps> = (props) => {
  const { transitionStatus } = useSheetContext()
  return <Backdrop visible={transitionStatus === 'open'} {...props} />
}