import type { CSSProperties } from 'react';
import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';

export default function IconAndListboxOverride() {
  return (
    <Select defaultValue='week' style={{ width: 200 }}>
      <SelectCombobox aria-label='Date range'>
        <SelectValue />
        <SelectIcon style={{ '--select-icon-color': 'var(--color-primary-600)' } as CSSProperties} />
      </SelectCombobox>
      <SelectListbox style={{ '--select-listbox-br-ratio': 0.5 } as CSSProperties}>
        <SelectOption value='today'>Today</SelectOption>
        <SelectOption value='week'>Last 7 days</SelectOption>
        <SelectOption value='month'>Last 30 days</SelectOption>
        <SelectOption value='quarter'>This quarter</SelectOption>
      </SelectListbox>
    </Select>
  );
}
