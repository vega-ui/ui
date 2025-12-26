import { FC } from 'react';
import { SelectIcon, SelectIconProps } from '../../../Select';

export type PhoneFieldSelectIconProps = SelectIconProps

/**
 * PhoneFieldSelectIcon is a wrapper around SelectIcon
 * used in PhoneFieldSelect to indicate the dropdown state.
 *
 * It renders the chevron icon that reflects whether the
 * country selection list is open or closed, inheriting
 * all behavior and accessibility features from SelectIcon.
 *
 * This component is intended to be used as part of PhoneFieldSelect
 * and should not be rendered independently.
 */
export const PhoneFieldSelectIcon: FC<PhoneFieldSelectIconProps> = (props) => <SelectIcon {...props} />