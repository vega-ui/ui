import type { CSSProperties } from 'react';
import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';

export default function ValueAndPlaceholderColorOverride() {
  return (
    <Select
      style={{
        '--select-value-color': 'var(--color-primary-700)',
        '--select-placeholder-color': 'var(--label-secondary)',
        width: 200,
      } as CSSProperties}
    >
      <SelectCombobox aria-label='Status'>
        <SelectValue placeholder='Any status' />
        <SelectIcon />
      </SelectCombobox>
      <SelectListbox>
        <SelectOption value='open'>Open</SelectOption>
        <SelectOption value='in-progress'>In progress</SelectOption>
        <SelectOption value='done'>Done</SelectOption>
      </SelectListbox>
    </Select>
  );
}
