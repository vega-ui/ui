import {
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  type SelectProps,
} from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MySelectProps<Value extends string | number = string> extends SelectProps<Value> {
  name?: string
  placeholder?: string
}

export function MySelect<Value extends string | number = string>({ id, name, placeholder, children, ...props }: MySelectProps<Value>) {
  return (
    <Select {...props}>
      <SelectHiddenSelect name={name} />
      <SelectCombobox id={id}>
        <SelectValue placeholder={placeholder} />
        <SelectIcon><ChevronDownIcon /></SelectIcon>
      </SelectCombobox>
      <SelectListbox>{children}</SelectListbox>
    </Select>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Interface language</Label>
      <MySelect id={id} name='language' defaultValue='en' placeholder='Choose a language'>
        <SelectOption value='en'>English</SelectOption>
        <SelectOption value='de'>Deutsch</SelectOption>
        <SelectOption value='ja'>日本語</SelectOption>
      </MySelect>
    </div>
  );
}
