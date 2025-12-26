import { SelectPortal, SelectPortalProps } from '../../../Select';
import { FC } from 'react';

export type PhoneFieldSelectPortalProps = SelectPortalProps

/**
 * PhoneFieldSelectPortal is a re-export of SelectPortal
 * used to render the country listbox in a FloatingUI portal.
 *
 * It ensures that the dropdown content is rendered outside
 * of the normal DOM flow, preventing clipping by parent
 * containers and preserving correct positioning.
 *
 * All behavior and accessibility features are inherited
 * directly from SelectPortal.
 *
 * This component is intended to be used as part of PhoneFieldSelect
 * and should not be rendered independently.
 */
export const PhoneFieldSelectPortal: FC<PhoneFieldSelectPortalProps> = (props) => <SelectPortal {...props} />