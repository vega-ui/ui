import type { CSSProperties } from 'react';
import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';

export default function RootSizeOverride() {
  return (
    <Select
      defaultValue='newest'
      style={{ '--select-size': '44px', '--select-br-ratio': 0.5, width: 200 } as CSSProperties}
    >
      <SelectCombobox aria-label='Sort orders by'>
        <SelectValue />
        <SelectIcon />
      </SelectCombobox>
      <SelectListbox>
        <SelectOption value='newest'>Newest first</SelectOption>
        <SelectOption value='oldest'>Oldest first</SelectOption>
        <SelectOption value='total'>Highest total</SelectOption>
      </SelectListbox>
    </Select>
  );
}
