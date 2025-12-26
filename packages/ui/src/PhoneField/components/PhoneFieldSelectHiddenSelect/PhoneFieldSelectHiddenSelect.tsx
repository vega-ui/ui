import { FC } from 'react';
import { SelectHiddenSelect, SelectHiddenSelectProps } from '../../../Select';

export type PhoneFieldSelectHiddenSelectProps = SelectHiddenSelectProps

/**
 * PhoneFieldSelectHiddenSelect is a thin wrapper around SelectHiddenSelect
 * used inside PhoneFieldSelect to provide native form compatibility.
 *
 * It renders a visually hidden native `<select>` element that mirrors
 * the current country selection, enabling:
 * - form submission support
 * - browser autofill
 * - accessibility for assistive technologies
 *
 * This component is intended to be used as part of PhoneFieldSelect
 * and should not be rendered on its own.
 */
export const PhoneFieldSelectHiddenSelect: FC<PhoneFieldSelectHiddenSelectProps> = (props) => {
  return <SelectHiddenSelect {...props} />
}