import {
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function MinimalComposition() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Interface language</Label>
      <Select defaultValue='en'>
        <SelectHiddenSelect name='language' />
        <SelectCombobox id={id}>
          <SelectValue placeholder='Choose a language' />
          <SelectIcon><ChevronDownIcon /></SelectIcon>
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='en'>English</SelectOption>
          <SelectOption value='de'>Deutsch</SelectOption>
          <SelectOption value='es'>Español</SelectOption>
          <SelectOption value='ja'>日本語</SelectOption>
        </SelectListbox>
      </Select>
    </div>
  );
}
