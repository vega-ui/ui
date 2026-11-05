import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';
import { GlobeIcon } from '@vega-ui/icons';

export default function CustomIcon() {
  return (
    <Select defaultValue='en' style={{ width: 180 }}>
      <SelectCombobox aria-label='Language'>
        <SelectValue />
        <SelectIcon>
          <GlobeIcon />
        </SelectIcon>
      </SelectCombobox>
      <SelectListbox>
        <SelectOption value='en'>English</SelectOption>
        <SelectOption value='fr'>French</SelectOption>
        <SelectOption value='ja'>Japanese</SelectOption>
      </SelectListbox>
    </Select>
  );
}
